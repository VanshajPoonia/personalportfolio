import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { learningTopics } from "@/lib/data/learning"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Learning",
  description:
    "Study maps across OS development, Rust, graphics, AI infrastructure, frontend systems, and product work.",
  alternates: { canonical: `${baseUrl}/learning` },
}

export default function LearningPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Learning"
        title="What I'm studying, and why"
        intro={
          <p>
            One card per topic: what I&apos;m learning, why it matters, and which project or research entry it ties
            into. The map is bigger than the work — that is on purpose.
          </p>
        }
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {learningTopics.map((topic) => (
            <article
              key={topic.id}
              className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/40 p-6 glass hover-lift hover:border-primary/30 transition-all duration-300"
            >
              <header>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">{topic.category}</p>
              </header>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                  Learning
                </p>
                <p className="text-sm text-foreground/90 leading-relaxed">{topic.learning}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                  Why it matters
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{topic.why}</p>
              </div>
              <div className="mt-auto flex flex-col gap-2 border-t border-border/40 pt-3">
                {topic.relatedProject && (
                  <Link
                    href={topic.relatedProject.href}
                    className="flex items-center gap-1.5 font-mono text-xs text-primary hover:text-foreground transition-colors"
                  >
                    Project · {topic.relatedProject.title} <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
                {topic.relatedResearch && (
                  <Link
                    href={topic.relatedResearch.href}
                    className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Research · {topic.relatedResearch.title} <ArrowRight className="h-3 w-3" />
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
