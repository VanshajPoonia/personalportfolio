import Link from "next/link"
import { Github, ExternalLink, ArrowRight } from "lucide-react"
import { getFlagshipProjects, projectStatusLabels } from "@/lib/data/projects"

export function FeaturedProjects() {
  const flagship = getFlagshipProjects()

  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3 animate-fade-in-up">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
              Flagship builds
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              The work I&apos;m most serious about
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Small enough to learn from, serious enough to prove the idea. Systems, AI, enterprise tools, and creative experiments — all in active development.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest text-primary hover:text-foreground transition-colors"
          >
            all projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {flagship.map((project, index) => (
            <article
              key={project.slug}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/40 p-6 sm:p-7 glass transition-all duration-400 hover-lift hover:border-primary/40 hover:bg-card/70 animate-fade-in-up"
              style={{ animationDelay: `${(index % 6) * 80 + 200}ms` }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {project.categories[0] === "flagship" ? "flagship" : project.categories[0]}
                </span>
                <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      project.status === "active"
                        ? "bg-yellow-500 animate-pulse"
                        : project.status === "shipped"
                          ? "bg-primary"
                          : "bg-muted-foreground"
                    }`}
                  />
                  {projectStatusLabels[project.status]}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-gradient">
                {project.title}
              </h3>
              <p className="mb-4 text-sm font-mono text-primary/80">{project.tagline}</p>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                {project.description}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
