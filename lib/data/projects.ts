/**
 * Single source of truth for every project the site talks about.
 *
 * Build status and deployment status are separate on purpose: "active" says
 * whether I am still working on it, "deployment" says whether a stranger can
 * open it right now. A project can be actively developed and have no public
 * deployment, or be shipped and long since offline.
 *
 * Every deployment URL and repository here was checked by hand on the date in
 * `lastVerified`. Anything that could not be opened is marked `offline`, and
 * anything behind a login for a single organisation is marked `private`.
 */

export const projectsLastVerified = "2026-08-21"

/** Where the project is in its own life, independent of hosting. */
export type ProjectStatus = "active" | "shipped" | "prototype" | "paused" | "archive" | "learning"

/** Whether a visitor can actually use it. */
export type DeploymentStatus = "live" | "offline" | "private" | "none"

export type ProjectCategory = "systems" | "ai-ml" | "developer-tools" | "product" | "creative"

export type ProjectRole = "Solo" | "Lead developer" | "Contributor" | "Collaborative" | "Client work"

export interface Project {
  slug: string
  title: string
  /** Shown under the title when the repository or history uses another name. */
  canonicalNote?: string
  tagline: string
  summary: string
  year: string
  status: ProjectStatus
  categories: ProjectCategory[]
  technologies: string[]
  role: ProjectRole
  featured?: boolean
  /** Higher sorts first. */
  priority: number
  github?: string
  deployment: {
    status: DeploymentStatus
    url?: string
    /** Why it is not simply "live". Rendered verbatim, so keep it short. */
    note?: string
  }
  /** Set when a case study page exists at /work/[slug]. */
  caseStudy?: boolean
  media?: {
    desktop?: string
    mobile?: string
    alt: string
    /** Rendered instead of a screenshot when there is nothing honest to show. */
    diagram?: "chronoos" | "atlas" | "tensortrail" | "none"
  }
  /** Repositories that are part of this project's history, not separate projects. */
  legacyRepos?: string[]
}

export const projects: Project[] = [
  {
    slug: "chronosapien",
    title: "ChronoOS",
    canonicalNote: "repository: chronosapien",
    tagline: "A hobby operating system written in Rust.",
    summary:
      "A no_std x86_64 kernel that boots under QEMU, draws its own framebuffer console, and hands you a shell. Built to understand boot, memory, interrupts, and filesystems by writing them.",
    year: "2026",
    status: "active",
    categories: ["systems"],
    technologies: ["Rust", "no_std", "x86_64", "QEMU", "ChronoFS"],
    role: "Solo",
    featured: true,
    priority: 100,
    github: "https://github.com/VanshajPoonia/chronosapien",
    deployment: { status: "none", note: "Runs locally in QEMU" },
    caseStudy: true,
    media: { diagram: "chronoos", alt: "ChronoOS boot path from firmware through the kernel to the shell" },
  },
  {
    slug: "project-management-atlas",
    title: "Project Management ATLAS",
    tagline: "A project and marketing workspace with a data-aware AI assistant.",
    summary:
      "Boards, tasks, a marketing content calendar, and an assistant that reads the user's real workspace through the same row-level-security boundary the UI uses. Deployed for one organisation.",
    year: "2026",
    status: "active",
    categories: ["product", "ai-ml"],
    technologies: ["Next.js", "TypeScript", "Supabase", "Postgres RLS", "Vitest"],
    role: "Solo",
    featured: true,
    priority: 95,
    github: "https://github.com/VanshajPoonia/projectmanagementatlas",
    deployment: {
      status: "private",
      note: "Deployed behind sign-in for a single organisation",
    },
    caseStudy: true,
    media: { diagram: "atlas", alt: "ATLAS request path from the UI through the session client to Postgres row-level security" },
  },
  {
    slug: "tensortrail",
    title: "TensorTrail",
    tagline: "A neural network framework built on NumPy, from the autograd up.",
    summary:
      "Reverse-mode automatic differentiation, broadcasting-aware gradients, convolutions, optimisers, and a trainer, written so the machinery stays readable. 137 tests and a finite-difference gradient checker keep it honest.",
    year: "2026",
    status: "shipped",
    categories: ["ai-ml"],
    technologies: ["Python", "NumPy", "pytest", "GitHub Actions"],
    role: "Solo",
    featured: true,
    priority: 90,
    github: "https://github.com/VanshajPoonia/TensorTrail",
    deployment: { status: "none", note: "Python package, installed locally" },
    caseStudy: true,
    media: { diagram: "tensortrail", alt: "TensorTrail data flow from tensor through the operation graph to gradient propagation" },
  },
  {
    slug: "zenquanta-ai",
    title: "Zenquanta AI",
    tagline: "A multi-assistant AI workspace with tier-aware model routing.",
    summary:
      "Six assistant families over one OpenRouter gateway, with a local prompt precheck that recommends the right one, separate text and image billing, per-conversation memory, and public pages for each assistant.",
    year: "2026",
    status: "shipped",
    categories: ["ai-ml", "product"],
    technologies: ["Next.js", "TypeScript", "Neon Postgres", "OpenRouter"],
    role: "Solo",
    featured: true,
    priority: 85,
    github: "https://github.com/VanshajPoonia/zenquantaai",
    deployment: { status: "live", url: "https://zqai.vercel.app" },
    caseStudy: true,
    media: {
      desktop: "/work/zenquanta-desktop.webp",
      mobile: "/work/zenquanta-mobile.webp",
      alt: "Zenquanta AI public page for the Nova assistant, showing its positioning and what it is built for",
    },
  },
  {
    slug: "ascii-camera",
    title: "ASCII Camera",
    canonicalNote: "deployed as V Cam",
    tagline: "A webcam turned into live ASCII, at 60fps in the browser.",
    summary:
      "Reads the camera stream, samples it against a luminance ramp, and paints characters to a canvas every frame. Photo and video capture, adjustable density, and a render-time counter so you can see the cost.",
    year: "2026",
    status: "shipped",
    categories: ["creative"],
    technologies: ["TypeScript", "Vite", "Canvas", "MediaStream"],
    role: "Solo",
    priority: 70,
    github: "https://github.com/VanshajPoonia/asciicamera",
    deployment: { status: "live", url: "https://asciicam.vanshajpoonia.com" },
    media: {
      desktop: "/work/asciicam-desktop.webp",
      alt: "ASCII Camera rendering a live camera feed as green characters, with an FPS and render-time readout",
    },
  },
  {
    slug: "lifesort",
    title: "LifeSort",
    tagline: "Goals, finances, tasks, and habits in one workspace.",
    summary:
      "A personal-organisation app covering several life domains rather than one list. Open sign-up, so the whole product is inspectable rather than screenshot-only.",
    year: "2026",
    status: "shipped",
    categories: ["product"],
    technologies: ["Next.js", "TypeScript", "Liveblocks", "Postgres"],
    role: "Solo",
    priority: 60,
    github: "https://github.com/VanshajPoonia/lifesort",
    deployment: { status: "live", url: "https://lifesort.vercel.app" },
    media: {
      desktop: "/work/lifesort-desktop.webp",
      alt: "LifeSort landing and sign-in screen, with the tagline Everything you need, all in one place",
    },
  },
  {
    slug: "volt",
    title: "Volt",
    tagline: "A browser IDE and code runner with an AI copilot.",
    summary:
      "The most finished thing to come out of the browser-IDE line that started with Codash: an editor, a runner, and an assistant that reads the whole project. Hosted and usable.",
    year: "2026",
    status: "shipped",
    categories: ["developer-tools"],
    technologies: ["Next.js", "TypeScript", "Containers", "LLM integration"],
    role: "Solo",
    priority: 55,
    deployment: { status: "live", url: "https://volt.vanshajpoonia.com" },
    media: {
      desktop: "/work/volt-desktop.webp",
      alt: "Volt landing page: Run code instantly in your browser, above a screenshot of the in-browser editor",
    },
  },
  {
    slug: "intacct",
    title: "Intacct",
    tagline: "An enterprise finance workspace with a service-layer architecture.",
    summary:
      "AP, AR, GL, cash, and reporting workspaces behind role-based access, with every page reading through a service layer instead of the data source. Several domains are still on legacy paths, and the hosted build is currently broken.",
    year: "2026",
    status: "paused",
    categories: ["product"],
    technologies: ["Next.js", "TypeScript", "Supabase", "RBAC"],
    role: "Solo",
    priority: 40,
    github: "https://github.com/VanshajPoonia/intacct",
    deployment: { status: "offline", note: "Hosted build errors on load" },
    media: { diagram: "none", alt: "" },
  },
]

/**
 * Archive entries. These are consolidated: one row per project family, not one
 * per repository. `repos` records what actually sits behind each row.
 */
export interface ArchiveEntry {
  slug: string
  title: string
  year: string
  note: string
  kind: "product" | "learning" | "experiment"
  github?: string
  live?: string
  repos?: string[]
}

export const archiveEntries: ArchiveEntry[] = [
  {
    slug: "codash",
    title: "Codash",
    year: "2022-2024",
    kind: "product",
    note: "A browser-based developer platform: an online IDE, a collaborative editor, a meetings tool, docs, and a subscription dashboard. Ambitious, spread across seven repositories, and never finished. It is the reason Volt exists and the reason Volt is one product instead of seven.",
    github: "https://github.com/VanshajPoonia/codash",
    repos: ["codash", "codashmeet", "codash-docs", "kelvin", "cloudcodedockercontainer", "hammr-ide-cp", "online-ide"],
  },
  {
    slug: "tulip",
    title: "Tulip",
    year: "2022",
    kind: "experiment",
    note: "A small interpreted programming language built on top of Pansy, with a documentation site. An early attempt at the same curiosity that later produced ChronoOS.",
    github: "https://github.com/VanshajPoonia/tulip",
    repos: ["tulip", "tulip-website", "Pansy"],
  },
  {
    slug: "ai-interview-platform",
    title: "AI interview platform",
    year: "2025",
    kind: "learning",
    note: "A voice-agent interview app built by following a JavaScript Mastery tutorial, then extended into a variant for brand-side screening. Useful for learning Vapi and Firebase; not original work, so it lives here.",
    github: "https://github.com/VanshajPoonia/interview-platform",
    live: "https://interview.vanshajpoonia.com",
    repos: ["interview-platform", "interview-platform-for-brands"],
  },
  {
    slug: "algorithm-visualisers",
    title: "Algorithm visualisers",
    year: "2021",
    kind: "learning",
    note: "Pathfinding and sorting visualisers, written twice each while I worked out how to animate state without fighting the render loop.",
    repos: ["pathfinding-visualizer", "Pathfinder-visualiser", "sorting-visualizer", "Sorting-Visualiser"],
  },
  {
    slug: "early-ai-experiments",
    title: "Early AI experiments",
    year: "2021",
    kind: "learning",
    note: "Browser face and sentiment detection, and a neuroevolution agent that learns to play Flappy Bird. Consuming models rather than building them, which is roughly the gap TensorTrail was written to close.",
    repos: ["face-recognition", "flappy-bird-playing-ai"],
  },
  {
    slug: "shopeee",
    title: "Shopeee",
    year: "2022",
    kind: "experiment",
    note: "A MedusaJS storefront submitted to the Medusa hackathon. First time building against someone else's commerce primitives instead of inventing my own.",
    github: "https://github.com/VanshajPoonia/shopeee",
  },
  {
    slug: "web3-clones",
    title: "Web3 clones",
    year: "2022",
    kind: "learning",
    note: "OpenSea, Uber, and Discord rebuilt on Solidity and Thirdweb during the period when everything was being rebuilt on Solidity and Thirdweb.",
    repos: ["opensea-clone", "uber-clone-blockchain", "discord-clone-blockchain", "social_token"],
  },
  {
    slug: "product-clones",
    title: "Product clones",
    year: "2021-2022",
    kind: "learning",
    note: "YouTube, Google, Maps, Docs, Drive, Instagram, WhatsApp, Facebook, Snapchat, Twitter, and Amazon Prime, each rebuilt to learn one specific thing: routing, state, auth, uploads, or real-time. The point was never the clone.",
    repos: [
      "mewtube",
      "moogle",
      "moogle-maps",
      "moogledocs",
      "moogle-drive",
      "instagram-clone",
      "instagram-mern-clone",
      "whatsapp-mern",
      "whatsapp-react",
      "facebook-clone",
      "slapchat",
      "mitra-twitter-clone",
      "amazonprime-react",
      "discord-clone-htmlcss",
      "discord-mern-clone",
      "bhhatsapp",
    ],
  },
  {
    slug: "earlier-portfolios",
    title: "Earlier portfolios",
    year: "2021-2025",
    kind: "experiment",
    note: "Five previous versions of this site, including a 3D one. Each replaced the last for a reason that seemed good at the time.",
    repos: ["Portfolio-site", "portfolio-site-nextjs", "Portfolio-site-jsm", "vanshajpoonia.com", "3d-portfolio"],
  },
]

export const statusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  shipped: "Shipped",
  prototype: "Prototype",
  paused: "Paused",
  archive: "Archived",
  learning: "Learning build",
}

export const deploymentLabels: Record<DeploymentStatus, string> = {
  live: "Live",
  offline: "Offline",
  private: "Private",
  none: "Local only",
}

export const categoryLabels: Record<ProjectCategory, string> = {
  systems: "Systems",
  "ai-ml": "AI / ML",
  "developer-tools": "Developer Tools",
  product: "Product",
  creative: "Creative",
}

/** Filter identifiers used in the /work?filter= query string. */
export const workFilters = [
  { id: "all", label: "All" },
  { id: "featured", label: "Featured" },
  { id: "live", label: "Live" },
  { id: "systems", label: "Systems" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "developer-tools", label: "Developer Tools" },
  { id: "product", label: "Product" },
  { id: "creative", label: "Creative" },
] as const

export type WorkFilter = (typeof workFilters)[number]["id"]

export function isWorkFilter(value: string | undefined): value is WorkFilter {
  return !!value && workFilters.some((f) => f.id === value)
}

export function filterProjects(list: Project[], filter: WorkFilter): Project[] {
  if (filter === "all") return list
  if (filter === "featured") return list.filter((p) => p.featured)
  if (filter === "live") return list.filter((p) => p.deployment.status === "live")
  return list.filter((p) => p.categories.includes(filter as ProjectCategory))
}

export const sortedProjects = [...projects].sort((a, b) => b.priority - a.priority)

export function getFeaturedProjects(): Project[] {
  return sortedProjects.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getCaseStudyProjects(): Project[] {
  return sortedProjects.filter((p) => p.caseStudy)
}
