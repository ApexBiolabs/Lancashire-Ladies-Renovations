import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export function localBusinessJsonLd() {
  const { phone, email } = site.contact;
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    description:
      "Renovation project management, home renovation consultancy and property investor refurbishment management in Lancashire.",
    founder: { "@type": "Person", name: site.founder },
    areaServed: site.areaServed.map((a) => ({ "@type": "Place", name: a })),
    address: { "@type": "PostalAddress", addressRegion: "Lancashire", addressCountry: "GB" },
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [
      "Renovation project management",
      "Home renovation management",
      "Extension project management",
      "Property refurbishment management",
      "Property investor renovation management",
    ],
  };
}
