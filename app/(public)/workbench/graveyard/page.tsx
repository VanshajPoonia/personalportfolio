import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { graveyardEntries } from "@/lib/data/workbench"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Graveyard",
  description:
    "Paused, archived, and revisited-later experiments — kept honest as receipts of what I tried.",
  alternates: { canonical: `${baseUrl}/workbench/graveyard` },
}

export default function GraveyardPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Workbench · Graveyard"
        title="Things I tried, learned from, and might revisit"
        intro={
          <p>
            Not an embarrassment section. Every entry here taught me something specific — and a couple of them might
            come back when the moment is right.
          </p>
        }
        toolbar={
          <Link
            href="/workbench"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> back to workbench
          </Link>
        }
      >
        <div className="space-y-5">
          {graveyardEntries.map((entry) => (
            <article
              key={entry.slug}
              className="rounded-xl border border-border/60 bg-card/40 p-6 glass hover-lift hover:border-primary/30 transition-all duration-300"
            >
              <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold tracking-tight">{entry.title}</h2>
                {entry.related && (
                  <a
                    href={entry.related}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> source
                  </a>
                )}
              </header>
              <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-primary mb-1">What I tried</dt>
                  <dd className="text-muted-foreground">{entry.whatTried}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-primary mb-1">Why it paused</dt>
                  <dd className="text-muted-foreground">{entry.whyPaused}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-primary mb-1">What I learned</dt>
                  <dd className="text-muted-foreground">{entry.whatLearned}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-primary mb-1">Revisit</dt>
                  <dd className="text-muted-foreground">{entry.revisit}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </PageShell>
    </div>
  )
}
