import { seo } from "@/content/site";
import { images } from "@/content/images";
import { investorProcess } from "@/content/home";
import { services, investorStructures, investorStructuresDisclaimer } from "@/content/services";
import { investorFaqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/Reveal";
import { Button, CheckList, Eyebrow, Icon, SectionHeading } from "@/components/ui";
import { FaqList, JsonLd, ProcessSteps, faqJsonLd } from "@/components/sections";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata = pageMeta({ ...seo.investors, path: "/investors" });

const investorService = services.find((s) => s.slug === "investors")!;

const audience = [
  { icon: "key", t: "Buy-to-let landlords", d: "Refurbishing a property ready for tenants without being on site every week." },
  { icon: "pound", t: "Buy-to-sell investors", d: "Renovation projects where schedule and budget control directly affect the outcome." },
  { icon: "manage", t: "Small developers", d: "Developers who want a dependable renovation delivery partner in Lancashire." },
  { icon: "calendar", t: "Remote or busy investors", d: "Investors based outside the area, or with full-time commitments elsewhere." },
];

const responsibilities = {
  investor: [
    "Identifying, assessing and acquiring the property",
    "All investment and financing decisions",
    "Providing the agreed renovation capital",
    "Approving scope, budget and significant changes",
    "Taking independent legal, tax and financial advice",
    "Final decisions on sale or letting",
  ],
  llr: [
    "Renovation assessment and budget preparation",
    "Sourcing, appointing and coordinating contractors",
    "Managing the schedule and site activity",
    "Monitoring expenditure against the agreed budget",
    "Flagging issues and options promptly",
    "Regular photographic progress reports",
  ],
};

export default function InvestorsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(investorFaqs)} />
      <PageHero
        eyebrow="Property investors & developers"
        title={<>Property Renovations Without the <em className="text-beige">Day-to-Day Management.</em></>}
        intro="A professional renovation delivery partner for investors and developers in Lancashire. You make the investment decisions — we organise, coordinate and oversee the work."
        image={images.structural}
      >
        <Button href="#enquire" variant="light">Discuss an Investor Partnership</Button>
        <Button href="#structures" variant="ghost-light">Commercial structures</Button>
      </PageHero>

      {/* Who it's for */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who it's for"
            title="Built for investors who value their time."
            intro="Refurbishment projects live or die on organisation. We take on the coordination, so you can focus on sourcing and funding your next opportunity."
          />
          <div className="mt-16 grid gap-px bg-beige sm:grid-cols-2 lg:grid-cols-4">
            {audience.map((a, i) => (
              <Reveal key={a.t} delay={i * 80} className="bg-ivory p-8">
                <Icon name={a.icon} className="h-8 w-8 text-gold-dark" />
                <h3 className="mt-6 text-2xl">{a.t}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{a.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Laura manages */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid items-start gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <SmartImage src={images.inProgress.src} alt={images.inProgress.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-3 text-xs text-stone">Illustrative image</p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <SectionHeading eyebrow="What we manage" title="The renovation, handled end to end." />
              <p className="mt-6 leading-relaxed text-stone">{investorService.intro[1]}</p>
            </Reveal>
            <Reveal className="mt-10">
              <CheckList items={investorService.includes} columns={2} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="How the partnership works" title="Four clear steps." />
          <div className="mt-14">
            <ProcessSteps steps={investorProcess} />
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="bg-charcoal py-24 text-ivory md:py-32">
        <div className="container-x">
          <SectionHeading light eyebrow="Clear responsibilities" title="Who does what." intro="Every partnership is set out in writing so both sides know exactly where responsibility sits." />
          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2">
            {[
              { h: "The investor", items: responsibilities.investor },
              { h: "Lancashire Ladies Renovations", items: responsibilities.llr },
            ].map((col) => (
              <Reveal key={col.h} className="bg-charcoal p-8 md:p-12">
                <h3 className="text-3xl text-gold">{col.h}</h3>
                <ul className="mt-8 space-y-4">
                  {col.items.map((x) => (
                    <li key={x} className="flex gap-3 text-ivory/80">
                      <Icon name="check" className="mt-1 h-4 w-4 flex-none text-gold" />
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Structures */}
      <section id="structures" className="scroll-mt-24 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Commercial structures"
            title="Flexible arrangements, agreed in writing."
            intro="Different commercial structures may be available depending on the project. Each is agreed individually."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {investorStructures.map((o, i) => (
              <Reveal key={o.label} delay={i * 100} className="flex flex-col border border-beige bg-white p-9 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(41,41,41,0.25)]">
                <p className="eyebrow">{o.label}</p>
                <h3 className="mt-4 text-3xl leading-tight">{o.title}</h3>
                <p className="mt-5 leading-relaxed text-stone">{o.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 border-l-2 border-gold bg-beige/50 p-6 text-sm leading-relaxed text-charcoal/80">
            {investorStructuresDisclaimer}
          </Reveal>
        </div>
      </section>

      {/* Reporting */}
      <section className="bg-beige/50 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <SectionHeading eyebrow="Reporting & communication" title="Always know where your project stands." />
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              { icon: "camera", t: "Photographic updates", d: "Regular progress photographs so you can see the work without visiting site." },
              { icon: "pound", t: "Spend tracking", d: "Expenditure monitored and reported against the agreed budget." },
              { icon: "calendar", t: "Programme updates", d: "Progress against the schedule, with upcoming stages flagged in advance." },
              { icon: "eye", t: "Issues raised early", d: "Unexpected problems reported promptly, with options and costs to approve." },
            ].map((x) => (
              <Reveal key={x.t}>
                <Icon name={x.icon} className="h-8 w-8 text-gold-dark" />
                <h3 className="mt-4 text-xl">{x.t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Investor questions" title="Before you get in touch" />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={investorFaqs} />
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Partnership enquiry</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl">Discuss an opportunity.</h2>
            <p className="mt-6 leading-relaxed text-stone">
              Share a few details about the property and your plans. We&rsquo;ll review them and arrange a conversation to talk through scope, budget and how we could work together.
            </p>
            <p className="mt-6 text-sm text-stone">All enquiries are treated in confidence.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm kind="investor" />
          </div>
        </div>
      </section>
    </>
  );
}
