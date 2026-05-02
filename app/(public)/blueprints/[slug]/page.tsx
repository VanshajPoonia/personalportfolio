import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { blueprints, getBlueprintBySlug, type Blueprint } from "@/lib/data/blueprints"

interface BlueprintPageProps {
  params: Promise<{ slug: string }>
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export function generateStaticParams() {
  return blueprints.map((blueprint) => ({ slug: blueprint.slug }))
}

export async function generateMetadata({ params }: BlueprintPageProps): Promise<Metadata> {
  const { slug } = await params
  const blueprint = getBlueprintBySlug(slug)

  if (!blueprint) {
    return { title: "Blueprint Not Found" }
  }

  return {
    title: `${blueprint.title} Blueprint`,
    description: blueprint.summary,
    alternates: { canonical: `${baseUrl}/blueprints/${blueprint.slug}` },
    openGraph: {
      title: `${blueprint.title} Blueprint`,
      description: blueprint.summary,
      url: `${baseUrl}/blueprints/${blueprint.slug}`,
    },
  }
}

function DetailSection({ id, title, items }: { id: string; title: string; items: string[] }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-xl border border-border/60 bg-card/40 p-6 glass">
      <h2 className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-primary">{title}</h2>
      <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function TextSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-xl border border-border/60 bg-card/40 p-6 glass">
      <h2 className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-primary">{title}</h2>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

function blueprintSections(blueprint: Blueprint) {
  return [
    ["core-users", "Core users", blueprint.users],
    ["mvp-scope", "MVP scope", blueprint.mvpScope],
    ["non-goals", "Non-goals", blueprint.nonGoals],
    ["components", "Core system components", blueprint.components],
    ["architecture", "Suggested architecture", blueprint.architecture],
    ["data-model", "Data model", blueprint.dataModel],
    ["api-design", "API design", blueprint.apiDesign],
    ["technical-challenges", "Key technical challenges", blueprint.technicalChallenges],
    ["tradeoffs", "Tradeoffs", blueprint.tradeoffs],
    ["security", "Security considerations", blueprint.security],
    ["scaling-path", "Scaling path", blueprint.scalingPath],
    ["observability", "Observability", blueprint.observability],
    ["future-features", "Future features", blueprint.futureFeatures],
  ] as const
}

export default async function BlueprintDetailPage({ params }: BlueprintPageProps) {
  const { slug } = await params
  const blueprint = getBlueprintBySlug(slug)

  if (!blueprint) {
    notFound()
  }

  const sections = blueprintSections(blueprint)

  return (
    <div className="pt-24">
      <PageShell
        eyebrow={`Blueprint · ${blueprint.category}`}
        title={blueprint.title}
        intro={
          <div className="space-y-5">
            <p>{blueprint.summary}</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                {blueprint.status}
              </span>
              <span className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                {blueprint.difficulty}
              </span>
              {blueprint.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        }
        toolbar={
          <Link
            href="/blueprints"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> back to blueprints
          </Link>
        }
      >
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav className="rounded-xl border border-border/60 bg-card/40 p-4 glass">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">Sections</p>
              <div className="space-y-1">
                {["overview", "problem", ...sections.map(([id]) => id), "related"].map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block rounded-md px-2 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
                  >
                    {id.replaceAll("-", " ")}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <div className="space-y-5">
            <TextSection id="overview" title="Overview">
              <p>{blueprint.overview}</p>
            </TextSection>

            <TextSection id="problem" title="Problem">
              <p>{blueprint.problem}</p>
            </TextSection>

            {sections.map(([id, title, items]) => (
              <DetailSection key={id} id={id} title={title} items={[...items]} />
            ))}

            <section id="related" className="scroll-mt-28 rounded-xl border border-border/60 bg-card/40 p-6 glass">
              <h2 className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-primary">Related projects</h2>
              <div className="space-y-4">
                {blueprint.relatedProjects && blueprint.relatedProjects.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blueprint.relatedProjects.map((project) => (
                      <span
                        key={project}
                        className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                )}
                {blueprint.relatedLinks && blueprint.relatedLinks.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {blueprint.relatedLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Related projects will be attached as this blueprint connects to builds, research, and artifacts.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </PageShell>
    </div>
  )
}
