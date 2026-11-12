import { Lamp } from "@/components/ui/status-badge"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { workbenchPosts } from "@/lib/data/workbench"
import { blueprints } from "@/lib/data/blueprints"
import { pageMetadata } from "@/lib/data/site"

export const metadata: Metadata = pageMetadata({
  title: "Workbench",
  description:
    "A developer notebook: build logs, debugging writeups, architecture notes, and design studies for systems that do not exist yet.",
  path: "/workbench",
})

export default function WorkbenchPage() {
  const notes = [...workbenchPosts].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <SiteShell>
      <PageHeader
        title="A developer notebook, not a blog."
        intro={
          <p>
            Build logs, debugging writeups, and architecture notes from work in progress. Rougher than an
            essay and more useful than a changelog. Below the notes are design studies: systems worked out on
            paper that I have not built, kept separate so nothing here reads as shipped.
          </p>
        }
        meta={`${notes.length} notes · ${blueprints.length} design studies`}
      />

      <Section width="wide">
        <ul className="border-t border-border">
          {notes.map((note) => (
            <li key={note.slug} className="border-b border-border">
              <Link
                href={`/workbench/${note.slug}`}
                className="group grid gap-x-8 gap-y-2 py-6 lg:grid-cols-12 lg:items-baseline"
              >
                <div className="flex items-center gap-4 lg:col-span-3">
                  <span className="label text-muted-foreground">{note.date}</span>
                  <span className="label text-muted-foreground">{note.status}</span>
                </div>

                <div className="space-y-1.5 lg:col-span-6">
                  <h2 className="font-medium transition-colors group-hover:text-primary">{note.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{note.summary}</p>
                </div>

                <div className="flex items-baseline gap-3 lg:col-span-3 lg:justify-end">
                  {note.relatedProject && (
                    <span className="font-mono text-[11px] text-muted-foreground">{note.relatedProject}</span>
                  )}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="incubator" width="wide" className="border-t border-border">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Incubator</h2>
          <p className="text-muted-foreground">
            System designs for products that do not exist. Data models, tradeoffs, failure modes, and scaling
            paths worked out in full, then not built. Useful thinking; not a portfolio of work.
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {blueprints.map((blueprint) => (
            <li key={blueprint.slug}>
              <Link
                href={`/workbench/incubator/${blueprint.slug}`}
                className="group flex h-full flex-col gap-3 rounded-md border border-border p-6 transition-colors hover:border-engraving"
              >
                <h3 className="text-lg font-medium underline-offset-4 group-hover:underline">{blueprint.title}</h3>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <span className="text-sm text-muted-foreground">{blueprint.category}</span>
                  <span className="label text-muted-foreground">
                    <Lamp lit={false} className="mr-2 align-[-1px]" />Unbuilt
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{blueprint.summary}</p>
                <span className="mt-auto pt-2 text-sm text-muted-foreground">
                  {blueprint.difficulty}, design study
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCTA />
    </SiteShell>
  )
}
