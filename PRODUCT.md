# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Open source hiring managers and engineers** at companies that hire from their contributor pool (Plane, Layer5, Supabase and similar). They arrive from a pull request, a résumé, or LinkedIn and decide in minutes whether to interview.
- **GSoC and program mentors** (AOSSIE, Zulip, Joplin, OpenWISP and similar) deciding whether this contributor is worth months of mentoring. They already know the PRs and want depth and reliability.
- **Freelance and client leads** deciding whether to hire Vanshaj for a build.

Vanshaj is a second-year undergraduate at IIT Jodhpur, based in Jodhpur, Rajasthan.

## Product Purpose

A personal site that is itself the evidence: what Vanshaj has built, contributed and is still building, with the real state of each thing. Success is a visitor who emails, opens GitHub, downloads the résumé, or reads a case study through.

## Positioning

Work across the whole stack, from product UIs to an operating system kernel, presented with verified status instead of claims. Open pull requests are labelled open, and build and deployment status are kept apart. The site also has to show taste: the craft of the site is part of the proof.

## Operating Context

- Visitors often come straight from a GitHub PR, a résumé PDF, or a LinkedIn or X profile, frequently on a phone.
- Routes: home, /work and /work/[slug] case studies, /experience, /open-source, /research, /about, /workbench (notebook and incubator), /archive.
- Content is typed data in `lib/data/`. Pages are views over it.
- Deploys from `main` on Vercel. Next.js 16 App Router, React 19, Tailwind CSS 4, a deliberately short dependency list.

## Capabilities and Constraints

- Command palette (⌘K) must stay.
- Dark and light themes exist today. Keeping both is not a binding requirement.
- The hero headline "I build software across the stack." is not binding.
- Company brands (Lifesort, Zenquanta AI, Spool, Quant Trading Lab, and Klik as a personal project) never appear as Vanshaj's own work.
- Private and client systems are described at capability level only.

## Brand Commitments

- Honesty rules from `docs/conventions.md` are binding: verified dates on projects and contributions, build status separate from deployment status, open PRs labelled open, no fabricated screenshots, product UIs, or metrics, testing numbers only when they were actually run.
- Voice: first person, technical, specific, plain words. No marketing vocabulary, no self-rating, no em dashes.
- The site should read as made by a person with taste, not generated from a template.

## Evidence on Hand

- Case studies: ChronoOS, Project Management ATLAS, TensorTrail, Open models in the browser (`lib/data/case-studies.tsx`).
- Open source: 5 merged and 9 open PRs, status verified 2026-11-12 (`lib/data/open-source.ts`).
- Screenshots: ASCII Camera, Volt, Already Filed (`public/work/`). Other projects use architecture diagrams because no honest screenshot exists.
- Research: one unpublished study with no results (`lib/data/research.ts`).
- Résumé PDF at `public/vanshaj-poonia-resume.pdf`.
- No testimonials, logos, or employer endorsements. Do not invent any.

## Product Principles

1. The work is the subject. Everything else frames it.
2. Every claim is checkable, and the site says when something is not yet true.
3. Depth on demand: a scannable surface, with case studies and PR write-ups underneath.
4. Craft is evidence. Interaction and motion should show skill, never decorate.

## Accessibility & Inclusion

- Status is never colour alone, text meets 4.5:1, mobile targets are at least 44px, dialogs trap focus and restore it, and the page stays fully usable under `prefers-reduced-motion`.
