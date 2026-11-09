# VanshajPoonia.com — Portfolio V3
# Portfolio V3 — Implementation Brief

> **Execution note:** This document is a complete implementation specification, not a brainstorming document. Read it in full before making changes. Factual details in this document must be cross-checked against the current repository, GitHub history, and live deployments. Current verifiable evidence wins when a factual detail has become outdated, while the strategic/product direction of this brief should be preserved.

> After implementation, reread this entire document and perform a second-pass compliance audit before declaring the task complete.
## Complete implementation, content, UX, verification and migration brief

You are working directly on the personal portfolio of **Vanshaj Poonia**.


This is not a request for another design proposal.

Your responsibility is to:

> **audit the existing portfolio, audit the source material around Vanshaj's work, make the necessary product/design decisions, implement Portfolio V3 in the existing repository, verify it thoroughly, and leave the repository production-ready.**

---

# 0. Canonical sources

Primary production site:

```text
https://vanshajpoonia.com
```

Primary current portfolio repository:

```text
VanshajPoonia/personalportfolio
```

GitHub profile:

```text
https://github.com/VanshajPoonia
```

Before assuming any project, contribution, role, status, live URL, title or technical claim is correct:

**verify it.**

Use, in descending confidence:

1. current source code
2. current GitHub repository
3. current merged/open PR history
4. current deployment
5. current résumé/CV if available
6. existing portfolio data
7. historical materials
8. this implementation brief

If this prompt conflicts with verifiable current source material, prefer the verifiable current source material.

However, preserve the strategic direction of this brief.

---

# 1. First rule: audit before editing

Do not immediately rewrite `page.tsx`.

Before changing the codebase, inspect:

```text
app/
components/
lib/
lib/data/
public/
styles/
docs/
package.json
next.config.*
README
robots
sitemap
metadata
structured data
analytics
theme handling
current routes
existing redirects
project detail routes
Workbench
Research
Blueprints
Timeline
Roadmap
Learning
Artifacts
Blog
```

Also inspect:

* current production desktop
* current production mobile
* current light mode
* current dark mode
* GitHub repositories
* recent GitHub PR history
* currently hosted project deployments
* screenshots/assets already in the repository
* stale URLs
* old route backlinks
* current metadata
* current README claims

Document the findings briefly in your working notes before implementation.

Do not ask the user to manually tell you things you can verify yourself.

---

# 2. What is wrong with Portfolio V2

The current portfolio has a distinctive visual identity but an overly fragmented information architecture.

Current concepts include things like:

```text
Projects
Lab
Workbench
Blueprints
Research
Now
Roadmap
Timeline
Learning
Artifacts
Blog
```

This makes the visitor learn the site's internal organizational system before learning about Vanshaj.

That is backwards.

The redesigned site should answer:

```text
What has he built?
What is actually live?
What is technically difficult?
What is he building now?
What has he done professionally?
Where has he contributed to open source?
How deep does the work go?
Can I inspect it?
```

within roughly the first minute.

---

# 3. New portfolio identity

The website should no longer primarily position itself as:

> Not a portfolio. A living developer lab.

Retire that as the main identity.

The new conceptual positioning is:

> **A product engineer's body of work with systems-engineer personality.**

Primary engineering idea:

> **From interfaces to infrastructure.**

Secondary principle:

> **Show the thing before explaining the thing.**

Vanshaj's range should feel intentional:

```text
Product UI
↓
Full-stack applications
↓
AI products
↓
AI infrastructure / tooling
↓
Machine-learning internals
↓
Developer tooling
↓
Systems engineering
↓
Operating-system work
```

The portfolio should communicate technical curiosity across abstraction layers.

---

# 4. Current professional positioning

The portfolio should primarily position Vanshaj as:

```text
Full Stack & AI Developer
```

or a closely related formulation supported by his latest current professional material.

Do not automatically use:

```text
Principal Engineer
Technical Director
Researcher
AI Researcher
ML Researcher
```

unless the latest verifiable résumé/public profile supports the exact title.

For company roles, resolve the most recent accurate title from current material.

Known professional contexts worth auditing include:

```text
Kreativ Vantage
Hypnosys
```

Potential title history includes variants around:

```text
Co-Founder
Technical Director
Technical Lead
Principal Engineer
Founder
Full-Stack Developer
```

Choose the current truthful title rather than combining all titles into an inflated one.

---

# 5. Research correction

This is important.

Vanshaj is **not currently doing active research**.

Remove active-research language from:

* hero
* current-focus arrays
* ASCII UI
* homepage
* metadata
* OpenGraph copy
* structured data
* About
* README
* navigation descriptions

Do not present:

```text
Exploratory research papers
Quantum research
Active ML research
Research experiments
```

as present-tense activity.

---

# 6. Research page nuance

Do not necessarily erase real past work.

The correct distinction is:

```text
CURRENT RESEARCH
Coming Soon

PAST / ARCHIVED RESEARCH
only if real, verified and publicly appropriate
```

If actual historical research papers/proposals exist and are worth showing, they may appear under:

```text
Past Research
Earlier Research
Archive
```

with their original dates/status.

Never rewrite old research as current research.

Suggested page direction:

```text
/RESEARCH

Research

I'm currently focused on engineering and shipping software.

New research work will appear here when I have
something worth publishing.

CURRENT STATUS
○ Coming soon
```

Optional below that:

```text
Past work
```

only if verified content exists.

---

# 7. Preserve the existing design DNA

Do not replace the current site with a generic portfolio template.

Preserve the strongest existing qualities:

* Geist
* Geist Mono
* neutral dark/light palette
* teal/green technical accent
* subtle glass treatment
* terminal vocabulary
* thin borders
* developer-console details
* cursor glow
* ASCII accents
* technical status labels
* dark mode
* light mode

But change the proportion.

Current site approximately feels like:

```text
60% terminal aesthetic
25% glass interface
15% portfolio
```

Target:

```text
25% terminal aesthetic
25% editorial
50% actual work/product imagery
```

The terminal aesthetic frames the work.

It does not replace the work.

---

# 8. Design character

Target visual description:

> **Terminal × editorial × product showcase**

References conceptually:

* clean engineering tools
* technical documentation
* product case studies
* high-end developer websites
* restrained editorial layouts
* command-line interfaces

Avoid looking like:

* gaming landing page
* crypto landing page
* hacker movie
* neon cyberpunk dashboard
* generic shadcn SaaS
* résumé template

---

# 9. Accent discipline

The teal/green should become more meaningful.

Approximate desired distribution:

```text
90% neutral
8% muted surface
2% accent
```

Accent should communicate:

```text
ACTIVE
LIVE
selected state
focus
interactive affordance
```

Do not apply the accent to every border and every heading.

---

# 10. Typography rules

Keep:

```text
Geist
Geist Mono
```

Use Geist for:

* headings
* project descriptions
* case-study prose
* About
* Experience
* long reading

Use Geist Mono for:

* statuses
* dates
* metadata
* small labels
* code
* category names
* command UI
* terminal surfaces

Avoid long body paragraphs entirely in monospace.

---

# 11. Animation rules

Keep carefully:

* cursor glow
* subtle reveal
* hover transitions
* micro status pulse
* occasional terminal typing
* responsive project-image movement
* command palette transitions

Reduce:

* constant floating
* repeating glitch
* unnecessary shimmer
* looping typewriters
* moving objects that never settle
* animation on every section

Animation should support hierarchy.

It should not prove that the developer knows CSS animation.

---

# 12. Reduced motion

Respect:

```css
prefers-reduced-motion
```

Disable or simplify:

* smooth animated scrolling
* typewriter
* float
* parallax
* cursor glow tracking where necessary
* major entrance transitions

The page must remain fully comprehensible with animation disabled.

---

# 13. New information architecture

Primary navigation:

```text
Work
Experience
Open Source
Research
About
```

Utility:

```text
GitHub ↗
⌘K
```

Secondary content:

```text
Workbench
Archive
```

Potential structure:

```text
/
├── /work
│   └── /[slug]
├── /experience
├── /open-source
├── /research
├── /about
├── /workbench
└── /archive
```

If keeping `/projects/[slug]` is substantially better for URL stability, that is acceptable.

The visible label can still be **Work**.

---

# 14. Old route migration

Audit every existing public route.

Do not silently delete URLs with existing content.

For each old route choose one of:

```text
KEEP
MERGE
REDIRECT
ARCHIVE
REMOVE
```

Likely:

```text
/projects     → /work
/timeline     → /experience
/now          → /about#now
/learning     → /workbench or /archive
/artifacts    → relevant project/workbench entries
/roadmap      → project-specific status
/blueprints   → project case studies/workbench architecture
```

Workbench can remain.

Research remains.

Do not create redirect loops.

Use permanent redirects only where appropriate.

---

# 15. Navigation behavior

Desktop:

* concise
* no oversized mega-menu
* active destination visible
* GitHub external-link marker
* command palette affordance

Mobile:

* compact menu
* no horizontal overflow
* no tiny link targets
* sensible drawer/sheet
* keyboard accessible

Do not turn the mobile portfolio into an app-style five-button bottom navigation unless it materially improves the experience.

This is a website, not a dashboard.

---

# 16. Homepage hierarchy

Implement approximately:

```text
01 Hero
02 Selected Work
03 Engineering Spectrum
04 Experience
05 Open Source
06 Workbench
07 Research
08 Contact
```

Do not mechanically add sections beyond this unless justified.

---

# 17. Hero

Retire the current hero identity.

Direction:

```text
VANSHAJ POONIA

I build software
across the stack.

Full-stack products, AI systems,
developer tools and occasionally
an operating system.

Explore Work →
GitHub ↗
```

Possible supporting idea:

```text
From interfaces to infrastructure.
```

You may improve the actual sentence.

Do not use:

```text
passionate developer
tech enthusiast
innovative solutions
building the future
turning ideas into reality
cutting-edge technology
```

---

# 18. Hero right-side visual

Keep the concept of the terminal/instrument panel.

Remove fake skill bars.

Do not show:

```text
AI ████████░░
systems █████████░
research ████░░░░░░
```

Instead show real status information.

Example:

```text
vanshaj://status

NOW BUILDING

chronosapien
Rust / x86_64
● ACTIVE

projectmanagementatlas
Product / AI / workflow
● ACTIVE

tensortrail
Python / ML internals
● ACTIVE
```

Only mark statuses after verification.

---

# 19. No fake dynamic metrics

Do not create fake:

* commit counters
* uptime
* repository counts
* stars
* contribution graphs
* issue counts
* project counts
* hours coded
* lines of code

If showing GitHub metrics, either:

1. fetch actual values safely at build/cached runtime, or
2. use static verified values with a clear source/date, or
3. omit them.

Omission is preferable to fake activity theatre.

---

# 20. Work becomes the main product

The `/work` page is the core destination.

It should support meaningful filtering without turning into a portfolio database.

Suggested visible filters:

```text
All
Featured
Live
Systems
AI / ML
Developer Tools
Product
```

Optional:

```text
Creative
Archive
```

Do not expose 15 overlapping taxonomies.

---

# 21. Filter behavior

Good implementation:

```text
/work?filter=ai
/work?filter=systems
```

Benefits:

* shareable
* back-button compatible
* refresh safe

Do not keep filter state only in ephemeral React state if URL state is easy to support.

On mobile, allow horizontal scroll or compact wrapping.

---

# 22. Project model redesign

Refactor the current project model.

A reasonable shape:

```ts
type ProjectStatus =
  | "active"
  | "shipped"
  | "prototype"
  | "paused"
  | "archive"
  | "learning";

type DeploymentStatus =
  | "live"
  | "offline"
  | "private"
  | "none";

interface Project {
  slug: string;
  title: string;
  canonicalName?: string;

  tagline: string;
  summary: string;
  description?: string;

  year: string;
  status: ProjectStatus;

  categories: string[];
  technologies: string[];

  featured?: boolean;
  priority?: number;

  github?: string;
  deployment?: {
    status: DeploymentStatus;
    url?: string;
  };

  caseStudy?: string;

  media?: {
    hero?: string;
    mobile?: string;
    gallery?: string[];
    alt?: string;
  };

  role?: string;
  collaboration?: string;

  highlights?: string[];
  engineering?: string[];

  legacyNames?: string[];
}
```

Do not copy this type blindly if the current architecture can achieve the same more cleanly.

---

# 23. Separate build status from deployment status

Avoid ambiguous statuses.

Example:

```text
ACTIVE + LIVE
SHIPPED + LIVE
SHIPPED + OFFLINE
PAUSED + PRIVATE
ARCHIVE
```

A project can be:

```text
status: active
deployment: live
```

or:

```text
status: shipped
deployment: offline
```

This is more meaningful than a single status property.

---

# 24. Verify all live URLs

For every deployment:

1. request it
2. verify HTTP success
3. open it in a browser
4. verify it actually renders the intended product
5. verify it is not auth-broken
6. check console errors
7. determine whether it is portfolio-worthy

Only then mark:

```text
LIVE
```

If unreachable:

```text
Source only
Deployment unavailable
Archived
```

Do not show dead `Open Project` buttons.

---

# 25. Canonical repository detection

Several ideas/projects have multiple historical repositories.

Do not create duplicate portfolio projects for repo history.

Examples to audit carefully:

```text
AI Interview Platform
Codash family
code-server family
portfolio versions
ChronoOS / Chronosapien naming
pathfinding duplicate repos
sorting visualizer duplicate repos
```

Consolidate each project family into one canonical portfolio entry.

Historical repositories can be linked in case-study context if useful.

---

# 26. Project family rule

Treat:

```text
project
├ frontend repo
├ backend repo
├ docs repo
├ trial repo
├ payment repo
└ deployment repo
```

as one product unless these are genuinely separate products.

This is especially important for the historical Codash family.

Do not inflate project counts from multi-repo architecture.

---

# 27. Project selection scoring

When deciding homepage prominence, score candidates approximately by:

```text
Engineering depth
Uniqueness
Implementation completeness
Recency
Professional relevance
Live usability
Visual quality
Technical storytelling potential
External validation
Maintenance/current activity
```

Do not rank primarily by:

```text
repo size
number of dependencies
number of files
number of GitHub repos
```

---

# 28. Likely flagship/current audit set

Investigate at minimum:

```text
Chronosapien
Project Management ATLAS
TensorTrail
AI Interview Platform
Intacct
Volt
Codash
ASCII Camera
GzoneSphere
```

Do not assume every item belongs in Selected Work.

---

# 29. Chronosapien

Canonical repository:

```text
VanshajPoonia/chronosapien
```

This should likely remain flagship.

Audit the current implementation.

Existing/known engineering areas include:

* Rust
* `no_std`
* x86_64
* QEMU
* kernel boot
* framebuffer
* serial logging
* shell
* interrupts
* memory
* filesystem
* built-in programs
* persistent ChronoFS work

There is recent work around:

```text
Persistent chronofs storage
```

Verify current state.

---

# 30. ChronoOS naming

Historical professional materials may refer to:

```text
ChronoOS
```

while the current public project is:

```text
Chronosapien
```

Determine the relationship.

Do not show them as two unrelated flagship OS projects if Chronosapien is the evolved/canonical project.

Possible case-study notation:

```text
Chronosapien
formerly / evolved from ChronoOS
```

only if historically accurate.

---

# 31. Chronosapien case-study opportunities

Potential technical visuals:

* boot flow
* memory layout
* interrupt path
* shell architecture
* filesystem architecture
* boot screenshot
* framebuffer console screenshot

Prefer actual QEMU screenshots where possible.

Do not fake OS screenshots.

---

# 32. Project Management ATLAS

Canonical repository:

```text
VanshajPoonia/projectmanagementatlas
```

This project is much more substantial than the old portfolio implies.

Audit deeply.

Recent actual work includes areas such as:

* project/board/task management
* task detail views
* subtasks
* "Work on next" ranking
* privacy/RLS
* private board enforcement
* marketing/calendar state
* data-aware AI
* workspace-data tools
* general AI mode
* Tavily-powered web search
* safe URL fetching
* SSRF protection
* multimodal attachments
* image/PDF/audio/video input
* YouTube input
* model routing
* per-mode rate limiting
* test infrastructure
* CI
* shared application shell
* sidebar architecture
* breadcrumbs
* command palette
* deep-linkable sections
* mobile navigation
* role/module gating
* managed task statuses
* teams
* board-member scopes
* cross-tenant isolation
* migration safety
* production-write safeguards

This is a strong demonstration of:

```text
product engineering
AI integration
security
data architecture
authorization
UX systems
incremental refactoring
```

Do not dump this entire feature list onto a card.

Use it to create an excellent case study.

---

# 33. ATLAS naming conflict

There may be other "Atlas" client/business contexts.

The personal project should be clearly called something like:

```text
Project Management ATLAS
```

or its current canonical product name.

Avoid confusion with unrelated business/client work.

---

# 34. TensorTrail

Canonical repository:

```text
VanshajPoonia/TensorTrail
```

Audit the current code before writing final claims.

Past professional documentation indicates deeper implementation than the current portfolio currently communicates, potentially including:

* reverse-mode autodiff
* broadcasting gradients
* CNN/pooling
* serialization
* graph export
* validation
* checkpoints
* substantial automated tests

Verify all claims directly.

This project matters because it demonstrates:

> understanding ML internals instead of only consuming AI APIs.

---

# 35. AI Interview Platform

There are multiple related repositories.

Audit:

```text
VanshajPoonia/interview-platform
VanshajPoonia/interviewplatform
VanshajPoonia/interview-platform-for-brands
```

Find the canonical product.

A previous hosted URL has been:

```text
https://interview.vanshajpoonia.com
```

Verify it.

Do not create three portfolio items merely because three repositories exist.

Explain evolution if useful.

---

# 36. Volt

Historical professional material has listed a hosted developer tool at approximately:

```text
volt.vanshajpoonia.com
```

Audit current source/deployment.

If presentable:

```text
Developer Tools
```

If broken/outdated:

```text
Archive
```

Do not create missing repository claims.

---

# 37. Codash

Codash has a deeper historical footprint than the current portfolio suggests.

Repositories include historical pieces around:

* browser IDE
* code server
* backend
* deployment
* meetings/collaboration
* trial
* payment
* support
* docs

Treat this as a **project lineage**, not ten projects.

If no longer actively maintained, create an archive entry with an interesting retrospective:

```text
Codash
Early attempt at a browser-based developer platform.
```

Potential case-study angle:

> what an ambitious early developer-tool project taught me about scope.

That can be more compelling than pretending it is current.

---

# 38. Intacct

Audit before keeping flagship status.

Possible valuable areas:

* enterprise UX
* dense information systems
* finance workflows
* role-based access
* reporting
* auditability
* service architecture

If much of it is conceptual/mock architecture rather than a robust working implementation, demote it.

Evidence over category balance.

---

# 39. ASCII Camera

Creative browser work is useful for personality.

Audit canonical deployment, possibly including historical:

```text
asciicam.vanshajpoonia.com
```

or current Vercel URL.

Use as:

```text
Creative Coding
```

This is a great visual card.

It need not be a core engineering flagship.

---

# 40. GzoneSphere

There is substantial current/collaborative work around GzoneSphere.

Audit actual public repository/work:

```text
VanshajPoonia/gzonesph
```

Recent engineering includes examples such as:

* security authorization fixes
* community chat/presence
* community architecture
* DB-backed game browsing
* onboarding
* profile themes
* Drizzle client initialization
* production-build concerns

Wider product architecture has included:

* gamers
* developers
* communities
* businesses
* profiles
* content
* progression
* XP / levels
* trust systems
* domain ranks
* LFG
* tournaments
* subscriptions
* payments
* commissions
* moderation
* gaming content/reviews

Do not claim the entire platform as Vanshaj's solo work if it is collaborative.

If shown, clearly indicate:

```text
role
contribution
ownership boundary
```

---

# 41. Older AI/algorithm experiments

The GitHub history includes other potentially interesting older work such as:

```text
face-recognition
flappy-bird-playing-ai
pathfinding-visualizer
sorting-visualizer
physicsviz
```

Do not promote these to modern flagship work automatically.

Potentially useful under:

```text
Archive
Earlier AI
Learning Builds
```

Their value is showing trajectory.

---

# 42. Older clone projects

Keep older clones honest.

Examples may include:

* Discord clones
* Mewtube
* Moogle
* Facebook/Instagram/WhatsApp clones
* streaming clones
* blockchain clones
* Google ecosystem clones

Do not delete the history.

Do not present these beside current flagship engineering as equivalent work.

Archive them.

---

# 43. Archive philosophy

Create a deliberate archive.

Suggested copy concept:

```text
Not everything here is impressive.
That's the point.
```

or a similarly understated version.

Purpose:

* show chronology
* preserve old work
* demonstrate growth
* prevent old projects cluttering the current portfolio

Group by year.

---

# 44. Archive deduplication

Where duplicate repos exist:

```text
sorting-visualizer
Sorting-Visualiser
```

etc.

Show one canonical historical item.

Do not leak repository clutter into portfolio clutter.

---

# 45. Engineering Spectrum

Create a visually strong homepage section explaining project diversity.

Possible structure:

```text
I LIKE MOVING BETWEEN ABSTRACTION LAYERS.

PRODUCT
│ Project Management ATLAS
│
AI / ML
│ AI Interview Platform
│ TensorTrail
│
TOOLS
│ Volt
│ Codash
│
SYSTEMS
│ Chronosapien
▼
LOWER LEVEL
```

This must be responsive.

On mobile, convert gracefully to a vertical sequence.

Do not rely on a huge fixed SVG that becomes unreadable.

---

# 46. Project cards

Modernize them substantially.

Each prominent project should have:

* real visual
* category
* status
* concise summary
* 3–5 meaningful technologies
* live/source/case-study actions

Example:

```text
01 / SYSTEMS                     ● ACTIVE

CHRONOSAPIEN

A hobby operating system written in Rust.

Rust · x86_64 · QEMU · no_std

SOURCE ↗
CASE STUDY →
```

---

# 47. Project-card content density

Do not write 150-word cards.

Aim:

```text
tagline: 5–12 words
summary: ~20–40 words
technologies: 3–6
```

Depth belongs in the case study.

---

# 48. Project imagery

For visual web projects:

use real screenshots.

For systems/backend work:

use:

* architecture diagram
* terminal capture
* QEMU capture
* relevant real code/interface
* tasteful technical illustration derived from actual architecture

Never fabricate a product UI that does not exist.

---

# 49. Screenshot capture

For every portfolio-worthy live project:

capture at minimum:

```text
desktop ~1440px
mobile ~390px
```

Choose the strongest relevant screen.

Do not always screenshot the marketing homepage if the actual product dashboard demonstrates more.

---

# 50. Screenshot optimization

Store optimized images.

Use:

* Next Image where appropriate
* responsive sizes
* sensible compression
* WebP/AVIF if existing pipeline supports it
* lazy loading below fold
* proper dimensions to prevent CLS

Do not ship multi-megabyte screenshots unnecessarily.

---

# 51. Image alt text

Write meaningful alt text.

Bad:

```text
project screenshot
```

Good:

```text
Project Management ATLAS dashboard showing board navigation and task overview
```

Decorative terminal visuals should use empty alt / hidden semantics appropriately.

---

# 52. Case studies

Create substantial case studies for the strongest projects.

Likely candidates:

```text
Chronosapien
Project Management ATLAS
TensorTrail
```

Potential fifth/sixth:

```text
AI Interview Platform
GzoneSphere / Intacct / Volt
```

based on audit.

---

# 53. Case-study structure

Use approximately:

```text
Hero
Project status
Live/source actions
Large visual

Overview

Problem / motivation

What I built

Architecture

Key engineering decisions

Hard problems

Tradeoffs

Security / reliability where relevant

Testing / verification

What I learned

Current state / what's next

Related Work
```

Do not force every section onto every project.

---

# 54. Technical diagrams

Prefer simple readable diagrams over huge architecture spaghetti.

For ATLAS, potential diagrams:

```text
UI
↓
Application layer
↓
Supabase / RLS
↓
AI tool execution
```

For Chronosapien:

```text
boot
↓
kernel
↓
interrupts/memory
↓
filesystem
↓
shell/apps
```

For TensorTrail:

```text
tensor
↓
operation graph
↓
autograd
↓
gradient propagation
```

---

# 55. Code snippets

Use code snippets sparingly.

Only include snippets that demonstrate an interesting design decision.

Do not paste entire source files.

Support:

* syntax highlighting
* copy button where helpful
* horizontal overflow handling
* mobile-safe layout

---

# 56. Experience

Create `/experience`.

The current generic developer Timeline is not sufficient.

Focus on actual professional engineering responsibility.

---

# 57. Kreativ Vantage

Audit latest role/title.

Potential responsibilities include:

* full-stack product delivery
* AI integrations
* database/auth
* deployments
* hosting
* domain infrastructure
* workflow automation
* technical client communication
* ongoing production support
* technical architecture

Do not invent client metrics.

---

# 58. Hypnosys

Audit public/current evidence.

Potential positioning:

```text
Founder / Full-Stack Developer
```

Use only if supported.

Explain what type of engineering/product work occurred.

Do not duplicate the same responsibility bullets from Kreativ Vantage.

---

# 59. Client work

There are many client-oriented repositories and builds.

Examples across the account may include:

* local business websites
* property/listing sites
* contractor sites
* professional-service sites
* automations
* CRM integrations

Do not dump these all into Work.

Potentially create under Experience:

```text
Selected Client Delivery
```

with 2–4 representative examples.

---

# 60. Private/client confidentiality

Never expose:

* private repo URLs
* API keys
* private business logic
* customer datasets
* private credentials
* internal emails
* proprietary analytics
* sensitive CRM architecture
* client information that is not public

If discussing private systems, describe capability-level architecture.

---

# 61. Integration/automation engineering

There is meaningful work in private/client integration systems, including workflows around:

* SFTP
* historical imports
* source-integrity validation
* idempotency
* databases
* HubSpot-style CRM synchronization
* safety checks
* scheduled workflows

This may be useful to communicate as professional engineering experience.

Do not expose customer-specific implementation details unless already public and appropriate.

---

# 62. Open Source — major correction

The previous portfolio strategy understated current open-source work.

There is now substantial recent PR evidence.

Create a real `/open-source` page.

This should be one of the portfolio's strongest secondary pages.

---

# 63. Open Source source-of-truth

Search GitHub for PRs authored by:

```text
VanshajPoonia
```

For each candidate, verify:

* repository
* PR status
* merged/open/closed
* issue linkage
* scope
* actual authored work
* review outcome
* current relevance

Do not list forks as contributions.

---

# 64. Strong recent Open Source candidates to audit

There are recent contributions involving projects such as:

```text
AOSSIE-Org/PictoPy
RocketChat/Rocket.Chat
google/googletest
adobe/react-spectrum
openwisp/ansible-openwisp2
```

These are much stronger signals than an old list of forked repositories.

Audit actual status before publishing.

---

# 65. PictoPy contributions

Recent authored PRs include substantial areas such as:

* test-database isolation
* CI/lint workflow security
* face-cluster correctness
* async/background reclustering
* video-player accessibility
* zoom/pan production behavior
* build-feature naming and sidecars
* database behavior
* repository cleanup/documentation quality

Potential PR examples to verify include numbers around:

```text
#1498
#1480
#1442
#1392
#1374
#1354
#1353
#1349
#1295
```

Do not show all of them.

Curate perhaps 2–4 strongest contributions.

---

# 66. Rocket.Chat contributions

There are authored PRs involving areas such as:

* reconnect message synchronization
* permissions UI refactoring
* media-call view synchronization
* DeepL translation behavior
* overlay/react-aria internals

Verify current PR states.

If merged/significant, these can be excellent open-source examples.

---

# 67. GoogleTest / React Spectrum / OpenWISP

There are authored contributions involving:

```text
google/googletest
adobe/react-spectrum
openwisp/ansible-openwisp2
```

Verify whether they were merged/accepted.

Do not imply contribution acceptance from merely opening a PR.

Use labels such as:

```text
Merged
Open
Proposed
```

accurately.

---

# 68. Open-source card model

Each selected contribution:

```text
PROJECT

Contribution title

One or two sentences explaining:
problem → engineering change → impact

PR #xxxx ↗
MERGED
```

Optional metadata:

```text
TypeScript
Python
Rust
CI
Testing
Accessibility
```

depending on contribution.

---

# 69. Open source categories

Potential structure:

```text
Selected Contributions
Current Open PRs
Personal Open Source
```

Do not show closed/unmerged rejected PRs as achievements without context.

If an open PR is technically strong, label it explicitly:

```text
OPEN
```

---

# 70. Personal open source

Separate from external contribution.

Examples may include:

```text
Chronosapien
TensorTrail
```

and other reusable public work.

Do not call every public personal repo "open-source impact."

---

# 71. Old fork activity

The GitHub account historically contains forks such as:

```text
appsmith
appwrite
tailwindcss
atom
brave-browser
```

A fork alone is **not contribution evidence**.

Do not display them unless actual upstream contributions can be verified.

---

# 72. About

Create a concise About page.

Avoid:

> Hi, I'm Vanshaj and I'm passionate about technology.

Possible tone:

> I started with websites, moved into products and AI systems, and eventually became curious enough about what was beneath the abstraction layers to start writing an operating system.

Then move into:

* current engineering focus
* current role
* technical interests
* how Vanshaj approaches learning/building

---

# 73. About — current interests

Potential categories, subject to current verification:

```text
Product engineering
AI systems
Developer tools
Systems programming
Machine-learning internals
Open source
```

Do not call research a current focus.

---

# 74. Now module

Do not keep a large `/now` page unless audit shows it is exceptionally useful.

Add a compact section on About:

```text
NOW

Building
Learning
Contributing
Exploring
```

Keep it concise.

---

# 75. Skills

Do not use percentage bars.

Do not show:

```text
React 95%
Python 90%
Rust 80%
```

Use grouping.

Example:

```text
PRODUCT
TypeScript
Next.js
React
Node
PostgreSQL

AI / ML
Python
LLM integrations
model routing
ML fundamentals

SYSTEMS
Rust
C/C++
Linux
QEMU

INFRA / DATA
Supabase
Postgres
CI/CD
Vercel
GitHub Actions
```

Only include demonstrably used tools.

---

# 76. Experience technology stacks

Do not repeat a giant global technology list under every job.

Each experience item should highlight only technologies relevant to that work.

---

# 77. Workbench

Retain Workbench.

It is a good concept.

But make it secondary.

Position:

> Developer notebook, not a blog.

Use for:

* architecture notes
* debugging writeups
* development lessons
* technical investigations
* implementation logs
* experimental findings

---

# 78. Workbench homepage preview

Only show approximately:

```text
3 entries
```

Choose technically interesting material.

Not necessarily newest.

Allow:

```text
View Workbench →
```

---

# 79. Blog

Audit whether the Blog currently has real, worthwhile finished writing.

If thin:

merge into Workbench or remove from primary architecture.

If substantial:

keep as a secondary hidden/More destination.

Do not create an empty Blog to satisfy old taxonomy.

---

# 80. Blueprints

Blueprint content should be redistributed.

Architecture belonging to real products:

→ project case studies.

Experimental architectures:

→ Workbench.

Avoid retaining a primary "Blueprints" category merely because the data file already exists.

---

# 81. Artifacts

Useful artifacts belong near their context.

Examples:

```text
architecture PDF → project
technical diagram → project
notes → Workbench
research artifact → research
```

Remove the need for visitors to browse an arbitrary artifact warehouse.

---

# 82. Roadmap

Global personal roadmap should be demoted.

Project roadmaps belong on project detail pages.

For active projects show:

```text
Current
Next
Later
```

only where genuinely helpful.

---

# 83. Research component on homepage

Small.

Example:

```text
RESEARCH

○ COMING SOON

Currently focused on engineering and product work.

Research →
```

Do not dedicate 25% of the homepage to inactive research.

---

# 84. Experience homepage preview

Use a compact timeline.

Example:

```text
EXPERIENCE

Kreativ Vantage
Co-Founder / technical role
NOW

Hypnosys
Founder / developer

Open Source
Contributor
```

Resolve exact titles first.

---

# 85. Open Source homepage preview

Show perhaps 2 strong recent contributions.

Example concept:

```text
OPEN SOURCE

PictoPy
Database/test isolation
MERGED

Rocket.Chat
Reconnect message synchronization
OPEN / MERGED

View contributions →
```

Only after status verification.

---

# 86. Command palette

A command palette fits this site well.

Implement:

```text
⌘K
Ctrl+K
```

Search destinations:

```text
Work
Projects
Experience
Open Source
Workbench
About
```

Actions:

```text
GitHub
LinkedIn
Resume
Email
```

---

# 87. Command palette search

Support project-name fuzzy search if current dependencies make this simple.

Do not add a heavy search library for 20 items.

A simple client-side filter is sufficient.

---

# 88. Command palette accessibility

Required:

* focus trap
* Escape closes
* keyboard navigation
* Enter activates
* appropriate dialog semantics
* initial focus
* focus restoration after close

---

# 89. Contact footer

Create a more memorable final CTA.

Tone:

```text
HAVE AN INTERESTING
PROBLEM?

I probably want to hear about it.

EMAIL →
GITHUB →
LINKEDIN →
```

Improve wording if necessary.

Do not use generic:

```text
Let's connect!
```

as the entire section.

---

# 90. Resume

If a résumé PDF exists and is current:

make it easily accessible.

Possible locations:

* About
* Experience
* command palette
* footer
* header utility

Do not show a stale résumé.

If multiple résumés exist, determine latest/current.

---

# 91. Social links

Verify:

* GitHub
* LinkedIn
* X if still relevant
* email

Remove dead social links.

Do not create social accounts that are not already present.

---

# 92. Theme behavior

Keep dark/light support.

Verify:

* first-load system preference
* manual toggle
* persistence
* no flash of incorrect theme
* correct `theme-color`
* correct browser chrome
* contrast in both themes

---

# 93. Theme visual parity

Do not design dark mode beautifully and leave light mode as inverted leftovers.

Verify project imagery and borders in both modes.

---

# 94. Responsive breakpoints

Manually inspect at least:

```text
375–390px mobile
768px tablet
1024px laptop
1440px desktop
```

Optional:

```text
1920px large desktop
```

---

# 95. Mobile details

Check:

* no horizontal overflow
* project image cropping
* terminal panels
* ASCII text
* chips
* filter bar
* navigation drawer
* command palette
* code blocks
* diagram scaling
* footer
* tap targets
* hero wrapping

---

# 96. Desktop details

Avoid the common portfolio problem where content only uses 800px on a huge monitor.

Case-study visuals may be wider.

Text should still maintain comfortable reading width.

---

# 97. Content width system

Use different widths intentionally:

```text
prose → narrow
homepage grids → medium/wide
product screenshots → wide
architecture diagrams → wide
```

Do not apply one `max-w-7xl` blindly to every section.

---

# 98. Spacing rhythm

Establish consistent section rhythm.

Avoid every section using arbitrary:

```text
py-16
py-20
py-24
```

Create reusable layout/container/section primitives if appropriate.

---

# 99. Component architecture

Likely reusable components:

```text
SiteHeader
MobileNavigation
SectionHeader
ProjectCard
FeaturedProject
StatusBadge
ExternalLink
ProjectScreenshot
TechList
CaseStudySection
ExperienceItem
ContributionCard
WorkbenchCard
CommandPalette
ContactCTA
EmptyState
ComingSoon
```

Do not create abstractions for one-time markup unnecessarily.

---

# 100. Data centralization

Keep content in typed data rather than JSX duplication.

Suggested:

```text
lib/data/site.ts
lib/data/projects.ts
lib/data/experience.ts
lib/data/open-source.ts
lib/data/workbench.ts
lib/data/research.ts
```

Archive can derive from Projects where possible.

Avoid maintaining the same project in two independent arrays.

---

# 101. Single source of truth

Example:

```text
projects.ts
```

contains all project facts.

Homepage:

```ts
projects.filter(featured)
```

Work:

```ts
projects
```

Archive:

```ts
projects.filter(status archive/learning)
```

Case studies:

```ts
getProjectBySlug()
```

Do not duplicate project title/tag/status across files.

---

# 102. Runtime GitHub fetching

Do not introduce fragile uncached GitHub API calls into every page render.

If dynamic GitHub information is desirable:

* cache it
* use build-time generation
* handle rate limits
* handle failure gracefully

Static curated contribution data may be safer.

---

# 103. Contribution data freshness

For Open Source data, ideally record:

```ts
verifiedAt
```

or keep a straightforward data file that is easy to refresh.

Do not build a complicated GitHub CMS.

---

# 104. Empty states

Design clean empty states for:

* no filter results
* no current research
* no live deployment
* missing gallery
* archived project

Do not leave blank sections.

---

# 105. Broken external link handling

Audit all external links before shipping.

Do not silently leave:

```text
Open Project ↗
```

pointing to 404.

---

# 106. External links

External links should:

* visibly indicate external navigation where useful
* use secure target behavior
* have meaningful accessible names

Do not add external-link icons to every inline sentence.

---

# 107. Loading states

Most content is static.

Do not create unnecessary skeleton loaders.

Use loading states only where data truly loads asynchronously.

---

# 108. 404 page

Update the existing 404 page to match Portfolio V3.

Keep personality.

Suggested tone:

```text
404
This route doesn't exist.

Back to Work →
```

Avoid giant gimmick animation.

---

# 109. Error page

Ensure existing error boundary still matches new styles.

Do not leave old "lab" terminology there.

---

# 110. Favicon

Audit current favicon.

Ensure:

* correct logo/mark
* works light/dark enough
* correct favicon paths
* no 404s
* Apple touch icon if appropriate

---

# 111. Site identity mark

If the current logo/mark is unclear, create a simple typographic identity:

```text
VANSHJ
VP
>_
```

or similar.

Do not spend excessive time inventing a startup logo.

The name is the brand.

---

# 112. OpenGraph

Create/update proper OG metadata.

At minimum:

```text
homepage
major project pages
```

Project OG could include:

* project name
* category
* strong real screenshot
* Vanshaj Poonia

Do not use broken screenshot URLs.

---

# 113. Metadata

Homepage direction:

```text
Vanshaj Poonia — Full Stack & AI Developer
```

Description should mention a concise combination of:

* full-stack products
* AI
* developer tooling
* systems work

Do not keyword stuff.

---

# 114. Project metadata

Each case study should have:

* unique title
* description
* canonical
* OG
* structured data where useful

---

# 115. Structured data

Audit existing JSON-LD.

Update Person data.

Potential accurate fields:

* name
* URL
* GitHub
* LinkedIn
* job title

Do not put a list of every buzzword in `knowsAbout`.

---

# 116. Sitemap

Update sitemap for:

* new routes
* retained project pages
* removed/redirected pages

Do not include dead routes.

---

# 117. Robots

Audit robots configuration.

Ensure production is indexable.

Avoid accidentally indexing dev/test routes.

---

# 118. Canonicals

Make canonical URLs reflect:

```text
https://vanshajpoonia.com
```

not preview/Vercel URLs.

---

# 119. Old metadata language

Search repository for:

```text
living developer lab
exploratory research
quantum
research notes
open the lab
developer lab
lab://
```

Evaluate every occurrence.

Remove/update stale positioning.

Some decorative `lab` terminology can survive only if deliberately repurposed as a secondary easter egg.

---

# 120. README

Update README after implementation.

README should explain:

* what the site is now
* primary sections
* tech stack
* content architecture
* how to update projects
* verification commands

Remove stale instruction such as:

> Keep public copy aligned with "Not a portfolio. A living developer lab."

---

# 121. Internal documentation

If the repository has docs explaining the old IA, update them.

Do not leave `development.md` telling contributors to preserve deleted sections.

---

# 122. Search old names

Search for obsolete project names or URLs in:

```text
metadata
README
data
case studies
Workbench
Blog
structured data
OG
sitemap
```

Example:

```text
ChronoOS
Chronosapien
```

resolve intentionally.

---

# 123. Security

This is mostly a static portfolio, but maintain:

* safe external links
* sanitized rendered content
* no exposed secrets
* no environment leakage
* no client secrets in bundled JS

Do not over-engineer authentication.

---

# 124. Dependency discipline

Avoid adding dependencies for features that can be implemented simply.

Before installing a package ask:

```text
Does the repository already have something equivalent?
Can this be done in <50 lines correctly?
```

Do not add Framer Motion just to fade cards if CSS already handles it.

---

# 125. Performance goals

Aim for excellent real-world performance.

Prioritize:

* low JS
* optimized imagery
* Server Components where appropriate
* lazy loading
* minimal client components
* no huge animation library
* no expensive global mouse listeners where avoidable

---

# 126. Cursor glow performance

If preserving cursor glow:

* use `requestAnimationFrame` if necessary
* avoid setState every pointermove
* disable on touch devices
* respect reduced motion
* avoid expensive repaint regions

---

# 127. Layout stability

Avoid CLS from:

* screenshots without dimensions
* late fonts
* expanding status panels
* dynamic hero text

---

# 128. Fonts

Use Next font loading appropriately.

Do not add external runtime font fetches unnecessarily.

---

# 129. Lighthouse / performance verification

If environment permits, inspect:

* performance
* accessibility
* SEO
* best practices

Do not chase an artificial 100 if it damages design, but fix obvious issues.

---

# 130. Accessibility baseline

Required:

* semantic HTML
* heading hierarchy
* skip link
* visible focus
* keyboard nav
* landmark regions
* descriptive link names
* alt text
* reduced motion
* adequate contrast
* status not communicated by color alone

---

# 131. Status accessibility

Bad:

```text
green dot
```

Good:

```text
● ACTIVE
```

Color is supplemental.

---

# 132. Project filtering accessibility

Filters should use proper button semantics.

Selected state:

```text
aria-pressed
```

or equivalent appropriate UI.

---

# 133. Touch targets

Aim ~44px minimum for important mobile interactions.

---

# 134. Case-study table of contents

For longer case studies, consider a small sticky/local nav on desktop.

Do not add if the case study is short.

Mobile must remain simple.

---

# 135. Scroll behavior

Anchor navigation should:

* account for sticky header
* respect reduced motion
* not lose focus context

---

# 136. Back navigation

Case-study pages should have a useful:

```text
← Back to Work
```

Do not rely solely on browser back.

---

# 137. Related projects

End case studies with 1–2 related projects.

Example:

```text
TensorTrail → AI Interview Platform
Chronosapien → Codash / systems-related work
```

Use actual thematic relationships.

---

# 138. Project timestamps

Avoid fake precision.

If only year is known:

```text
2026
```

Do not invent month/day.

---

# 139. Current status wording

Use concrete terms.

Good:

```text
Active development
Shipped
Maintained occasionally
Archived
Learning build
```

Bad:

```text
90% complete
almost finished
```

unless measured against an actual roadmap.

---

# 140. Client/portfolio ownership

Every project should know what Vanshaj's role was.

Possible fields:

```text
Solo
Lead developer
Co-founder
Contributor
Collaborative project
Client implementation
```

Do not imply solo authorship when inappropriate.

---

# 141. Experience proof

Where possible link Experience items to:

* public product
* relevant selected work
* open-source profile

Do not link private GitHub repos.

---

# 142. Project Management ATLAS screenshots

Because this application has multiple deep product surfaces, do not use only the login screen.

Capture areas that show actual product maturity, potentially:

* shell/navigation
* board
* task workflow
* AI assistant

Use strongest 2–4 in case study.

---

# 143. Chronosapien screenshots

Potentially use:

* boot console
* shell
* filesystem/demo app
* terminal output

Choose screenshots showing progress rather than merely blank QEMU.

---

# 144. TensorTrail visuals

Potential:

* architecture
* autodiff graph
* test output
* API example
* training example

Do not create fake model charts unless generated by real examples.

---

# 145. Open-source contribution visuals

Open Source page does not need screenshots of GitHub everywhere.

Use typography/content primarily.

Maybe:

```text
repo icon / name
PR number
status
technical summary
```

Keep it compact.

---

# 146. Workbench visual hierarchy

Workbench cards can be more text/editorial.

Use:

```text
date
category
title
1-line summary
```

No need for screenshots on every note.

---

# 147. Research visual style

Make Coming Soon feel intentional, not empty.

Use a restrained "inactive system" treatment:

```text
STATUS / IDLE
```

Avoid melodramatic "classified" aesthetics.

---

# 148. Homepage Selected Work count

Aim:

```text
4
```

Maybe 5 if layout strongly benefits.

Do not show every project.

---

# 149. Selected Work likely ranking

Do not hard-code without audit, but likely:

```text
Chronosapien
Project Management ATLAS
TensorTrail
```

Then perhaps:

```text
AI Interview Platform
```

depending on current live quality.

---

# 150. Why ATLAS deserves consideration

Recent source activity demonstrates:

* sophisticated authorization
* data access
* application architecture
* CI/testing
* AI/tool use
* routing/IA
* product design

Therefore do not treat it as a simple task manager.

---

# 151. Why Open Source deserves prominence

Recent open-source PRs now show:

* navigating large codebases
* debugging production behavior
* test design
* CI/security
* accessibility
* API integrations
* backend correctness
* Rust/Python/TypeScript exposure
* contributing to projects you did not architect

That is valuable professional evidence.

---

# 152. Open Source CTA

Homepage CTA can be:

```text
View Open Source →
```

rather than generic GitHub activity.

---

# 153. GitHub profile link

Still provide:

```text
View all repositories ↗
```

in archive/open-source context.

Do not require portfolio to mirror every repo.

---

# 154. Potential historical "Journey" content

The old Timeline should not remain primary.

Some story can move to Archive:

```text
2021
learning builds

2022
larger product clones / open source

2023
developer tools

2025
AI/product work

2026
systems, ML internals, mature open source
```

Verify dates.

This can elegantly show progression.

---

# 155. No age-based framing

Avoid copy such as:

```text
when I was only X years old
```

unless genuinely useful and explicitly desired.

Let the work stand on its own.

---

# 156. No self-rating

Avoid:

```text
expert
advanced
master
10/10
```

in skills.

---

# 157. No overselling

Example:

Bad:

> Built a production-grade operating system.

Better:

> A hobby operating system in Rust exploring kernel fundamentals.

---

# 158. AI usage honesty

Do not pretend projects contain proprietary AI models if they orchestrate hosted models.

Explain accurately:

```text
model routing
tool calling
memory
multimodal flows
retrieval
provider integrations
```

where applicable.

---

# 159. Testing evidence

Project case studies may include testing evidence where meaningful.

Example ATLAS:

```text
59 tests
typecheck
build
RLS access matrix
```

only if current/verified.

Do not turn case studies into CI logs.

---

# 160. Open source PR status verification

Before shipping the site, fetch selected PRs again.

Because PR statuses may change between audit and deployment.

---

# 161. Freshness date

Consider storing:

```text
lastVerified
```

for external links/contributions in data comments or docs.

Not necessarily visible UI.

---

# 162. Analytics

Audit current Vercel Analytics.

Preserve if already used.

Do not add invasive analytics.

Do not add cookie banners unless required by actual analytics behavior.

---

# 163. Analytics events

If straightforward, useful anonymous events could include:

```text
project_open
github_click
resume_click
contact_click
```

Do not over-engineer event tracking.

---

# 164. Privacy

Do not add fingerprinting.

Portfolio analytics should remain lightweight.

---

# 165. Dark/light screenshots

Do not duplicate screenshots solely for theme unless project itself significantly changes.

Use framing that works in both site themes.

---

# 166. Card hover behavior

Hover should add:

* subtle lift
* border/contrast
* arrow movement

Avoid 3D tilt unless exceptionally restrained.

Mobile should not depend on hover.

---

# 167. Status badge design

Consistent system:

```text
● ACTIVE
● LIVE
○ SHIPPED
○ ARCHIVED
```

Choose actual final symbols/tokens carefully.

---

# 168. Icons

Use existing icon library.

Avoid mixing:

* Lucide
* Heroicons
* custom SVG
* emojis

without purpose.

---

# 169. Decorative emoji

Avoid emoji-heavy developer portfolio copy.

Use technical symbols where appropriate.

---

# 170. Terminal text

Terminal UI should display useful information.

Do not write fake commands such as:

```text
sudo hire vanshaj
```

Avoid portfolio cliché.

---

# 171. Easter eggs

Optional small easter egg:

```text
Konami-like command
terminal command palette
ASCII footer
```

only after core work is complete.

No easter egg should hurt accessibility/performance.

---

# 172. Copy quality

Every project card should answer:

```text
What is it?
Why is it technically interesting?
```

within ~2 sentences.

---

# 173. Remove marketing fluff

Search for words:

```text
premium
powerful
revolutionary
cutting-edge
next-generation
seamless
robust
innovative
state-of-the-art
```

Retain only where genuinely descriptive.

---

# 174. Case-study writing voice

Prefer first-person technical clarity.

Example:

> I kept task access behind the existing RLS boundary rather than bypassing permissions inside AI tooling.

This communicates engineering judgment.

---

# 175. Work page search

A text search is optional.

With a modest project list, category filters may be enough.

Do not add search simply because command palette exists.

---

# 176. Pagination

Do not paginate ~20 portfolio projects.

Show curated first, archive later.

---

# 177. Archive performance

If Archive contains many entries, compact rows are better than image-heavy cards.

---

# 178. Archive route semantics

Archive is part of the portfolio, but search engines do not need dozens of duplicate detail pages for trivial clones.

Use judgement around indexing old project pages.

---

# 179. Client site portfolio

Do not overwhelm personal engineering identity with small marketing websites.

Experience should demonstrate that work happened.

Work should prioritize engineering depth.

---

# 180. Public production/client work

A small Experience gallery can show:

```text
production website
property/listing experience
local business platform
automation/integration
```

without making them main flagship projects.

---

# 181. Contribution maturity

Prioritize open-source contributions involving:

* meaningful diagnosis
* substantial implementation
* tests
* architecture
* security
* accessibility
* reliability

over one-line typo fixes.

---

# 182. Contribution ordering

Potential ordering:

```text
Merged + technically significant
Open + technically significant
Older contributions
```

---

# 183. External brand logos

Use text names by default.

If logos are used, avoid downloading random low-quality images.

Use official assets only where appropriate.

---

# 184. Resume consistency audit

Before finishing, compare visible portfolio facts with latest résumé:

* job title
* company roles
* flagship projects
* GitHub
* hosted URLs
* technologies

Resolve contradictions.

---

# 185. LinkedIn consistency

If accessible, compare major role/title naming.

Do not require exact sentence parity.

Avoid visibly contradictory titles.

---

# 186. GitHub profile consistency

GitHub profile README may itself be stale.

Do not blindly copy it.

Portfolio should reflect current verified work.

Optionally update README only if within scope and appropriate; do not modify unrelated repo without permission.

---

# 187. Portfolio repository only

Primary implementation should remain inside:

```text
VanshajPoonia/personalportfolio
```

Do not alter project repositories solely to make portfolio screenshots nicer.

---

# 188. Git workflow

Before modifying:

```bash
git status
git branch
git log --oneline -n 10
```

Do not overwrite unrelated uncommitted work.

If repository is dirty, preserve user changes.

---

# 189. Incremental implementation

Prefer cohesive commits or clearly separated implementation slices.

Possible:

```text
1. IA/data model
2. homepage
3. work/case studies
4. experience/open source
5. archive/research/about
6. polish/SEO/a11y
```

Do not create 50 tiny meaningless commits.

---

# 190. Do not stop after a partial redesign

The task is complete only when primary routes share the new system.

Do not redesign homepage while leaving Work/Research/etc visually in V2.

---

# 191. Browser verification

Run the development or production server.

Use an actual browser.

Verify visually.

Do not rely exclusively on TypeScript/build output.

---

# 192. Required browser routes

Inspect:

```text
/
 /work
 at least 3 flagship project pages
 /experience
 /open-source
 /research
 /about
 /workbench
 /archive
 404
```

---

# 193. Required browser interactions

Test:

```text
theme toggle
mobile menu
command palette
work filters
project external links
project case-study navigation
keyboard navigation
Escape behavior
```

---

# 194. Console

No meaningful console errors.

Fix:

* hydration errors
* React key warnings
* image errors
* network 404s
* invalid HTML nesting

---

# 195. Link audit

Check:

```text
internal routes
GitHub links
live project links
LinkedIn
email
resume
research artifacts
Workbench links
```

---

# 196. Build commands

Use the package manager expected by repository.

Current repo historically uses pnpm.

At minimum:

```bash
pnpm install
pnpm lint
pnpm build
```

If tests exist:

```bash
pnpm test
```

If `tsc` script is not integrated:

```bash
pnpm exec tsc --noEmit
```

Use actual repository scripts rather than blindly running nonexistent commands.

---

# 197. Frozen lockfile

If dependencies change, update correct lockfile.

Verify clean install where practical.

Do not leave npm/pnpm metadata inconsistent.

---

# 198. Dependency audit

If adding dependencies:

* justify them
* ensure supported version
* inspect bundle impact
* run audit where appropriate

---

# 199. Design QA

Evaluate every major page against:

```text
hierarchy
spacing
typography
contrast
content density
alignment
responsive behavior
interaction clarity
visual consistency
```

---

# 200. Screenshot QA

Ensure screenshots:

* are current
* do not contain private data
* do not expose tokens/user emails
* do not include embarrassing dev overlays
* are sharp
* have consistent framing

---

# 201. Client data in screenshots

Blur/remove/private-data-containing screenshots.

Prefer seeded/demo accounts where possible.

Never expose real customer information.

---

# 202. Case-study truth audit

For every flagship case study:

create a private checklist:

```text
Every technical claim supported?
Every status supported?
Every screenshot real?
Every URL works?
Role accurately represented?
No planned feature described as shipped?
```

---

# 203. Planned features

Use clear labels:

```text
Planned
In progress
Experimental
```

Never merge planned features into the "What I built" list.

---

# 204. Idea/incubator content

Vanshaj has explored many ideas around:

* spatial/audio forensics
* 3D reconstruction
* HFT tooling
* DNS/security
* hackathon systems
* AI tools
* platform/product concepts

Do not automatically make these portfolio projects.

If an ideas section is created:

```text
Workbench / Incubator
```

secondary only.

Rule:

```text
Built       → Work
Contributed → Open Source
Professional → Experience
Explored    → Workbench
Unbuilt     → Incubator or omit
Old         → Archive
```

---

# 205. Homepage visitor test

After implementation, imagine four visitors:

### Recruiter

Can I understand his strongest engineering work quickly?

### Senior engineer

Can I find technical depth and source?

### Founder

Can I see he ships usable products?

### Open-source maintainer

Can I see evidence he works responsibly inside other codebases?

All four should be served well.

---

# 206. Five-second test

Homepage should answer:

```text
Who?
What kind of engineer?
What has he built?
```

without scrolling multiple screens.

---

# 207. Thirty-second test

By approximately 30 seconds the visitor should have encountered:

* Chronosapien
* serious product/AI work
* current engineering activity
* range across abstraction layers

---

# 208. Sixty-second test

By approximately one minute:

* work
* professional context
* open source
* live/source links

should all be discoverable.

---

# 209. Five-minute test

Deeper visitor should find:

* architecture
* implementation decisions
* testing
* tradeoffs
* Workbench
* archive
* research status

---

# 210. Final visual objective

The portfolio should feel:

```text
technical
mature
curious
credible
specific
crafted
```

Not:

```text
busy
performative
buzzword-heavy
template-based
overanimated
```

---

# 211. Final product objective

Someone should leave thinking:

> Vanshaj builds a lot of different kinds of software, but the range has a pattern: he likes understanding the whole stack, including what sits beneath the abstraction.

---

# 212. Final factual objective

Someone should never discover that:

* a "live" product is dead
* an "active" project was abandoned years ago
* an open-source contribution was merely a fork
* an advertised feature exists only on a roadmap
* active research is actually inactive
* collaborative work was presented as solo work

Trust matters more than maximizing project count.

---

# 213. Final completion checklist

Do not declare completion until all applicable items are checked.

## Content

* [ ] Current identity updated
* [ ] Active research claims removed
* [ ] Research Coming Soon implemented
* [ ] Past research accurately separated if retained
* [ ] Project statuses audited
* [ ] Deployments verified
* [ ] Duplicate project families consolidated
* [ ] Experience added
* [ ] Open Source substantially rebuilt
* [ ] Archive added
* [ ] About updated
* [ ] Workbench retained appropriately

## Design

* [ ] New hero
* [ ] Product-first project cards
* [ ] Engineering Spectrum
* [ ] consistent design tokens
* [ ] dark mode verified
* [ ] light mode verified
* [ ] animation restrained
* [ ] reduced motion supported

## Functionality

* [ ] navigation
* [ ] mobile nav
* [ ] filters
* [ ] command palette if implemented
* [ ] theme
* [ ] external links
* [ ] redirects

## Technical

* [ ] lint
* [ ] typecheck if applicable
* [ ] tests if available
* [ ] production build
* [ ] no console errors
* [ ] no broken assets
* [ ] no obvious layout shifts
* [ ] image optimization

## Accessibility

* [ ] headings
* [ ] skip navigation
* [ ] keyboard
* [ ] focus
* [ ] alt text
* [ ] color contrast
* [ ] reduced motion
* [ ] semantic dialogs/menus
* [ ] statuses not color-only

## SEO

* [ ] titles
* [ ] descriptions
* [ ] canonical
* [ ] OpenGraph
* [ ] structured data
* [ ] robots
* [ ] sitemap
* [ ] old URLs redirected

## Documentation

* [ ] README
* [ ] stale design docs updated
* [ ] old positioning removed
* [ ] data-update process clear

---

# 214. Final report required

When finished, report:

## 1. Executive summary

What changed and why.

## 2. New architecture

List current primary/secondary routes.

## 3. Project audit

For every major candidate explain:

```text
Featured
Regular
Archive
Omitted
```

and why.

## 4. Project status corrections

List important differences from old site.

## 5. Open-source audit

List selected contributions and verified current status.

## 6. Experience decisions

Titles/roles chosen and why.

## 7. Research treatment

Explain how current vs past research is represented.

## 8. Migration

List redirects/removed routes.

## 9. Design changes

Major visual-system changes.

## 10. Components/data

Important architectural refactors.

## 11. Verification

Report exact results for:

```text
lint
typecheck
tests
build
browser QA
mobile QA
desktop QA
light mode
dark mode
```

## 12. Known limitations

Anything unable to verify.

## 13. Follow-ups

Only genuinely valuable remaining work.

Do not manufacture a backlog merely to have one.

---

# 215. Execution behavior

Do not come back after the audit asking:

> Should I proceed with the redesign?

Proceed.

Do not ask the user to choose between five hero variants.

Choose the strongest one.

Do not stop because one old route is complicated.

Make the best migration decision.

Do not leave TODO placeholders for obvious implementation.

If a factual claim cannot be verified:

use conservative copy or omit it.

---

# 216. Final standard

Treat this like a real product redesign, not an AI-generated portfolio exercise.

The finished website should survive scrutiny from:

* recruiters
* experienced engineers
* open-source maintainers
* founders
* technical interviewers

It should be visually memorable because of its **clarity and engineering identity**, not because every pixel moves.

The final design thesis is:

> **The work is the spectacle. The terminal aesthetic is the frame.**

Build that.
