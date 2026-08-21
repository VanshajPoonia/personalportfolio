/**
 * Professional and collaborative engineering.
 *
 * Titles here are deliberately conservative. Where a public source does not
 * state an exact title, the role is described by the work rather than upgraded
 * to something that sounds better. Client systems are described at capability
 * level only: no private repositories, credentials, customer data, or internal
 * architecture that is not already public.
 */

export interface ExperienceItem {
  slug: string
  organisation: string
  role: string
  period: string
  current?: boolean
  /** Two sentences at most. The bullets carry the detail. */
  summary: string
  highlights: string[]
  technologies: string[]
  /** Public, verifiable evidence. Never a private repository. */
  links?: { label: string; href: string }[]
  /** Set when the work is not solo, so ownership is never implied. */
  ownership?: string
}

export const experience: ExperienceItem[] = [
  {
    slug: "kreativ-vantage",
    organisation: "Kreativ Vantage",
    role: "Principal Engineer",
    period: "2025 - present",
    current: true,
    summary:
      "Web design and development studio. I take client projects from brief to production and then keep them running: application code, database and auth, deployment, domains, and the integrations that sit behind the marketing site.",
    highlights: [
      "Ship and maintain production sites and web apps for local-business, property, trades, and professional-services clients.",
      "Own the deployment path end to end: build configuration, environment management, custom domains, DNS, and post-launch fixes.",
      "Build the data layer behind client products with Postgres and Supabase, including auth and role-based access where a client needs staff-only surfaces.",
      "Integrate AI features and workflow automation into client products where they replace manual work rather than decorate the page.",
      "Translate non-technical requirements into scope, and handle the technical side of the client conversation directly.",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Postgres", "Vercel", "Tailwind CSS"],
    links: [
      { label: "kreativvantage.com", href: "https://www.kreativvantage.com" },
      { label: "Klik", href: "https://klik.kreativvantage.com" },
    ],
  },
  {
    slug: "integration-engineering",
    organisation: "Client integration work",
    role: "Backend / integration engineer",
    period: "2026",
    current: true,
    summary:
      "A point-of-sale to CRM synchronisation service, built for a client and kept private. The interesting part was never the API calls; it was making a repeated import safe to run against live data.",
    highlights: [
      "Built a scheduled synchronisation service moving point-of-sale records into a CRM, with a separate path for the historical backfill.",
      "Made every write idempotent so a re-run of an overlapping window cannot duplicate records downstream.",
      "Added source-integrity validation, so records that fail their checks are rejected at the boundary instead of quietly corrupting the CRM.",
      "Pinned the scheduler to a spillover-safe configuration after finding that overlapping runs could double-process a window.",
      "Kept production-write safeguards in front of every destructive path.",
    ],
    technologies: ["TypeScript", "Node", "Scheduled jobs", "REST integrations", "Postgres"],
    ownership: "Private client system. Described at capability level; no repository, data, or client detail is public.",
  },
  {
    slug: "gzonesphere",
    organisation: "GzoneSphere",
    role: "Platform developer",
    period: "2026",
    current: true,
    summary:
      "A community platform for gamers, developers, and studios, built with a small team in a private repository. I contributed across the platform through around thirty merged pull requests.",
    highlights: [
      "Rebuilt authentication and onboarding, including a shorter signup, username claiming, and auth email that fails loudly instead of silently.",
      "Migrated file storage to Cloudflare R2 and reworked the admin permission model, media library, and CMS blocks.",
      "Built the progression system, notifications, dashboard, and the community and games surfaces on top of a Drizzle and Postgres data layer.",
      "Diagnosed a production outage where eleven routes returned 500: an ESM-only dependency could not load on the Node version the platform resolved at build time. Traced it across three iterations, then fixed the bundle rather than the symptom.",
      "Audited every path that sends email after finding that Google signups were the only accounts receiving no welcome message.",
    ],
    technologies: ["Next.js", "TypeScript", "Drizzle", "Postgres", "Cloudflare R2", "Vercel"],
    links: [{ label: "gzs-next.vercel.app", href: "https://gzs-next.vercel.app" }],
    ownership:
      "Collaborative team project in a private repository. I am one of several contributors and do not own the platform.",
  },
  {
    slug: "hypnosys",
    organisation: "Hypnosys",
    role: "Founder & Full Stack Developer",
    period: "2022 - 2024",
    summary:
      "An earlier product venture, and the umbrella the browser-IDE work shipped under. Codash, Codash Meet, and the Tulip language documentation all lived on Hypnosys domains.",
    highlights: [
      "Started and ran a small product venture while building the products inside it.",
      "Shipped Codash, a browser-based developer platform, across an editor, a code server, a collaboration tool, docs, and billing.",
      "Learned the lesson that shaped everything after it: a seven-repository product built by one person is six repositories too many.",
    ],
    technologies: ["Next.js", "Node", "Docker", "Python"],
    ownership: "Domains are now offline. Kept here as history, not as a current venture.",
  },
]

/**
 * Public production sites delivered through client work. These are live and
 * publicly reachable, so linking them exposes nothing that is not already
 * on the open web.
 */
export interface ClientDelivery {
  name: string
  sector: string
  href: string
}

export const clientDelivery: ClientDelivery[] = [
  { name: "Klik", sector: "Event photo capture product", href: "https://klik.kreativvantage.com" },
  { name: "Healthy Mechanical", sector: "Trades and HVAC services", href: "https://www.healthymechanical.com" },
  { name: "Rose & Lily Clean", sector: "Local business services", href: "https://roseandlilyclean.com" },
  { name: "Shanks Realty Bike Parade", sector: "Property and community events", href: "https://bikeparade.shanksrealtygroup.com" },
]

/**
 * Education. In progress, so no graduation year is shown: an expected date
 * printed without the word "expected" reads as a conferred degree.
 */
export const education = {
  institution: "Indian Institute of Technology Jodhpur",
  shortName: "IIT Jodhpur",
  degree: "Bachelor's, Artificial Intelligence and Data Science",
  period: "2024 - present",
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
