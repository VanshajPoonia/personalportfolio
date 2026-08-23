# Instructions for AI agents

Orienting notes for agents working in this repository. Read `README.md` for what
the site is, `docs/architecture.md` for how it is put together, and
`docs/conventions.md` for the rules the copy and design follow.

## What this is

The personal site of Vanshaj Poonia: work, experience, open source, a developer
notebook, and an archive. Next.js 16 (App Router), React 19, TypeScript,
Tailwind CSS 4, `next-themes`, `lucide-react`, Vercel Analytics. That is the
entire dependency list and it is short deliberately.

## Structure

- `app/`: routes, metadata, `sitemap.ts`, `robots.ts`, `error.tsx`,
  `not-found.tsx`. Server components by default.
- `components/`: `layout/` primitives, `home/` sections, `work/` cards and
  diagrams, `ui/` badges and links. Client components carry `"use client"`
  (`header.tsx`, `command-palette.tsx`, `theme-toggle.tsx`, `cursor-glow.tsx`,
  `work/work-filters.tsx`, `work/case-study-nav.tsx`).
- `lib/data/`: every fact the site states, as typed data. Pages are views over
  it, never a second copy.
- `app/globals.css`: design tokens via Tailwind v4 `@theme inline`, plus the
  container, section, and label primitives. Change colours and spacing here, not
  inline.
- `public/work/`: project screenshots as WebP.

## Rules that matter more than style

1. **Nothing claims more than the evidence supports.** Build status and
   deployment status are separate fields. Open-source entries record their real
   merge state. A project with no working deployment says so instead of offering
   a dead button. Do not invent screenshots, metrics, deployments, or features.
2. **Verify before you write.** `projectsLastVerified`, `contributionsLastVerified`,
   and `researchLastVerified` are promises that someone actually checked. If you
   change a status, re-check it and bump the date.
3. **Nothing private ships.** No client data, credentials, private repository
   URLs, or internal architecture. Private systems are described at capability
   level only.
4. **No em dashes in copy.** Use other punctuation.

## Conventions

- `cn` in `lib/utils.ts` (clsx + tailwind-merge) composes class names.
- The teal accent marks state that means something (active, live, current,
  focused). It is not a decoration for every border.
- Status is never colour alone: a filled or hollow glyph plus a word.
- Geist for reading, Geist Mono for metadata, statuses, labels, and code. No
  long body copy in mono.
- Motion budget is hover transitions and the cursor glow. Both stand down under
  `prefers-reduced-motion`. No entrance animations, no loops.
- Touch targets for controls are 44px on phone widths.

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint       # eslint .
pnpm typecheck  # tsc --noEmit
pnpm build      # production build
pnpm start      # serve the build
```

There is no test suite. Correctness here means the links resolve, the claims are
true, and both themes hold up. Run `pnpm lint && pnpm typecheck && pnpm build`,
then open the built site and click through it in a browser at phone and desktop
widths, in light and dark.

Note that `next.config.mjs` does **not** suppress TypeScript or ESLint errors:
a build that fails is a real failure. It carries the redirect map for every V2
route, each with a comment explaining the decision. Do not create redirect loops.

## Checklist for a change

1. Keep it one logical change.
2. If it touches content, update `lib/data/`, not the JSX.
3. Run lint, typecheck, and build.
4. Check the affected routes in a browser, both themes, phone and desktop.
5. If you added a route, add it to `app/sitemap.ts`.
6. If you retired a route, add a redirect rather than deleting the URL.
