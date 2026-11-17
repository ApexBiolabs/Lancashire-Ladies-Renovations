/**
 * ------------------------------------------------------------------
 *  PROJECT PORTFOLIO
 *  Four placeholder entries representing Laura's four renovations.
 *
 *  HOW TO PUBLISH A PROJECT
 *  1. Add photos to /public/images/projects/<slug>/ (e.g. before-1.jpg)
 *  2. Fill in the fields below and add image paths to `before`,
 *     `after` and `gallery`.
 *  3. Set `status: "published"`. While status is "awaiting-details"
 *     the site shows a clearly labelled placeholder.
 *
 *  Only add a budget or timescale if it is verified.
 * ------------------------------------------------------------------
 */

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  status: "awaiting-details" | "published";
  title: string;
  area: string;
  type: string;
  summary: string;
  description: string[];
  lauraRole: string[];
  challenges: string[];
  outcome: string;
  budget?: string; // only if verified
  timescale?: string; // only if verified
  before: ProjectImage[];
  after: ProjectImage[];
  gallery: ProjectImage[];
  /** Pair used for the before/after slider (index into before/after) */
  comparison?: { before: number; after: number };
};

const placeholderCopy = {
  description: [
    "Full project description awaiting Laura's details. This section will describe the property as it was, what the renovation set out to achieve and the scope of the work carried out.",
  ],
  lauraRole: [
    "Details awaiting — e.g. sourcing and coordinating trades, managing the budget, scheduling works and overseeing the project through to completion.",
  ],
  challenges: [
    "Details awaiting — the practical challenges that arose during the project and how they were resolved.",
  ],
  outcome: "Details awaiting — the finished result and what changed for the property.",
};

export const projects: Project[] = [
  {
    slug: "renovation-one",
    status: "awaiting-details",
    title: "Renovation One",
    area: "Lancashire",
    type: "Complete home renovation",
    summary: "The first of Laura's four complete renovations. Sold on completion.",
    ...placeholderCopy,
    before: [],
    after: [],
    gallery: [],
  },
  {
    slug: "renovation-two",
    status: "awaiting-details",
    title: "Renovation Two",
    area: "Lancashire",
    type: "Complete home renovation",
    summary: "The second of Laura's four complete renovations. Sold on completion.",
    ...placeholderCopy,
    before: [],
    after: [],
    gallery: [],
  },
  {
    slug: "renovation-three",
    status: "awaiting-details",
    title: "Renovation Three",
    area: "Lancashire",
    type: "Complete home renovation",
    summary: "The third of Laura's four complete renovations. Sold on completion.",
    ...placeholderCopy,
    before: [],
    after: [],
    gallery: [],
  },
  {
    slug: "renovation-four",
    status: "awaiting-details",
    title: "Renovation Four",
    area: "Lancashire",
    type: "Complete home renovation",
    summary: "Laura's fourth renovation — and the home she lives in today.",
    ...placeholderCopy,
    before: [],
    after: [],
    gallery: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
