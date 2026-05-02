import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/shared/page-shell"
import { timeline } from "@/lib/data/timeline"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A developer journey from early clone projects to systems, AI, and enterprise tools — written as growth, not a list.",
  alternates: { canonical: `${baseUrl}/timeline` },
}

export default function TimelinePage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Timeline"
        title="A developer journey, in phases"
        intro={
          <p>
            Earlier work that shows the path, not the destination. Each phase is a different question I was learning to
            answer.
          </p>
        }
      >
        <div className="relative space-y-10">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent hidden sm:block" />

          {timeline.map((phase, index) => (
            <article
              key={phase.id}
              className="relative grid gap-4 sm:grid-cols-[80px_1fr] sm:items-start"
            >
              <div className="flex items-center gap-3 sm:flex-col sm:items-start">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-sm text-primary">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span className="font-mono text-xs text-muted-foreground sm:mt-2">{phase.range}</span>
              </div>

              <div className="rounded-xl border border-border/60 bg-card/40 p-6 glass hover-lift hover:border-primary/30 transition-all duration-300">
                <h2 className="text-xl font-semibold tracking-tight">{phase.label}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{phase.narrative}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {phase.projects.map((project) =>
                    project.slug ? (
                      <Link
                        key={project.title}
                        href={`/projects#${project.slug}`}
                        className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      <span
                        key={project.title}
                        className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {project.title}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageShell>
    </div>
  )
}
