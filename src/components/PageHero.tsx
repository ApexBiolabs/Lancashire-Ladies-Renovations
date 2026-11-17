import type { ReactNode } from "react";
import type { SiteImage } from "@/content/images";
import { SmartImage } from "./SmartImage";
import { Eyebrow } from "./ui";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: SiteImage;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`relative isolate flex items-end overflow-hidden bg-charcoal ${compact ? "min-h-[52vh]" : "min-h-[72vh]"}`}>
      {image && (
        <>
          <SmartImage src={image.src} alt="" fill priority sizes="100vw" className="hero-zoom -z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/35" aria-hidden />
        </>
      )}
      <div className="container-x pb-16 pt-40 md:pb-24">
        <Eyebrow className="!text-gold">{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-[2.7rem] leading-[1.04] text-white sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && <div className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</div>}
        {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  );
}
