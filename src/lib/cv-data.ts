// The CV, as structured data. /cv.pdf is rendered from this at build time
// (src/app/cv.pdf/route.tsx), so editing this file is how the downloadable CV changes.

export interface CvExperience {
  role: string;
  org: string;
  meta: string;
  years: string;
  bullets: string[];
}

export interface CvProject {
  name: string;
  meta: string;
  bullets: string[];
}

export interface CvEducation {
  degree: string;
  org: string;
  years: string;
}

export interface CvData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  availability: string;
  summary: string;
  skills: { label: string; items: string }[];
  experience: CvExperience[];
  projects: CvProject[];
  certifications: string[];
  education: CvEducation[];
}

export const cvData: CvData = {
  name: "Abdulrasaq Taofeeq Olarewaju",
  title: "Software Engineer — Backend-leaning Fullstack Developer",
  location: "Ilorin, Kwara State, Nigeria",
  email: "abdulrasaqolarewaju88@gmail.com",
  phone: "+234 706 978 6151",
  linkedin: "linkedin.com/in/abdulrasaq-taofeeq-olarewaju",
  github: "github.com/olareign",
  availability: "Open to remote & contract roles",
  summary:
    "Self-taught software engineer with 4+ years of professional experience building and shipping web applications end to end, with a backend focus. Have delivered across two companies, contributing to production platforms spanning AI-powered learning tools, real estate, care services, fintech, retail, education, and inventory management. Strong in Node.js, TypeScript, and NestJS backed by PostgreSQL, MongoDB, Redis, and BullMQ, with production frontend experience in React and Next.js, and hands-on experience integrating AI capabilities into live products. Have led a development team on frontend delivery, and continue to mentor developers and teach JavaScript. Currently expanding into Go, Python, and AI engineering.",
  skills: [
    { label: "Languages", items: "TypeScript, JavaScript, Go (learning), Python (learning), SQL" },
    {
      label: "Backend",
      items: "Node.js, NestJS, Express, REST APIs, background job processing (BullMQ), caching (Redis), message queues",
    },
    { label: "Frontend", items: "React, Next.js, HTML, CSS, Tailwind CSS" },
    { label: "Databases", items: "PostgreSQL, MongoDB (incl. aggregation pipelines), Redis" },
    { label: "AI & Integrations", items: "AI/LLM feature integration, Paystack, Stripe, PayPal, email delivery systems" },
    {
      label: "Practices & Tools",
      items: "Git/GitHub, API design, database design, system architecture, team leadership, technical mentoring",
    },
  ],
  experience: [
    {
      role: "Development Team Lead",
      org: "Tobams Group",
      meta: "Backend development, team leadership; UK-based company (remote)",
      years: "2023 — 2026",
      bullets: [
        "Contributed to development across multiple AI-based company platforms including Nexus (nexus.tobamsgroup.com), RLK, RLM, and Rareeat, implementing features spanning backend services and frontend interfaces.",
        "Integrated AI capabilities into learning platforms (RLK and RLM) covering areas such as sustainability, leadership, and entrepreneurship, contributing to both feature integration and supporting engineering.",
        "Built a platform statistics pipeline (Nexus) processing 10,000+ records using MongoDB aggregation pipelines and TypeScript, with BullMQ-driven email delivery producing automated daily administrative reports.",
        "Stress-tested platform systems ahead of a large intern-onboarding event to ensure reliability under increased load.",
        "Led a development team of 10+ on frontend delivery, coordinating work, reviewing pull requests, and mentoring team members.",
        "Worked across the stack with NestJS, TypeScript, PostgreSQL, MongoDB, Redis, and BullMQ on the backend, and React and Next.js on the frontend.",
      ],
    },
    {
      role: "Software Engineer",
      org: "Pacifylabs Technologies Limited",
      meta: "Fullstack contributor, technical tutor & office administrator",
      years: "2022 — Present",
      bullets: [
        "Contribute to fullstack development across the company's product suite and client work, spanning backend APIs (NestJS, PostgreSQL, Redis, BullMQ) and frontends (React, Next.js).",
        "SCIMS and D-SCIMS (business management): multi-store point-of-sale and inventory systems handling 10,000+ products, plus a dealer PWA covering sales, credit ledger, and device provenance.",
        "Rakuxon Path (edtech): built the university catalogue and public site for a multi-tenant study-abroad recruitment platform.",
        "Ajo (fintech) and AI Staff (AI SaaS): fullstack contributor on a savings and rotating-group app with a ledger and KYC, and on a platform where businesses hire AI staff for social media and sales.",
        "Client and brand sites: Rakuxon Care (UK care sector), Rakuxon City (real estate), TrustBridge (UK immigration services), and Ablin (GRC advisory).",
        "EduMimi (edtech) and KudiPay (fintech): backend and frontend features for a tutoring platform; tester and technical reviewer for wallet-funding and bill-payment flows.",
        "Taught JavaScript and web development to 20+ learners, and supported day-to-day office and administrative coordination.",
      ],
    },
  ],
  projects: [
    {
      name: "Dosinex — Portfolio & CV Platform",
      meta: "Own product · dosinex.com",
      bullets: [
        "Founded and built a live product that gives anyone a portfolio page, a downloadable CV in a chosen layout, AI tailoring of that CV to a job, and an enquiry inbox.",
        "Next.js frontend with a NestJS backend on PostgreSQL and Redis; AI tailoring re-emphasizes real experience and never invents it.",
      ],
    },
    {
      name: "SafePick — Child Pickup Authorization Platform",
      meta: "Personal build",
      bullets: [
        "Designed and built end to end a platform that lets schools and parents verify who is authorized to collect a child, closing a real safety gap.",
        "Owns full architecture across backend and frontend using the core stack (Node.js/TypeScript/NestJS, PostgreSQL, Redis, React/Next.js).",
      ],
    },
  ],
  certifications: ["Project Management", "Strategic Planning", "Leadership Certificate"],
  education: [{ degree: "B.Sc. Chemistry", org: "Ekiti State University", years: "2016 — 2022" }],
};
