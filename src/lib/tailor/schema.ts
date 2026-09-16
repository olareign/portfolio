import { z } from "zod";

// Mirrors CvData's shape. The model may reorder, re-emphasize, and lightly rephrase
// bullets/summary text, but every string here must describe something already true
// in cv-data.ts — never a new employer, title, date range, or skill.
export const tailoredCvSchema = z.object({
  summary: z.string().min(20).max(1200),
  skills: z
    .array(
      z.object({
        label: z.string().min(1).max(60),
        items: z.string().min(1).max(400),
      })
    )
    .min(1)
    .max(8),
  experience: z
    .array(
      z.object({
        role: z.string().min(1).max(120),
        org: z.string().min(1).max(120),
        meta: z.string().max(200),
        years: z.string().max(60),
        bullets: z.array(z.string().min(1).max(400)).min(1).max(10),
      })
    )
    .min(1)
    .max(6),
  projects: z
    .array(
      z.object({
        name: z.string().min(1).max(120),
        meta: z.string().max(120),
        bullets: z.array(z.string().min(1).max(400)).min(1).max(6),
      })
    )
    .max(6),
});

export type TailoredCv = z.infer<typeof tailoredCvSchema>;

export const tailorRequestSchema = z
  .object({
    jobDescription: z.string().trim().max(8000).optional(),
    jobUrl: z.string().trim().url().max(2000).optional(),
  })
  .refine((v) => Boolean(v.jobDescription?.length) || Boolean(v.jobUrl?.length), {
    message: "Provide a job description or a job link.",
  });

export type TailorRequest = z.infer<typeof tailorRequestSchema>;
