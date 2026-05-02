export interface TimelineItem {
  id: string
  label: string
  range: string
  narrative: string
  projects: { title: string; slug?: string }[]
}

export type TimelinePhase = TimelineItem

export const timeline: TimelineItem[] = [
  {
    id: "early",
    label: "Early phase",
    range: "2020 — 2022",
    narrative:
      "Clone projects, frontend learning, HTML/CSS/JS, React, Firebase, and APIs. Each clone existed to teach one thing well — routing, state, auth, or deployment.",
    projects: [
      { title: "Discord Clone", slug: "discord-clone" },
      { title: "Moogle", slug: "moogle" },
      { title: "Mewtube", slug: "mewtube" },
      { title: "Amazon Prime Clone", slug: "amazon-prime-clone" },
      { title: "Moogle Maps", slug: "moogle-maps" },
      { title: "Hypnover", slug: "hypnover" },
    ],
  },
  {
    id: "middle",
    label: "Middle phase",
    range: "2022 — 2024",
    narrative:
      "Next.js, Firebase, APIs, dashboards, ecommerce, hackathons, and Web3 experiments. Started thinking about products instead of pages.",
    projects: [
      { title: "Shopeee", slug: "shopeee" },
      { title: "Codash", slug: "codash" },
      { title: "Kelvin", slug: "kelvin" },
      { title: "Codash Meet", slug: "codash-meet" },
    ],
  },
  {
    id: "recent",
    label: "Recent phase",
    range: "2024 — 2025",
    narrative:
      "AI apps, enterprise tools, v0 prototypes, productivity experiments. Started shipping things people use, not just demos.",
    projects: [
      { title: "Zenquanta AI", slug: "zenquanta-ai" },
      { title: "LifeSort", slug: "lifesort" },
      { title: "ASCII Camera", slug: "ascii-camera" },
      { title: "Intacct", slug: "intacct" },
    ],
  },
  {
    id: "current",
    label: "Current phase",
    range: "2025 — 2026",
    narrative:
      "Systems programming, Rust OS, AI workspaces, finance platforms, research papers, and interactive labs. Building harder things in public.",
    projects: [
      { title: "Chronosapien", slug: "chronosapien" },
      { title: "Intacct", slug: "intacct" },
      { title: "Zenquanta AI", slug: "zenquanta-ai" },
      { title: "Research section" },
      { title: "Lab demos" },
    ],
  },
]
