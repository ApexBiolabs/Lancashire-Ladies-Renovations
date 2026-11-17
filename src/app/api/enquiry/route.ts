import { NextResponse } from "next/server";
import { enquirySchema, type Enquiry } from "@/lib/enquiry";
import { site } from "@/content/site";

/**
 * POST /api/enquiry
 * Validates the enquiry, runs spam checks, and emails it via Resend.
 *
 * Required env vars: RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL
 * Optional:          TURNSTILE_SECRET_KEY (Cloudflare Turnstile)
 */

export const runtime = "nodejs";

// Very small in-memory rate limit (per server instance). For high
// traffic, swap for Upstash/Vercel KV.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured — honeypot/timing still apply
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function toRows(e: Enquiry): [string, string][] {
  const base: [string, string][] = [
    ["Enquiry type", e.kind === "homeowner" ? "Homeowner" : "Property investor"],
    ["Full name", e.fullName],
    ["Email", e.email],
    ["Telephone", e.telephone],
  ];
  if (e.kind === "homeowner") {
    return [
      ...base,
      ["Property postcode", e.postcode.toUpperCase()],
      ["Type of renovation", e.renovationType],
      ["Estimated budget", e.budget],
      ["Anticipated start", e.startDate],
      ["Project description", e.description],
    ];
  }
  return [
    ...base,
    ["Company", e.company || "—"],
    ["Property location", e.location],
    ["Estimated purchase price", e.purchasePrice || "—"],
    ["Estimated renovation budget", e.budget],
    ["Current project stage", e.stage],
    ["Opportunity description", e.description],
  ];
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many enquiries — please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot filled → pretend success so bots learn nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }
  const e = parsed.data;

  // Timing check: forms submitted in under 3 seconds are almost certainly bots.
  if (e.startedAt && Date.now() - e.startedAt < 3000) return NextResponse.json({ ok: true });

  if (!(await verifyTurnstile(e.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: "Spam check failed — please try again." }, { status: 400 });
  }

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    console.error("[enquiry] Email delivery is not configured. Set RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL.");
    console.info("[enquiry] Received (not delivered):", JSON.stringify(toRows(e)));
    return NextResponse.json(
      {
        ok: false,
        notConfigured: true,
        error: site.contact.email
          ? `Our online form isn't connected yet. Please email us directly at ${site.contact.email}.`
          : "Our online form isn't connected yet. Please try again soon.",
      },
      { status: 503 }
    );
  }

  const rows = toRows(e);
  const subject =
    e.kind === "homeowner"
      ? `New homeowner enquiry — ${e.fullName} (${e.postcode.toUpperCase()})`
      : `New investor enquiry — ${e.fullName}${e.company ? `, ${e.company}` : ""}`;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#292929;max-width:640px">
      <h2 style="font-family:Georgia,serif;font-weight:normal">${esc(subject)}</h2>
      <table cellpadding="10" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="border-bottom:1px solid #E8E1D7;width:38%;color:#8a7558;vertical-align:top">${esc(k)}</td><td style="border-bottom:1px solid #E8E1D7;white-space:pre-wrap">${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="font-size:12px;color:#888">Consent to be contacted given via ${esc(site.url)} on ${new Date().toUTCString()}.</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: ENQUIRY_FROM_EMAIL,
      to: ENQUIRY_TO_EMAIL.split(",").map((s) => s.trim()),
      reply_to: e.email,
      subject,
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[enquiry] Resend error", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "Sorry — something went wrong sending your enquiry. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
