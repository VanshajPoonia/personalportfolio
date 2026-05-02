import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { TinyTerminal } from "@/components/lab/tiny-terminal"
import { labItems } from "@/lib/data/lab"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Interactive demos, visual experiments, terminal toys, and OS explainers — small things to play with, not a portfolio reel.",
  alternates: { canonical: `${baseUrl}/lab` },
}

export default function LabPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Lab"
        title="Interactive demos and visual experiments"
        intro={
          <p>
            Small toys with real behavior — terminal commands, boot flow visualizers, ASCII cameras, and a few planned
            experiments waiting their turn.
          </p>
        }
      >
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">Tiny Terminal</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xl">
              An in-browser terminal with a small set of real commands. Try <code className="font-mono text-foreground">help</code>,
              <code className="font-mono text-foreground"> projects</code>, <code className="font-mono text-foreground">lab</code>, or
              <code className="font-mono text-foreground"> now</code>.
            </p>
            <TinyTerminal />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Other experiments</h2>
            <div className="space-y-3">
              {labItems
                .filter((item) => item.slug !== "tiny-terminal")
                .map((item) => {
                  const inner = (
                    <article className="group rounded-xl border border-border/60 bg-card/40 p-5 glass transition-all duration-300 hover-lift hover:border-primary/40 hover:bg-card/70">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {item.status}
                        </span>
                        {item.external ? (
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                      <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-gradient">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  )

                  if (item.external) {
                    return (
                      <a
                        key={item.slug}
                        href={item.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {inner}
                      </a>
                    )
                  }
                  if (item.href) {
                    return (
                      <Link key={item.slug} href={item.href} className="block">
                        {inner}
                      </Link>
                    )
                  }
                  return (
                    <div key={item.slug} className="block opacity-80">
                      {inner}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  )
}
