import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Boxes } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { blueprints } from "@/lib/data/blueprints"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Blueprints",
  description:
    "Technical blueprints for systems I want to build, rebuild, or understand deeply.",
  alternates: { canonical: `${baseUrl}/blueprints` },
}

export default function BlueprintsPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Blueprints"
        title="Technical blueprints for unfinished systems"
        intro={
          <p>
            Technical blueprints for systems I want to build, rebuild, or understand deeply. These are not finished
            products. They are architecture sketches, MVP plans, and implementation notes.
          </p>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {blueprints.map((bp) => (
            <Link
              key={bp.slug}
              href={`/blueprints/${bp.slug}`}
              className="group flex flex-col rounded-xl border border-border/60 bg-card/40 p-6 sm:p-7 glass hover-lift hover:border-primary/40 hover:bg-card/70 transition-all duration-300"
            >
              <header className="mb-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">{bp.category}</p>
                    <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-gradient">
                      {bp.title}
                    </h2>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{bp.summary}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                    {bp.status}
                  </span>
                  <span className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                    {bp.difficulty}
                  </span>
                  {bp.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              <div className="mt-auto space-y-4 border-t border-border/40 pt-5">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  <Boxes className="h-3.5 w-3.5" />
                  system components
                </div>
                <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  {bp.components.slice(0, 4).map((component) => (
                    <li key={component} className="flex gap-2">
                      <span className="text-primary/60">▸</span>
                      <span className="line-clamp-1">{component}</span>
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                  full blueprint <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border/60 bg-card/30 p-6 glass">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">How this differs</p>
          <div className="mt-4 grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
            <p>
              <span className="text-foreground">Blog:</span> polished essays, tutorials, long-form explanations, and
              finished thoughts.
            </p>
            <p>
              <span className="text-foreground">Workbench:</span> build logs, debugging notes, architecture sketches,
              raw experiments, and half-formed ideas.
            </p>
            <p>
              <span className="text-foreground">Research:</span> exploratory papers, technical comparisons, and
              literature-style analysis.
            </p>
            <p>
              <span className="text-foreground">Blueprints:</span> system design documents, MVP plans, technical
              tradeoffs, and implementation sketches.
            </p>
          </div>
        </div>
      </PageShell>
    </div>
  )
}
