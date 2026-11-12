import { person } from "@/lib/data/site"
import {
  deploymentLabels,
  getProjectBySlug,
  projectsLastVerified,
  statusLabels,
  type Project,
} from "@/lib/data/projects"
import { contributionCounts, contributionsLastVerified, latestMerged } from "@/lib/data/open-source"
import { Container } from "@/components/layout/section"
import { ExternalLink } from "@/components/ui/external-link"
import { Selector, type Channel, type Reading } from "@/components/home/selector"

/*
 * Each channel reads from the same data the rest of the site renders, plus one
 * or two readings taken from that project's own evidence. If a status changes
 * in projects.ts, the lamp changes here too.
 */
function projectChannel(slug: string, legend: string, extra: Reading[]): Channel {
  const project = getProjectBySlug(slug) as Project
  const note = project.deployment.note
  const deployment = note
    ? `${deploymentLabels[project.deployment.status]}, ${note.charAt(0).toLowerCase()}${note.slice(1)}`
    : deploymentLabels[project.deployment.status]
  return {
    id: project.slug,
    legend,
    title: project.title,
    line: project.tagline,
    status: { lit: project.status === "active", word: statusLabels[project.status] },
    readings: [{ label: "Stack", value: project.technologies.slice(0, 3).join(", ") }, ...extra, { label: "Deployment", value: deployment }],
    calibrated: projectsLastVerified,
    link: project.caseStudy
      ? { href: `/work/${project.slug}`, label: "Case study" }
      : project.deployment.url
        ? { href: project.deployment.url, label: "Open it", external: true }
        : { href: `/work#${project.slug}`, label: "Details" },
  }
}

function channels(): Channel[] {
  const latest = latestMerged
  return [
    projectChannel("chronosapien", "Systems", [
      { label: "Verified", value: "Boot to shell, typed input, a ChronoFS session" },
    ]),
    projectChannel("tensortrail", "AI and ML", [{ label: "Tests", value: "137, plus a gradient checker" }]),
    projectChannel("already-filed", "Dev tools", [
      { label: "Measured", value: "Right issue in top 3: 65% zed, 58% neovim" },
      { label: "Baseline", value: "Keyword search: 38%, 39%" },
    ]),
    projectChannel("project-management-atlas", "Product", [
      // From the ATLAS case study: a read-only production audit (Sep 2026).
      { label: "In production", value: "All 79 tables under row-level security" },
    ]),
    {
      id: "open-source",
      legend: "Open source",
      title: "Open source",
      line: "Pull requests to codebases I did not design, with the state each one is actually in.",
      status: { lit: true, word: `${contributionCounts.merged} merged` },
      readings: [
        { label: "Merged", value: String(contributionCounts.merged) },
        { label: "Open", value: String(contributionCounts.open) },
        { label: "Projects", value: String(contributionCounts.projects) },
        { label: "Latest merged", value: `${latest.project}: ${latest.title}` },
      ],
      calibrated: contributionsLastVerified,
      link: { href: "/open-source", label: "All contributions" },
    },
  ]
}

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container width="wide">
        <div className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-5">
            <h1 className="nameplate text-[clamp(3.25rem,8vw,6rem)]">
              Vanshaj
              <br />
              Poonia
            </h1>

            <p className="mt-8 max-w-[34ch] text-pretty text-lg leading-relaxed sm:text-xl">
              I build software across the stack, from product interfaces down to a hobby operating system in
              Rust, and everything here says what state it is actually in.
            </p>

            <p className="label mt-5 text-muted-foreground">
              {person.title.replace("&", "and")}, {person.location}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${person.email}`} className="key key-lit">
                Email me
              </a>
              <ExternalLink href={person.github} label="GitHub profile" showMarker={false} className="key">
                GitHub
              </ExternalLink>
              <a href={person.resume} className="key">
                Résumé
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-border lg:pl-12">
            <Selector channels={channels()} />
          </div>
        </div>
      </Container>
    </section>
  )
}
