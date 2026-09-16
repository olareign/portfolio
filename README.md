# Subject of Interest

Portfolio for Abdulrasaq Taofeeq Olarewaju ("Olareign"), built as a machine-surveillance
dossier. See `portfolio-prd.md` and `design-system.md` (project docs, not in this repo)
for the full concept.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + react-three-fiber.
Server-hosted (not static export) — the AI CV-tailoring route needs a live server.

## Development

```bash
pnpm install
cp .env.example .env.local   # add GEMINI_API_KEY — see below
pnpm dev       # http://localhost:3006
pnpm lint
pnpm build
```

## Content

All copy — profile, timeline, projects, stack, stats, contact, books, articles — lives
in [`src/content.ts`](src/content.ts). Update that file; no component edits needed for
copy changes. The CV's structured data (used by the AI tailoring feature and the
generated PDF) lives separately in [`src/lib/cv-data.ts`](src/lib/cv-data.ts) — keep it
in sync with `public/cv.pdf` if the real CV changes.

## AI CV personalization

The "Personalize for a role" button on the hero calls `/api/tailor-cv`, which:

1. Takes a pasted job description or job link (fetched server-side).
2. Sends the real CV data + the job text to Google's Gemini API, instructed to only
   reorder/re-emphasize/lightly rephrase real bullets — never invent new employers,
   dates, or skills.
3. Validates the model's JSON response against a strict schema, merges it back over the
   real identity/contact/certifications/education fields (which the model never touches),
   and renders a new PDF with `@react-pdf/renderer`.

**Setup — free, no credit card:**

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey) and create a
   key (Gemini's free tier — Flash models — needs no billing).
2. Set `GEMINI_API_KEY` in `.env.local` (dev) and in your host's environment variables
   (production).
3. Optional: set `GEMINI_MODEL` to pin a specific model; defaults to `gemini-2.5-flash`.
   Google changes its free-tier model lineup and quotas often (e.g. `gemini-2.0-flash`
   was pulled from the free tier in June 2026) without a changelog — check your live
   limits at [aistudio.google.com](https://aistudio.google.com) rather than trusting
   any number written down here.

Without a key, the feature fails gracefully with a clear "not configured" message — the
rest of the site is unaffected.

**Known limits:** the rate limiter is in-memory per server instance (fine for a
low-traffic personal site, not a real distributed limiter); the free Gemini tier has its
own hard rate/quota caps on top of that.

## Before deploying — three things to finish

1. **CV file** — `profile.cvUrl` in `src/content.ts` points at `/cv.pdf`, already in
   `public/cv.pdf`. If the CV changes, update both the PDF and `src/lib/cv-data.ts`.
2. **Site URL** — `src/lib/site.ts` defaults to a placeholder domain
   (`https://olareign.example`). Set `NEXT_PUBLIC_SITE_URL` to the real production
   domain once one is chosen.
3. **Display font** — the design calls for Departure Mono; it isn't on Google Fonts,
   so headlines currently use Silkscreen (the PRD's own named fallback) via
   `next/font/google`. Swap in `next/font/local` with the real font files in
   `src/app/layout.tsx` if you obtain them.

## Books & articles

`src/content.ts` exports empty `books` and `articles` arrays — the "Reference Archive"
section hides itself entirely until at least one has a real entry. Add yours there.

## Deploying

This is a standard server-hosted Next.js app (not static export) because of the AI route
— deploy to **Vercel** (simplest: zero-config for Next.js). Set `GEMINI_API_KEY` (and
optionally `GEMINI_MODEL`, `NEXT_PUBLIC_SITE_URL`) in the project's environment variables.
