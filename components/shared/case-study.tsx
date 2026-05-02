import type { ReactNode } from "react"
import Link from "next/link"
import { Github, ExternalLink, ArrowLeft } from "lucide-react"
import type { Project } from "@/lib/data/projects"
import { projectStatusLabels } from "@/lib/data/projects"

interface CaseStudySection {
  id: string
  label: string
  body: ReactNode
}

interface CaseStudyProps {
  project: Project
  sections: CaseStudySection[]
}

export function CaseStudy({ project, sections }: CaseStudyProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> back to projects
      </Link>

      <header className="mt-8 space-y-4 animate-fade-in-up">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
            case study
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {projectStatusLabels[project.status]} · {project.year}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="text-lg text-muted-foreground">{project.tagline}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/40">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm text-primary hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" /> Live
            </a>
          )}
        </div>
      </header>

      <nav className="mt-10 mb-12 rounded-xl border border-border/60 bg-card/40 glass p-5">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">On this page</p>
        <ol className="grid gap-1.5 sm:grid-cols-2">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {String(index + 1).padStart(2, "0")} · {section.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="space-y-14">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.label}</h2>
            </div>
            <div className="prose prose-invert max-w-none text-base leading-relaxed text-muted-foreground space-y-4 [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_code]:rounded [&_code]:border [&_code]:border-border/60 [&_code]:bg-secondary/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-foreground">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
