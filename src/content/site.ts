/**
 * ------------------------------------------------------------------
 *  SITE SETTINGS — edit this file to update company-wide details.
 *  Anything marked TODO is a placeholder that must be replaced
 *  before launch. Placeholders are hidden or flagged on the site.
 * ------------------------------------------------------------------
 */

type SiteSettings = {
  name: string; shortName: string; tagline: string; founder: string; url: string; region: string;
  areaServed: string[]; serviceAreaText: string;
  contact: { phone: string; email: string; hours: string };
  social: { instagram: string; facebook: string; linkedin: string };
  legal: { tradingName: string; companyNumber: string; icoNumber: string; privacyContactEmail: string; lastUpdated: string };
};

export const site: SiteSettings = {
  name: "Lancashire Ladies Renovations",
  shortName: "LLR",
  tagline: "Your Home. Your Vision. Someone in Your Corner.",
  founder: "Laura",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.lancashireladiesrenovations.co.uk",
  region: "Lancashire",
  areaServed: ["Lancashire", "Preston", "Blackburn", "Lancaster", "Chorley", "Ribble Valley", "Fylde Coast", "Burnley", "South Ribble"],
  serviceAreaText:
    "Based in Lancashire, working with homeowners and investors across the county and surrounding areas.",

  contact: {
    // TODO: replace with real details. Empty strings are hidden automatically.
    phone: "", // e.g. "07123 456789"
    email: "", // e.g. "laura@lancashireladiesrenovations.co.uk"
    hours: "Monday to Friday, 9am – 5:30pm",
  },

  social: {
    // TODO: add full profile URLs. Empty strings are hidden automatically.
    instagram: "",
    facebook: "",
    linkedin: "",
  },

  // Legal details for the privacy policy. TODO: confirm before launch.
  legal: {
    tradingName: "Lancashire Ladies Renovations",
    companyNumber: "", // if a limited company
    icoNumber: "", // ICO registration number if applicable
    privacyContactEmail: "", // falls back to contact.email
    lastUpdated: "17 November 2026",
  },
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "About Laura", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Property Investors", href: "/investors" },
  { label: "Contact", href: "/contact" },
] as const;

/** Per-page SEO. Titles are combined with the site name automatically. */
export const seo = {
  home: {
    title: "Renovation Project Manager in Lancashire",
    description:
      "Lancashire Ladies Renovations offers home renovation consultancy and extension project management across Lancashire. Trusted tradespeople, clear budgets and someone in your corner from first idea to handover.",
  },
  services: {
    title: "Renovation Planning, Project Management & Investor Services",
    description:
      "Renovation planning and design support, complete renovation and extension project management, and property refurbishment management for investors across Lancashire.",
  },
  about: {
    title: "About Laura — Female Renovation Project Manager",
    description:
      "Meet Laura, the project manager behind Lancashire Ladies Renovations. Four complete home renovations managed personally, a trusted network of trades and a commitment to transparency.",
  },
  projects: {
    title: "Renovation Projects & Case Studies",
    description:
      "Home renovations managed by Laura in Lancashire — before-and-after case studies covering the work, the challenges and the finished result.",
  },
  investors: {
    title: "Property Investor Renovation Management in Lancashire",
    description:
      "Hands-off refurbishment management for property investors and developers in Lancashire. Budgets, contractors, schedules and photographic reporting — managed for you.",
  },
  contact: {
    title: "Contact — Discuss Your Renovation",
    description:
      "Get in touch with Lancashire Ladies Renovations to discuss a home renovation, an extension or a property investor partnership in Lancashire.",
  },
  privacy: {
    title: "Privacy & Cookie Policy",
    description: "How Lancashire Ladies Renovations collects, uses and protects your personal information.",
  },
} as const;
