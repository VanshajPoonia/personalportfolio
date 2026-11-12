/**
 * Roles, current and past. This list mirrors the Experience section of my
 * LinkedIn profile, which is the source of truth for titles, dates and
 * employment type. Change LinkedIn first, then this.
 */

export interface ExperienceItem {
  slug: string
  organisation: string
  role: string
  /** Employment type and place, as LinkedIn states them. */
  arrangement: string
  period: string
  current?: boolean
  /** One sentence. The bullets carry the detail. */
  summary: string
  highlights: string[]
  technologies?: string[]
  /** Public, verifiable evidence. A leading slash is a page on this site. */
  links?: { label: string; href: string }[]
}

export const experience: ExperienceItem[] = [
  {
    slug: "helix-grid",
    organisation: "Helix Grid",
    role: "Software Engineer",
    arrangement: "Part-time",
    period: "Jun 2025 - present",
    current: true,
    summary: "Building AI and LLM-powered features as part of the engineering team.",
    highlights: [
      "Shipped AI product features using LLM APIs, asynchronous backend services and automated workflows.",
      "Improved response speed and token usage through prompt optimisation, caching and asynchronous execution.",
      "Added context retrieval, structured-output validation, fallbacks and an evaluation suite to make responses more reliable.",
    ],
  },
  {
    slug: "open-source",
    organisation: "Open source",
    role: "Open Source Contributor",
    arrangement: "Self-employed · Remote",
    period: "Oct 2021 - present",
    current: true,
    summary: "Contributing to open source projects since Hacktoberfest 2021.",
    highlights: [
      "AOSSIE PictoPy: merged fixes for stale face clusters after folder deletion, video player accessibility and controls, and production zoom scrolling, plus CI lint checks and a workflow that auto-closes inactive merge-conflicted pull requests.",
      "Earlier merged contributions to Tailwind CSS, Appsmith, Google's Android FHIR SDK, QuestDB and Scrapy w3lib: docs, contributing guides and security policies.",
      "Pull requests open in Plane, Layer5, Jaeger UI, Joplin, Rocket.Chat, OpenWISP, GoogleTest and Zulip.",
    ],
    technologies: ["TypeScript", "React", "Python", "C++", "GitHub Actions", "Ansible"],
    links: [{ label: "Every pull request", href: "/open-source" }],
  },
  {
    slug: "codedamn",
    organisation: "codedamn",
    role: "Campus Ambassador",
    arrangement: "Part-time · New Delhi, remote",
    period: "Feb 2022 - Aug 2022",
    summary: "Campus ambassador for codedamn, an online platform for learning to code.",
    highlights: [
      "Ran codedamn's events, talks and hackathons in my area.",
      "Brought in course sales through organic outreach to people who wanted to learn to code.",
    ],
  },
  {
    slug: "symbl-ai",
    organisation: "Symbl.ai",
    role: "Open Source Developer",
    arrangement: "Freelance · Remote",
    period: "Oct 2021 - Aug 2022",
    summary: "Contributed to Symbl.ai's open source apps and their documentation.",
    highlights: [
      "Named a Symbl.ai Top Contributor for 2021.",
      "Worked on making the documentation more accessible and easier to follow.",
    ],
  },
]

/**
 * Education. In progress, so no graduation year is shown: an expected date
 * printed without the word "expected" reads as a conferred degree.
 */
export const education = {
  institution: "Indian Institute of Technology Jodhpur",
  shortName: "IIT Jodhpur",
  degree: "Bachelor's, Artificial Intelligence and Data Science",
  period: "2025 - present",
  current: true,
  location: "Jodhpur, Rajasthan",
}

/** Grouped so nobody has to read a rating out of a progress bar. */
export const skillGroups = [
  {
    label: "Product",
    items: ["TypeScript", "Next.js", "React", "Node", "Tailwind CSS", "Postgres"],
  },
  {
    label: "AI / ML",
    items: ["Python", "NumPy", "LLM integration", "Model routing", "Tool calling", "Autograd internals"],
  },
  {
    label: "Systems",
    items: ["Rust", "no_std", "x86_64", "QEMU", "C"],
  },
  {
    label: "Infrastructure",
    items: ["Supabase", "Neon", "Row-level security", "Vercel", "GitHub Actions", "Cloudflare R2"],
  },
]
