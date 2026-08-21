import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/data/projects"
import { categoryLabels } from "@/lib/data/projects"
import { DeploymentBadge, StatusBadge } from "@/components/ui/status-badge"
import { ExternalLink, TechList } from "@/components/ui/external-link"
import { ProjectDiagram } from "@/components/work/project-diagram"

/**
 * Visual for a project. A real screenshot when one exists, an architecture
 * diagram when the honest alternative would be a login screen or a fabricated
 * product UI, and a plain frame when there is nothing truthful to show.
 */
function ProjectVisual({
  project,
  priority,
  compact,
}: {
  project: Project
  priority?: boolean
  compact?: boolean
}) {
  const media = project.media

  if (media?.desktop) {
    return (
      <Image
        src={media.desktop}
        alt={media.alt}
        width={1600}
        height={1000}
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="h-full w-full object-cover object-top"
      />
    )
  }

  if (media?.diagram && media.diagram !== "none") {
    return (
      <ProjectDiagram
        id={media.diagram}
        compact={compact}
        className={compact ? undefined : "rounded-none border-0 bg-transparent"}
      />
    )
  }

  return (
    <div className="flex h-full items-center justify-center bg-secondary/20 p-8">
      <p className="label max-w-[22ch] text-center leading-relaxed text-muted-foreground">
        No public deployment to show
      </p>
    </div>
  )
}

function ProjectActions({ project, className }: { project: Project; className?: string }) {
  const { deployment } = project
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs", className)}>
      {deployment.status === "live" && deployment.url && (
        <ExternalLink href={deployment.url} label={`Open ${project.title}`} className="text-primary">
          Open project
        </ExternalLink>
      )}
      {project.github && (
        <ExternalLink
          href={project.github}
          label={`${project.title} source on GitHub`}
          className="text-muted-foreground"
        >
          <Github aria-hidden="true" className="h-3.5 w-3.5" />
          Source
        </ExternalLink>
      )}
      {project.caseStudy && (
        <Link
          href={`/work/${project.slug}`}
          className="group inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
        >
          Case study
          <ArrowRight
            aria-hidden="true"
            className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  )
}

/**
 * Large alternating card used for Selected Work on the homepage. The visual
 * leads; the words explain what you are looking at.
 */
export function FeaturedProject({
  project,
  index,
  priority,
}: {
  project: Project
  index: number
  priority?: boolean
}) {
  const flip = index % 2 === 1

  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/70 bg-card/40">
          <ProjectVisual project={project} priority={priority} />
        </div>
      </div>

      <div className={cn("space-y-5 lg:col-span-5", flip && "lg:order-1")}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="label text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>{" "}
            / {project.categories.map((c) => categoryLabels[c]).join(" · ")}
          </p>
          <StatusBadge status={project.status} />
        </div>

        <div className="space-y-2.5">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
            {project.canonicalNote && (
              <span className="ml-2.5 align-middle font-mono text-[11px] font-normal text-muted-foreground">
                {project.canonicalNote}
              </span>
            )}
          </h3>
          <p className="text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">{project.summary}</p>
        </div>

        <TechList items={project.technologies} max={5} />

        <div className="space-y-3 border-t border-border/60 pt-4">
          <DeploymentBadge status={project.deployment.status} note={project.deployment.note} />
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  )
}

/**
 * Compact card used in the /work grid.
 *
 * `headingLevel` exists because the grid appears directly under the page h1 on
 * /work, where an h3 would skip a level.
 */
export function ProjectCard({
  project,
  headingLevel = "h3",
}: {
  project: Project
  headingLevel?: "h2" | "h3"
}) {
  const Heading = headingLevel
  return (
    <article
      id={project.slug}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card/30 transition-colors duration-200 hover:border-primary/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-secondary/10">
        <ProjectVisual project={project} compact />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
          <p className="label text-muted-foreground">
            {project.categories.map((c) => categoryLabels[c]).join(" · ")}
          </p>
          <StatusBadge status={project.status} />
        </div>

        <div className="space-y-2">
          <Heading className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
            {project.title}
          </Heading>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        </div>

        <div className="mt-auto space-y-3.5 pt-1">
          <TechList items={project.technologies} max={4} />
          <div className="space-y-2.5 border-t border-border/60 pt-3.5">
            <DeploymentBadge status={project.deployment.status} note={project.deployment.note} />
            <ProjectActions project={project} />
          </div>
        </div>
      </div>
    </article>
  )
}
