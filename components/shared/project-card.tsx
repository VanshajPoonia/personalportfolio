import Link from "next/link"
import { Github, ExternalLink, ArrowRight } from "lucide-react"
import type { Project } from "@/lib/data/projects"
import { projectStatusLabels } from "@/lib/data/projects"

const statusDot: Record<Project["status"], string> = {
  active: "bg-yellow-500 animate-pulse",
  shipped: "bg-primary",
  prototype: "bg-yellow-400",
  paused: "bg-orange-500",
  archive: "bg-muted-foreground",
  learning: "bg-blue-400",
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/40 p-6 glass transition-all duration-300 hover-lift hover:border-primary/40 hover:bg-card/70 scroll-mt-28"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className={`h-2 w-2 rounded-full ${statusDot[project.status]}`} />
          {projectStatusLabels[project.status]}
        </span>
      </div>

      <h3 className="mb-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-gradient">
        {project.title}
      </h3>
      <p className="mb-3 text-sm font-mono text-primary/80">{project.tagline}</p>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-border/40 pt-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            source
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-primary hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            live
          </a>
        )}
        {project.caseStudy && (
          <Link
            href={project.caseStudy}
            className="ml-auto flex items-center gap-1.5 font-mono text-xs text-primary hover:text-foreground transition-colors"
          >
            case study <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </article>
  )
}
