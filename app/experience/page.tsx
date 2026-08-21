import type { Metadata } from "next"
import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { ExternalLink, TechList } from "@/components/ui/external-link"
import { clientDelivery, experience } from "@/lib/data/experience"
import { pageMetadata } from "@/lib/data/site"

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "Professional and collaborative engineering: client product delivery, integration work, and platform development on a team.",
  path: "/experience",
})

export default function ExperiencePage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Experience"
        title="Engineering with other people's deadlines attached."
        intro={
          <p>
            Client work, integration engineering, and one collaborative platform. Where a system is private,
            it is described by what it does rather than by what is in it, and nothing here is presented as
            solo work when it was not.
          </p>
        }
      />

      <Section width="wide">
        <ol className="space-y-14">
          {experience.map((item) => (
            <li key={item.slug} className="grid gap-x-10 gap-y-5 border-t border-border/60 pt-8 lg:grid-cols-12">
              <div className="space-y-2 lg:col-span-4">
                <h2 className="text-xl font-semibold tracking-tight">{item.organisation}</h2>
                <p className="font-mono text-sm text-muted-foreground">{item.role}</p>
                <p className="label text-muted-foreground">
                  {item.current && (
                    <span className="text-primary">
                      <span aria-hidden="true">●</span>{" "}
                    </span>
                  )}
                  {item.period}
                </p>
              </div>

              <div className="space-y-5 lg:col-span-8">
                <p className="text-pretty leading-relaxed">{item.summary}</p>

                <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-border" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <TechList items={item.technologies} />

                {item.ownership && (
                  <p className="rounded-lg border border-border/70 bg-secondary/20 px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                    {item.ownership}
                  </p>
                )}

                {item.links && item.links.length > 0 && (
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <ExternalLink href={link.href} label={link.label} className="text-muted-foreground">
                          {link.label}
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section width="wide" size="sm" className="border-t border-border/60">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Selected client delivery</h2>
          <p className="text-muted-foreground">
            Public production sites I built and maintain. They are marketing and service sites rather than
            engineering showpieces, which is why they live here and not in{" "}
            <Link href="/work" className="text-primary hover:underline">
              work
            </Link>
            .
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {clientDelivery.map((client) => (
            <li key={client.href}>
              <ExternalLink
                href={client.href}
                label={client.name}
                showMarker={false}
                className="flex min-h-[64px] items-center justify-between gap-4 rounded-lg border border-border/70 px-5 py-3.5 hover:border-primary/40"
              >
                <span>
                  <span className="block text-sm font-medium">{client.name}</span>
                  <span className="block font-mono text-[11px] text-muted-foreground">{client.sector}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 text-muted-foreground">
                  ↗
                </span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCTA />
    </SiteShell>
  )
}
