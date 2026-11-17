/**
 * ------------------------------------------------------------------
 *  SITE IMAGERY
 *  These are atmospheric stock photographs (Unsplash licence) used
 *  for mood only — they are NOT Laura's projects and are never
 *  presented as such. Project photos live in content/projects.ts.
 *
 *  To use your own photography, drop files into /public/images and
 *  change `src` to e.g. "/images/hero-kitchen.jpg".
 * ------------------------------------------------------------------
 */

const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type SiteImage = { src: string; alt: string };

export const images = {
  heroKitchen: {
    src: u("1502005097973-6a7082348e28", 2400),
    alt: "Bright renovated kitchen with a white island, timber detailing and garden doors",
  },
  kitchenMarble: {
    src: u("1683629357963-adf2b1fa9ad9"),
    alt: "Contemporary kitchen with marble worktops and soft white cabinetry",
  },
  kitchenIsland: {
    src: u("1758448755927-e5c5ae14790c"),
    alt: "Modern kitchen island with marble detailing beneath a pendant light",
  },
  kitchenDining: {
    src: u("1725257928373-dc6d2ac7b145"),
    alt: "Open-plan kitchen and dining space with natural light",
  },
  livingCalm: {
    src: u("1564078516393-cf04bd966897"),
    alt: "Calm living room with a grey chaise beside a tall window",
  },
  livingLight: {
    src: u("1724582586529-62622e50c0b3"),
    alt: "Light-filled living room with a large picture window",
  },
  livingSofa: {
    src: u("1616137422495-1e9e46e2aa77"),
    alt: "Neutral living room with a grey and white sofa",
  },
  inProgress: {
    src: u("1618832515490-e181c4794a45"),
    alt: "Kitchen mid-renovation with cabinets protected by paper and sheeting",
  },
  structural: {
    src: u("1634586648651-f1fb9ec10d90"),
    alt: "Room under renovation with temporary steel supports in place",
  },
  woodCeiling: {
    src: u("1643949915134-73a4c880f7c7"),
    alt: "Kitchen with white cabinets beneath a warm timber ceiling",
  },
} satisfies Record<string, SiteImage>;
