import type { Project } from "@/content";

export const STATUS_TONE: Record<Project["status"], { text: string; dot: string }> = {
  LIVE: { text: "text-accent-green", dot: "bg-accent-green" },
  "IN PROGRESS": { text: "text-accent-amber", dot: "bg-accent-amber" },
  SHIPPED: { text: "text-accent-blue", dot: "bg-accent-blue" },
};

// Each employer gets its own signal colour, matching the timeline tracks.
export const EMPLOYER_TONE: Record<Project["employer"], { bar: string; text: string }> = {
  Pacifylabs: { bar: "bg-accent-amber", text: "text-accent-amber" },
  "Tobams Group": { bar: "bg-accent-blue", text: "text-accent-blue" },
  Independent: { bar: "bg-accent-green", text: "text-accent-green" },
};
