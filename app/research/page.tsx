import { Lamp } from "@/components/ui/status-badge"
import type { Metadata } from "next"
import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { research, researchLastVerified } from "@/lib/data/research"
import { pageMetadata } from "@/lib/data/site"

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "One active, unpublished study: training-time masking for robust classical tabular classification under synthetic missingness shift.",
  path: "/research",
})

function Detail({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h3 className="label mb-3.5 text-primary">{label}</h3>
      <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-border" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ResearchPage() {
  const [project] = research.current

  return (
    <SiteShell>
      <PageHeader
        title={research.headline}
        intro={
          <div className="space-y-4">
            {research.body.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        }
        meta={`${research.current.length} study · nothing published · verified ${researchLastVerified}`}
      />

      <Section>
        {/*
          The readout states the unglamorous facts first: nothing is published.
          An in-progress study that says so is worth more than one that implies
          a result it does not have.
        */}
        <div className="max-w-md overflow-hidden rounded-md border border-border">
          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
            <p className="label text-muted-foreground">Status</p>
            <p className="label text-primary">
              <Lamp lit className="mr-2 align-[-1px]" />Active
            </p>
          </div>
          <dl className="divide-y divide-border px-5 font-mono text-xs">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Active work</dt>
              <dd>{research.current.length} study</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Published</dt>
              <dd className="text-muted-foreground">None yet</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Stage</dt>
              <dd className="text-muted-foreground">{research.statusLabel}</dd>
            </div>
          </dl>
        </div>

        <section className="mt-16 border-t border-border pt-12">
          <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
            <div className="space-y-2 lg:col-span-4">
              <h2 className="text-xl font-semibold tracking-tight text-balance">{project.title}</h2>
              <p className="font-mono text-sm text-muted-foreground">{project.role}</p>
              <p className="text-sm text-muted-foreground">{project.affiliation}</p>
              {project.affiliationNote && (
                <p className="text-xs leading-relaxed text-muted-foreground">{project.affiliationNote}</p>
              )}
              <p className="label text-muted-foreground">
                <Lamp lit className="mr-2 align-[-1px]" />
                {project.period}
              </p>
            </div>

            <div className="space-y-8 lg:col-span-8">
              <div className="rounded-md border border-border p-5">
                <p className="label mb-2.5 text-muted-foreground">The question</p>
                <p className="text-pretty leading-relaxed">{project.question}</p>
              </div>

              <p className="max-w-prose text-pretty leading-relaxed text-muted-foreground">
                {project.summary}
              </p>

              <Detail label="Design" items={project.design} />
              <Detail label="Keeping it honest" items={project.rigour} />

              <div>
                <h3 className="label mb-3.5 text-primary">Datasets</h3>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-muted-foreground">
                  {project.datasets.map((dataset) => (
                    <li key={dataset.name} className="rounded border border-border px-2.5 py-1">
                      {dataset.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* No paper, no repository, no numbers. Said plainly rather than omitted. */}
              <p className="rounded-lg border border-border px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                <Lamp lit={false} className="mr-2 align-[-1px]" />No results published. There is no paper and no public
                repository yet, so there is nothing here to link and nothing to cite.
              </p>
            </div>
          </div>
        </section>

        {research.past.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
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

        <p className="mt-16 border-t border-border pt-6 text-sm text-muted-foreground">
          Less formal experiments and build logs live in the{" "}
          <Link href="/workbench" className="text-primary hover:underline">
            workbench
          </Link>
          .
        </p>
      </Section>

      <ContactCTA />
    </SiteShell>
  )
}
