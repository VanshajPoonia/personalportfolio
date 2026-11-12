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
      <ProjectDiagram id={media.diagram} compact={compact} />
    )
  }

  return (
    <div className="flex h-full items-center justify-center p-8">
      <p className="label max-w-[22ch] text-center leading-relaxed text-muted-foreground">
        No public deployment to show
      </p>
    </div>
  )
}

const action = "label group inline-flex min-h-[44px] items-center gap-1.5 transition-colors sm:min-h-0"

function ProjectActions({ project, className }: { project: Project; className?: string }) {
  const { deployment } = project
  return (
    <div className={cn("flex flex-wrap items-center gap-x-6 gap-y-1", className)}>
      {project.caseStudy && (
        <Link href={`/work/${project.slug}`} className={cn(action, "text-foreground hover:underline underline-offset-4")}>
          Case study
          <ArrowRight
            aria-hidden="true"
            strokeWidth={2}
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      )}
      {deployment.status === "live" && deployment.url && (
        <ExternalLink
          href={deployment.url}
          label={`Open ${project.title}`}
          className={cn(action, "text-foreground hover:underline underline-offset-4")}
        >
          Open it
        </ExternalLink>
      )}
      {project.github && (
        <ExternalLink
          href={project.github}
          label={`${project.title} source on GitHub`}
          className={cn(action, "text-muted-foreground")}
        >
          <Github aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
          Source
        </ExternalLink>
      )}
    </div>
  )
}

/** The framed window a project's visual sits in: a seam, nothing more. */
function VisualFrame({ project, priority, compact }: { project: Project; priority?: boolean; compact?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border">
      <ProjectVisual project={project} priority={priority} compact={compact} />
    </div>
  )
}

/**
 * Selected work on the homepage: one wide row per project. The visual leads;
 * the words and a short readout explain what you are looking at.
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
    <article className="grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:gap-14">
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <VisualFrame project={project} priority={priority} />
      </div>

      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <h3 className="text-[1.875rem] font-semibold leading-[1.1] sm:text-4xl">
          {project.title}
          {project.canonicalNote && (
            <span className="ml-3 align-middle text-sm font-normal tracking-normal text-muted-foreground">
              {project.canonicalNote}
            </span>
          )}
        </h3>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{project.summary}</p>

        <dl className="mt-8 divide-y divide-border border-y border-border">
          <div className="flex items-baseline justify-between gap-6 py-3">
            <dt className="label text-muted-foreground">State</dt>
            <dd>
              <StatusBadge status={project.status} />
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-6 py-3">
            <dt className="label text-muted-foreground">Deployment</dt>
            <dd className="text-right">
              <DeploymentBadge status={project.deployment.status} note={project.deployment.note} />
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-6 py-3">
            <dt className="label text-muted-foreground">Stack</dt>
            <dd className="text-right font-mono text-[13px]">{project.technologies.slice(0, 4).join(", ")}</dd>
          </div>
        </dl>

        <ProjectActions project={project} className="mt-6" />
      </div>
    </article>
  )
}

/**
 * One row in the /work list. `headingLevel` exists because the list sits
 * directly under the page h1, where an h3 would skip a level.
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
    <article id={project.slug} className="grid gap-6 py-10 sm:grid-cols-12 sm:gap-10">
      <div className="sm:col-span-5 lg:col-span-4">
        <VisualFrame project={project} compact />
      </div>

      <div className="flex flex-col sm:col-span-7 lg:col-span-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <Heading className="text-2xl font-semibold leading-tight">{project.title}</Heading>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {project.categories.map((c) => categoryLabels[c]).join(", ")}
          {project.role !== "Solo" && `, ${project.role.toLowerCase()}`}
        </p>
        <p className="mt-4 max-w-[68ch] text-pretty leading-relaxed text-muted-foreground">{project.summary}</p>

        <div className="mt-5">
          <TechList items={project.technologies} max={5} />
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-8 gap-y-3 pt-6">
          <DeploymentBadge status={project.deployment.status} note={project.deployment.note} />
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  )
}
