export interface NavItem {
  label: string
  href: string
  description?: string
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const person = {
  name: "Vanshaj Poonia",
  title: "Full Stack & AI Developer",
  location: "Delhi, India",
  email: "vanshajpoonia06@gmail.com",
  github: "https://github.com/VanshajPoonia",
  githubHandle: "VanshajPoonia",
  linkedin: "https://www.linkedin.com/in/vanshajpoonia/",
  x: "https://x.com/PooniaVanshaj",
  xHandle: "@PooniaVanshaj",
}

export const positioning = {
  /** Hero headline, split so the layout can break it deliberately. */
  headline: ["I build software", "across the stack."],
  /** One sentence that has to survive the five-second test. */
  lede:
    "Full-stack products, AI systems, developer tools, and an operating system I am writing to understand what sits underneath all of them.",
  /** The through-line. Used in the spectrum section and metadata. */
  thesis: "From interfaces to infrastructure.",
  metaDescription:
    "Vanshaj Poonia builds full-stack products, AI systems, developer tools, and a hobby operating system in Rust. Selected work, case studies, and open-source contributions.",
}

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work", description: "Products, systems, and tools I have built." },
  { label: "Experience", href: "/experience", description: "Professional and collaborative engineering." },
  { label: "Open Source", href: "/open-source", description: "Contributions to codebases I did not write." },
  { label: "Research", href: "/research", description: "Currently inactive." },
  { label: "About", href: "/about", description: "Background, current focus, and how to reach me." },
]

export const secondaryNav: NavItem[] = [
  { label: "Workbench", href: "/workbench", description: "Build logs, debugging notes, and design studies." },
  { label: "Archive", href: "/archive", description: "Earlier work, kept honest." },
]

export const socialLinks = [
  { label: "GitHub", href: person.github, handle: "@VanshajPoonia" },
  { label: "LinkedIn", href: person.linkedin, handle: "vanshajpoonia" },
  { label: "X", href: person.x, handle: person.xHandle },
  { label: "Email", href: `mailto:${person.email}`, handle: person.email },
] as const

/**
 * What I am actually spending engineering time on. Kept short on purpose, and
 * kept free of research language because there is no active research.
 */
export const currentFocus = [
  "Product engineering",
  "AI systems and tooling",
  "Systems programming",
  "Machine-learning internals",
  "Open source",
]
