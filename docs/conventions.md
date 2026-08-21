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

- **Accent discipline.** The teal marks state that means something: active,
  live, current, focused. It is not a decoration for borders and headings.
  Roughly ninety per cent of the page is neutral.
- **The work leads.** A project card is a visual first and words second. The
  mono type and hairlines are the frame, not the subject.
- **Type split.** Geist for anything you read in sentences. Geist Mono for
  statuses, dates, metadata, labels, code, and terminal surfaces. Never a
  paragraph in mono.
- **Widths are chosen.** Prose gets a comfortable measure; imagery and diagrams
  get room. One max-width everywhere is a smell.

## Motion

- No entrance animations, no looping effects, no floating, no glitch, no
  typewriters. The budget is hover transitions and the cursor glow.
- The cursor glow writes its position straight to a transform inside one
  `requestAnimationFrame`. It never touches React state, and it removes itself
  entirely for coarse pointers and `prefers-reduced-motion`.
- Under `prefers-reduced-motion` the page must remain fully comprehensible.

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
