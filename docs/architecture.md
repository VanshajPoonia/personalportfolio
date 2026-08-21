# Architecture

How the site is put together, and why it is put together that way. Content
authoring lives in the [README](../README.md); this file is about structure.

## Shape

A static Next.js App Router site. Every route is prerendered except `/work`,
which is server-rendered because it reads a `?filter=` query parameter.

```
app/
  layout.tsx              fonts, metadata, viewport, ThemeProvider, Analytics
  page.tsx                homepage
  work/page.tsx           project index (dynamic: reads ?filter=)
  work/[slug]/            case studies (SSG from getCaseStudyProjects)
  experience/             professional and collaborative work
  open-source/            authored pull requests
  research/               inactive status page
  about/                  background, now, tools
  workbench/              notebook index + incubator
  workbench/[slug]/       notes (SSG)
  workbench/incubator/[slug]/  design studies (SSG)
  archive/                earlier work
  not-found.tsx           404
  error.tsx               error boundary
  sitemap.ts robots.ts    generated, not static files
```

## Rendering

Almost everything is a server component. The four client components exist
because they need browser state and nothing else does:

| Component | Why it is a client component |
| --- | --- |
| `Header` | scroll state, drawer state, `usePathname` |
| `CommandPalette` | keyboard handling and focus management |
| `WorkFilters` | writes the query string via the router |
| `CursorGlow` | pointer events |
| `ThemeToggle` | reads the resolved theme |
| `CaseStudyNav` | IntersectionObserver for the active section |

`SiteShell` wraps every page so the header, footer, skip link, and landmark
structure are declared once.

## Data flow

`lib/data/*` is the single source of truth. Nothing about a project is written
twice.

```
projects.ts
  ├─ getFeaturedProjects()  → homepage Selected Work + hero status panel
  ├─ filterProjects()       → /work, driven by ?filter=
  ├─ getCaseStudyProjects() → generateStaticParams for /work/[slug]
  ├─ getProjectBySlug()     → case-study pages
  ├─ sortedProjects         → command palette
  └─ archiveEntries         → /archive
```

The hero's status panel is derived from `projects.ts`, not hand-written. That is
deliberate: a status readout that can drift from the project data is a status
readout that will eventually lie.

## Status model

Two independent fields, because one would be ambiguous:

- `status` — where the project is in its own life: `active`, `shipped`,
  `prototype`, `paused`, `archive`, `learning`.
- `deployment.status` — whether a stranger can use it: `live`, `offline`,
  `private`, `none`.

So `shipped` + `offline` and `active` + `private` are both expressible, and the
UI only renders an "Open project" link when `deployment.status === "live"`.

## Project imagery

Three cases, resolved in `ProjectVisual`:

1. **Real screenshot** — `media.desktop`, a WebP in `public/work/`, served
   through `next/image` with explicit dimensions so nothing shifts on load.
2. **Architecture diagram** — `media.diagram`, for a kernel, a private
   deployment, or a Python package. Built from CSS and an ordered list rather
   than a fixed SVG, so it reflows on a phone and reads correctly to a screen
   reader. Has a `compact` density for grid cards.
3. **Neither** — a plain frame saying there is no public deployment.

There is no fourth case where a product UI is invented.

## Styling

Tailwind CSS 4 with tokens defined in `app/globals.css`. Both themes are written
out explicitly; dark is not an inversion of light.

Layout uses three container widths chosen per content type
(`container-prose` / `container-default` / `container-wide`) and one spacing
rhythm (`.section` / `.section-sm` / `.section-lg`), so no section invents its
own padding.

## Migration from V2

`next.config.mjs` redirects every public V2 route. Each rule carries a comment
explaining where its content went. No rule targets a path that is itself
redirected, so there are no chains or loops.

Removed concepts and where they went:

| V2 | V3 |
| --- | --- |
| Projects | Work |
| Lab | folded into Workbench; the OS explainer became a case-study section |
| Blueprints | Workbench incubator, marked unbuilt |
| Timeline | Experience (professional) and Archive (learning) |
| Now | a section of About |
| Roadmap | per-project status on Work |
| Learning | Archive |
| Artifacts | removed; every entry was a placeholder with no file behind it |
| Blog | removed; the content was template filler, not authored writing |
| Graveyard | Archive |
