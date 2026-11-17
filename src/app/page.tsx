import Link from "next/link";
import { seo, site } from "@/content/site";
import { images } from "@/content/images";
import { hero, pillars, process, whyLaura } from "@/content/home";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { homeFaqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/Reveal";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Button, Eyebrow, Icon, SectionHeading, Arrow } from "@/components/ui";
import { CtaBand, FaqList, JsonLd, ProcessSteps, faqJsonLd } from "@/components/sections";

export const metadata = pageMeta({ ...seo.home, path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* 1 — HERO */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-charcoal">
        <SmartImage src={images.heroKitchen.src} alt={images.heroKitchen.alt} fill priority sizes="100vw" className="hero-zoom -z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/30" aria-hidden />
        <div className="container-x pb-20 pt-40 md:pb-28">
          <div className="max-w-4xl">
            <Eyebrow className="!text-gold">{hero.eyebrow}</Eyebrow>
            <h1 className="mt-7 text-[3rem] leading-[1.02] text-white sm:text-7xl lg:text-[5.6rem]">
              Beautiful Renovations.
              <br />
              <em className="text-beige">Expertly Managed.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{hero.text}</p>
            <div className="mt-11 flex flex-wrap gap-4">
              <Button href={hero.primary.href} variant="light">{hero.primary.label}</Button>
              <Button href={hero.secondary.href} variant="ghost-light">{hero.secondary.label}</Button>
            </div>
          </div>
          <p className="mt-16 hidden border-t border-white/20 pt-6 font-serif text-xl italic text-white/70 md:block">{site.tagline}</p>
        </div>
      </section>

      {/* 2 — INTRODUCTION */}
      <section className="py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Welcome</Eyebrow>
            <h2 className="mt-6 text-4xl leading-[1.12] md:text-[3.3rem]">
              Renovating your home should be exciting — not overwhelming. We make sure it&rsquo;s the former.
            </h2>
          </Reveal>
          <Reveal className="prose-llr text-[1.05rem] text-stone lg:col-span-5 lg:pt-14" delay={120}>
            <p>
              Lancashire Ladies Renovations is a renovation consultancy and project management service founded by Laura — a professional project manager who has personally taken four homes from first idea to finished renovation.
            </p>
            <p>
              Whether you need a clear plan before you begin, or someone to manage the whole project on your behalf, we bring structure, honesty and a trusted network of tradespeople — so you can enjoy the transformation without carrying the stress.
            </p>
          </Reveal>
        </div>

        <div className="container-x mt-20 grid gap-px bg-beige md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="bg-ivory p-8 md:p-10">
              <p className="font-serif text-3xl italic text-gold-dark">{p.title}</p>
              <p className="mt-4 leading-relaxed text-stone">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3 — SERVICES */}
      <section className="bg-white py-24 md:py-36" aria-labelledby="services-title">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="How we help" title={<span id="services-title">Three ways to work with us</span>} />
            <Button href="/services" variant="text">View all services</Button>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 110}>
                <Link href={`/services#${s.slug}`} className="group block h-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-beige">
                    <SmartImage src={s.image.src} alt={s.image.alt} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                    {s.flagship && (
                      <span className="absolute left-5 top-5 bg-ivory px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-charcoal">Flagship service</span>
                    )}
                    <span className="absolute bottom-5 left-6 font-serif text-6xl italic text-white/90">{s.number}</span>
                  </div>
                  <div className="pt-7">
                    <h3 className="text-[1.75rem] leading-tight transition-colors group-hover:text-gold-dark">{s.shortTitle}</h3>
                    <p className="mt-3 leading-relaxed text-stone">{s.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.16em] text-charcoal">
                      Learn more <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — WHY LAURA */}
      <section className="py-24 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* TODO: replace with a professional photograph of Laura at /public/images/laura.jpg */}
              <PhotoPlaceholder label="Photograph of Laura" sub="Add /public/images/laura.jpg" />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden bg-charcoal px-8 py-7 text-ivory md:block lg:-right-10">
              <p className="font-serif text-7xl leading-none text-gold">4</p>
              <p className="mt-2 max-w-[10rem] text-xs uppercase tracking-[0.18em] text-ivory/75">Complete home renovations, personally managed</p>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <SectionHeading
                eyebrow="Why choose Laura?"
                title="Experience you can lean on."
                intro="Laura has been where you are. She's planned the budgets, sourced the trades, negotiated the quotes and lived through the dust — four times over. Now she brings that experience to your home."
              />
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {whyLaura.map((w, i) => (
                <Reveal key={w.title} delay={i * 90}>
                  <span className="block h-px w-10 bg-gold" />
                  <h3 className="mt-5 text-2xl">{w.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{w.body}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-12">
              <Button href="/about" variant="outline">Meet Laura</Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 — PROCESS */}
      <section className="bg-beige/50 py-24 md:py-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="How it works"
            title="A clear process, from first conversation to handover."
            intro="Every project is tailored, but the shape is always the same: listen carefully, plan properly, manage closely and finish well."
          />
          <div className="mt-16">
            <ProcessSteps steps={process} />
          </div>
        </div>
      </section>

      {/* 6 — PROJECTS */}
      <section className="py-24 md:py-36">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Previous renovations"
              title="Four homes. Four transformations."
              intro="Laura's own renovations — three sold, one she now calls home. Full case studies with before-and-after photography are coming soon."
            />
            <Button href="/projects" variant="text">View projects</Button>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link href={`/projects/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {p.after[0] ? (
                      <SmartImage src={p.after[0].src} alt={p.after[0].alt} fill sizes="25vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                    ) : (
                      <PhotoPlaceholder label="Awaiting photographs" tone={i % 2 ? "sage" : "beige"} />
                    )}
                  </div>
                  <p className="eyebrow mt-5">{p.type}</p>
                  <h3 className="mt-2 text-2xl transition-colors group-hover:text-gold-dark">{p.title}</h3>
                  <p className="mt-1 text-sm text-stone">{p.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — INVESTORS */}
      <section className="relative isolate overflow-hidden bg-charcoal py-24 text-ivory md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              light
              eyebrow="For property investors"
              title={<>You find the opportunity.<br /><em className="text-gold">We manage the transformation.</em></>}
              intro="Hands-off refurbishment management for investors and developers. You make the acquisition and investment decisions; we deliver the agreed renovation — on budget, on schedule and with regular photographic reporting."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                { icon: "pound", t: "Budgets prepared and spend monitored" },
                { icon: "people", t: "Contractors sourced and coordinated" },
                { icon: "calendar", t: "Refurbishment schedules managed" },
                { icon: "camera", t: "Regular photographic updates" },
              ].map((x) => (
                <li key={x.t} className="flex items-center gap-4 text-sm text-ivory/80">
                  <Icon name={x.icon} className="h-7 w-7 flex-none text-gold" />
                  {x.t}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="/investors" variant="light">Investor partnerships</Button>
              <Button href="/investors#enquire" variant="ghost-light">Discuss an opportunity</Button>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
              <SmartImage src={images.inProgress.src} alt={images.inProgress.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-3 text-xs text-ivory/40">Illustrative image</p>
          </Reveal>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="py-24 md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
            <p className="mt-6 leading-relaxed text-stone">
              Can&rsquo;t see your question? <Link href="/contact" className="text-charcoal underline decoration-gold underline-offset-4">Get in touch</Link> — we&rsquo;re always happy to talk things through.
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={homeFaqs} />
          </div>
        </div>
      </section>

      {/* 9 — CTA */}
      <CtaBand
        title={<>Ready to talk about <em className="text-gold">your</em> renovation?</>}
        text="Tell us what you're planning. We'll listen, give you honest advice and explain exactly how we could help — with no obligation."
        primary={{ label: "Discuss Your Renovation", href: "/contact" }}
        secondary={{ label: "Explore Our Services", href: "/services" }}
        image={images.livingCalm}
      />
    </>
  );
}
