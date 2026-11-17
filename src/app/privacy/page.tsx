import { seo, site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";

export const metadata = pageMeta({ ...seo.privacy, path: "/privacy" });

/**
 * A sensible starting privacy & cookie policy for a UK sole trader /
 * small company. Have it reviewed before launch — this is not legal advice.
 */
export default function PrivacyPage() {
  const contactEmail = site.legal.privacyContactEmail || site.contact.email || "[privacy contact email]";
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy & Cookie Policy" compact />
      <section className="py-20 md:py-28">
        <article className="container-x max-w-3xl space-y-10 leading-relaxed text-stone [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:text-charcoal [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-3 [&_ul]:space-y-1.5">
          <p className="text-sm">Last updated: {site.legal.lastUpdated}</p>

          <div>
            <h2>Who we are</h2>
            <p>
              {site.legal.tradingName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides renovation consultancy and project management services in Lancashire, England. We are the data controller for personal information collected through this website.
              {site.legal.companyNumber && ` Registered company number: ${site.legal.companyNumber}.`}
              {site.legal.icoNumber && ` ICO registration number: ${site.legal.icoNumber}.`}
            </p>
            <p>If you have any questions about this policy or your information, please contact us at {contactEmail}.</p>
          </div>

          <div>
            <h2>What we collect</h2>
            <p>When you submit an enquiry, we collect the details you provide, which may include:</p>
            <ul>
              <li>Your name, email address and telephone number</li>
              <li>Your company name (investor enquiries)</li>
              <li>Your property postcode or location</li>
              <li>Details about your project, budget, timescales and property</li>
            </ul>
            <p>If you accept analytics cookies, we also collect anonymous information about how you use the website (see Cookies below).</p>
          </div>

          <div>
            <h2>How we use it</h2>
            <ul>
              <li>To respond to your enquiry and discuss your project — lawful basis: your consent and taking steps at your request before entering into a contract.</li>
              <li>To provide our services if you become a client — lawful basis: performance of a contract.</li>
              <li>To keep records required for legal, tax and accounting purposes — lawful basis: legal obligation.</li>
              <li>To understand and improve how our website is used — lawful basis: your consent (analytics cookies only).</li>
            </ul>
            <p>We will never sell your information or use it for unrelated marketing.</p>
          </div>

          <div>
            <h2>Who we share it with</h2>
            <p>We only share your information where necessary, for example:</p>
            <ul>
              <li>Our website host (Vercel) and email delivery provider (Resend), which process data on our behalf</li>
              <li>Google Analytics, only if you have accepted analytics cookies</li>
              <li>Tradespeople or professionals involved in your project, only with your agreement</li>
            </ul>
            <p>Some providers may process data outside the UK. Where they do, appropriate safeguards such as the UK International Data Transfer Agreement or adequacy regulations are in place.</p>
          </div>

          <div>
            <h2>How long we keep it</h2>
            <p>
              Enquiries that don&rsquo;t lead to work are kept for up to 12 months and then deleted. Client records are kept for up to 6 years after a project ends to meet legal and accounting requirements.
            </p>
          </div>

          <div>
            <h2>Your rights</h2>
            <p>
              Under UK data protection law you have the right to access, correct, delete or restrict the use of your personal information, to object to processing, to data portability, and to withdraw consent at any time. To exercise any of these rights, email {contactEmail}.
            </p>
            <p>
              If you&rsquo;re unhappy with how we&rsquo;ve handled your information, you can complain to the Information Commissioner&rsquo;s Office at <a href="https://ico.org.uk" className="text-charcoal underline decoration-gold underline-offset-4" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
            </p>
          </div>

          <div id="cookies" className="scroll-mt-28">
            <h2>Cookies</h2>
            <p>We use the minimum necessary. You can change your choice at any time using the &ldquo;Cookie settings&rdquo; link in the footer.</p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-charcoal/20 text-charcoal">
                  <tr><th className="py-3 pr-4 font-medium">Name</th><th className="py-3 pr-4 font-medium">Type</th><th className="py-3 font-medium">Purpose</th></tr>
                </thead>
                <tbody className="divide-y divide-beige">
                  <tr><td className="py-3 pr-4">llr-cookie-consent-v1</td><td className="py-3 pr-4">Strictly necessary (local storage)</td><td className="py-3">Remembers your cookie choice.</td></tr>
                  <tr><td className="py-3 pr-4">_ga, _ga_*</td><td className="py-3 pr-4">Analytics — only with consent</td><td className="py-3">Google Analytics: anonymous usage statistics. Expires after up to 2 years.</td></tr>
                  <tr><td className="py-3 pr-4">Cloudflare Turnstile</td><td className="py-3 pr-4">Strictly necessary (security)</td><td className="py-3">Protects our enquiry forms from spam, if enabled.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="border-t border-beige pt-6 text-xs">
            This policy is provided as a starting template and should be reviewed to make sure it reflects how the business actually handles personal data.
          </p>
        </article>
      </section>
    </>
  );
}
