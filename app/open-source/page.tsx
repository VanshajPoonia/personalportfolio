import type { Metadata } from "next"
import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { ContributionBadge } from "@/components/ui/status-badge"
import { ExternalLink, TechList } from "@/components/ui/external-link"
import {
  contributionCounts,
  contributionsLastVerified,
  mergedContributions,
  openContributions,
  personalOpenSource,
  type Contribution,
} from "@/lib/data/open-source"
import { person, siteUrl } from "@/lib/data/site"

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Pull requests authored by Vanshaj Poonia against PictoPy, Rocket.Chat, GoogleTest, and OpenWISP, with verified merge status for each.",
  alternates: { canonical: `${siteUrl}/open-source` },
  openGraph: {
    title: "Open Source | Vanshaj Poonia",
    description: "Contributions to PictoPy, Rocket.Chat, GoogleTest, and OpenWISP, with verified status.",
    url: `${siteUrl}/open-source`,
  },
}

function ContributionCard({ contribution }: { contribution: Contribution }) {
  return (
    <li className="grid gap-x-10 gap-y-4 border-b border-border/60 py-7 lg:grid-cols-12">
      <div className="space-y-2 lg:col-span-3">
        <p className="font-medium">{contribution.project}</p>
        <p className="font-mono text-[11px] text-muted-foreground">{contribution.repo}</p>
        <ContributionBadge status={contribution.status} />
      </div>

      <div className="space-y-3.5 lg:col-span-9">
        <h3 className="text-lg font-medium leading-snug tracking-tight">{contribution.title}</h3>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{contribution.summary}</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <TechList items={contribution.tags} />
          <p className="font-mono text-[11px] text-muted-foreground">
            <span className="text-primary">+{contribution.diff.additions}</span>{" "}
            <span>−{contribution.diff.deletions}</span> · {contribution.diff.files} files
          </p>
        </div>

        <ExternalLink
          href={contribution.url}
          label={`${contribution.project} pull request ${contribution.number}`}
          className="font-mono text-xs text-muted-foreground"
        >
          PR #{contribution.number}
        </ExternalLink>
      </div>
    </li>
  )
}

export default function OpenSourcePage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Open source"
        title="Working inside codebases I did not design."
        intro={
          <p>
            Every entry below is a pull request I authored against someone else&apos;s project. Forks are not
            contributions and are not listed. Merge status is checked against the GitHub API rather than
            assumed from the fact that a pull request exists.
          </p>
        }
        meta={`${contributionCounts.merged} merged · ${contributionCounts.open} open · ${contributionCounts.projects} projects · status verified ${contributionsLastVerified}`}
      />

      <Section width="wide">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">Merged</h2>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Accepted into the upstream project. Ordered by how much diagnosis the change needed rather than by
          size.
        </p>
        <ul className="border-t border-border/60">
          {mergedContributions.map((contribution) => (
            <ContributionCard key={contribution.id} contribution={contribution} />
          ))}
        </ul>
      </Section>

      <Section width="wide" className="border-t border-border/60">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">Open</h2>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Submitted and awaiting review. Listed because the engineering is worth reading, not because an open
          pull request is an accomplishment.
        </p>
        <ul className="border-t border-border/60">
          {openContributions.map((contribution) => (
            <ContributionCard key={contribution.id} contribution={contribution} />
          ))}
        </ul>
      </Section>

      <Section width="wide" className="border-t border-border/60">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">Personal open source</h2>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          My own public repositories. Different thing entirely from contributing to a project you did not
          start, so they are counted separately.
        </p>

        <ul className="grid gap-4 md:grid-cols-3">
          {personalOpenSource.map((repo) => (
            <li key={repo.repo} className="flex flex-col gap-3 rounded-xl border border-border/70 p-5">
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
                    Case study →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          <ExternalLink href={person.github} label="GitHub profile" className="text-primary">
            View all repositories
          </ExternalLink>
        </p>
      </Section>

      <ContactCTA />
    </SiteShell>
  )
}
