import Link from "next/link";
import type { ReactNode } from "react";

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "ghost-light" | "text";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] transition-all duration-500 ease-[var(--ease-soft)]";
  const styles: Record<string, string> = {
    primary: "bg-charcoal text-ivory px-7 py-4 hover:bg-gold-dark",
    outline: "border border-charcoal/70 text-charcoal px-7 py-4 hover:bg-charcoal hover:text-ivory",
    light: "bg-ivory text-charcoal px-7 py-4 hover:bg-gold hover:text-white",
    "ghost-light": "border border-white/60 text-white px-7 py-4 hover:bg-white hover:text-charcoal",
    text: "text-charcoal border-b border-gold pb-1 hover:text-gold-dark",
  };
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 10"
      className={`h-2.5 w-5 transition-transform duration-500 group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M0 5h18M14 1l4 4-4 4" />
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="rule-gold" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center [&_.eyebrow]:justify-center" : ""}`}>
      {eyebrow && <Eyebrow className={light ? "!text-gold" : ""}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-5 text-4xl md:text-5xl lg:text-[3.4rem] ${light ? "text-ivory" : "text-charcoal"}`}>
        {title}
      </h2>
      {intro && (
        <div className={`mt-6 text-[1.05rem] leading-relaxed ${light ? "text-ivory/75" : "text-stone"}`}>{intro}</div>
      )}
    </div>
  );
}

/** Minimal line icons, drawn to match the brand. */
export function Icon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, ReactNode> = {
    plan: (<><rect x="4" y="4" width="24" height="24" {...p} /><path d="M4 14h12v14M16 4v6M22 14h6" {...p} /></>),
    manage: (<><path d="M6 27V13l10-7 10 7v14z" {...p} /><path d="M12 27v-8h8v8" {...p} /></>),
    key: (<><circle cx="11" cy="16" r="5" {...p} /><path d="M16 16h12M24 16v4M28 16v3" {...p} /></>),
    check: (<path d="M5 16.5l6.5 6.5L27 8" {...p} />),
    people: (<><circle cx="12" cy="11" r="4" {...p} /><circle cx="22" cy="12" r="3" {...p} /><path d="M4 26c0-4.4 3.6-8 8-8s8 3.6 8 8M20 19c3.9-.5 8 2 8 6" {...p} /></>),
    pound: (<path d="M21 8.5c-1-1.6-2.6-2.5-4.5-2.5-3 0-5 2.3-5 5.2V26M8 17h10M8 26h15" {...p} />),
    eye: (<><path d="M3 16s5-8 13-8 13 8 13 8-5 8-13 8S3 16 3 16z" {...p} /><circle cx="16" cy="16" r="3.5" {...p} /></>),
    camera: (<><rect x="4" y="9" width="24" height="17" rx="1" {...p} /><circle cx="16" cy="17.5" r="4.5" {...p} /><path d="M11 9l2-3h6l2 3" {...p} /></>),
    calendar: (<><rect x="5" y="7" width="22" height="20" {...p} /><path d="M5 13h22M11 4v6M21 4v6" {...p} /></>),
    shield: (<path d="M16 4l10 4v7c0 6.5-4.3 11-10 13C10.3 26 6 21.5 6 15V8z" {...p} />),
  };
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      {paths[name] ?? paths.check}
    </svg>
  );
}

export function CheckList({ items, columns = 1 }: { items: readonly string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-10 gap-y-3.5 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3 text-[0.97rem] leading-snug text-charcoal/85">
          <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-gold-dark" />
          {i}
        </li>
      ))}
    </ul>
  );
}
