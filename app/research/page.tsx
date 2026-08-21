import type { Metadata } from "next"
import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { Container } from "@/components/layout/section"
import { research } from "@/lib/data/research"
import { pageMetadata } from "@/lib/data/site"

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "No active research. Vanshaj Poonia is focused on engineering and shipping software; research work will appear here when there is something published.",
  path: "/research",
})

export default function ResearchPage() {
  return (
    <SiteShell>
      <Container>
        <div className="py-20 sm:py-28">
          <p className="label text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              /
            </span>{" "}
            Research
          </p>

          <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {research.headline}
          </h1>

          <div className="mt-6 max-w-xl space-y-4 leading-relaxed text-muted-foreground">
            {research.body.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          {/*
            A deliberately inert panel. The point is that this system is idle,
            so it reads like a status readout rather than an empty page that
            forgot to load.
          */}
          <div className="mt-12 max-w-md overflow-hidden rounded-xl border border-border/70 bg-secondary/20">
            <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3">
              <p className="label text-muted-foreground">Status</p>
              <p className="label text-muted-foreground">
                <span aria-hidden="true">○</span> Idle
              </p>
            </div>
            <dl className="divide-y divide-border/60 px-5 font-mono text-xs">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Active work</dt>
                <dd>None</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Published</dt>
                <dd>None</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Next</dt>
                <dd className="text-muted-foreground">{research.statusLabel}</dd>
              </div>
            </dl>
          </div>

          {research.past.length > 0 && (
            <section className="mt-16 border-t border-border/60 pt-10">
              <h2 className="mb-6 text-xl font-semibold tracking-tight">Past work</h2>
              <ul className="space-y-6">
                {research.past.map((entry) => (
                  <li key={entry.title} className="space-y-1.5">
                    <p className="label text-muted-foreground">
                      {entry.year} · {entry.status}
                    </p>
                    <h3 className="font-medium">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground">{entry.summary}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-16 border-t border-border/60 pt-6 text-sm text-muted-foreground">
            The nearest thing to research on this site is the{" "}
            <Link href="/workbench" className="text-primary hover:underline">
              workbench
            </Link>
            .
          </p>
        </div>
      </Container>

      <ContactCTA />
    </SiteShell>
  )
}
