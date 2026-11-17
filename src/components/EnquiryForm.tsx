"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { homeownerSchema, investorSchema, options } from "@/lib/enquiry";
import { trackEvent } from "./CookieConsent";

type Kind = "homeowner" | "investor";
type Errors = Record<string, string | undefined>;

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

function Field({
  id,
  label,
  error,
  optional,
  children,
  full,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.78rem] font-medium uppercase tracking-[0.12em] text-charcoal/80">
        {label}
        {optional && <span className="text-[0.7rem] normal-case tracking-normal text-stone">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[#a4453a]">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm({ kind, defaultService }: { kind: Kind; defaultService?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(Date.now());
  const tsRef = useRef<HTMLDivElement>(null);
  const tsToken = useRef<string>("");

  const renderTurnstile = () => {
    if (TURNSTILE_KEY && tsRef.current && window.turnstile && !tsRef.current.hasChildNodes()) {
      window.turnstile.render(tsRef.current, {
        sitekey: TURNSTILE_KEY,
        theme: "light",
        callback: (t: string) => (tsToken.current = t),
      });
    }
  };
  useEffect(renderTurnstile, []);

  const p = (name: string) => ({
    id: `${kind}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${kind}-${name}-error` : undefined,
    className: "field",
  });

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(fd.entries());
    data.kind = kind;
    data.consent = fd.get("consent") === "on";
    data.startedAt = startedAt.current;
    data.turnstileToken = tsToken.current;
    if (defaultService && kind === "homeowner" && options.service[defaultService]) {
      data.description = `[Interested in: ${options.service[defaultService]}]\n${data.description ?? ""}`;
    }

    const schema = kind === "homeowner" ? homeownerSchema : investorSchema;
    const result = schema.safeParse(data);
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors as Record<string, string[] | undefined>;
      const next: Errors = {};
      for (const k in fe) next[k] = fe[k]?.[0];
      setErrors(next);
      const first = Object.keys(next)[0];
      document.getElementById(`${kind}-${first}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus("sent");
        trackEvent("generate_lead", { enquiry_type: kind });
      } else {
        setStatus("error");
        setMessage(json.error || "Something went wrong. Please try again.");
        if (json.fields) {
          const next: Errors = {};
          for (const k in json.fields) next[k] = json.fields[k]?.[0];
          setErrors(next);
        }
        if (TURNSTILE_KEY) window.turnstile?.reset();
      }
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-gold/50 bg-white p-10 text-center md:p-14">
        <p className="eyebrow justify-center">Thank you</p>
        <h3 className="mt-4 text-4xl">Your enquiry is with Laura.</h3>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-stone">
          We&rsquo;ll read through everything carefully and be in touch, usually within two working days, to arrange an initial conversation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {TURNSTILE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onLoad={renderTurnstile} />
      )}

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${kind}-fullName`} label="Full name" error={errors.fullName}>
          <input type="text" autoComplete="name" {...p("fullName")} />
        </Field>

        {kind === "investor" && (
          <Field id={`${kind}-company`} label="Company name" optional error={errors.company}>
            <input type="text" autoComplete="organization" {...p("company")} />
          </Field>
        )}

        <Field id={`${kind}-email`} label="Email" error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" {...p("email")} />
        </Field>
        <Field id={`${kind}-telephone`} label="Telephone" error={errors.telephone}>
          <input type="tel" autoComplete="tel" inputMode="tel" {...p("telephone")} />
        </Field>

        {kind === "homeowner" ? (
          <>
            <Field id={`${kind}-postcode`} label="Property postcode" error={errors.postcode}>
              <input type="text" autoComplete="postal-code" {...p("postcode")} className="field uppercase" />
            </Field>
            <Field id={`${kind}-renovationType`} label="Type of renovation" error={errors.renovationType}>
              <select defaultValue="" {...p("renovationType")}>
                <option value="" disabled>Please choose…</option>
                {options.renovationType.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field id={`${kind}-budget`} label="Estimated renovation budget" error={errors.budget}>
              <select defaultValue="" {...p("budget")}>
                <option value="" disabled>Please choose…</option>
                {options.homeownerBudget.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field id={`${kind}-startDate`} label="Anticipated start" error={errors.startDate}>
              <select defaultValue="" {...p("startDate")}>
                <option value="" disabled>Please choose…</option>
                {options.startDate.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field id={`${kind}-description`} label="Tell us about your project" error={errors.description} full>
              <textarea rows={6} placeholder="What would you like to change, what's prompting it, and anything you're unsure about…" {...p("description")} />
            </Field>
          </>
        ) : (
          <>
            <Field id={`${kind}-location`} label="Property location" error={errors.location}>
              <input type="text" placeholder="Town or postcode area" {...p("location")} />
            </Field>
            <Field id={`${kind}-purchasePrice`} label="Estimated purchase price" optional error={errors.purchasePrice}>
              <input type="text" inputMode="numeric" placeholder="£" {...p("purchasePrice")} />
            </Field>
            <Field id={`${kind}-budget`} label="Estimated renovation budget" error={errors.budget}>
              <select defaultValue="" {...p("budget")}>
                <option value="" disabled>Please choose…</option>
                {options.investorBudget.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field id={`${kind}-stage`} label="Current project stage" error={errors.stage}>
              <select defaultValue="" {...p("stage")}>
                <option value="" disabled>Please choose…</option>
                {options.stage.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field id={`${kind}-description`} label="Describe the opportunity" error={errors.description} full>
              <textarea rows={6} placeholder="Property type, condition, your strategy (sale or rental), timescales and the level of involvement you're looking for…" {...p("description")} />
            </Field>
          </>
        )}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone">
          <input
            type="checkbox"
            name="consent"
            id={`${kind}-consent`}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${kind}-consent-error` : undefined}
            className="mt-1 h-4 w-4 flex-none accent-[#8a7558]"
          />
          <span>
            I agree to Lancashire Ladies Renovations using the details I&rsquo;ve provided to respond to my enquiry. Your information is handled in line with our{" "}
            <Link href="/privacy" className="text-charcoal underline decoration-gold underline-offset-4">privacy policy</Link>
            {" "}and is never sold or shared for marketing.
          </span>
        </label>
        {errors.consent && <p id={`${kind}-consent-error`} role="alert" className="mt-1.5 text-sm text-[#a4453a]">{errors.consent}</p>}
      </div>

      {TURNSTILE_KEY && <div ref={tsRef} />}

      {status === "error" && (
        <p role="alert" className="border-l-2 border-[#a4453a] bg-white px-4 py-3 text-sm text-[#a4453a]">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-center gap-3 bg-charcoal px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-500 hover:bg-gold-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : kind === "homeowner" ? "Send My Enquiry" : "Send Partnership Enquiry"}
      </button>
    </form>
  );
}
