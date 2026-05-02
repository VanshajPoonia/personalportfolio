import type { Metadata } from "next"
import { PageShell } from "@/components/shared/page-shell"
import { nowSections, nowLastUpdated } from "@/lib/data/now"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently building, learning, exploring, and shipping.",
  alternates: { canonical: `${baseUrl}/now` },
}

export default function NowPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Now"
        title="What the lab is up to"
        intro={
          <p>
            A snapshot of where my time is actually going. Updated when the answer changes, not on a schedule.
          </p>
        }
        toolbar={
          <p className="font-mono text-xs text-muted-foreground">last updated · {nowLastUpdated}</p>
        }
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {nowSections.map((section) => (
            <section
              key={section.id}
              className="rounded-xl border border-border/60 bg-card/40 p-6 glass hover-lift hover:border-primary/30 transition-all duration-300"
            >
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">{section.label}</h2>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{item}</span>
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
