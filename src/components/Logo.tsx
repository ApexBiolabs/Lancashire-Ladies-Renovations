import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Lancashire Ladies Renovations — home">
      <span
        className={`flex h-10 w-10 flex-none items-center justify-center border font-serif text-[1.05rem] italic transition-colors duration-500 ${
          light ? "border-white/60 text-white" : "border-gold text-charcoal"
        }`}
        aria-hidden
      >
        LL
      </span>
      <span className="leading-none">
        <span className={`block font-serif text-[1.3rem] tracking-tight transition-colors duration-500 ${light ? "text-white" : "text-charcoal"}`}>
          Lancashire Ladies
        </span>
        <span className={`mt-1 block text-[0.6rem] uppercase tracking-[0.32em] transition-colors duration-500 ${light ? "text-white/75" : "text-gold-dark"}`}>
          Renovations
        </span>
      </span>
    </Link>
  );
}
