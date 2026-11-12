---
name: vanshajpoonia.com
description: A developer's site built like a calibrated bench instrument.
colors:
  plate: "oklch(0.928 0.004 250)"
  seam: "oklch(0.82 0.006 250)"
  engraving: "oklch(0.47 0.009 250)"
  ink: "oklch(0.205 0.008 250)"
  lamp: "oklch(0.79 0.165 72)"
  on-lamp: "oklch(0.2 0.01 250)"
  plate-anodised: "oklch(0.19 0.004 250)"
  seam-anodised: "oklch(0.33 0.006 250)"
  engraving-anodised: "oklch(0.72 0.007 250)"
  ink-anodised: "oklch(0.935 0.004 250)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 8vw, 6rem)"
    fontWeight: 620
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 115"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.018em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.003em"
  readout:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 84"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.075em"
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 78"
rounded:
  sm: "4px"
  md: "6px"
  xl: "8px"
  full: "999px"
spacing:
  module: "8px"
  row: "16px"
  block: "24px"
  section: "112px"
components:
  key:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 18px"
    height: "44px"
  key-lit:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.on-lamp}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 18px"
    height: "44px"
  window:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate}"
    rounded: "{rounded.md}"
    padding: "24px"
  legend-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 6px"
  filter-segment:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.engraving}"
    typography: "{typography.label}"
    height: "44px"
    padding: "0 14px"
  filter-segment-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate}"
---

# Design System: vanshajpoonia.com

## Overview

**Creative North Star: "The Calibrated Instrument"**

The site is a bench instrument in the Braun and Hewlett-Packard tradition: a bead-blasted aluminium plate with engraved legends, pilot lamps, one detented rotary selector and an inverted display window. Each project is a channel. It has a lamp that says whether it is active or live, a reading taken from the project's own evidence, and a calibration date, the day its links and status were last checked by hand. The instrument metaphor is the honesty rule made visible: a reading is only as good as its last calibration, so every page says when that was.

The surface is quiet and mostly empty plate. Density sits in readouts (seam-ruled rows of legend and value), never in decoration. There are no shadows, glows, gradients, grid backdrops or cursor effects, and no kicker labels above headings. The work leads. Schematics are drawn as a signal line, and screenshots sit in plain seamed frames.

It explicitly replaces the previous look: near-black ground, teal accent, cursor glow, grid backdrop, monospace everywhere and terminal chrome.

**Key Characteristics:**
- Four greys and one amber pilot lamp, in a light aluminium finish and a black anodised finish.
- One type family, Archivo, with its width axis doing the work a second face used to.
- Depth from overlapping plates and seams only.
- Selection by inversion: the selected thing becomes an ink plate.
- Mechanical motion: detent snaps, lamps warming up, traces drawn in once.

## Colors

Four neutral greys at a cool, almost colourless hue (250, chroma ≤ 0.009), and one warm amber that only ever means "lit".

### Primary
- **Pilot Amber** (`lamp`): the only colour on the site. It fills a lamp when something is active, live, merged or current, and it fills the one primary push key on a surface ("Email me"). Text on it is `on-lamp`. It is never a border, heading, link or icon colour, and it never carries text on the plate, because it fails contrast there.

### Neutral
- **Aluminium Plate** (`plate`): the page ground, keys, the knob cap, and type inside an inverted window.
- **Seam** (`seam`): hairlines between rows and sections, frames around visuals, key edges, the knob skirt, minor scale ticks and scrollbar thumbs.
- **Engraving** (`engraving`): secondary text, legends and unlit lamp rings. It holds 4.5:1 on the plate.
- **Ink** (`ink`): body text and headings, the display window, selected legends and filter segments, the pointer, focus rings and text selection.
- **Black Anodised set** (`*-anodised`): the dark finish. Same roles, separately tuned lightness, not an inversion. In this finish the display window becomes a light, backlit plate.

### Named Rules
**The One Lamp Rule.** Amber marks state or the single primary action, and nothing else. A screen with two amber keys has two primary actions, which means it has none.

**The Four Greys Rule.** No alpha fills, tints or extra greys. A surface is plate, seam, engraving or ink, and a translucent variant is a fifth grey.

## Typography

**Display Font:** Archivo (variable, width axis 62–125)
**Body Font:** Archivo
**Label/Mono Font:** Archivo, condensed. Real code only uses the system monospace.

**Character:** A sturdy grotesk, set the way instrument makers letter a front panel. It goes wide for the nameplate, normal for reading, and condensed and upper case for engraved legends.

### Hierarchy
- **Display** (620, clamp 3.25–6rem, 0.95, width 115): the nameplate in the homepage hero. Used once.
- **Headline** (600, 2.5–3.75rem, 1.05): page titles and the contact heading.
- **Title** (600, 1.875–2.5rem, 1.1): section headings. Project titles in lists drop to 1.5rem.
- **Body** (400, 1rem, or 1.125–1.25rem for ledes, 1.6): prose kept to about 60–68ch.
- **Readout** (400, 13–15px, width 84, tabular figures): values in readouts, dates, PR numbers and technology lists.
- **Label** (600, 11px, width 78, 0.075em tracking, upper case, tabular figures): engraved legends beside a control or a reading. Also used for navigation, keys and status words.

### Named Rules
**The One Family Rule.** Archivo for everything. Hierarchy comes from size, width and case, never from a second display face or from monospace worn as a costume.

**The Legend Rule.** A legend labels a control or a reading. It never sits above a heading as a kicker.

## Layout

The page is wide and quiet. There are three containers, chosen per content type: wide (84rem) for work and the hero, default (72rem), and prose (46rem). Side gutters are 16px on phones and 32px from 640px up. Sections are separated by full-width seams, with 64px vertical padding on phones and 112px from 768px up.

Spacing snaps to an 8px module. 4px is allowed only inside compact controls such as legend chips and keycaps. Content is arranged as seam-ruled rows rather than card grids: lists, readouts (`legend | value` rows) and featured work as alternating wide rows (a 7-column visual beside a 5-column text block). The homepage hero is 5/7 on desktop, with a vertical seam between the nameplate and the instrument. Everything stacks into a single column on phones without hiding content.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth is physical and comes from three devices only:
- plates overlapping at seams, as with the knob, which is a seam-grey skirt with a knurled edge under a plate-grey cap
- inversion, where the display window and selected items become ink plates
- a key's front edge, a 3px bottom seam that disappears as the key is pressed down 2px

### Named Rules
**The No-Glow Rule.** No box-shadow, blur, backdrop-filter, glow or gradient, at any state. If something needs to look raised, give it a front edge; if it needs to look selected, invert it.

## Shapes

Small, machined radii: 6px on keys, frames, windows and the palette, 4px on legend chips and keycaps, and full circles for lamps, knob and switch. Borders are 1px seams. Schematics are a 1px line with 8px nodes, where the first or last node is filled ink and the rest are hollow rings.

## Components

### Buttons (push keys)
- **Shape:** gently rounded (6px), 44px tall, 18px horizontal padding, label type.
- **Default:** plate face, 1px seam border with a 3px seam bottom edge.
- **Lit (primary):** amber face, ink legend, with an edge 0.2 darker than the amber. One per surface.
- **Hover / Active:** hover darkens the border to engraving. Active drops the key 2px and removes the front edge (120ms ease-out-expo).

### Pilot lamp
- 8px circle with a 1.5px ring. Unlit is a hollow engraving ring, lit is an amber fill with a darker ring. The fill warms up over 420ms. A lamp always sits next to a word (Active, Live, Merged, Now, Unbuilt) and never stands alone.

### Display window (signature)
- Ink plate (6px radius, 24px padding, a fixed 28rem tall on desktop so it never jumps between channels) with plate-coloured type. The title takes the full width, with the one-line description under it, then seam-ruled `legend | value` readings. The footer has the lamp and status word on the left and one action on the right, with the calibration date below. New readings roll in from 14px below (420ms ease-out-expo).

### Rotary selector (signature)
- An SVG knob in a 320×248 field: a ruled scale with ink detent ticks every 30° across 120°, a knurled seam skirt, a plate cap, an ink pointer and an ink hub. Legends sit around the arc. The selected legend is inverted.
- Behaviour: it is a radio group. Drag the knob, click a legend, or use the arrow keys, Home and End. It snaps on the detent curve. On a visitor's first load in a session it runs a power-on self-test: the pointer sweeps to the end and back, then the lamps warm up.

### Navigation
- Engraved legends in engraving grey. The current page turns ink and shows a lit lamp beside it, and inactive items show no ring. The header is a plain plate, which gains a seam once the page scrolls. On phones a drawer plate slides in from the right with full-size rows, a lamp for the current page and the three keys.

### Finish switch
- A two-position slide switch (34×18 track, 12px ink slider) labelled "Finish". It moves on the detent curve between aluminium and black anodised.

### Filter strip
- A segmented range switch: label-type segments with seam dividers, rounded only at the ends. The active segment is inverted to ink, and counts are tabular.

### Schematic (trace)
- An ordered list with a 1px engraving line between 8px nodes. Each segment draws itself in once, staggered 90ms apart, when it scrolls into view. Two densities: full (label plus detail) and compact (labels only).

### Command palette
- A plate dialog with a 3px seam bottom edge and no shadow or blur, over a 30% ink scrim. The active row is inverted, and hints are labels.

## Do's and Don'ts

### Do:
- **Do** put a word next to every lamp, and keep build status and deployment status in separate readout rows.
- **Do** show a calibration date (`projectsLastVerified`, `contributionsLastVerified`) wherever a reading claims something is current.
- **Do** invert to show selection: legends, filter segments, palette rows and text selection all use an ink background with plate text.
- **Do** keep motion mechanical and once-only, with detent snap, warm-up and draw-in, and let all of it stand down under `prefers-reduced-motion`.
- **Do** draw diagrams as traces in the plate's own line, and frame screenshots with a plain 1px seam.

### Don't:
- **Don't** use box-shadow, blur, glow, gradients, grid backdrops or cursor effects.
- **Don't** put an eyebrow or kicker label above a heading, or number sections.
- **Don't** use amber for borders, headings, links or more than one key on a surface.
- **Don't** add a second typeface or use monospace for anything that is not code.
- **Don't** use alpha-tinted fills or borders; pick one of the four greys.
- **Don't** build card grids of same-size boxes when a seam-ruled list will do.
