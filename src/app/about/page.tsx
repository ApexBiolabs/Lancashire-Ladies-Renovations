import { seo } from "@/content/site";
import { images } from "@/content/images";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Icon, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/sections";

export const metadata = pageMeta({ ...seo.about, path: "/about" });

const values = [
  {
    icon: "eye",
    title: "Transparency",
    body: "Clear scopes, honest costs and no surprises hidden in the small print. If something changes, you'll hear about it straight away — along with your options.",
  },
  {
    icon: "shield",
    title: "Your interests first",
    body: "Laura works for you, not the contractors. Her job is to make sure the work is done properly, at a fair price, and in the order that makes sense.",
  },
  {
    icon: "people",
    title: "Confidence for everyone",
    body: "No question is too basic. You'll understand what's happening and why, so you can make decisions about your home with confidence.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Laura"
        title={<>Real Experience. Genuine Passion. <em className="text-beige">Renovations With Confidence.</em></>}
        image={images.livingCalm}
      />

      {/* Story */}
      <section className="py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-32">
              {/* TODO: replace with <SmartImage src="/images/laura.jpg" ... /> once Laura's portrait is available */}
              <PhotoPlaceholder label="Professional photograph of Laura" sub="Add /public/images/laura.jpg" />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow>Hello, I&rsquo;m Laura</Eyebrow>
              <p className="mt-7 font-serif text-3xl leading-snug md:text-[2.4rem] md:leading-[1.2]">
                I started Lancashire Ladies Renovations because I know how it feels to stand in a half-finished room, wondering who&rsquo;s turning up tomorrow — and whether the budget will hold.
              </p>
            </Reveal>

            <Reveal className="prose-llr mt-10 text-[1.05rem] text-stone">
              <p>
                By profession, I&rsquo;m a project manager. I&rsquo;ve spent my career keeping complex work on track — planning schedules, managing budgets, coordinating people and making sure things get finished properly.
              </p>
              <p>
                Alongside that, I&rsquo;ve personally renovated four properties. I sold three of them, and I live in the fourth. On every one, I found and coordinated the tradespeople, negotiated quotes, managed the budget, organised the schedule and oversaw the work from the first day to the last.
              </p>
              <p>
                Along the way I&rsquo;ve built a network of builders, electricians, plumbers and other trades I genuinely trust — people I&rsquo;ve worked alongside, who do good work and turn up when they say they will.
              </p>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="text-3xl md:text-4xl">Why I do this</h2>
              <div className="prose-llr mt-6 text-[1.05rem] text-stone">
                <p>
                  I love beautiful homes, and I love seeing a tired property become somewhere people are proud to live. But I&rsquo;ve also seen how stressful renovations can be — and how easily money can be lost through poor planning, unclear quotes or work done in the wrong order.
                </p>
                <p>
                  I particularly want to support women who feel overwhelmed, intimidated or unsure when dealing with contractors. Too many people are made to feel they should already know the answers. You shouldn&rsquo;t have to — that&rsquo;s what I&rsquo;m here for.
                </p>
                <p>
                  That said, everyone is welcome. Couples, families, first-time renovators and seasoned property investors all deserve the same thing: to feel confident and informed throughout their renovation, with someone experienced firmly in their corner.
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-14 grid grid-cols-3 gap-px bg-beige text-center">
              {[
                { n: "4", l: "Renovations managed" },
                { n: "3", l: "Sold on completion" },
                { n: "1", l: "Home I live in today" },
              ].map((s) => (
                <div key={s.l} className="bg-ivory px-3 py-8">
                  <p className="font-serif text-5xl text-gold-dark md:text-6xl">{s.n}</p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-stone">{s.l}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="How I work" title="What you can expect from me." align="center" />
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100} className="text-center">
                <Icon name={v.icon} className="mx-auto h-10 w-10 text-gold-dark" />
                <h3 className="mt-6 text-2xl">{v.title}</h3>
                <p className="mx-auto mt-4 max-w-sm leading-relaxed text-stone">{v.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-16 max-w-3xl border border-beige bg-ivory p-8 text-center text-sm leading-relaxed text-stone">
            A note on qualifications: I&rsquo;m an experienced project manager and renovator, not an architect, structural engineer or registered interior designer. Where your project needs specialist designs, calculations or approvals, I&rsquo;ll help you find and work with suitably qualified professionals.
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={<>Let&rsquo;s talk about <em className="text-gold">your home.</em></>}
        text="An initial conversation is the best way to find out whether we're the right fit. No pressure, no jargon — just honest advice."
        primary={{ label: "Discuss Your Renovation", href: "/contact" }}
        secondary={{ label: "Explore Our Services", href: "/services" }}
        image={images.kitchenIsland}
      />
    </>
  );
}
