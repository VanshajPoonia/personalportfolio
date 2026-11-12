import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { ProjectCard } from "@/components/work/project-card"
import { WorkFilters } from "@/components/work/work-filters"
import {
  filterProjects,
  isWorkFilter,
  projectsLastVerified,
  sortedProjects,
  workFilters,
  type WorkFilter,
} from "@/lib/data/projects"
import { pageMetadata } from "@/lib/data/site"

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Products, systems, and developer tools built by Vanshaj Poonia, with build status and deployment status recorded separately for each one.",
  path: "/work",
})

const counts = Object.fromEntries(
  workFilters.map((filter) => [filter.id, filterProjects(sortedProjects, filter.id).length]),
) as Record<string, number>

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const params = await searchParams
  const active: WorkFilter = isWorkFilter(params.filter) ? params.filter : "all"
  const projects = filterProjects(sortedProjects, active)

  return (
    <SiteShell>
      <PageHeader
        width="wide"
        title="Things I built, and what state they are actually in."
        intro={
          <p>
            Build status and deployment status are separate here. &quot;Active&quot; means I am still working
            on it; &quot;Live&quot; means you can open it right now. Anything that cannot be opened says so
            instead of offering you a dead button.
          </p>
        }
        meta={`${sortedProjects.length} projects · links verified ${projectsLastVerified}`}
      >
        <div className="pt-3">
          <Suspense fallback={<div className="h-[44px] sm:h-[38px]" />}>
            <WorkFilters active={active} counts={counts} />
          </Suspense>
        </div>
      </PageHeader>

      <Section width="wide">
        {projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-20 text-center">
            <p className="font-mono text-sm text-muted-foreground">Nothing in this category yet.</p>
            <Link href="/work" className="mt-3 inline-block font-mono text-xs text-primary hover:underline">
              Show all work
            </Link>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug} className="flex">
                <ProjectCard project={project} headingLevel="h2" />
              </li>
            ))}
          </ul>
        )}

        <p className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          Earlier work, clones, and abandoned products are in the{" "}
          <Link href="/archive" className="text-primary hover:underline">
            archive
          </Link>
          . Contributions to other people&apos;s codebases are under{" "}
          <Link href="/open-source" className="text-primary hover:underline">
            open source
          </Link>
          .
        </p>
      </Section>

      <ContactCTA />
    </SiteShell>
  )
}
