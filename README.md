# Vanshaj Poonia Developer Lab

Not a portfolio. A living developer lab.

I build systems experiments, AI workspaces, enterprise tools, creative dev utilities, research notes, and technical artifacts in public.

Live site: <https://vanshajpoonia.com>  
GitHub: <https://github.com/VanshajPoonia>  
LinkedIn: <https://www.linkedin.com/in/vanshajpoonia/>  
X: <https://x.com/PooniaVanshaj>

## What This Is

This repository powers my personal website. It is organized less like a static resume and more like a public technical lab: shipped projects, active experiments, architecture blueprints, developer notebook entries, research notes, learning maps, artifacts, and timeline context.

The site is built with Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI primitives, and typed content files under `lib/data`.

## Main Sections

- `Projects` - polished builds, active experiments, shipped products, and earlier learning work.
- `Lab` - interactive demos, visual experiments, terminal toys, and OS explainers.
- `Workbench` - build logs, debugging notes, architecture sketches, and rough technical field notes.
- `Blueprints` - system design documents, MVP plans, technical tradeoffs, and future product architectures.
- `Research` - exploratory papers, technical comparisons, and longer-form analysis.
- `Now` - what I am currently building, learning, and shipping.
- `Roadmap` - active, next, later, paused, and shipped work.
- `Timeline` - developer journey from early learning builds to systems, AI, and enterprise tools.
- `Learning` - study maps across OS development, Rust, AI infrastructure, graphics, enterprise software, and product.
- `Artifacts` - downloadable notes, PDFs, diagrams, prompt packs, and technical resources.

## Featured Work

The current site gives the most prominence to:

- `Chronosapien` - a beginner-friendly hobby OS in Rust.
- `Intacct` - a Next.js + Supabase enterprise finance platform.
- `Zenquanta AI` - a premium multi-assistant AI workspace.
- `LifeSort` - a calendar-style productivity app.
- `ASCII Camera` - a webcam-to-ASCII creative coding experiment.

Older clone projects and early experiments are intentionally framed under Earlier Work / Learning Builds or Archive. Cloud Code Docker Container is kept as a paused/archive devtools experiment, not a flagship project.

## Content Model

Most public content is stored as typed data, then rendered through reusable page templates:

- `lib/data/projects.ts`
- `lib/data/workbench.ts`
- `lib/data/blueprints.ts`
- `lib/data/research.ts`
- `lib/data/roadmap.ts`
- `lib/data/timeline.ts`
- `lib/data/learning.ts`
- `lib/data/artifacts.ts`
- `lib/data/site.ts`

Dynamic detail pages exist for blueprint and workbench entries:

- `/blueprints/[slug]`
- `/workbench/[slug]`

This keeps the site easy to update while preserving consistent cards, badges, related links, and status chips.

## Workbench vs Blog vs Research vs Blueprints

- `Blog` is for polished essays, tutorials, long-form explanations, and finished thoughts.
- `Workbench` is for build logs, debugging notes, architecture sketches, raw experiments, and half-formed technical field notes.
- `Research` is for exploratory papers, technical comparisons, literature-style notes, and long-form technical analysis.
- `Blueprints` are system design documents for future products, MVP plans, tradeoffs, architecture sketches, and implementation notes.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI primitives
- Lucide icons
- Vercel Analytics
- ESLint 9 with Next.js config
- pnpm 10 lockfile for Vercel deployments

## Getting Started

Prerequisites:

- Node.js 22 or newer is recommended.
- pnpm 10 is recommended because Vercel detects `pnpm-lock.yaml`.

Install dependencies:

```bash
pnpm install
```

If pnpm is not installed locally, use:

```bash
npx -y pnpm@10 install
```

Run the development server:

```bash
pnpm dev
```

or:

```bash
npx -y pnpm@10 run dev
```

Open <http://localhost:3000>.

## Scripts

- `pnpm dev` - run the local development server.
- `pnpm build` - create a production build.
- `pnpm start` - serve the production build.
- `pnpm lint` - run ESLint.
- `pnpm analyze` - run Next.js experimental analysis.

## Verification

Before pushing content or dependency changes, run:

```bash
pnpm lint
pnpm build
```

For a Vercel-style lockfile check:

```bash
npx -y pnpm@10 install --frozen-lockfile --lockfile-only
npx -y pnpm@10 run build
```

If `package.json` changes, keep both lockfiles in sync:

```bash
npm install
npx -y pnpm@10 install --lockfile-only
```

Vercel uses the committed `pnpm-lock.yaml`, so stale pnpm metadata can break deployment even when local npm builds pass.

## Project Layout

- `app/` - Next.js App Router pages, layouts, loading states, and route templates.
- `components/` - shared UI, homepage sections, public page components, header, footer, and themed controls.
- `lib/` - typed content, utility helpers, structured data, and site metadata.
- `public/` - static assets.
- `styles/` - global styling support.

## Maintenance Notes

- Keep public copy aligned with the positioning: "Not a portfolio. A living developer lab."
- Keep Workbench rough and technical; do not polish it into a second blog.
- Keep Blueprints detailed enough for technical readers to understand scope, architecture, data model, tradeoffs, security, scaling, and observability.
- Avoid broken artifact/download links. Use coming-soon states until files exist.
- Keep older clone projects framed honestly as earlier work or archive.
