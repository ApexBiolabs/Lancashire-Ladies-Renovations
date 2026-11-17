import type { ReactNode } from "react";
import type { Faq } from "@/content/faqs";
import type { SiteImage } from "@/content/images";
import { SmartImage } from "./SmartImage";
import { Reveal } from "./Reveal";
import { Button, SectionHeading } from "./ui";

export function ProcessSteps({ steps }: { steps: { step: string; title: string; body: string }[] }) {
  return (
    <ol className="grid gap-px overflow-hidden bg-beige md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.step} delay={i * 90} className="group relative bg-ivory p-8 transition-colors duration-500 hover:bg-white lg:p-10">
          <span className="font-serif text-6xl italic text-gold/70 transition-colors duration-500 group-hover:text-gold">{s.step}</span>
          <h3 className="mt-8 text-2xl">{s.title}</h3>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-stone">{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {faqs.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left">
            <span className="font-serif text-[1.4rem] leading-snug md:text-2xl">{f.q}</span>
            <span className="relative h-4 w-4 flex-none" aria-hidden>
              <span className="absolute left-0 top-1/2 h-px w-4 bg-gold-dark" />
              <span className="absolute left-1/2 top-0 h-4 w-px bg-gold-dark transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <p className="max-w-3xl pb-7 pr-10 leading-relaxed text-stone">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function CtaBand({
  eyebrow = "Start the conversation",
  title,
  text,
  primary,
  secondary,
  image,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  image: SiteImage;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal py-28 md:py-36">
      <SmartImage src={image.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/40" aria-hidden />
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} intro={text} light />
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={primary.href} variant="light">{primary.label}</Button>
            {secondary && <Button href={secondary.href} variant="ghost-light">{secondary.label}</Button>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
