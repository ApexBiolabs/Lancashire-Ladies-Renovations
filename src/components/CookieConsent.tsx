"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * UK GDPR / PECR-compliant cookie consent.
 * - Strictly necessary storage only by default.
 * - Analytics (GA4) loads ONLY after the visitor opts in.
 * - Choice is stored in localStorage and can be changed any time
 *   via the "Cookie settings" link in the footer.
 */

const KEY = "llr-cookie-consent-v1";
type Consent = { analytics: boolean; decidedAt: string };

const OPEN_EVENT = "llr:open-cookie-settings";

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analyticsToggle, setAnalyticsToggle] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    setAnalyticsToggle(c?.analytics ?? false);
    // Only ask when there is something optional to consent to.
    if (!c && process.env.NEXT_PUBLIC_GA_ID) setVisible(true);
    const open = () => {
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const save = (analytics: boolean) => {
    const c = { analytics, decidedAt: new Date().toISOString() };
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch {}
    const hadAnalytics = consent?.analytics;
    setConsent(c);
    setVisible(false);
    setShowPrefs(false);
    // If analytics was previously on and is now withdrawn, reload to unload scripts.
    if (hadAnalytics && !analytics) window.location.reload();
  };

  return (
    <>
      {gaId && consent?.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl border border-beige bg-white p-6 shadow-[0_20px_60px_-20px_rgba(41,41,41,0.35)] md:inset-x-auto md:left-6 md:bottom-6"
        >
          <h2 id="cookie-title" className="font-serif text-2xl">Your privacy</h2>
          <p className="mt-3 text-sm leading-relaxed text-stone">
            We use essential storage to make this website work. With your permission, we&rsquo;d also like to use analytics cookies to understand how visitors use the site so we can improve it.{" "}
            <Link href="/privacy#cookies" className="underline decoration-gold underline-offset-4">Read our cookie policy</Link>.
          </p>

          {showPrefs && (
            <div className="mt-5 space-y-3 border-t border-beige pt-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span><strong className="font-medium">Strictly necessary</strong><br /><span className="text-stone">Always on — remembers your cookie choice.</span></span>
                <span className="text-xs uppercase tracking-widest text-sage-dark">On</span>
              </div>
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span><strong className="font-medium">Analytics</strong><br /><span className="text-stone">Anonymous usage statistics (Google Analytics).</span></span>
                <input
                  type="checkbox"
                  checked={analyticsToggle}
                  onChange={(e) => setAnalyticsToggle(e.target.checked)}
                  className="h-5 w-5 accent-[#8a7558]"
                />
              </label>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {showPrefs ? (
              <button onClick={() => save(analyticsToggle)} className="bg-charcoal px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-ivory hover:bg-gold-dark">
                Save preferences
              </button>
            ) : (
              <>
                <button onClick={() => save(true)} className="bg-charcoal px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-ivory hover:bg-gold-dark">
                  Accept analytics
                </button>
                <button onClick={() => save(false)} className="border border-charcoal px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] hover:bg-charcoal hover:text-ivory">
                  Reject
                </button>
                <button onClick={() => setShowPrefs(true)} className="px-2 py-3 text-xs uppercase tracking-[0.14em] text-stone underline underline-offset-4">
                  Manage
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsLink() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className="hover:text-white">
      Cookie settings
    </button>
  );
}

/** Fire a GA4 event if analytics has been consented to. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  w.gtag?.("event", name, params);
}
