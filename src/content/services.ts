import { images, type SiteImage } from "./images";

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  audience: string;
  summary: string;
  intro: string[];
  includes: string[];
  idealFor?: string[];
  note?: string;
  cta: { label: string; href: string };
  image: SiteImage;
  flagship?: boolean;
};

export const services: Service[] = [
  {
    slug: "planning",
    number: "01",
    title: "Renovation Planning & Design Support",
    shortTitle: "Planning & Design Support",
    audience: "For homeowners who want expert guidance before work begins",
    summary:
      "Professional guidance to shape your ideas, set a realistic budget and find the right tradespeople — without committing to full project management.",
    intro: [
      "The decisions you make before a single wall comes down shape everything that follows. This service gives you an experienced second pair of eyes at the stage where good planning saves the most time, money and stress.",
      "We'll talk through what you want to achieve, look at the options, put together a realistic budget and help you find and compare tradespeople — so you start your renovation informed, organised and confident.",
    ],
    includes: [
      "Initial renovation consultation",
      "Planning layouts and renovation concepts",
      "Budget preparation",
      "Finding suitable tradespeople",
      "Obtaining and comparing quotations",
      "Advice on renovation sequencing",
      "Helping you understand your options",
      "Interior styling and design direction",
      "A clear renovation roadmap",
    ],
    idealFor: [
      "Kitchens and bathrooms",
      "Single-room renovations",
      "Smaller projects",
      "Homeowners happy to manage the build with a solid plan",
    ],
    note:
      "Laura is not an architect, structural engineer or registered interior designer. Where your project needs architectural drawings, structural calculations, planning permission or Building Regulations approval, we'll help you engage suitably qualified professionals and coordinate with them.",
    cta: { label: "Plan Your Renovation", href: "/contact?type=homeowner&service=planning" },
    image: images.kitchenMarble,
  },
  {
    slug: "project-management",
    number: "02",
    title: "Complete Renovation & Extension Project Management",
    shortTitle: "Renovation & Extension Project Management",
    audience: "Our flagship service for substantial renovations and extensions",
    summary:
      "End-to-end coordination of your renovation or extension — contractors, budgets, schedules and site visits — with one experienced person representing your interests.",
    intro: [
      "Larger renovations and extensions involve dozens of moving parts: trades arriving in the right order, materials landing on time, budgets that need watching and decisions that can't wait. This is where most of the stress — and most of the costly mistakes — happen.",
      "Laura coordinates the work on your behalf. You stay in control of the big decisions; she handles the day-to-day organisation, keeps everyone accountable and makes sure you always know where things stand.",
    ],
    includes: [
      "Initial project consultation",
      "Budget planning and cost monitoring",
      "Contractor sourcing and coordination",
      "Comparing and negotiating quotations",
      "Developing the renovation timeline",
      "Scheduling tradespeople",
      "Coordinating deliveries and materials",
      "Regular site visits",
      "Monitoring progress and quality",
      "Communicating with contractors on your behalf",
      "Managing changes and unexpected issues",
      "Regular progress updates",
      "Coordinating completion and handover",
    ],
    note:
      "Every renovation is different. Some stages need daily attention; others need only an occasional visit. That's why every package is bespoke, with responsibilities, deliverables and site-visit arrangements agreed clearly in writing before work begins.",
    cta: { label: "Request a Project Consultation", href: "/contact?type=homeowner&service=project-management" },
    image: images.kitchenDining,
    flagship: true,
  },
  {
    slug: "investors",
    number: "03",
    title: "Property Investor & Developer Partnerships",
    shortTitle: "Investor & Developer Partnerships",
    audience: "For investors and developers who want a hands-off renovation",
    summary:
      "You find the opportunity. We manage the transformation — budgets, contractors, schedules and photographic reporting, through to sale or rental.",
    intro: [
      "You purchase the property and provide the renovation capital. Lancashire Ladies Renovations manages the agreed renovation process — so you can focus on finding and funding the next opportunity.",
      "You remain responsible for investment and acquisition decisions. Laura acts as your renovation delivery partner: organising the work, watching the spend and keeping you informed with regular photographic updates.",
    ],
    includes: [
      "Initial property renovation assessment",
      "Renovation budget preparation",
      "Sourcing and coordinating contractors",
      "Managing refurbishment schedules",
      "Organising tradespeople",
      "Overseeing renovation progress",
      "Monitoring expenditure",
      "Regular photographic updates",
      "Coordinating project completion",
      "Preparing the property for sale or rental",
    ],
    cta: { label: "Discuss an Investor Partnership", href: "/investors#enquire" },
    image: images.livingLight,
  },
];

export const investorStructures = [
  {
    label: "Option A",
    title: "Fixed Project Management Fee",
    body: "A pre-agreed fee for managing the renovation, set against a clearly defined scope of work.",
  },
  {
    label: "Option B",
    title: "Management Fee + Performance Incentive",
    body: "A management fee combined with a performance-related bonus linked to project outcomes agreed at the outset — such as completion against programme or budget.",
  },
  {
    label: "Option C",
    title: "Bespoke Profit-Sharing Partnership",
    body: "For suitable projects, a negotiated arrangement where the investor provides the capital and Laura manages the renovation in exchange for an agreed share of project profits.",
  },
];

export const investorStructuresDisclaimer =
  "All arrangements are agreed individually. Profit-sharing partnerships are considered on a project-by-project basis and are subject to appropriate legal agreements, agreed cost definitions and a clear allocation of risk. Property investment carries financial risk; no returns are guaranteed, and investors should take their own independent legal, tax and financial advice.";
