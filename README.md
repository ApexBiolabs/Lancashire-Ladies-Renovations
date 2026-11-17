# Lancashire Ladies Renovations — Website

A multi-page marketing website for Lancashire Ladies Renovations, built with **Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS 4**. It's set up to deploy to Vercel.

---

## 1. Quick start (local)

Requirements: **Node.js 20+**

```bash
npm install
cp .env.example .env.local   # then fill in values (see section 3)
npm run dev                  # http://localhost:3000
```

Production build check:

```bash
npm run build && npm start
```

---

## 2. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In [vercel.com](https://vercel.com), click **Add New → Project** and import the repo. Vercel detects Next.js automatically.
3. Under **Settings → Environment Variables**, add the variables from `.env.example` (section 3).
4. Click **Deploy**.
5. Add your domain under **Settings → Domains**, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

---

## 3. What you need to configure

| Feature | Status out of the box | What to do |
|---|---|---|
| **Enquiry forms** | Validation and spam checks work. **Emails are not sent until configured.** Until then the form tells visitors it isn't connected yet and logs the enquiry on the server. | Create a free [Resend](https://resend.com) account, verify your domain, then set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL`. |
| **Spam protection** | Honeypot field, 3-second timing check and per-IP rate limiting are always on. | Optional: add Cloudflare Turnstile keys (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) for a stronger check. |
| **Analytics** | Off. | Set `NEXT_PUBLIC_GA_ID` (GA4). The cookie consent banner then appears automatically, and GA loads **only after the visitor accepts**. Form submissions fire a `generate_lead` event. |
| **Phone / email / socials** | Hidden (placeholders on the contact page). | Edit `src/content/site.ts`. |
| **Laura's photo** | Labelled placeholder. | Add `public/images/laura.jpg` and swap the `PhotoPlaceholder` in `src/app/about/page.tsx` and `src/app/page.tsx` for `<SmartImage src="/images/laura.jpg" … />`. |
| **Project case studies** | Four placeholders, clearly labelled as awaiting details. They're set to `noindex` and left out of the sitemap. | See section 4. |
| **Privacy policy** | Sensible UK GDPR starting template. | Fill in the `legal` block in `src/content/site.ts` and have the policy reviewed. |

---

## 4. Editing content

All editable content lives in **`src/content/`**:

| File | Controls |
|---|---|
| `site.ts` | Company name, tagline, contact details, social links, legal details, navigation, per-page SEO titles and descriptions |
| `home.ts` | Hero text, Trust/Confidence/Convenience pillars, "Why Laura", process steps (homeowner and investor) |
| `services.ts` | The three services, what each includes, CTAs, investor commercial structures and disclaimer |
| `projects.ts` | Portfolio case studies |
| `faqs.ts` | Homepage and investor FAQs (also output as FAQ structured data for Google) |
| `images.ts` | Atmospheric stock photography (Unsplash licence) used for mood only, never presented as Laura's work |

### Publishing a project case study

1. Put photos in `public/images/projects/renovation-one/` (for example `before-1.jpg`, `after-1.jpg`, `gallery-1.jpg`).
2. In `src/content/projects.ts`, fill in the text fields and add the images:
   ```ts
   before: [{ src: "/images/projects/renovation-one/before-1.jpg", alt: "Kitchen before renovation" }],
   after:  [{ src: "/images/projects/renovation-one/after-1.jpg",  alt: "Finished kitchen" }],
   gallery: [ … ],
   ```
3. Only add `budget` and `timescale` if they're verified.
4. Set `status: "published"`. The before/after slider, cards, sitemap and search indexing switch over automatically.

### Replacing stock photography

Put your own images in `public/images/` and change the `src` values in `src/content/images.ts` (for example `src: "/images/hero.jpg"`). If any image fails to load, the site shows a neutral on-brand panel instead of a broken image.

---

## 5. Project structure

```
src/
  app/
    page.tsx                 Home
    services/page.tsx        Our Services
    about/page.tsx           About Laura
    projects/page.tsx        Portfolio
    projects/[slug]/page.tsx Case study template
    investors/page.tsx       Property investors landing page
    contact/page.tsx         Contact (homeowner and investor forms)
    privacy/page.tsx         Privacy and cookie policy
    api/enquiry/route.ts     Form endpoint (validation, spam checks, email via Resend)
    sitemap.ts, robots.ts, opengraph-image.tsx
  components/                Header, Footer, forms, before/after slider, cookie consent, UI primitives
  content/                   Editable content (see section 4)
  lib/                       Shared form validation (zod) and SEO helpers
```

## 6. Built-in SEO and accessibility

- Unique title, description, canonical URL and Open Graph tags on every page
- `HomeAndConstructionBusiness` structured data with Lancashire service areas, plus FAQ and Service schema
- Auto-generated `sitemap.xml`, `robots.txt` and social share image
- Local keywords used naturally in the copy (for example "renovation project manager Lancashire" and "property refurbishment management")
- Semantic HTML, skip link, keyboard-accessible menu, tabs, FAQ accordions and before/after slider, labelled form errors, visible focus states, and reduced-motion support
- Self-hosted fonts (Cormorant Garamond and DM Sans), so no Google Fonts requests or extra cookies
