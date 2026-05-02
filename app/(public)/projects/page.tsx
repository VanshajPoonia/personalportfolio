import type { Metadata } from "next"
import { PageShell, SectionHeading } from "@/components/shared/page-shell"
import { ProjectCard } from "@/components/shared/project-card"
import {
  getProjectsByCategory,
  projectCategoryLabels,
  projectCategoryOrder,
} from "@/lib/data/projects"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Flagship builds, AI products, enterprise tools, creative experiments, devtools, and earlier work — organized by category.",
  openGraph: {
    title: "Projects — Vanshaj Poonia",
    description: "Flagship builds, AI products, enterprise tools, creative experiments, and earlier work.",
    url: `${baseUrl}/projects`,
  },
  alternates: { canonical: `${baseUrl}/projects` },
}

const categoryDescriptions: Record<string, string> = {
  flagship: "The work I'm most serious about right now.",
  "ai-product": "Assistants, routing, and AI workspaces.",
  enterprise: "Dense, accountant-friendly internal tooling.",
  "creative-coding": "Visual experiments and developer toys.",
  "product-experiment": "Prototypes that prove or kill an idea.",
  infrastructure: "Devtools, containers, and platform plumbing.",
  "earlier-work": "Honest progression — clones, learning builds, early shipping.",
  graveyard: "Paused, archived, kept around as receipts.",
}

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Projects"
        title="Builds, experiments, and progression"
        intro={
          <p>
            Categorized so you can find what matters. Flagship builds at the top, supporting work below, and an
            honest archive at the bottom.
          </p>
        }
      >
        <div className="space-y-16">
          {projectCategoryOrder.map((category) => {
            const items = getProjectsByCategory(category)
            if (items.length === 0) return null
            return (
              <div key={category} id={category} className="scroll-mt-24">
                <SectionHeading
                  label={projectCategoryLabels[category]}
                  description={categoryDescriptions[category]}
                  count={items.length}
                />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </PageShell>
    </div>
  )
}
