import Link from "next/link";
import { seo } from "@/content/site";
import { images } from "@/content/images";
import { projects } from "@/content/projects";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { SmartImage } from "@/components/SmartImage";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/Reveal";
import { Arrow, Eyebrow } from "@/components/ui";
import { CtaBand } from "@/components/sections";

export const metadata = pageMeta({ ...seo.projects, path: "/projects" });

export default function ProjectsPage() {
  const featured = projects.find((p) => p.status === "published" && p.before.length && p.after.length);

  return (
    <>
      <PageHero
        eyebrow="Our projects"
        title={<>Four homes, <em className="text-beige">transformed.</em></>}
        intro="Laura's own renovations — each one planned, budgeted and managed personally from start to finish. Three were sold on completion; the fourth is home."
        image={images.kitchenDining}
        compact
      />

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-16 max-w-3xl border border-gold/50 bg-white px-6 py-5 text-center text-sm leading-relaxed text-stone">
            <strong className="font-medium text-charcoal">Case studies coming soon.</strong> Each project below is awaiting its real photographs and details. We only show genuine photography of Laura&rsquo;s work — never stock images.
          </Reveal>

          {/* Before / after showcase */}
          <Reveal className="mb-24 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <BeforeAfter
                before={
                  featured
                    ? { src: featured.before[featured.comparison?.before ?? 0].src, alt: featured.before[0].alt }
                    : { placeholder: <PhotoPlaceholder label="Before photograph" sub="Awaiting real project photos" /> }
                }
                after={
                  featured
                    ? { src: featured.after[featured.comparison?.after ?? 0].src, alt: featured.after[0].alt }
                    : { placeholder: <PhotoPlaceholder label="After photograph" sub="Awaiting real project photos" tone="sage" /> }
                }
              />
            </div>
            <div className="lg:col-span-5">
              <Eyebrow>Before &amp; after</Eyebrow>
              <h2 className="mt-5 text-4xl md:text-5xl">See the difference.</h2>
              <p className="mt-6 leading-relaxed text-stone">
                Drag the slider to compare each room before and after its renovation. Every case study includes its own comparison, along with the story behind the work, Laura&rsquo;s role and the challenges along the way.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 120}>
                <Link href={`/projects/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {p.after[0] ? (
                      <SmartImage src={p.after[0].src} alt={p.after[0].alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                    ) : (
                      <PhotoPlaceholder label="Awaiting photographs & details" tone={i % 2 ? "sage" : "beige"} />
                    )}
                    <span className="absolute left-5 top-5 bg-charcoal/85 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-white">
                      Project {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <p className="eyebrow">{p.type} · {p.area}</p>
                      <h2 className="mt-2 text-3xl transition-colors group-hover:text-gold-dark">{p.title}</h2>
                      <p className="mt-2 text-stone">{p.summary}</p>
                    </div>
                    <Arrow className="mt-3 flex-none text-gold-dark" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Could your home be <em className="text-gold">next?</em></>}
        text="Tell us about the transformation you have in mind."
        primary={{ label: "Discuss Your Renovation", href: "/contact" }}
        image={images.livingLight}
      />
    </>
  );
}
