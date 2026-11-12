import type { Metadata } from "next"
import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { PageHeader } from "@/components/layout/page-header"
import { Section, SectionHeader } from "@/components/layout/section"
import { ContributionBadge, Lamp } from "@/components/ui/status-badge"
import { ExternalLink, TechList } from "@/components/ui/external-link"
import {
  contributionCounts,
  contributionsByProject,
  contributionsLastVerified,
  earlierContributions,
  personalOpenSource,
  type Contribution,
} from "@/lib/data/open-source"
import { pageMetadata, person } from "@/lib/data/site"

export const metadata: Metadata = pageMetadata({
  title: "Open Source",
  description:
    "Pull requests authored by Vanshaj Poonia against PictoPy, Plane, Layer5, Jaeger, Joplin, Rocket.Chat, OpenWISP, GoogleTest and Zulip, with merge status checked against GitHub for each.",
  path: "/open-source",
})

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

function Diff({ diff }: { diff: Contribution["diff"] }) {
  return (
    <span className="whitespace-nowrap font-mono text-[13px] text-muted-foreground">
      <span className="text-foreground">+{diff.additions}</span> −{diff.deletions} · {diff.files}{" "}
      {diff.files === 1 ? "file" : "files"}
    </span>
  )
}

function Counts({ merged, open }: { merged: number; open: number }) {
  return (
    <span className="label inline-flex flex-wrap items-center gap-x-4 gap-y-1">
      {merged > 0 && (
        <span className="inline-flex items-center gap-2">
          <Lamp lit />
          {merged} merged
        </span>
      )}
      {open > 0 && (
        <span className="inline-flex items-center gap-2 text-muted-foreground">
          <Lamp lit={false} />
          {open} open
        </span>
      )}
    </span>
  )
}

/** A pull request worth a paragraph: problem, change, effect. */
function WriteUp({ contribution }: { contribution: Contribution }) {
  return (
    <li className="space-y-3.5 border-b border-border py-7 first:pt-0 last:border-b-0 last:pb-0">
      <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <ContributionBadge status={contribution.status} />
        <span className="font-mono text-[13px] text-muted-foreground">{formatDate(contribution.date)}</span>
      </p>
      <h3 className="text-lg font-medium leading-snug tracking-tight">{contribution.title}</h3>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{contribution.writeUp?.summary}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {contribution.writeUp && <TechList items={contribution.writeUp.tags} />}
        <Diff diff={contribution.diff} />
      </div>
      <ExternalLink
        href={contribution.url}
        label={`${contribution.project} pull request ${contribution.number}`}
        className="font-mono text-[13px] text-muted-foreground"
      >
        {contribution.repo} #{contribution.number}
      </ExternalLink>
    </li>
  )
}

/** One line per pull request: state, what it does, how big it was. */
function PullRow({ contribution, showProject = false }: { contribution: Contribution; showProject?: boolean }) {
  return (
    <li className="border-b border-border">
      <ExternalLink
        href={contribution.url}
        label={`${contribution.project} pull request ${contribution.number}: ${contribution.title}`}
        showMarker={false}
        className="grid w-full gap-x-6 gap-y-1.5 py-4 sm:grid-cols-12 sm:items-baseline"
      >
        <span className="flex items-center gap-4 sm:col-span-3">
          {showProject ? (
            <span className="text-sm font-medium text-foreground">{contribution.project}</span>
          ) : (
            <ContributionBadge status={contribution.status} />
          )}
          <span className="font-mono text-[13px] text-muted-foreground">{formatDate(contribution.date)}</span>
        </span>
        <span className="text-pretty text-[15px] leading-snug text-foreground underline-offset-4 group-hover:underline sm:col-span-6">
          {contribution.title}
        </span>
        <span className="flex items-baseline gap-4 sm:col-span-3 sm:justify-end">
          <Diff diff={contribution.diff} />
          <span className="font-mono text-[13px] text-muted-foreground">#{contribution.number}</span>
        </span>
      </ExternalLink>
    </li>
  )
}

export default function OpenSourcePage() {
  const readings = [
    { label: "Merged", value: contributionCounts.merged, lamp: true },
    { label: "Open", value: contributionCounts.open, lamp: false },
    { label: "Projects", value: contributionCounts.projects },
    { label: "First PR", value: 2021 },
  ]

  return (
    <SiteShell>
      <PageHeader
        title="Working inside codebases I did not design."
        intro={
          <p>
            Every entry below is a pull request I wrote for someone else&apos;s project. Forks are not
            contributions and are not listed, and neither are pull requests that were closed without merging.
            Merge status is checked against the GitHub API rather than assumed.
          </p>
        }
      >
        <dl className="grid max-w-3xl grid-cols-2 border-l border-t border-border sm:grid-cols-4">
          {readings.map((reading) => (
            <div key={reading.label} className="border-b border-r border-border px-4 py-3.5">
              <dt className="label inline-flex items-center gap-2 text-muted-foreground">
                {reading.lamp !== undefined && <Lamp lit={reading.lamp} />}
                {reading.label}
              </dt>
              <dd className="mt-1.5 text-3xl font-semibold tabular-nums tracking-tight">{reading.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-3xl font-mono text-[13px] text-muted-foreground">
          Counts cover 2026 onward. The {contributionCounts.earlier} docs pull requests from 2021 and 2022 are
          listed separately at the end. Status verified {contributionsLastVerified}.
        </p>
      </PageHeader>

      <Section width="wide" size="sm">
        <SectionHeader title="Projects" description="Each row jumps to that project's pull requests." />
        <ol className="border-t border-border">
          {contributionsByProject.map(({ project, merged, open }) => (
            <li key={project.slug} className="border-b border-border">
              <Link
                href={`#${project.slug}`}
                className="group grid gap-x-8 gap-y-1.5 py-4 sm:grid-cols-12 sm:items-baseline"
              >
                <span className="font-medium underline-offset-4 group-hover:underline sm:col-span-3">
                  {project.name}
                </span>
                <span className="text-sm text-muted-foreground sm:col-span-6">{project.about}</span>
                <span className="sm:col-span-3 sm:text-right">
                  <Counts merged={merged} open={open} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section width="wide" className="border-t border-border">
        <div>
          {contributionsByProject.map(({ project, writeUps, others, merged, open }) => (
            <article
              key={project.slug}
              id={project.slug}
              aria-labelledby={`${project.slug}-heading`}
              className="grid scroll-mt-24 gap-x-10 gap-y-8 border-t border-border py-14 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-12"
            >
              <header className="lg:col-span-4">
                <div className="space-y-3.5 lg:sticky lg:top-24">
                  <h2 id={`${project.slug}-heading`} className="text-2xl font-semibold tracking-tight">
                    {project.name}
                  </h2>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{project.about}</p>
                  <Counts merged={merged} open={open} />
                  <ul className="space-y-1.5 pt-1">
                    {project.repos.map((repo) => (
                      <li key={repo}>
                        <ExternalLink
                          href={`https://github.com/${repo}`}
                          label={`${repo} on GitHub`}
                          className="font-mono text-[13px] text-muted-foreground"
                        >
                          {repo}
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </header>

              <div className="lg:col-span-8 lg:border-l lg:border-border lg:pl-10">
                {writeUps.length > 0 && (
                  <ol>
                    {writeUps.map((contribution) => (
                      <WriteUp key={contribution.id} contribution={contribution} />
                    ))}
                  </ol>
                )}

                {others.length > 0 && (
                  <div className={writeUps.length > 0 ? "mt-10" : undefined}>
                    <h3 className="mb-3 text-sm font-medium">
                      {writeUps.length > 0 ? "More pull requests" : "Pull requests"}
                    </h3>
                    <ul className="border-t border-border">
                      {others.map((contribution) => (
                        <PullRow key={contribution.id} contribution={contribution} />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section width="wide" className="border-t border-border">
        <SectionHeader
          title="Where it started"
          description="Hacktoberfest 2021 and 2022. Security policies, contributing guides, a code of conduct and a typo fix, all merged. Small changes, kept for the record rather than shown as engineering."
        />
        <ul className="border-t border-border">
          {earlierContributions.map((contribution) => (
            <PullRow key={contribution.id} contribution={contribution} showProject />
          ))}
        </ul>
      </Section>

      <Section width="wide" className="border-t border-border">
        <SectionHeader
          title="Personal open source"
          description="My own public repositories. A different thing from contributing to a project you did not start, so they are counted separately."
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {personalOpenSource.map((repo) => (
            <li key={repo.repo} className="flex flex-col gap-3 rounded-md border border-border p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium">{repo.name}</h3>
                <span className="label text-muted-foreground">{repo.language}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{repo.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 font-mono text-xs">
                <ExternalLink href={repo.url} label={`${repo.name} on GitHub`} className="text-muted-foreground">
                  Source
                </ExternalLink>
                {repo.caseStudy && (
                  <Link href={repo.caseStudy} className="text-primary transition-colors hover:text-foreground">
                    Case study
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          <ExternalLink href={person.github} label="GitHub profile" className="text-primary">
            View all repositories
          </ExternalLink>
        </p>
      </Section>

      <ContactCTA />
    </SiteShell>
  )
}
