import type { Metadata } from "next"
import Link from "next/link"
import { Download, ArrowRight, FileText } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { researchEntries } from "@/lib/data/research"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Exploratory papers and technical essays where I study emerging technologies deeply enough to explain tradeoffs, architectures, and open questions.",
  alternates: { canonical: `${baseUrl}/research` },
}

const statusStyles: Record<string, string> = {
  Published: "bg-primary/15 text-primary border-primary/40",
  Draft: "bg-yellow-500/15 text-yellow-500 border-yellow-500/40",
  "In Progress": "bg-blue-500/15 text-blue-400 border-blue-500/40",
  Planned: "bg-secondary/60 text-muted-foreground border-border",
}

export default function ResearchPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Research"
        title="Exploratory papers and technical essays"
        intro={
          <p>
            Long-form writing where I study emerging technologies deeply enough to explain tradeoffs, architectures,
            and open questions. Some are drafts, some are still notes — none of them pretend to be done.
          </p>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          {researchEntries.map((entry) => (
            <article
              key={entry.slug}
              id={entry.slug}
              className="scroll-mt-24 group flex flex-col gap-3 rounded-xl border border-border/60 bg-card/40 p-6 glass hover-lift hover:border-primary/30 transition-all duration-300"
            >
              <header className="flex items-center justify-between gap-3">
                <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {entry.type}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${statusStyles[entry.status] ?? statusStyles.Planned}`}
                >
                  {entry.status}
                </span>
              </header>
              <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-gradient">
                {entry.title}
              </h2>
              <p className="font-mono text-xs text-muted-foreground">{entry.topic}</p>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
              <div className="flex flex-wrap gap-1.5 border-t border-border/40 pt-3">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                {entry.readHref ? (
                  <a
                    href={entry.readHref}
                    className="flex items-center gap-1.5 text-primary hover:text-foreground transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" /> read
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 text-muted-foreground/70">
                    <FileText className="h-3.5 w-3.5" /> read — coming soon
                  </span>
                )}
                {entry.pdfHref ? (
                  <a
                    href={entry.pdfHref}
                    className="flex items-center gap-1.5 text-primary hover:text-foreground transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" /> pdf
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 text-muted-foreground/70">
                    <Download className="h-3.5 w-3.5" /> pdf — coming soon
                  </span>
                )}
                {entry.relatedProject && (
                  <Link
                    href={entry.relatedProject.href}
                    className="ml-auto flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {entry.relatedProject.title} <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </PageShell>
    </div>
  )
}
