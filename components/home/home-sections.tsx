import Link from "next/link"
import { Section, SectionHeader } from "@/components/layout/section"
import { FeaturedProject } from "@/components/work/project-card"
import { getFeaturedProjects } from "@/lib/data/projects"
import { experience } from "@/lib/data/experience"
import { mergedContributions, openContributions } from "@/lib/data/open-source"
import { workbenchPosts } from "@/lib/data/workbench"
import { research } from "@/lib/data/research"
import { ContributionBadge } from "@/components/ui/status-badge"
import { ExternalLink } from "@/components/ui/external-link"

export function SelectedWork() {
  const featured = getFeaturedProjects()

  return (
    <Section id="work" width="wide" className="border-b border-border/60">
      <SectionHeader
        index="02"
        eyebrow="Selected work"
        title="Four projects that show the range."
        description="The rest is on the work page. These four are the ones worth reading about."
        action={{ label: "All work", href: "/work" }}
      />

      <div className="space-y-20 lg:space-y-28">
        {featured.map((project, index) => (
          <FeaturedProject key={project.slug} project={project} index={index} priority={index === 0} />
        ))}
      </div>
    </Section>
  )
}

export function ExperiencePreview() {
  return (
    <Section id="experience" className="border-b border-border/60">
      <SectionHeader
        index="04"
        eyebrow="Experience"
        title="Where the work has been professional."
        action={{ label: "Full experience", href: "/experience" }}
      />

      <ol className="border-t border-border/60">
        {experience.map((item) => (
          <li
            key={item.slug}
            className="grid gap-x-8 gap-y-1.5 border-b border-border/60 py-5 sm:grid-cols-12 sm:items-baseline"
          >
            <h3 className="font-medium sm:col-span-4">{item.organisation}</h3>
            <p className="font-mono text-xs text-muted-foreground sm:col-span-5">{item.role}</p>
            <p className="label sm:col-span-3 sm:text-right">
              {item.current ? (
                <span className="text-primary">
                  <span aria-hidden="true">●</span> Now
                </span>
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
  const highlights = [mergedContributions[0], mergedContributions[1], openContributions[0]]

  return (
    <Section id="open-source" className="border-b border-border/60">
      <SectionHeader
        index="05"
        eyebrow="Open source"
        title="Working inside codebases I did not design."
        description="Pull requests I authored against other people's projects, with the status each one is actually in."
        action={{ label: "View contributions", href: "/open-source" }}
      />

      <ul className="grid gap-4 md:grid-cols-3">
        {highlights.map((contribution) => (
          <li
            key={contribution.id}
            className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card/30 p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-foreground">{contribution.project}</p>
              <ContributionBadge status={contribution.status} />
            </div>
            <h3 className="text-sm font-medium leading-snug">{contribution.title}</h3>
            <ExternalLink
              href={contribution.url}
              label={`${contribution.project} pull request ${contribution.number}`}
              className="mt-auto font-mono text-xs text-muted-foreground"
            >
              PR #{contribution.number}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function WorkbenchPreview() {
  // Chosen for technical interest rather than recency: a systems debugging
  // note, an architecture decision, and a product-shaped one.
  const picks = ["qemu-debugging-notes", "ai-model-routing-notes", "intacct-service-layer-notes"]
  const notes = picks
    .map((slug) => workbenchPosts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post))

  return (
    <Section id="workbench" className="border-b border-border/60">
      <SectionHeader
        index="06"
        eyebrow="Workbench"
        title="A developer notebook, not a blog."
        description="Build logs, debugging writeups, and design studies. Rough on purpose."
        action={{ label: "Open workbench", href: "/workbench" }}
      />

      <ul className="border-t border-border/60">
        {notes.map((note) => (
          <li key={note.slug} className="border-b border-border/60">
            <Link
              href={`/workbench/${note.slug}`}
              className="group grid gap-x-8 gap-y-1.5 py-5 sm:grid-cols-12 sm:items-baseline"
            >
              <p className="label text-muted-foreground sm:col-span-2">{note.date}</p>
              <h3 className="font-medium transition-colors group-hover:text-primary sm:col-span-5">
                {note.title}
              </h3>
              <p className="text-sm text-muted-foreground sm:col-span-5">{note.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function ResearchPreview() {
  return (
    <Section id="research" className="border-b border-border/60">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div className="max-w-xl space-y-3">
          <p className="label flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              07
            </span>
            Research
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{research.headline}</h2>
          <p className="text-pretty text-muted-foreground">{research.body[0]}</p>
        </div>

        <div className="flex items-center gap-6">
          <p className="label text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              ●
            </span>{" "}
            Status / active
          </p>
          <Link
            href="/research"
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
          >
            Research →
          </Link>
        </div>
      </div>
    </Section>
  )
}
