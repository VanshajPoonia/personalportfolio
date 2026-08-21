import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { person, positioning } from "@/lib/data/site"
import { getFeaturedProjects, statusLabels } from "@/lib/data/projects"
import { Container } from "@/components/layout/section"
import { ExternalLink } from "@/components/ui/external-link"

/**
 * The instrument panel on the right shows real project state pulled from the
 * project data, not skill bars. If a status changes in `projects.ts`, it
 * changes here, which is the only way a status panel stays true.
 */
function StatusPanel() {
  const featured = getFeaturedProjects()
  const building = featured.filter((p) => p.status === "active")
  const recent = featured.filter((p) => p.status === "shipped")

  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
        <span aria-hidden="true" className="font-mono text-xs text-primary">
          ●
        </span>
        <p className="font-mono text-[11px] text-muted-foreground">vanshaj://status</p>
      </div>

      <div className="space-y-6 p-5">
        <section>
          <h2 className="label mb-3 text-muted-foreground">Now building</h2>
          <ul className="space-y-3">
            {building.map((project) => (
              <li key={project.slug} className="flex items-baseline justify-between gap-4">
                <div className="min-w-0">
                  <Link
                    href={project.caseStudy ? `/work/${project.slug}` : "/work"}
                    className="font-mono text-sm transition-colors hover:text-primary"
                  >
                    {project.title}
                  </Link>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {project.technologies.slice(0, 3).join(" · ")}
                  </p>
                </div>
                <span className="label shrink-0 text-primary">
                  <span aria-hidden="true">●</span> {statusLabels[project.status]}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border/60 pt-5">
          <h2 className="label mb-3 text-muted-foreground">Recent</h2>
          <ul className="space-y-3">
            {recent.map((project) => (
              <li key={project.slug} className="flex items-baseline justify-between gap-4">
                <div className="min-w-0">
                  <Link
                    href={project.caseStudy ? `/work/${project.slug}` : "/work"}
                    className="font-mono text-sm transition-colors hover:text-primary"
                  >
                    {project.title}
                  </Link>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {project.technologies.slice(0, 3).join(" · ")}
                  </p>
                </div>
                <span className="label shrink-0 text-muted-foreground">
                  <span aria-hidden="true">○</span> {statusLabels[project.status]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div aria-hidden="true" className="grid-backdrop" />
      <Container className="relative">
        <div className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-6">
              <p className="label text-muted-foreground">
                {person.name} <span className="text-primary">/</span> {person.title}
              </p>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {positioning.headline[0]}
                <br />
                {positioning.headline[1]}
              </h1>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {positioning.lede}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/work"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-primary px-6 font-mono text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore work
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
              <ExternalLink
                href={person.github}
                label="GitHub profile"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg border border-border px-6 font-mono text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              >
                GitHub
              </ExternalLink>
            </div>

            <p className="font-mono text-xs text-muted-foreground">
              <span aria-hidden="true" className="text-primary">
                &gt;
              </span>{" "}
              {positioning.thesis}
            </p>
          </div>

          <div className="lg:col-span-5">
            <StatusPanel />
          </div>
        </div>
      </Container>
    </section>
  )
}
