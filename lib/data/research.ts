export type ResearchType =
  | "Research Paper"
  | "Technical Essay"
  | "Comparative Analysis"
  | "Literature Review"
  | "Research Expansion"
  | "System Design Research"

export type ResearchStatus = "Draft" | "Published" | "In Progress" | "Planned"

export interface ResearchEntry {
  slug: string
  title: string
  topic: string
  type: ResearchType
  status: ResearchStatus
  summary: string
  tags: string[]
  readHref?: string
  pdfHref?: string
  relatedProject?: { title: string; href: string }
}

export const researchEntries: ResearchEntry[] = [
  {
    slug: "neutral-atom-vs-superconducting",
    title: "Neutral-Atom Quantum Computing vs Superconducting Qubits",
    topic: "Quantum Computing",
    type: "Comparative Analysis",
    status: "Draft",
    summary:
      "A comparison of two leading quantum computing architectures: scaling tradeoffs, hardware constraints, error characteristics, and which one bets on which physics.",
    tags: ["Quantum Computing", "Neutral Atoms", "Superconducting Qubits", "Hardware", "Scaling"],
  },
  {
    slug: "quantum-architectures-beyond-two",
    title: "Quantum Computing Architectures: Beyond Two Qubit Types",
    topic: "Quantum Computing",
    type: "Research Expansion",
    status: "Planned",
    summary:
      "Expands the original neutral-atom vs superconducting comparison to include trapped ions and photonic qubits, and argues why architecture choice matters more than qubit count.",
    tags: ["Quantum Computing", "Trapped Ions", "Photonic Qubits", "Neutral Atoms", "Superconducting Qubits"],
  },
  {
    slug: "ai-developer-tools-routing",
    title: "AI Developer Tools and Model Routing",
    topic: "AI Infrastructure",
    type: "Technical Essay",
    status: "Planned",
    summary:
      "Notes on why real AI products need routing, plan ladders, usage tracking, and assistant-specific UX — not just a chat box wrapped around an API key.",
    tags: ["AI", "OpenRouter", "Model Routing", "Developer Tools", "SaaS"],
    relatedProject: { title: "Zenquanta AI", href: "/projects/zenquanta-ai" },
  },
  {
    slug: "local-first-sync",
    title: "Local-first Software and Sync Engines",
    topic: "Software Architecture",
    type: "Technical Essay",
    status: "Planned",
    summary:
      "How offline-first apps actually handle sync, conflicts, and user trust — and what makes a sync engine boring enough to be reliable.",
    tags: ["Local-first", "Sync", "Offline Apps", "Product Architecture"],
  },
  {
    slug: "mini-cloud-platforms",
    title: "Mini Cloud Platforms and Deployment Systems",
    topic: "Cloud / DevTools",
    type: "System Design Research",
    status: "Planned",
    summary:
      "Notes toward designing a small Vercel-like deployment platform: build runners, edge routing, previews, and the cost of every shortcut.",
    tags: ["Cloud", "Deployment", "Vercel", "Containers", "CI/CD"],
  },
]
