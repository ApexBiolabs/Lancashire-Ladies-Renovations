import { z } from "zod";

/** Shared validation used by both the browser form and the API route. */

const phone = z
  .string()
  .trim()
  .min(1, "Please enter a telephone number")
  .regex(/^[+()\d\s-]{7,20}$/, "Please enter a valid telephone number");

const consent = z.literal(true, { error: "Please confirm you agree to us contacting you" });

const common = {
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(160),
  telephone: phone,
  consent,
  // Spam protection
  website: z.string().max(0, "Spam detected").optional().default(""), // honeypot
  startedAt: z.coerce.number().optional(),
  turnstileToken: z.string().optional(),
};

export const homeownerSchema = z.object({
  kind: z.literal("homeowner"),
  ...common,
  postcode: z
    .string()
    .trim()
    .min(2, "Please enter your property postcode")
    .max(10)
    .regex(/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*(\d[A-Za-z]{2})?$/, "Please enter a valid UK postcode (or the first part, e.g. PR1)"),
  renovationType: z.string().min(1, "Please choose a renovation type"),
  budget: z.string().min(1, "Please choose an estimated budget"),
  startDate: z.string().min(1, "Please choose an anticipated start"),
  description: z.string().trim().min(20, "Please tell us a little more about your project (20+ characters)").max(4000),
});

export const investorSchema = z.object({
  kind: z.literal("investor"),
  ...common,
  company: z.string().trim().max(120).optional().default(""),
  location: z.string().trim().min(2, "Please enter the property location").max(120),
  purchasePrice: z.string().trim().max(40).optional().default(""),
  budget: z.string().min(1, "Please choose an estimated renovation budget"),
  stage: z.string().min(1, "Please choose the current project stage"),
  description: z.string().trim().min(20, "Please tell us a little more about the opportunity (20+ characters)").max(4000),
});

export const enquirySchema = z.discriminatedUnion("kind", [homeownerSchema, investorSchema]);
export type Enquiry = z.infer<typeof enquirySchema>;

export const options = {
  renovationType: [
    "Kitchen",
    "Bathroom",
    "Single room",
    "Multiple rooms",
    "Extension",
    "Loft or garage conversion",
    "Whole-house renovation",
    "Not sure yet",
  ],
  homeownerBudget: ["Under £20,000", "£20,000 – £50,000", "£50,000 – £100,000", "£100,000 – £200,000", "Over £200,000", "Not sure yet"],
  startDate: ["As soon as possible", "Within 3 months", "3 – 6 months", "6 – 12 months", "Over 12 months", "Just exploring"],
  investorBudget: ["Under £25,000", "£25,000 – £50,000", "£50,000 – £100,000", "£100,000 – £250,000", "Over £250,000", "To be assessed"],
  stage: [
    "Researching opportunities",
    "Property identified",
    "Offer accepted",
    "Purchase completed",
    "Renovation already underway",
  ],
  service: {
    planning: "Renovation planning & design support",
    "project-management": "Renovation & extension project management",
  } as Record<string, string>,
};
