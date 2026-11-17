import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/services", "/about", "/projects", "/investors", "/contact", "/privacy"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : p === "/privacy" ? 0.3 : 0.8,
  }));
  const caseStudies = projects
    .filter((p) => p.status === "published")
    .map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: now, priority: 0.6 }));
  return [...pages, ...caseStudies];
}
