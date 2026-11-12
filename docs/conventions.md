# Conventions

Rules the site follows. Breaking one should be a decision, not an accident.

## Truth

This is the constraint everything else serves.

- Nothing is described as built unless it is in the repository today. Planned
  work lives in a "what's next" section, never in "what I built".
- Deployment URLs are opened by hand before being marked `live`. If a
  deployment cannot be reached, the card says so instead of rendering a link
  that 404s. `projectsLastVerified` records when this was last done.
- Open-source entries record real merge state, checked against the GitHub API.
  A fork is not a contribution. An open pull request is labelled `open`.
- Multi-repository projects appear once. A product split across seven
  repositories is one entry with seven repositories listed, not seven projects.
- Collaborative work states its ownership boundary explicitly.
- Private and client systems are described at capability level only: no
  repository links, no credentials, no customer data, no screenshots.
- Testing numbers are ones that have actually been run, quoted with the date.

## Design

The site is an instrument panel: an aluminium plate with engraved legends,
pilot lamps, and one rotary selector. PRODUCT.md holds who it is for, and
DESIGN.md holds the full visual system.

- **Four greys and one lamp.** Plate, seam, engraving and ink, plus amber for a
  pilot lamp or the one lit key. Amber marks a state (active, live, merged,
  the current page) or the primary action. It never colours a border, a
  heading or a link.
- **No shadow, blur, glow or gradient.** Depth comes from plates and hairline
  seams overlapping, and from a key's thicker bottom edge.
- **Selection by inversion.** The selected item becomes an ink plate with
  plate-coloured type, rather than gaining a colour.
- **One family.** Archivo everywhere. Condensed for engraved legends and
  readouts, normal for reading, wide for the nameplate. Real code uses the
  system monospace and nothing else does.
- **No kickers.** No eyebrow label above a heading and no section numbers. The
  heading carries its own weight.
- **Drawn, not boxed.** Schematics are a signal line with a node per stage, not
  a row of bordered chips.
- **The work leads.** A project is a visual first and words second. Widths are
  chosen per content type.

## Motion

Motion is the instrument's own: things click, warm up, and draw in.

- The selector snaps to each detent with a short overshoot, and the finish
  switch slides the same way.
- Lamps warm up instead of switching on.
- On a visitor's first homepage load in a session, the selector runs a
  power-on self-test: the pointer travels to the end and back, then the lamps
  warm up.
- Schematic traces draw themselves in once, the first time they scroll into
  view.
- No looping effects, no floating, no glitch, no typewriters, no cursor
  effects.
- Content is visible by default. Traces are only hidden by an inline script
  that has already confirmed motion is allowed, so a page without script never
  hides anything.
- Under `prefers-reduced-motion` every transition, the self-test and the
  traces stand down and the page stays fully comprehensible.

## Accessibility

- One `h1` per page, no skipped heading levels. `ProjectCard` takes a
  `headingLevel` for exactly this reason.
- Status is never colour alone: a glyph (`●` current, `○` settled) plus a word.
- Text meets 4.5:1, or 3:1 at large sizes. Reduced-opacity variants of
  `text-muted-foreground` are for `aria-hidden` glyphs only; they do not pass on
  real text.
- Interactive targets on mobile are at least 44px.
- Dialogs (command palette, mobile drawer) trap focus, close on Escape, and
  restore focus to whatever opened them.
- External links announce that they open in a new tab through their accessible
  name; the `↗` is decorative.
- Every image has meaningful alt text describing what is in it, not the word
  "screenshot".

## Dependencies

Before adding one, ask whether it can be done correctly in under fifty lines.
The command palette, filters, diagrams, status badges, and external links are
all hand-written for this reason. The dependency list is eight production
packages and should stay near there.

## Copy

- First-person, technical, specific. Say what the problem was and what the
  change did.
- No marketing vocabulary: premium, powerful, revolutionary, cutting-edge,
  seamless, robust, innovative, state-of-the-art.
- No self-rating. No percentage bars next to language names.
- No em dashes.
- A project card answers "what is it" and "why is it technically interesting"
  within two sentences. Depth belongs in the case study.
