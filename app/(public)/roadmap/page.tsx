import type { Metadata } from "next"
import { PageShell } from "@/components/shared/page-shell"
import { roadmap, roadmapColumns } from "@/lib/data/roadmap"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What's active, next, later, paused, and shipped — across the whole lab.",
  alternates: { canonical: `${baseUrl}/roadmap` },
}

const columnAccent: Record<string, string> = {
  now: "border-primary/40 bg-primary/5",
  next: "border-yellow-500/40 bg-yellow-500/5",
  later: "border-blue-500/40 bg-blue-500/5",
  paused: "border-orange-500/40 bg-orange-500/5",
  shipped: "border-emerald-500/40 bg-emerald-500/5",
}

export default function RoadmapPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Roadmap"
        title="What is active, next, later, paused, and shipped"
        intro={
          <p>
            One board for the whole lab. The columns reset when something ships or stalls — the goal is honesty, not
            a perfect plan.
          </p>
        }
      >
        <div className="grid gap-5 lg:grid-cols-5 md:grid-cols-2">
          {roadmapColumns.map((col) => (
            <section
              key={col.id}
              className={`flex flex-col rounded-xl border ${columnAccent[col.id]} p-5 glass`}
            >
              <header className="mb-4">
                <p className="font-mono text-xs uppercase tracking-widest text-primary">{col.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{col.description}</p>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground/70">
                  {roadmap[col.id].length} items
                </p>
              </header>
              <ul className="space-y-2">
                {roadmap[col.id].map((item) => (
                  <li
                    key={item.title}
                    className="rounded-md border border-border/40 bg-card/60 px-3 py-2 text-sm text-foreground/90"
                  >
                    <p className="font-mono text-xs">{item.title}</p>
                    {item.description && (
                      <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageShell>
    </div>
  )
}
