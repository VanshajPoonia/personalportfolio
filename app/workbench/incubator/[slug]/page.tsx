import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { Container } from "@/components/layout/section"
import { TechList } from "@/components/ui/external-link"
import { blueprints, getBlueprintBySlug } from "@/lib/data/blueprints"
import { pageMetadata } from "@/lib/data/site"

export function generateStaticParams() {
  return blueprints.map((blueprint) => ({ slug: blueprint.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blueprint = getBlueprintBySlug(slug)
  if (!blueprint) return {}

  return pageMetadata({
    title: `${blueprint.title}: design study`,
    description: blueprint.summary,
    path: `/workbench/incubator/${blueprint.slug}`,
  })
}

function ListSection({ id, title, items }: { id: string; title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="label mb-3.5 text-primary">{title}</h2>
      <ul className="space-y-2.5 leading-relaxed text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-border" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default async function IncubatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blueprint = getBlueprintBySlug(slug)
  if (!blueprint) notFound()

  const sections: { id: string; title: string; items: string[] }[] = [
    { id: "users", title: "Who it is for", items: blueprint.users },
    { id: "mvp", title: "MVP scope", items: blueprint.mvpScope },
    { id: "non-goals", title: "Non-goals", items: blueprint.nonGoals },
    { id: "components", title: "Components", items: blueprint.components },
    { id: "architecture", title: "Architecture", items: blueprint.architecture },
    { id: "data-model", title: "Data model", items: blueprint.dataModel },
    { id: "api", title: "API design", items: blueprint.apiDesign },
    { id: "challenges", title: "Technical challenges", items: blueprint.technicalChallenges },
    { id: "tradeoffs", title: "Tradeoffs", items: blueprint.tradeoffs },
    { id: "security", title: "Security", items: blueprint.security },
    { id: "scaling", title: "Scaling path", items: blueprint.scalingPath },
    { id: "observability", title: "Observability", items: blueprint.observability },
    { id: "future", title: "If it went further", items: blueprint.futureFeatures },
  ]

  return (
    <SiteShell>
      <article>
        <div className="border-b border-border/60">
          <Container width="prose">
            <div className="pb-10 pt-10 sm:pt-14">
              <Link
                href="/workbench#incubator"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                Back to workbench
              </Link>

              <p className="label mt-8 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground">
                <span>Design study</span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>{blueprint.category}</span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>{blueprint.difficulty}</span>
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {blueprint.title}
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {blueprint.summary}
              </p>

              {/* Stated up front so nobody reads this as a shipped product. */}
              <p className="mt-6 rounded-lg border border-border/70 bg-secondary/20 px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                <span aria-hidden="true">○</span> Unbuilt. This is a system design worked out on paper, not a
                product. Nothing described here exists.
              </p>
            </div>
          </Container>
        </div>

        <Container width="prose">
          <div className="space-y-10 py-12">
            <section>
              <h2 className="label mb-3.5 text-primary">Overview</h2>
              <p className="leading-relaxed text-muted-foreground">{blueprint.overview}</p>
            </section>

            <section>
              <h2 className="label mb-3.5 text-primary">Problem</h2>
              <p className="leading-relaxed text-muted-foreground">{blueprint.problem}</p>
            </section>

            {sections.map((section) => (
              <ListSection key={section.id} {...section} />
            ))}

            <div className="border-t border-border/60 pt-8">
              <p className="label mb-3 text-muted-foreground">Tags</p>
              <TechList items={blueprint.tags} />
            </div>
          </div>
        </Container>
      </article>

      <ContactCTA />
    </SiteShell>
  )
}
