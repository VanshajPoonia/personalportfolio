import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section, SectionHeader } from "@/components/layout/section"
import { FeaturedProject } from "@/components/work/project-card"
import { getFeaturedProjects } from "@/lib/data/projects"
import { experience } from "@/lib/data/experience"
import { contributionCounts, contributionHighlights, contributionsLastVerified } from "@/lib/data/open-source"
import { workbenchPosts } from "@/lib/data/workbench"
import { research } from "@/lib/data/research"
import { ContributionBadge, Lamp } from "@/components/ui/status-badge"
import { ExternalLink } from "@/components/ui/external-link"

export function SelectedWork() {
  const featured = getFeaturedProjects()

  return (
    <Section id="work" width="wide" className="border-b border-border">
      <SectionHeader
        title="Selected work"
        description="Three projects that show the range. The rest are on the work page, with the state each one is in."
        action={{ label: "All work", href: "/work" }}
      />

      <div className="divide-y divide-border border-t border-border">
        {featured.map((project, index) => (
          <FeaturedProject key={project.slug} project={project} index={index} priority={index === 0} />
        ))}
      </div>
    </Section>
  )
}

export function ExperiencePreview() {
  return (
    <Section id="experience" className="border-b border-border">
      <SectionHeader title="Experience" action={{ label: "Full experience", href: "/experience" }} />

      <ol className="border-t border-border">
        {experience.map((item) => (
          <li
            key={item.slug}
            className="grid gap-x-8 gap-y-1 border-b border-border py-5 sm:grid-cols-12 sm:items-baseline"
          >
            <h3 className="text-lg font-medium sm:col-span-5">{item.organisation}</h3>
            <p className="text-muted-foreground sm:col-span-5">{item.role}</p>
            <p className="label inline-flex items-center gap-2 sm:col-span-2 sm:justify-end">
              {item.current ? (
                <>
                  <Lamp lit />
                  Now
                </>
              ) : (
                <span className="text-muted-foreground">{item.period}</span>
              )}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function OpenSourcePreview() {
  return (
    <Section id="open-source" className="border-b border-border">
      <SectionHeader
        title="Open source"
        description={
          <>
            {contributionCounts.merged} pull requests merged and {contributionCounts.open} open, across{" "}
            {contributionCounts.projects} projects I did not start. Each status was checked against GitHub on{" "}
            {contributionsLastVerified}.
          </>
        }
        action={{ label: "All contributions", href: "/open-source" }}
      />

      <ul className="border-t border-border">
        {contributionHighlights.map((contribution) => (
          <li key={contribution.id} className="border-b border-border">
            <ExternalLink
              href={contribution.url}
              label={`${contribution.project} pull request ${contribution.number}: ${contribution.title}`}
              showMarker={false}
              className="grid w-full gap-x-8 gap-y-1.5 py-5 sm:grid-cols-12 sm:items-baseline"
            >
              <span className="text-muted-foreground sm:col-span-3">{contribution.project}</span>
              <span className="text-lg font-medium leading-snug sm:col-span-6">{contribution.title}</span>
              <span className="flex items-center justify-between gap-4 sm:col-span-3 sm:justify-end">
                <ContributionBadge status={contribution.status} />
                <span className="font-mono text-[13px] text-muted-foreground">#{contribution.number}</span>
              </span>
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function WorkbenchPreview() {
  // Chosen for technical interest rather than recency: a systems debugging
  // note, a rendering note, and a product-shaped architecture decision.
  const picks = ["qemu-debugging-notes", "framebuffer-rendering-notes", "intacct-service-layer-notes"]
  const notes = picks
    .map((slug) => workbenchPosts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post))

  return (
    <Section id="workbench" className="border-b border-border">
      <SectionHeader
        title="Workbench"
        description="Build logs, debugging write-ups and design studies. Rough on purpose."
        action={{ label: "Open the workbench", href: "/workbench" }}
      />

      <ul className="border-t border-border">
        {notes.map((note) => (
          <li key={note.slug} className="border-b border-border">
            <Link
              href={`/workbench/${note.slug}`}
              className="group grid gap-x-8 gap-y-1.5 py-5 sm:grid-cols-12 sm:items-baseline"
            >
              <p className="font-mono text-[13px] text-muted-foreground sm:col-span-2">{note.date}</p>
              <h3 className="text-lg font-medium underline-offset-4 group-hover:underline sm:col-span-5">
                {note.title}
              </h3>
              <p className="text-muted-foreground sm:col-span-5">{note.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function ResearchPreview() {
  return (
    <Section id="research" className="border-b border-border">
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 className="text-[1.875rem] font-semibold leading-[1.1] sm:text-[2.5rem]">{research.headline}</h2>
          <p className="mt-4 max-w-[60ch] text-pretty text-muted-foreground">{research.body[0]}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:col-span-4 lg:justify-end">
          <p className="label inline-flex items-center gap-2">
            <Lamp lit />
            {research.statusLabel}
          </p>
          <Link
            href="/research"
            className="label group inline-flex min-h-[44px] items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            Research
            <ArrowRight
              aria-hidden="true"
              strokeWidth={2}
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </Section>
  )
}
