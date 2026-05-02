export interface LearningTopic {
  id: string
  category: string
  learning: string
  why: string
  relatedProject?: { title: string; href: string }
  relatedResearch?: { title: string; href: string }
}

export const learningTopics: LearningTopic[] = [
  {
    id: "operating-systems",
    category: "Operating Systems",
    learning:
      "Boot flow, GDT/IDT, interrupts, memory layout, framebuffer rendering, in-memory filesystems, and shells from scratch.",
    why: "OS work makes you take the machine seriously. Every abstraction stops being free.",
    relatedProject: { title: "Chronosapien", href: "/projects/chronosapien" },
  },
  {
    id: "rust",
    category: "Rust",
    learning: "no_std code, ownership across hardware boundaries, error handling without panic, and writing low-level Rust people can read.",
    why: "Rust forces honesty about lifetimes and side effects that other languages let you ignore.",
    relatedProject: { title: "Chronosapien", href: "/projects/chronosapien" },
  },
  {
    id: "graphics",
    category: "Graphics / Rendering",
    learning: "Framebuffers, scanline math, fonts and glyphs, and eventually shaders and raycasting.",
    why: "Pixels-by-hand is the only way to learn what frameworks have been doing for you.",
  },
  {
    id: "ai-infrastructure",
    category: "AI Infrastructure",
    learning: "Model routing, prompt precheck, streaming, plan ladders, and separating raw provider cost from displayed user usage.",
    why: "Real AI products are routing, billing, and trust. The model is one component.",
    relatedProject: { title: "Zenquanta AI", href: "/projects/zenquanta-ai" },
  },
  {
    id: "enterprise",
    category: "Enterprise Software",
    learning: "Workspaces, RBAC, service-layer design, saved views, audit logs, and dense accountant-friendly UX.",
    why: "Enterprise apps are mostly about trust, defaults, and not surprising the user.",
    relatedProject: { title: "Intacct", href: "/projects/intacct" },
  },
  {
    id: "frontend-systems",
    category: "Frontend Systems",
    learning: "App Router patterns, typed data layers, design systems on shadcn/Radix, and using React 19 features intentionally.",
    why: "Frontend systems are how everything else gets used. Bad shells kill good products.",
  },
  {
    id: "product",
    category: "Product / Startups",
    learning: "Wedge selection, pricing ladders, what to ship vs cut, and how to communicate a product without overclaiming.",
    why: "Engineering buys you the right to make product decisions — and most engineers waste it.",
  },
  {
    id: "quantum",
    category: "Quantum Computing / Research",
    learning: "Comparing qubit architectures (neutral atoms, superconducting, trapped ions, photonic) and the scaling tradeoffs between them.",
    why: "Quantum is moving from science to engineering. Learning it now buys time later.",
    relatedResearch: {
      title: "Neutral-Atom vs Superconducting Qubits",
      href: "/research#neutral-atom-vs-superconducting",
    },
  },
  {
    id: "devtools",
    category: "DevTools / Cloud Platforms",
    learning: "Mini Vercel-style deploys, container orchestration, edge routing, and developer-experience design.",
    why: "Cloud platforms are the modern operating system. Worth knowing how they actually work.",
  },
]
