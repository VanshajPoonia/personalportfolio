import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Github } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { Container, Section } from "@/components/layout/section"
import { DeploymentBadge, StatusBadge } from "@/components/ui/status-badge"
import { ExternalLink } from "@/components/ui/external-link"
import { ProjectDiagram } from "@/components/work/project-diagram"
import { CaseStudyNav } from "@/components/work/case-study-nav"
import { getCaseStudy } from "@/lib/data/case-studies"
import { categoryLabels, getCaseStudyProjects, getProjectBySlug } from "@/lib/data/projects"
import { pageMetadata, siteUrl } from "@/lib/data/site"
import {
  generateBreadcrumbStructuredData,
  generateProjectStructuredData,
  jsonLd,
} from "@/lib/structured-data"

export function generateStaticParams() {
  return getCaseStudyProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  const study = getCaseStudy(slug)
  if (!project || !study) return {}

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
    // A screenshot makes a better card than the generic one; a project with
    // only a diagram falls back to the site default rather than to nothing.
    image: project.media?.desktop
      ? { url: project.media.desktop, alt: project.media.alt }
      : undefined,
  })
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  const study = getCaseStudy(slug)
  if (!project || !study) notFound()

  const related = study.related
    .map((relatedSlug) => getProjectBySlug(relatedSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          generateProjectStructuredData({
            title: project.title,
            summary: project.summary,
            slug: project.slug,
            technologies: project.technologies,
            github: project.github,
            deploymentUrl: project.deployment.status === "live" ? project.deployment.url : undefined,
          }),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          generateBreadcrumbStructuredData([
            { name: "Work", url: `${siteUrl}/work` },
            { name: project.title, url: `${siteUrl}/work/${project.slug}` },
          ]),
        )}
      />

      {/* Hero */}
      <div className="border-b border-border">
        <Container width="wide">
          <div className="pb-12 pt-10 sm:pt-14">
            <Link
              href="/work"
              className="label group inline-flex min-h-[44px] items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back to work
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="space-y-6 lg:col-span-6">
                <div className="space-y-3">
                  <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-6xl">
                    {project.title}
                  </h1>
                  {project.canonicalNote && (
                    <p className="font-mono text-xs text-muted-foreground">{project.canonicalNote}</p>
                  )}
                  <p className="text-lg text-muted-foreground">{project.tagline}</p>
                </div>

                <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-y border-border py-5 sm:grid-cols-3">
                  <div>
                    <dt className="label text-muted-foreground">State</dt>
                    <dd className="mt-1.5">
                      <StatusBadge status={project.status} />
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="label text-muted-foreground">Category</dt>
                    <dd className="mt-1 font-mono text-sm">
                      {project.categories.map((c) => categoryLabels[c]).join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="label text-muted-foreground">Year</dt>
                    <dd className="mt-1 font-mono text-sm">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="label text-muted-foreground">Role</dt>
                    <dd className="mt-1 font-mono text-sm">{project.role}</dd>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="label text-muted-foreground">Deployment</dt>
                    <dd className="mt-1">
                      <DeploymentBadge status={project.deployment.status} note={project.deployment.note} />
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm">
                  {project.deployment.status === "live" && project.deployment.url && (
                    <ExternalLink
                      href={project.deployment.url}
                      label={`Open ${project.title}`}
                      className="text-primary"
                    >
                      Open project
                    </ExternalLink>
                  )}
                  {project.github && (
                    <ExternalLink
                      href={project.github}
                      label={`${project.title} source on GitHub`}
                      className="text-muted-foreground"
                    >
                      <Github aria-hidden="true" className="h-4 w-4" />
                      Source
                    </ExternalLink>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6">
                {project.media?.desktop ? (
                  <div className="space-y-4">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border">
                      <Image
                        src={project.media.desktop}
                        alt={project.media.alt}
                        width={1600}
                        height={1000}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    {/* The narrow capture is shown alongside rather than swapped
                        in by breakpoint, so the responsive behaviour of the
                        product itself is part of what the page shows. */}
                    {project.media.mobile && (
                      <div className="flex items-start gap-4">
                        <div className="relative w-28 shrink-0 overflow-hidden rounded-lg border border-border sm:w-32">
                          <Image
                            src={project.media.mobile}
                            alt={`${project.title} on a phone-width viewport`}
                            width={600}
                            height={1200}
                            sizes="128px"
                            className="h-auto w-full object-cover object-top"
                          />
                        </div>
                        <p className="label pt-1 leading-relaxed text-muted-foreground">
                          Same page
                          <br />
                          at 390px
                        </p>
                      </div>
                    )}
                  </div>
                ) : project.media?.diagram && project.media.diagram !== "none" ? (
                  <ProjectDiagram id={project.media.diagram} />
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Body */}
      <Container width="wide">
        <div className="gap-14 py-14 lg:grid lg:grid-cols-12">
          {study.sections.length > 3 && (
            <aside className="hidden lg:col-span-3 lg:block">
              <CaseStudyNav sections={study.sections.map((s) => ({ id: s.id, label: s.label }))} />
            </aside>
          )}

          <div className={study.sections.length > 3 ? "lg:col-span-9" : "lg:col-span-12"}>
            <p className="max-w-prose text-lg leading-relaxed text-pretty">{study.overview}</p>

            <div className="mt-14 space-y-14">
              {study.sections.map((section) => (
                <section key={section.id} id={section.id} className="max-w-prose scroll-mt-24">
                  <h2 className="mb-4 text-2xl font-semibold leading-tight">{section.label}</h2>
                  <div className="space-y-4 leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:border [&_code]:border-border [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground [&_em]:text-foreground [&_li]:my-1.5 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Section width="wide" size="sm" className="border-t border-border">
          <h2 className="label mb-6 text-muted-foreground">Related work</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.caseStudy ? `/work/${item.slug}` : `/work#${item.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-md border border-border p-6 transition-colors hover:border-engraving"
                >
                  <h3 className="text-lg font-medium underline-offset-4 group-hover:underline">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.categories.map((c) => categoryLabels[c]).join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-mono text-xs text-muted-foreground">
                    {item.caseStudy ? "Case study" : "View in work"}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <ContactCTA />
    </SiteShell>
  )
}
