export type ProjectStatus =
  | "active"
  | "shipped"
  | "prototype"
  | "paused"
  | "archive"
  | "learning"

export type ProjectCategory =
  | "flagship"
  | "ai-product"
  | "enterprise"
  | "creative-coding"
  | "product-experiment"
  | "infrastructure"
  | "earlier-work"
  | "graveyard"

export interface Project {
  slug: string
  title: string
  tagline: string
  description: string
  status: ProjectStatus
  categories: ProjectCategory[]
  tags: string[]
  github?: string
  live?: string
  caseStudy?: string
  year: string
  priority: number
  featured?: boolean
  flagship?: boolean
}

export const projects: Project[] = [
  {
    slug: "chronosapien",
    title: "Chronosapien",
    tagline: "A beginner-friendly hobby OS in Rust.",
    description:
      "Boots a no_std x86_64 kernel in QEMU, renders a framebuffer graphics console, logs to serial, runs a tiny era-themed shell, handles CPU exceptions and timer interrupts, has early memory management, an in-memory filesystem, and built-in apps like notes, calc, and sysinfo.",
    status: "active",
    categories: ["flagship"],
    tags: ["Rust", "OSDev", "no_std", "x86_64", "QEMU", "framebuffer", "shell", "interrupts", "memory"],
    github: "https://github.com/VanshajPoonia/chronosapien",
    caseStudy: "/projects/chronosapien",
    year: "2026",
    priority: 100,
    featured: true,
    flagship: true,
  },
  {
    slug: "intacct",
    title: "Intacct",
    tagline: "Next.js + Supabase enterprise finance platform.",
    description:
      "Role-based workspaces, dense accountant-friendly UX, service-layer architecture, AP/AR/GL/cash/reporting/admin workspaces, saved views, notifications, audit logs, and Supabase-backed runtime datasets.",
    status: "active",
    categories: ["flagship", "enterprise"],
    tags: ["Next.js", "TypeScript", "Supabase", "Finance", "Enterprise UX", "RBAC", "Service Layer"],
    github: "https://github.com/VanshajPoonia/intacct",
    caseStudy: "/projects/intacct",
    year: "2026",
    priority: 95,
    featured: true,
    flagship: true,
  },
  {
    slug: "zenquanta-ai",
    title: "Zenquanta AI",
    tagline: "Premium multi-assistant AI workspace.",
    description:
      "Built with Next.js, TypeScript, Tailwind, shadcn/ui, Supabase, and OpenRouter. Assistant families like Nova, Velora, Axiom, Forge, Pulse, and Prism, tier-aware model routing, text/image flows, prompt precheck, assistant recommendations, working notes during streaming, memory, usage tracking, plan requests, and admin dashboards.",
    status: "shipped",
    categories: ["flagship", "ai-product"],
    tags: ["AI", "OpenRouter", "Supabase", "Next.js", "TypeScript", "SaaS", "Model Routing"],
    github: "https://github.com/VanshajPoonia/zenquantaai",
    caseStudy: "/projects/zenquanta-ai",
    year: "2025",
    priority: 90,
    featured: true,
    flagship: true,
  },
  {
    slug: "lifesort",
    title: "LifeSort",
    tagline: "Calendar-style productivity app.",
    description:
      "A life sorting / calendar-style productivity app synced from v0, built with TypeScript and a Next.js-style app structure.",
    status: "shipped",
    categories: ["flagship", "product-experiment"],
    tags: ["TypeScript", "Productivity", "Calendar", "v0", "App Design"],
    github: "https://github.com/VanshajPoonia/lifesort",
    live: "https://lifesort.vercel.app",
    year: "2025",
    priority: 80,
    featured: true,
    flagship: true,
  },
  {
    slug: "ascii-camera",
    title: "ASCII Camera",
    tagline: "Webcam-to-ASCII visual experiment.",
    description: "A TypeScript/Vite webcam-to-ASCII visual experiment that renders the camera feed as live characters in the browser.",
    status: "shipped",
    categories: ["flagship", "creative-coding"],
    tags: ["TypeScript", "Vite", "Creative Coding", "Camera", "ASCII"],
    github: "https://github.com/VanshajPoonia/asciicamera",
    live: "https://asciicamera-gold.vercel.app",
    year: "2025",
    priority: 75,
    featured: true,
    flagship: true,
  },
  {
    slug: "kelvin",
    title: "Kelvin",
    tagline: "Online code editor experiment.",
    description: "An earlier developer-tool experiment exploring browser-based code editing.",
    status: "archive",
    categories: ["earlier-work", "graveyard"],
    tags: ["DevTools", "Editor", "Web"],
    github: "https://github.com/VanshajPoonia/kelvin",
    year: "2023",
    priority: 50,
  },
  {
    slug: "codash",
    title: "Codash",
    tagline: "Subscription-style dashboard for online IDEs.",
    description: "An earlier product UI experiment around dashboards and subscriptions for online IDE workflows.",
    status: "paused",
    categories: ["product-experiment", "graveyard"],
    tags: ["Dashboard", "Product UI", "DevTools"],
    github: "https://github.com/VanshajPoonia/codash",
    year: "2023",
    priority: 45,
  },
  {
    slug: "codash-meet",
    title: "Codash Meet",
    tagline: "Collaborative coding platform.",
    description: "An earlier collaborative devtools experiment exploring real-time multi-user coding.",
    status: "archive",
    categories: ["infrastructure", "product-experiment"],
    tags: ["Collaboration", "DevTools", "Realtime"],
    github: "https://github.com/VanshajPoonia/codash-meet",
    year: "2023",
    priority: 44,
  },
  {
    slug: "moogle",
    title: "Moogle",
    tagline: "Google clone built with Next.js.",
    description: "A Next.js + Tailwind CSS recreation of Google search to learn API integration and search UX.",
    status: "shipped",
    categories: ["earlier-work"],
    tags: ["Next.js", "Tailwind", "Clone", "Learning"],
    github: "https://github.com/VanshajPoonia/moogle",
    year: "2022",
    priority: 30,
  },
  {
    slug: "mewtube",
    title: "Mewtube",
    tagline: "YouTube clone with React + Firebase.",
    description: "A React, Redux, Firebase, and YouTube API recreation of YouTube to practice client-side state management and external APIs.",
    status: "shipped",
    categories: ["earlier-work"],
    tags: ["React", "Redux", "Firebase", "YouTube API", "Clone"],
    github: "https://github.com/VanshajPoonia/mewtube",
    year: "2021",
    priority: 28,
  },
  {
    slug: "moogle-maps",
    title: "Moogle Maps",
    tagline: "Google Maps-style project on Cloudflare Pages.",
    description: "An alternative Google Maps-style project hosted on Cloudflare Pages.",
    status: "shipped",
    categories: ["earlier-work"],
    tags: ["Maps", "Cloudflare Pages", "Frontend"],
    github: "https://github.com/VanshajPoonia/moogle-maps",
    year: "2022",
    priority: 26,
  },
  {
    slug: "discord-clone",
    title: "Discord Clone",
    tagline: "Discord UI clone in HTML/CSS/JS.",
    description: "A pure HTML, CSS, and JavaScript recreation of the Discord interface.",
    status: "shipped",
    categories: ["earlier-work"],
    tags: ["HTML", "CSS", "JavaScript", "Clone"],
    github: "https://github.com/VanshajPoonia/discord-clone",
    year: "2021",
    priority: 24,
  },
  {
    slug: "shopeee",
    title: "Shopeee",
    tagline: "MedusaJS hackathon ecommerce build.",
    description: "An ecommerce hackathon submission built on MedusaJS.",
    status: "shipped",
    categories: ["earlier-work"],
    tags: ["MedusaJS", "Ecommerce", "Hackathon"],
    github: "https://github.com/VanshajPoonia/shopeee",
    year: "2022",
    priority: 22,
  },
  {
    slug: "amazon-prime-clone",
    title: "Amazon Prime Clone",
    tagline: "Streaming UI clone with React/Firebase.",
    description: "A React/TMDB/Firebase-style streaming interface clone built to learn data fetching and auth flows.",
    status: "shipped",
    categories: ["earlier-work"],
    tags: ["React", "Firebase", "TMDB", "Clone"],
    github: "https://github.com/VanshajPoonia/amazon-prime-clone",
    year: "2021",
    priority: 20,
  },
  {
    slug: "hypnover",
    title: "Hypnover",
    tagline: "Early CodeWithHarry-style learning clone.",
    description: "An early learning clone inspired by coding education websites — built to study layout systems and component composition.",
    status: "shipped",
    categories: ["earlier-work"],
    tags: ["HTML", "CSS", "Learning", "Clone"],
    github: "https://github.com/VanshajPoonia/hypnover",
    year: "2021",
    priority: 18,
  },
  {
    slug: "cloudcode-docker-container",
    title: "Cloud Code Docker Container",
    tagline: "Containerized full-stack devtools experiment.",
    description: "A small full-stack/container project with backend, frontend, worker, docker-compose, and shell start script.",
    status: "paused",
    categories: ["graveyard", "infrastructure"],
    tags: ["Docker", "Full-stack", "Worker", "Backend", "Frontend", "DevTools"],
    github: "https://github.com/VanshajPoonia/cloudcodedockercontainer",
    year: "2024",
    priority: 15,
  },
]

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  flagship: "Flagship Builds",
  "ai-product": "AI Products",
  enterprise: "Enterprise / Finance Tools",
  "creative-coding": "Creative Coding Experiments",
  "product-experiment": "Product Experiments",
  infrastructure: "Infrastructure / DevTools Experiments",
  "earlier-work": "Earlier Work / Learning Builds",
  graveyard: "Archive / Graveyard",
}

export const projectCategoryOrder: ProjectCategory[] = [
  "flagship",
  "ai-product",
  "enterprise",
  "creative-coding",
  "product-experiment",
  "infrastructure",
  "earlier-work",
  "graveyard",
]

export const projectStatusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  shipped: "Shipped",
  prototype: "Prototype",
  paused: "Paused",
  archive: "Archive",
  learning: "Learning Build",
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => b.priority - a.priority)
}

export function getFlagshipProjects(): Project[] {
  return projects.filter((p) => p.flagship).sort((a, b) => b.priority - a.priority)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
