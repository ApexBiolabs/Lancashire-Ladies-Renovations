import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { images } from "@/content/images";
import { getProject, projects } from "@/content/projects";
import { pageMeta } from "@/lib/seo";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { SmartImage } from "@/components/SmartImage";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/Reveal";
import { Arrow, Eyebrow } from "@/components/ui";
import { CtaBand } from "@/components/sections";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const meta = pageMeta({
    title: `${p.title} — ${p.type} in ${p.area}`,
    description: p.summary,
    path: `/projects/${p.slug}`,
    image: p.after[0]?.src,
  });
  // Keep placeholder case studies out of search results until published.
  return p.status === "published" ? meta : { ...meta, robots: { index: false, follow: true } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const idx = projects.indexOf(p);
  const next = projects[(idx + 1) % projects.length];
  const awaiting = p.status !== "published";

  const facts = [
    { k: "Location", v: p.area },
    { k: "Type", v: p.type },
    ...(p.timescale ? [{ k: "Timescale", v: p.timescale }] : []),
    ...(p.budget ? [{ k: "Budget", v: p.budget }] : []),
  ];

  const blocks = [
    { title: "The project", body: p.description },
    { title: "Laura's role", body: p.lauraRole },
    { title: "The challenges", body: p.challenges },
    { title: "The outcome", body: [p.outcome] },
  ];

  return (
    <>
      <section className="bg-charcoal pb-16 pt-40 text-ivory md:pb-20">
        <div className="container-x">
          <Link href="/projects" className="text-xs uppercase tracking-[0.18em] text-ivory/60 hover:text-white">← All projects</Link>
          <Eyebrow className="mt-10 !text-gold">Project {String(idx + 1).padStart(2, "0")} · {p.type}</Eyebrow>
          <h1 className="mt-5 text-5xl text-white md:text-7xl">{p.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-ivory/75">{p.summary}</p>
          {awaiting && (
            <p className="mt-8 inline-block border border-gold/60 px-4 py-2 text-xs uppercase tracking-[0.16em] text-gold">
              Placeholder — awaiting real photographs &amp; details
            </p>
          )}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <BeforeAfter
              className="!aspect-[16/9]"
              before={
                p.before[0]
                  ? { src: p.before[p.comparison?.before ?? 0].src, alt: p.before[p.comparison?.before ?? 0].alt }
                  : { placeholder: <PhotoPlaceholder label="Before photograph" sub="Awaiting" /> }
              }
              after={
                p.after[0]
                  ? { src: p.after[p.comparison?.after ?? 0].src, alt: p.after[p.comparison?.after ?? 0].alt }
                  : { placeholder: <PhotoPlaceholder label="After photograph" sub="Awaiting" tone="sage" /> }
              }
            />
          </Reveal>

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <dl className="divide-y divide-beige border-y border-beige lg:sticky lg:top-32">
                {facts.map((f) => (
                  <div key={f.k} className="flex justify-between gap-4 py-4 text-sm">
                    <dt className="uppercase tracking-[0.14em] text-stone">{f.k}</dt>
                    <dd className="text-right">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
            <div className="space-y-14 lg:col-span-7 lg:col-start-6">
              {blocks.map((b) => (
                <Reveal key={b.title}>
                  <h2 className="text-3xl md:text-4xl">{b.title}</h2>
                  <div className={`prose-llr mt-5 text-[1.05rem] ${awaiting ? "italic text-stone/80" : "text-stone"}`}>
                    {b.body.map((x) => <p key={x}>{x}</p>)}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-24">
            <h2 className="text-3xl md:text-4xl">Gallery</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {p.gallery.length
                ? p.gallery.map((g, i) => (
                    <div key={g.src} className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                      <SmartImage src={g.src} alt={g.alt} fill sizes="33vw" className="object-cover transition-transform duration-1000 hover:scale-105" />
                    </div>
                  ))
                : Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                      <PhotoPlaceholder label="Photo awaiting" tone={i % 2 ? "sage" : "beige"} />
                    </div>
                  ))}
            </div>
          </div>

          <Link href={`/projects/${next.slug}`} className="group mt-24 flex items-center justify-between border-t border-charcoal/15 pt-10">
            <span>
              <span className="eyebrow">Next project</span>
              <span className="mt-2 block font-serif text-4xl transition-colors group-hover:text-gold-dark">{next.title}</span>
            </span>
            <Arrow className="h-4 w-10 text-gold-dark" />
          </Link>
        </div>
      </section>

      <CtaBand
        title={<>Planning something <em className="text-gold">similar?</em></>}
        primary={{ label: "Discuss Your Renovation", href: "/contact" }}
        image={images.livingCalm}
      />
    </>
  );
}
