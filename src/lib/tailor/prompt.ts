import { cvData } from "@/lib/cv-data";

export const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string" },
    skills: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          items: { type: "string" },
        },
        required: ["label", "items"],
      },
    },
    experience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          role: { type: "string" },
          org: { type: "string" },
          meta: { type: "string" },
          years: { type: "string" },
          bullets: { type: "array", items: { type: "string" } },
        },
        required: ["role", "org", "meta", "years", "bullets"],
      },
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          meta: { type: "string" },
          bullets: { type: "array", items: { type: "string" } },
        },
        required: ["name", "meta", "bullets"],
      },
    },
  },
  required: ["summary", "skills", "experience", "projects"],
} as const;

export function buildTailorPrompt(jobText: string): string {
  return `You are tailoring a real person's CV to better match a specific job. You will be given
their true, verified work history as JSON ("SOURCE_CV") and a job description ("JOB").

Hard rules — breaking any of these makes the output unusable and dishonest:
1. Never invent an employer, job title, date range, skill, certification, or achievement that
   does not already appear in SOURCE_CV. You may only reorder, re-emphasize, lightly rephrase,
   or trim bullets that already exist there.
2. Every fact in your output must be traceable to SOURCE_CV. If the job wants a skill the
   candidate does not have, do not add it — simply don't fabricate a match.
3. Keep "org", "years", and "role" fields exactly as given in SOURCE_CV — do not reword these.
4. You may shorten or drop less-relevant bullets and reorder skill groups/bullets to foreground
   what matches the job, and you may lightly rephrase a bullet's wording for emphasis, but the
   underlying claim in each bullet must remain factually identical to the source.
5. Write the "summary" field as a rephrased 2-4 sentence professional summary that emphasizes
   the parts of SOURCE_CV most relevant to JOB — still built only from real facts in SOURCE_CV.
6. Respond with JSON only, matching the required schema exactly. No markdown fences, no commentary.

SOURCE_CV:
${JSON.stringify(cvData, null, 2)}

JOB:
${jobText.slice(0, 6000)}
`;
}
