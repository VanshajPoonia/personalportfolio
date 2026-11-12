import { Lamp } from "@/components/ui/status-badge"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { ExternalLink, TechList } from "@/components/ui/external-link"
import { experience } from "@/lib/data/experience"
import { pageMetadata, person } from "@/lib/data/site"

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "Vanshaj Poonia's roles: software engineer at Helix Grid working on AI and LLM features, open source contributor since 2021, and earlier work with codedamn and Symbl.ai.",
  path: "/experience",
})

export default function ExperiencePage() {
  return (
    <SiteShell>
      <PageHeader
        title="Where I have worked."
        intro={
          <p>
            A part-time engineering role building AI features, open source since Hacktoberfest 2021, and the
            community roles that came before. The same history is on{" "}
            <ExternalLink href={person.linkedin} label="LinkedIn" className="text-foreground underline underline-offset-4">
              LinkedIn
            </ExternalLink>
            .
          </p>
        }
      />

      <Section width="wide">
        <ol className="space-y-14">
          {experience.map((item) => (
            <li
              key={item.slug}
              id={item.slug}
              className="grid scroll-mt-24 gap-x-10 gap-y-5 border-t border-border pt-8 lg:grid-cols-12"
            >
              <div className="space-y-2 lg:col-span-4">
                <h2 className="text-xl font-semibold tracking-tight">{item.organisation}</h2>
                <p className="font-mono text-sm text-foreground">{item.role}</p>
                <p className="font-mono text-[13px] text-muted-foreground">{item.arrangement}</p>
                <p className="label inline-flex items-center gap-2 pt-1 text-muted-foreground">
                  {item.current && <Lamp lit />}
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

                {item.technologies && <TechList items={item.technologies} />}

                {item.links && item.links.length > 0 && (
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px]">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        {link.href.startsWith("/") ? (
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                            <ArrowRight
                              aria-hidden="true"
                              strokeWidth={2}
                              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                          </Link>
                        ) : (
                          <ExternalLink href={link.href} label={link.label} className="text-muted-foreground">
                            {link.label}
                          </ExternalLink>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <ContactCTA />
    </SiteShell>
  )
}
