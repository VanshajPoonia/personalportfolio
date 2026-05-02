import type { Metadata } from "next"
import Link from "next/link"
import { Download, ArrowRight, FileText } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { artifacts } from "@/lib/data/artifacts"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Artifacts",
  description:
    "Downloadable diagrams, PDFs, notes, prompt packs, and technical resources from across the lab.",
  alternates: { canonical: `${baseUrl}/artifacts` },
}

export default function ArtifactsPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Artifacts"
        title="Diagrams, notes, and downloadable resources"
        intro={
          <p>
            Output that lives outside the page — architecture notes, blueprints, research papers, and more. Coming-soon
            entries stay listed so the index reflects what is actually planned.
          </p>
        }
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {artifacts.map((artifact) => (
            <article
              key={artifact.slug}
              className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/40 p-6 glass hover-lift hover:border-primary/30 transition-all duration-300"
            >
              <header className="flex items-center justify-between">
                <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {artifact.type}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                    artifact.status === "Available"
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-secondary/60 text-muted-foreground"
                  }`}
                >
                  {artifact.status}
                </span>
              </header>
              <h2 className="text-lg font-semibold tracking-tight">{artifact.title}</h2>
              <p className="flex-1 text-sm text-muted-foreground leading-relaxed">{artifact.summary}</p>

              <div className="flex flex-wrap items-center gap-4 border-t border-border/40 pt-3 font-mono text-xs">
                {artifact.status === "Available" && artifact.href ? (
                  <a
                    href={artifact.href}
                    className="flex items-center gap-1.5 text-primary hover:text-foreground transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" /> download
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 text-muted-foreground/70">
                    <FileText className="h-3.5 w-3.5" /> coming soon
                  </span>
                )}
                {artifact.related && (
                  <Link
                    href={artifact.related.href}
                    className="ml-auto flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {artifact.related.label} <ArrowRight className="h-3 w-3" />
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
