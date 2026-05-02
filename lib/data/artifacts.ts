export type ArtifactType = "Roadmap" | "Architecture" | "Blueprint" | "Notes" | "Paper" | "Diagram"
export type ArtifactStatus = "Available" | "Coming Soon"

export interface Artifact {
  slug: string
  title: string
  type: ArtifactType
  status: ArtifactStatus
  summary: string
  href?: string
  related?: { label: string; href: string }
}

export const artifacts: Artifact[] = [
  {
    slug: "chronosapien-roadmap",
    title: "Chronosapien Roadmap",
    type: "Roadmap",
    status: "Coming Soon",
    summary: "A milestone-based roadmap for the Chronosapien hobby OS — what is built, what is next, and what is stretch.",
    related: { label: "Chronosapien case study", href: "/projects/chronosapien" },
  },
  {
    slug: "intacct-architecture-notes",
    title: "Intacct Architecture Notes",
    type: "Architecture",
    status: "Coming Soon",
    summary: "Service-layer design, workspace model, and the cutover plan that drives Intacct's enterprise UX.",
    related: { label: "Intacct case study", href: "/projects/intacct" },
  },
  {
    slug: "zenquanta-product-architecture",
    title: "Zenquanta AI Product Architecture",
    type: "Architecture",
    status: "Coming Soon",
    summary: "Assistant families, model routing, prompt precheck, and the plan ladder behind Zenquanta AI.",
    related: { label: "Zenquanta AI case study", href: "/projects/zenquanta-ai" },
  },
  {
    slug: "mini-vercel-blueprint",
    title: "Mini Vercel Clone Blueprint",
    type: "Blueprint",
    status: "Coming Soon",
    summary: "System design for a small Vercel-style deployment platform — build runners, edge routing, previews.",
    related: { label: "Mini Vercel Clone", href: "/blueprints/mini-vercel-clone" },
  },
  {
    slug: "ai-coding-workspace-blueprint",
    title: "AI Coding Workspace Blueprint",
    type: "Blueprint",
    status: "Coming Soon",
    summary: "What an AI workspace looks like when it is more than a sidebar chat: assistants, tools, and project context.",
    related: { label: "AI Coding Workspace", href: "/blueprints/ai-coding-workspace" },
  },
  {
    slug: "docker-devtools-notes",
    title: "Docker / DevTools Notes",
    type: "Notes",
    status: "Coming Soon",
    summary: "Working notes on docker-compose patterns, worker/frontend/backend splits, and small-team devtools.",
  },
  {
    slug: "quantum-research-paper",
    title: "Quantum Computing Research Paper",
    type: "Paper",
    status: "Coming Soon",
    summary: "Comparative analysis of neutral-atom and superconducting quantum architectures.",
    related: { label: "Research entry", href: "/research#neutral-atom-vs-superconducting" },
  },
  {
    slug: "ai-model-routing-notes",
    title: "AI Model Routing Notes",
    type: "Notes",
    status: "Coming Soon",
    summary: "Design notes on routing across providers, tiers, intents, and budgets without surprising the user.",
  },
  {
    slug: "personal-website-content-map",
    title: "Personal Website Content Map",
    type: "Diagram",
    status: "Coming Soon",
    summary: "The full content map of this site: routes, data layer, and how each section connects to the others.",
  },
]
