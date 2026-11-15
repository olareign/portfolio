// Single source of truth for portfolio content.
// Update this file to change copy anywhere on the site — no component edits needed.

export const profile = {
  name: "Abdulrasaq Taofeeq Olarewaju",
  handle: "Olareign",
  subjectId: "SUBJ-0x88",
  positioning: "Self-taught software engineer · 4+ yrs · backend-leaning fullstack",
  location: "Ilorin, Kwara State, Nigeria",
  availability: "Open to remote & contract roles",
  cvUrl: "/cv.pdf",
  /** Dosinex — the CV builder the "personalize for a role" CTA sends visitors to. */
  cvBuilderUrl: "https://dosinex.com",
};

export const contact = {
  email: "abdulrasaqolarewaju88@gmail.com",
  phone: "+234 706 978 6151",
  linkedin: "https://linkedin.com/in/abdulrasaq-taofeeq-olarewaju",
  github: "https://github.com/olareign",
};

export type TimelineTrack = "tobams" | "pacifylabs";

export interface TimelineEntry {
  id: string;
  track: TimelineTrack;
  org: string;
  role: string;
  startYear: number;
  endYear: number | "present";
  location: string;
  summary: string;
}

export const timeline: TimelineEntry[] = [
  {
    id: "tobams",
    track: "tobams",
    org: "Tobams Group",
    role: "Development Team Lead",
    startYear: 2023,
    endYear: 2026,
    location: "UK · remote",
    summary:
      "Led a team of 10+ across a three-repo product spanning two domains on a shared API. Shipped and reviewed Nexus, RLK, RLM, and Rareeat.",
  },
  {
    id: "pacifylabs",
    track: "pacifylabs",
    org: "Pacifylabs",
    role: "Software Engineer / Tutor",
    startYear: 2022,
    endYear: "present",
    location: "Remote",
    summary:
      "Owns SafePick end-to-end; builds and tests Rakuxon Care, SCIMS, EduMimi, and KudiPay while mentoring 20+ learners through backend and fullstack fundamentals.",
  },
];

export const timelineRange = { start: 2022, end: 2026 } as const;

export type ProjectTag = "PRIMARY" | "CONTRIBUTOR";

export interface Project {
  id: string;
  name: string;
  tag: ProjectTag;
  employer: "Tobams Group" | "Pacifylabs";
  platform?: string;
  type: string;
  stack: string[];
  status: "LIVE" | "IN PROGRESS" | "SHIPPED";
  ai?: boolean;
  description: string;
  url?: string;
  /** Path under /public to a project logo/mark. Falls back to an initials monogram when absent. */
  logo?: string;
}

export const projects: Project[] = [
  {
    id: "safepick",
    name: "SafePick",
    tag: "PRIMARY",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Child pickup authorization platform",
    stack: ["NestJS", "PostgreSQL", "Next.js", "Redis"],
    status: "LIVE",
    description:
      "Owned end-to-end: a platform that verifies and authorizes who is allowed to pick up a child, reducing unauthorized-release risk for schools and guardians.",
  },
  {
    id: "nexus",
    name: "Nexus",
    tag: "CONTRIBUTOR",
    employer: "Tobams Group",
    platform: "nexus.tobamsgroup.com",
    logo: "/logos/tobams-group-icon.png",
    type: "Analytics pipeline & admin platform",
    stack: ["Next.js", "NestJS", "MongoDB", "BullMQ"],
    status: "LIVE",
    ai: true,
    description:
      "Built a platform statistics pipeline processing 10k+ records with MongoDB aggregation pipelines, plus BullMQ-driven automated daily admin email reports.",
  },
  {
    id: "rlk",
    name: "RLK",
    tag: "CONTRIBUTOR",
    employer: "Tobams Group",
    logo: "/logos/tobams-group-icon.png",
    type: "AI-integrated learning platform",
    stack: ["Node.js", "AI/LLM integration"],
    status: "IN PROGRESS",
    ai: true,
    description:
      "Integrated AI capabilities into a learning platform covering sustainability, leadership, and entrepreneurship.",
  },
  {
    id: "rlm",
    name: "RLM",
    tag: "CONTRIBUTOR",
    employer: "Tobams Group",
    logo: "/logos/tobams-group-icon.png",
    type: "AI-integrated learning platform",
    stack: ["Node.js", "AI/LLM integration"],
    status: "IN PROGRESS",
    ai: true,
    description:
      "Integrated AI capabilities into a learning platform covering sustainability, leadership, and entrepreneurship.",
  },
  {
    id: "rareeat",
    name: "Rareeat",
    tag: "CONTRIBUTOR",
    employer: "Tobams Group",
    logo: "/logos/tobams-group-icon.png",
    type: "Product platform",
    stack: ["React", "MongoDB", "Redis"],
    status: "LIVE",
    ai: true,
    description: "Contributed to product engineering across the Tobams Group platform.",
  },
  {
    id: "rakuxon-care",
    name: "Rakuxon Care",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Marketing & enquiry site (UK care sector)",
    stack: ["Node.js", "PostgreSQL", "React"],
    status: "LIVE",
    description:
      "Built a dual-audience marketing and enquiry site covering home-care services and B2B care-business enablement.",
  },
  {
    id: "scims",
    name: "SCIMS",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Multi-store POS & inventory system",
    stack: ["Node.js", "PostgreSQL", "React"],
    status: "LIVE",
    description:
      "Multi-store point-of-sale and inventory system handling 10k+ products, with stock tracking, business analytics, and notification/payment integrations.",
  },
  {
    id: "edumimi",
    name: "EduMimi",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Tutoring & school-management platform",
    stack: ["Node.js", "Next.js"],
    status: "LIVE",
    description: "Contributed backend and frontend features for a tutoring/courses and school-management platform.",
  },
  {
    id: "kudipay",
    name: "KudiPay",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Fintech wallet & bill-payment platform",
    stack: ["Node.js"],
    status: "SHIPPED",
    description:
      "Tester and technical reviewer for wallet-funding and automated airtime, data, and bill-payment flows, focused on transaction reliability.",
  },
  {
    id: "kudibooks",
    name: "KudiBooks",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Invoicing, bookkeeping & payments platform",
    stack: ["NestJS", "PostgreSQL", "Next.js"],
    status: "LIVE",
    ai: true,
    url: "https://usekudibooks.com",
    description:
      "Invoicing, bookkeeping, and payments for small businesses, Nigeria first, with an AI sales agent and social content module built in.",
  },
  {
    id: "d-scims",
    name: "D-SCIMS",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Dealer inventory & sales PWA",
    stack: ["NestJS", "PostgreSQL", "BullMQ", "Next.js"],
    status: "LIVE",
    url: "https://i.scims.app",
    description:
      "Inventory, sales, credit ledger, and device provenance for dealers of phones, laptops, and other gadgets — an installable PWA on a multi-tenant stack.",
  },
  {
    id: "rakuxon-path",
    name: "Rakuxon Path",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Study-abroad recruitment platform",
    stack: ["NestJS", "PostgreSQL", "Next.js"],
    status: "LIVE",
    url: "https://rakuxon.com",
    description:
      "Multi-tenant study-abroad recruitment platform. Built the university catalogue and the public site on a shared NestJS API.",
  },
  {
    id: "ajo",
    name: "Àjọ",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Savings & rotating-group (èsúsú) app",
    stack: ["NestJS", "PostgreSQL", "Next.js"],
    status: "IN PROGRESS",
    description:
      "Mobile-first savings app for people at home and in the diaspora: solo savings plans and rotating èsúsú groups, with a ledger, KYC, and cross-currency contributions.",
  },
  {
    id: "ai-staff",
    name: "AI Staff",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "AI workforce SaaS",
    stack: ["NestJS", "PostgreSQL", "BullMQ", "Next.js", "Claude"],
    status: "IN PROGRESS",
    ai: true,
    description:
      "SaaS where businesses hire AI staff that do real work inside limits the business sets. Launch roles are social media and sales manager, with new roles added as definitions.",
  },
  {
    id: "rakuxon-city",
    name: "Rakuxon City",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Real estate site (Nigeria)",
    stack: ["Next.js", "TypeScript"],
    status: "IN PROGRESS",
    description:
      "Real estate site running two tracks under one brand — land sold direct to buyers and completed or in-build homes — plus a gated investor lane.",
  },
  {
    id: "trustbridge",
    name: "TrustBridge",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "Immigration services website (UK)",
    stack: ["Next.js", "TypeScript"],
    status: "IN PROGRESS",
    description: "Client website for a UK immigration services firm, built to a full PRD and design system.",
  },
  {
    id: "ablin",
    name: "Ablin",
    tag: "CONTRIBUTOR",
    employer: "Pacifylabs",
    logo: "/logos/pacifylabs.png",
    type: "GRC advisory website",
    stack: ["Next.js", "TypeScript"],
    status: "IN PROGRESS",
    description:
      "Marketing site for a governance, risk, and compliance advisory consultancy, with a server-side contact flow and no separate backend.",
  },
];

export interface StackGroup {
  label: string;
  items: string[];
}

export const stack: StackGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "SQL", "Go (learning)", "Python (learning)"] },
  { label: "Backend", items: ["Node.js", "NestJS", "Express", "REST APIs"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "BullMQ"] },
  { label: "AI & Integrations", items: ["AI/LLM integration", "Paystack", "Stripe", "PayPal"] },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "4+", label: "years experience" },
  { value: "10+", label: "products shipped" },
  { value: "10k+", label: "records processed (Nexus)" },
  { value: "20+", label: "learners mentored" },
];

export interface Certification {
  name: string;
  fileUrl: string;
}

export const certifications: Certification[] = [
  { name: "Project Management", fileUrl: "/certificates/project-management.pdf" },
  { name: "Strategic Planning", fileUrl: "/certificates/strategic-planning.pdf" },
  { name: "Leadership Certificate", fileUrl: "/certificates/leadership.pdf" },
];

export const bio = {
  paragraphs: [
    "Olareign studied Chemistry at university — then taught himself software engineering from scratch and has spent the 4+ years since building and shipping backend-leaning fullstack products in production.",
    "From 2023 to 2026 he led a development team of 10+ at Tobams Group (UK, remote), shipping across the Nexus, RLK, RLM, and Rareeat platforms — three repos, two domains, one shared API.",
    "He's been a software engineer and tutor at Pacifylabs since 2022, where he owns SafePick end-to-end and builds Rakuxon Care, SCIMS, EduMimi, and KudiPay while mentoring 20+ learners through JavaScript and web development.",
    "The self-taught path shows up in how he works: strong on fundamentals, comfortable reading unfamiliar codebases, and expanding deliberately into Go, Python, and AI engineering rather than staying inside one comfortable stack.",
    "In practice that has meant building a Nexus statistics pipeline processing 10,000+ records through MongoDB aggregation, with BullMQ-driven email delivery producing automated daily admin reports; wiring payment flows through Paystack, Stripe, and PayPal; and stress-testing platform systems ahead of a large intern-onboarding event to make sure they held up under load.",
    "He also holds certifications in Project Management, Strategic Planning, and Leadership — practical grounding for the parts of the job that aren't just code: coordinating a 10-person team, reviewing pull requests, and mentoring the developers he teaches JavaScript and web development to.",
  ],
  education: "B.Sc. Chemistry, Ekiti State University (2016–2022). Self-taught in software engineering.",
};

export interface Book {
  title: string;
  subtitle: string;
  meta: string;
  cover: string;
  /** External sales page (e.g. Selar) — clicking the cover redirects here. */
  salesUrl?: string;
}

const SELAR_STORE_URL = "https://selar.com/4f67n6cq4u";

export const books: Book[] = [
  {
    title: "The Server Side of Next.js",
    subtitle: "From Route Handlers to Production Backends",
    meta: "TypeScript · PostgreSQL & Prisma · APIs, auth, caching — junior to senior",
    cover: "/books/nextjs-server-side.png",
    salesUrl: SELAR_STORE_URL,
  },
  {
    title: "React to Engineer",
    subtitle: "Build Production Frontends with React and Next.js",
    meta: "TypeScript throughout · Junior to senior, one project at a time",
    cover: "/books/react-to-engineer.png",
    salesUrl: SELAR_STORE_URL,
  },
  {
    title: "Python Before AI",
    subtitle: "Nine Projects for Future AI Engineers",
    meta: "Modern, typed Python 3.13 · From Go to AI-ready code",
    cover: "/books/python-before-ai.png",
    salesUrl: SELAR_STORE_URL,
  },
];

export interface Article {
  title: string;
  url: string;
  publication?: string;
  date?: string;
}

// Add real published pieces here — title/url required. Leave empty to hide the section.
export const articles: Article[] = [];

export const hud = {
  status: "ANALYZING",
};
