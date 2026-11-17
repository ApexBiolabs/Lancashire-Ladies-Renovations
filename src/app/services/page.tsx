import { seo } from "@/content/site";
import { images } from "@/content/images";
import { services, investorStructures, investorStructuresDisclaimer } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/Reveal";
import { Button, CheckList, Eyebrow } from "@/components/ui";
import { CtaBand, JsonLd } from "@/components/sections";
import { site } from "@/content/site";

export const metadata = pageMeta({ ...seo.services, path: "/services" });

export default function ServicesPage() {
  const serviceLd = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.summary,
    provider: { "@id": `${site.url}/#business` },
    areaServed: "Lancashire",
  }));

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHero
        eyebrow="Our services"
        title={<>Guidance, management <em className="text-beige">&amp; partnership.</em></>}
        intro="Whether you need a clear plan, a project manager in your corner, or a delivery partner for an investment property, every service is shaped around your project."
        image={images.woodCeiling}
      />

      {/* Jump nav */}
      <nav aria-label="Services" className="sticky top-20 z-30 border-b border-beige bg-ivory/95 backdrop-blur">
        <ul className="container-x flex gap-8 overflow-x-auto py-4 text-[0.78rem] uppercase tracking-[0.14em] [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.slug} className="flex-none">
              <a href={`#${s.slug}`} className="text-stone transition-colors hover:text-charcoal">
                <span className="text-gold-dark">{s.number}</span>&nbsp; {s.shortTitle}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((s, idx) => {
        const reversed = idx % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={`scroll-mt-36 py-24 md:py-32 ${idx % 2 ? "bg-white" : ""}`}>
            <div className="container-x">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
                <Reveal className={`lg:col-span-5 ${reversed ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-40">
                    <SmartImage src={s.image.src} alt={s.image.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
                    <span className="absolute bottom-6 left-6 font-serif text-8xl italic leading-none text-white/90">{s.number}</span>
                  </div>
                </Reveal>

                <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
                  <Reveal>
                    <Eyebrow>{s.flagship ? "Flagship service" : `Service ${s.number}`}</Eyebrow>
                    <h2 className="mt-5 text-4xl md:text-5xl">{s.title}</h2>
                    {s.slug === "investors" && (
                      <p className="mt-5 font-serif text-2xl italic text-gold-dark md:text-3xl">You Find the Opportunity. We Manage the Transformation.</p>
                    )}
                    <p className="mt-6 text-sm uppercase tracking-[0.12em] text-sage-dark">{s.audience}</p>
                    <div className="prose-llr mt-8 text-[1.05rem] text-stone">
                      {s.intro.map((p) => <p key={p}>{p}</p>)}
                    </div>
                  </Reveal>

                  <Reveal className="mt-12 border-t border-charcoal/10 pt-10">
                    <h3 className="text-2xl">What&rsquo;s included</h3>
                    <p className="mt-2 text-sm text-stone">Services can include:</p>
                    <div className="mt-6">
                      <CheckList items={s.includes} columns={2} />
                    </div>
                  </Reveal>

                  {s.idealFor && (
                    <Reveal className="mt-10 bg-beige/60 p-8">
                      <h3 className="text-xl">Ideal for</h3>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {s.idealFor.map((x) => (
                          <li key={x} className="border border-gold/40 bg-ivory px-4 py-2 text-sm">{x}</li>
                        ))}
                      </ul>
                    </Reveal>
                  )}

                  {s.slug === "investors" && (
                    <Reveal className="mt-12">
                      <h3 className="text-2xl">Commercial arrangements</h3>
                      <p className="mt-2 text-stone">Different structures may be available by agreement:</p>
                      <div className="mt-6 grid gap-px bg-beige md:grid-cols-3">
                        {investorStructures.map((o) => (
                          <div key={o.label} className="bg-ivory p-6">
                            <p className="eyebrow">{o.label}</p>
                            <p className="mt-3 font-serif text-xl leading-snug">{o.title}</p>
                            <p className="mt-3 text-sm leading-relaxed text-stone">{o.body}</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-5 text-xs leading-relaxed text-stone">{investorStructuresDisclaimer}</p>
                    </Reveal>
                  )}

                  {s.note && (
                    <Reveal className="mt-10 border-l-2 border-gold pl-6">
                      <p className="text-[0.95rem] leading-relaxed text-charcoal/80">{s.note}</p>
                    </Reveal>
                  )}

                  <Reveal className="mt-12 flex flex-wrap gap-4">
                    <Button href={s.cta.href}>{s.cta.label}</Button>
                    {s.slug === "investors" && <Button href="/investors" variant="outline">Investor page</Button>}
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand
        title={<>Not sure which service <em className="text-gold">fits?</em></>}
        text="That's completely normal. Tell us about your project and we'll recommend the right level of support — whether that's a few hours of planning or full management from start to finish."
        primary={{ label: "Discuss Your Renovation", href: "/contact" }}
        image={images.livingSofa}
      />
    </>
  );
}
