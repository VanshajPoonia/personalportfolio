export interface NavItem {
  label: string
  href: string
  description?: string
}

export const primaryNav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Lab", href: "/lab" },
  { label: "Workbench", href: "/workbench" },
  { label: "Blueprints", href: "/blueprints" },
  { label: "Research", href: "/research" },
  { label: "Now", href: "/now" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Timeline", href: "/timeline" },
]

export const secondaryNav: NavItem[] = [
  { label: "Learning", href: "/learning" },
  { label: "Artifacts", href: "/artifacts" },
  { label: "Blog", href: "/blog" },
]

export const exploreCards: NavItem[] = [
  {
    label: "Projects",
    href: "/projects",
    description: "Polished builds, shipped products, active experiments, and earlier work.",
  },
  {
    label: "Lab",
    href: "/lab",
    description: "Interactive demos, visual experiments, terminal toys, and OS explainers.",
  },
  {
    label: "Workbench",
    href: "/workbench",
    description: "Build logs, debugging notes, architecture sketches, and experiments in progress.",
  },
  {
    label: "Blueprints",
    href: "/blueprints",
    description: "Technical system designs for platforms, AI workspaces, cloud tools, and enterprise software.",
  },
  {
    label: "Research",
    href: "/research",
    description: "Exploratory papers, technical comparisons, and long-form research notes.",
  },
  {
    label: "Now",
    href: "/now",
    description: "What I'm currently building, learning, exploring, and shipping.",
  },
  {
    label: "Roadmap",
    href: "/roadmap",
    description: "What is active, next, later, paused, and shipped.",
  },
  {
    label: "Timeline",
    href: "/timeline",
    description: "My developer journey from early learning builds to systems, AI, and enterprise tools.",
  },
  {
    label: "Learning",
    href: "/learning",
    description: "Study maps across OS development, Rust, AI infrastructure, graphics, enterprise software, and product.",
  },
  {
    label: "Artifacts",
    href: "/artifacts",
    description: "Downloadable notes, PDFs, diagrams, prompt packs, and technical resources.",
  },
]

export const currentFocus = [
  "Rust OS development",
  "AI developer tools",
  "Enterprise finance platforms",
  "Interactive web experiments",
  "Exploratory research papers",
  "System design / architecture notes",
]

export const positioning = {
  hero: "Not a portfolio. A living developer lab.",
  sub: "I build systems experiments, AI workspaces, enterprise tools, creative dev utilities, research notes, and technical artifacts in public.",
}
