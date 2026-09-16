// Structured, faithful transcription of the real CV (public/cv.pdf).
// This is the single source of truth handed to the AI tailoring prompt and to the
// generated-PDF template — never let either drift from what's written here.

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
    "Self-taught software engineer with 4+ years of professional experience building and shipping web applications end to end, with a backend focus. Concurrently deliver across two companies, contributing to production platforms spanning AI-powered learning tools, real estate, care services, fintech, retail, education, and inventory management. Strong in Node.js, TypeScript, and NestJS backed by PostgreSQL, MongoDB, Redis, and BullMQ, with production frontend experience in React and Next.js, and hands-on experience integrating AI capabilities into live products. Have led a development team on frontend delivery, and continue to mentor developers and teach JavaScript. Currently expanding into Go, Python, and AI engineering.",
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
      years: "2023 — Present",
      bullets: [
        "Contribute to development across multiple AI-based company platforms including Nexus (nexus.tobamsgroup.com), RLK, RLM, and Rareeat, implementing features spanning backend services and frontend interfaces.",
        "Integrated AI capabilities into learning platforms (RLK and RLM) covering areas such as sustainability, leadership, and entrepreneurship, contributing to both feature integration and supporting engineering.",
        "Built a platform statistics pipeline (Nexus) processing 10,000+ records using MongoDB aggregation pipelines and TypeScript, with BullMQ-driven email delivery producing automated daily administrative reports.",
        "Stress-tested platform systems ahead of a large intern-onboarding event to ensure reliability under increased load.",
        "Lead a development team of 10+ on frontend delivery, coordinating work, reviewing pull requests, and mentoring team members.",
        "Work across the stack with NestJS, TypeScript, PostgreSQL, MongoDB, Redis, and BullMQ on the backend, and React and Next.js on the frontend.",
      ],
    },
    {
      role: "Software Engineer",
      org: "Pacifylabs Technologies Limited",
      meta: "Fullstack contributor, technical tutor & office administrator",
      years: "2022 — Present",
      bullets: [
        "Contribute to fullstack development across the company's product suite, spanning backend APIs (NestJS, PostgreSQL, Redis) and frontends (React, Next.js).",
        "SCIMS (business management): contributed to a multi-store point-of-sale and inventory system handling 10,000+ products, with stock tracking, business analytics, and notification/payment integrations.",
        "EduMimi (edtech): contributed backend and frontend features for a tutoring/courses and school-management platform.",
        "Rakuxon Care (UK care sector): built a dual-audience marketing and enquiry site covering home-care services and B2B care-business enablement.",
        "KudiPay (fintech): served as tester and technical reviewer for wallet-funding and automated airtime, data, and bill-payment flows, focusing on transaction reliability.",
        "Taught JavaScript and web development to 20+ learners, and supported day-to-day office and administrative coordination.",
      ],
    },
  ],
  projects: [
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
