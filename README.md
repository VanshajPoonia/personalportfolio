# vanshajpoonia.com

Personal site for Vanshaj Poonia, full stack and AI developer.

Live: <https://vanshajpoonia.com>
GitHub: <https://github.com/VanshajPoonia>

## What this is

A portfolio built like an instrument panel: **each project is a channel with a
lamp, a reading and a calibration date.** Product screenshots and schematics
lead. Engraved legends, pilot lamps and one rotary selector frame them.

The other governing rule is that nothing on the site claims more than the
evidence supports. Build status and deployment status are separate fields.
Open-source contributions record their real merge state. A project with no
working deployment says so rather than offering a dead button. The research page
says the study is unpublished and has no results, because it is and it does not.

## Sections

| Route | What lives there |
| --- | --- |
| `/` | Hero, selected work, engineering spectrum, and previews of everything else |
| `/work` | Every project, filterable via `?filter=` |
| `/work/[slug]` | Long-form case studies for the four flagship projects |
| `/experience` | Professional and collaborative engineering, plus client delivery |
| `/open-source` | Authored pull requests to other people's projects, with verified status |
| `/research` | One in-progress, unpublished study, described without a result |
| `/about` | Background, a compact "now" block, and grouped tools |
| `/workbench` | Developer notebook, plus the incubator of unbuilt design studies |
| `/workbench/[slug]` | Individual notes |
| `/workbench/incubator/[slug]` | Individual design studies |
| `/archive` | Earlier work, one entry per project family |

Every V2 route redirects to its successor. The map is in `next.config.mjs` with
a comment explaining each decision.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, `next-themes`,
`lucide-react`, Vercel Analytics. That is the whole dependency list, and it is
short on purpose: the command palette, filters, diagrams, and status badges are
all hand-written rather than pulled in.

## Content architecture

All content is typed data under `lib/data/`. Pages are views over it, never a
second copy of it.

| File | Owns |
| --- | --- |
| `site.ts` | Identity, navigation, positioning copy, social links |
| `projects.ts` | Every project and archive entry, plus the filter logic |
| `case-studies.tsx` | Long-form case-study bodies, keyed by project slug |
| `experience.ts` | Roles, client delivery, skill groups |
| `open-source.ts` | Contributions with verified merge status |
| `workbench.ts` | Notebook entries |
| `blueprints.ts` | Incubator design studies |
| `research.ts` | The in-progress study, its protocol, and what is not yet published |

### Adding a project

1. Add an entry to `projects` in `lib/data/projects.ts`.
2. Set `status` (is it still being worked on) and `deployment` (can a stranger
   open it) independently. Use `deployment.note` to explain anything that is not
   plainly `live`.
3. Add a screenshot to `public/work/` as WebP and reference it in `media`, with
   real alt text. If there is no honest screenshot, use a `diagram` instead and
   add its stages to `components/work/project-diagram.tsx`. Do not invent a
   product UI.
4. Set `featured: true` only if it belongs in the homepage's four.
5. For a case study, set `caseStudy: true` and add a matching key to
   `caseStudies` in `lib/data/case-studies.tsx`.

Sitemap, command palette, homepage, filters, and the spectrum section all read
from that one entry.

### Updating open-source contributions

`lib/data/open-source.ts` holds curated entries, not a live GitHub feed, so
statuses cannot silently rot into a lie. Before publishing a change, re-check
each pull request and bump `contributionsLastVerified`:

```bash
gh api repos/OWNER/REPO/pulls/NUMBER \
  -q '[(.number|tostring), .state, (.merged|tostring), (.additions|tostring), (.deletions|tostring)] | @tsv'
```

Never list a fork as a contribution. Label an unmerged pull request `open`.

### Verifying project links

`projectsLastVerified` in `lib/data/projects.ts` is a promise that every
deployment URL was opened by hand. Re-check it when you touch that file.

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
pnpm build      # production build
pnpm start      # serve the production build
```

There is no test suite; the site is static content with a handful of client
components, and correctness here means the links resolve and the claims are
true. Run `pnpm lint && pnpm typecheck && pnpm build` before pushing, then open
the built site and click through it.

`pnpm-lock.yaml` is what Vercel installs from. If `package.json` changes, commit
the regenerated lockfile with it.

## Layout

```
app/           routes, metadata, sitemap, robots, error and 404 pages
components/
  layout/      Container, Section, SectionHeader, PageHeader
  home/        homepage sections
  work/        project cards, diagrams, filters, case-study nav
  ui/          status badges, external links, tech lists
lib/data/      all content
public/work/   project screenshots (WebP)
docs/          architecture and contribution notes
```

## Conventions

- Four greys and one amber lamp. Amber marks a state or the one primary key,
  never a border, heading or link.
- No shadow, blur, glow or gradient. Depth comes from plates and seams.
- Archivo for everything, condensed for legends. Real code uses the system
  monospace.
- Motion is the instrument's own: the selector clicks to each detent, lamps
  warm up, schematics draw in once. All of it stands down under
  `prefers-reduced-motion`. The full system is in DESIGN.md.
- Planned features live in a "what's next" section, never in "what I built".
