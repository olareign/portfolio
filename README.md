# Subject of Interest

Portfolio for Abdulrasaq Taofeeq Olarewaju ("Olareign"), built as a machine-surveillance
dossier: a live data-stream background, a camera-feed hero portrait, and a site that
reads like the Machine profiling its subject.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion. The CV PDF is
rendered with `@react-pdf/renderer` at build time.

## Development

```bash
pnpm install
pnpm dev       # http://localhost:3006
pnpm lint
pnpm build
```

## Content

All site copy — profile, timeline, projects, stack, stats, contact, books, articles —
lives in [`src/content.ts`](src/content.ts). Update that file; no component edits are
needed for copy changes. Project counts in the stats and tallies are derived from the
project list, so they update themselves.

Each project can carry a `logo` (under `public/logos/`), a `preview` screenshot shown in
its case file, a `role`, `highlights`, and a public `url`.

## CV

`/cv.pdf` is generated at build time from [`src/lib/cv-data.ts`](src/lib/cv-data.ts)
by [`src/app/cv.pdf/route.tsx`](src/app/cv.pdf/route.tsx). Edit the data file to change
the CV; there is no separate PDF to keep in sync.

## Interaction map

- **Command console** — `⌘K` / `Ctrl+K` or `/` (or the HUD button) opens it.
- **Sections** — the list in [`src/lib/sections.ts`](src/lib/sections.ts) drives the
  left rail, the mobile bottom bar, the HUD status and the console.
- **Boot sequence** — plays once per browser session; any key or tap skips it, and it
  never plays under reduced motion.

## Deploying

Deployed on Vercel from `main`. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
`package.json` pins Node 24.x via `engines`.
