export interface NowSection {
  id: string
  label: string
  items: string[]
}

export const nowSections: NowSection[] = [
  {
    id: "building",
    label: "Currently building",
    items: [
      "Chronosapien, a hobby OS in Rust",
      "Intacct, an enterprise finance platform",
      "Zenquanta AI, a multi-assistant workspace",
      "This site: the lab, workbench, and research sections",
    ],
  },
  {
    id: "learning",
    label: "Currently learning",
    items: [
      "Rust OS development",
      "Systems programming",
      "AI product architecture",
      "Enterprise UX and finance tooling",
      "Infrastructure and devtools",
      "Research writing and technical analysis",
    ],
  },
  {
    id: "exploring",
    label: "Currently exploring",
    items: [
      "Mini cloud platforms",
      "AI coding workspaces",
      "Interactive technical demos",
      "Graphics and rendering experiments",
      "Quantum computing architecture research",
    ],
  },
]

export const nowLastUpdated = "2026-05"
