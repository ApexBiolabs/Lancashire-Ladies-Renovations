import { Suspense } from "react";
import { seo, site } from "@/content/site";
import { images } from "@/content/images";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ContactTabs } from "@/components/ContactTabs";
import { Eyebrow } from "@/components/ui";

export const metadata = pageMeta({ ...seo.contact, path: "/contact" });

export default function ContactPage() {
  const { phone, email, hours } = site.contact;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&rsquo;s talk about <em className="text-beige">your plans.</em></>}
        intro="Whether you're at the dreaming stage or ready to start, we'd love to hear from you. Choose the enquiry that suits you below."
        image={images.kitchenIsland}
        compact
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="mt-5 text-4xl">We&rsquo;re here to help.</h2>
            <p className="mt-5 leading-relaxed text-stone">
              Every enquiry is read personally by Laura. We&rsquo;ll usually reply within two working days to arrange an initial conversation.
            </p>

            <dl className="mt-10 space-y-6 border-t border-beige pt-8 text-sm">
              <div>
                <dt className="eyebrow">Telephone</dt>
                <dd className="mt-2 text-lg">
                  {phone ? <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold-dark">{phone}</a> : <span className="text-stone">[Phone number — add in content/site.ts]</span>}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-2 text-lg">
                  {email ? <a href={`mailto:${email}`} className="hover:text-gold-dark">{email}</a> : <span className="text-stone">[Email address — add in content/site.ts]</span>}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Hours</dt>
                <dd className="mt-2">{hours}</dd>
              </div>
              <div>
                <dt className="eyebrow">Area</dt>
                <dd className="mt-2 leading-relaxed">{site.serviceAreaText}</dd>
              </div>
            </dl>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <Suspense fallback={<div className="h-96" />}>
              <ContactTabs />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
