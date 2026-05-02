import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Skull } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { workbenchPosts } from "@/lib/data/workbench"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Workbench",
  description:
    "Build logs, debugging notes, architecture sketches, and rough technical field notes from projects in progress.",
  alternates: { canonical: `${baseUrl}/workbench` },
}

export default function WorkbenchPage() {
  const sorted = [...workbenchPosts].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Workbench"
        title="Developer notebook, not a blog"
        intro={
          <p>
            Build logs, debugging notes, architecture sketches, and rough technical field notes from projects in
            progress. Smaller and messier than essays, but more useful than a changelog.
          </p>
        }
        toolbar={
          <Link
            href="/workbench/graveyard"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors w-fit"
          >
            <Skull className="h-3.5 w-3.5" /> visit the graveyard <ArrowRight className="h-3 w-3" />
          </Link>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/workbench/${post.slug}`}
              className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-card/40 p-6 glass transition-all duration-300 hover-lift hover:border-primary/40 hover:bg-card/70"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {post.status}
                </span>
              </div>
              <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-gradient">
                {post.title}
              </h2>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {post.relatedProject && (
                  <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono">
                    {post.relatedProject}
                  </span>
                )}
                <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono">
                  {post.readTime}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-border/40 pt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 pt-1 font-mono text-xs uppercase tracking-widest text-primary">
                read note <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border/60 bg-card/30 p-6 glass">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Workbench is not blog</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Blog posts are polished essays and finished explanations. Workbench entries are build logs, debugging notes,
            architecture sketches, raw experiments, half-formed ideas, and what-I-learned-today notes.
          </p>
        </div>
      </PageShell>
    </div>
  )
}
