import type { Metadata } from "next"
import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { ExternalLink } from "@/components/ui/external-link"
import { archiveEntries } from "@/lib/data/projects"
import { pageMetadata, person } from "@/lib/data/site"

export const metadata: Metadata = pageMetadata({
  title: "Archive",
  description:
    "Earlier work: an abandoned browser developer platform, a small programming language, clones, and learning builds, consolidated one entry per project rather than one per repository.",
  path: "/archive",
})

const kindLabels = {
  product: "Product",
  learning: "Learning build",
  experiment: "Experiment",
} as const

export default function ArchivePage() {
  // Grouped by year label, newest first, so the page reads as a trajectory.
  const groups = archiveEntries.reduce<Record<string, typeof archiveEntries>>((acc, entry) => {
    acc[entry.year] = [...(acc[entry.year] ?? []), entry]
    return acc
  }, {})

  const years = Object.keys(groups).sort((a, b) => b.localeCompare(a))

  return (
    <SiteShell>
      <PageHeader
        title="Not everything here is impressive. That is the point."
        intro={
          <p>
            Earlier work, kept so the trajectory is visible. Where a project spanned several repositories it
            appears once, with the repositories listed underneath, because a multi-repo architecture is not the
            same thing as multiple projects.
          </p>
        }
        meta={`${archiveEntries.length} entries · ${archiveEntries.reduce((n, e) => n + (e.repos?.length ?? 1), 0)} repositories`}
      />

      <Section width="wide">
        <div className="space-y-14">
          {years.map((year) => (
            <section key={year}>
              <h2 className="label mb-5 text-muted-foreground">{year}</h2>
              <ul className="border-t border-border/60">
                {groups[year].map((entry) => (
                  <li
                    key={entry.slug}
                    id={entry.slug}
                    className="grid scroll-mt-24 gap-x-10 gap-y-3 border-b border-border/60 py-6 lg:grid-cols-12"
                  >
                    <div className="space-y-2 lg:col-span-3">
                      <h3 className="font-medium">{entry.title}</h3>
                      <p className="label text-muted-foreground">{kindLabels[entry.kind]}</p>
                    </div>

                    <div className="space-y-3 lg:col-span-9">
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{entry.note}</p>

                      {entry.repos && entry.repos.length > 1 && (
                        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                          <span className="text-muted-foreground">{entry.repos.length} repositories:</span>{" "}
                          {entry.repos.join(", ")}
                        </p>
                      )}

                      {(entry.github || entry.live) && (
                        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
                          {entry.github && (
                            <ExternalLink
                              href={entry.github}
                              label={`${entry.title} source`}
                              className="text-muted-foreground"
                            >
                              Source
                            </ExternalLink>
                          )}
                          {entry.live && (
                            <ExternalLink
                              href={entry.live}
                              label={`${entry.title} deployment`}
                              className="text-muted-foreground"
                            >
                              Still online
                            </ExternalLink>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          <p>
            Current work is under{" "}
            <Link href="/work" className="text-primary hover:underline">
              work
            </Link>
            .{" "}
            <ExternalLink href={person.github} label="GitHub profile" className="text-primary">
              View all repositories
            </ExternalLink>
          </p>
        </div>
      </Section>

      <ContactCTA />
    </SiteShell>
  )
}
