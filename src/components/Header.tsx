"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-ivory/95 shadow-[0_1px_0_rgba(41,41,41,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className={`container-x flex items-center justify-between transition-all duration-500 ${solid ? "h-20" : "h-24"}`}>
        <Logo light={!solid} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[0.82rem] tracking-[0.04em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100 ${
                      active ? "after:scale-x-100" : ""
                    } ${solid ? "text-charcoal" : "text-white"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className={`hidden text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-all duration-500 sm:inline-flex px-5 py-3 ${
              solid ? "bg-charcoal text-ivory hover:bg-gold-dark" : "border border-white/60 text-white hover:bg-white hover:text-charcoal"
            }`}
          >
            Enquire
          </Link>
          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-px w-6 transition-all duration-300 ${solid ? "bg-charcoal" : "bg-white"} ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
            <span className={`absolute h-px w-6 transition-all duration-300 ${solid ? "bg-charcoal" : "bg-white"} ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 bottom-0 top-20 bg-ivory transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between pb-10 pt-8">
          <ul className="space-y-1">
            {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-beige transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link href={item.href} className="flex items-center justify-between py-4 font-serif text-3xl text-charcoal">
                  {item.label}
                  <span className="text-base text-gold">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="mt-8 bg-charcoal py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-ivory">
            Discuss Your Renovation
          </Link>
        </nav>
      </div>
    </header>
  );
}
