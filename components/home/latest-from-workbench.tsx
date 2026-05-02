import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { workbenchPosts } from "@/lib/data/workbench"

export function LatestFromWorkbench() {
  const latest = [...workbenchPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4)

  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3 animate-fade-in-up">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
              Latest from the workbench
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Build logs, not blog posts
            </h2>
          </div>
          <Link
            href="/workbench"
            className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest text-primary hover:text-foreground transition-colors"
          >
            all entries <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {latest.map((post, index) => (
            <Link
              key={post.slug}
              href={`/workbench/${post.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/40 p-6 glass transition-all duration-300 hover-lift hover:border-primary/40 hover:bg-card/70 animate-fade-in-up"
              style={{ animationDelay: `${index * 80 + 200}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {post.status}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-semibold tracking-tight transition-colors group-hover:text-gradient">
                {post.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.summary}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {post.relatedProject && (
                  <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {post.relatedProject}
                  </span>
                )}
                <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {post.readTime}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
