import Link from "next/link";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "./CookieConsent";

export function Footer() {
  const { phone, email, hours } = site.contact;
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-7 max-w-xs font-serif text-2xl italic leading-snug text-ivory">{site.tagline}</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">{site.serviceAreaText}</p>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow !text-gold">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow !text-gold">Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="transition-colors hover:text-white">{s.shortTitle}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow !text-gold">Get in touch</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {phone && (
              <li><a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white">{phone}</a></li>
            )}
            {email && (
              <li><a href={`mailto:${email}`} className="hover:text-white">{email}</a></li>
            )}
            {!phone && !email && (
              <li>
                <Link href="/contact" className="hover:text-white">Send an enquiry →</Link>
              </li>
            )}
            <li className="text-ivory/60">{hours}</li>
            <li className="text-ivory/60">Lancashire, England</li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-5 text-xs uppercase tracking-[0.16em]">
              {socials.map(([k, url]) => (
                <li key={k}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{k}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-7 text-xs text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            <li><Link href="/privacy" className="hover:text-white">Privacy &amp; cookies</Link></li>
            <li><CookieSettingsLink /></li>
            <li><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
