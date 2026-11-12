import { Lamp } from "@/components/ui/status-badge"
import type { Metadata } from "next"
import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { ExternalLink } from "@/components/ui/external-link"
import { education, skillGroups } from "@/lib/data/experience"
import { pageMetadata, person } from "@/lib/data/site"
import { generatePersonStructuredData, jsonLd } from "@/lib/structured-data"

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Vanshaj Poonia is a full stack and AI developer working across product engineering, AI systems, developer tools, and systems programming.",
  path: "/about",
})

const now = [
  {
    label: "Building",
    items: [
      { text: "ChronoOS, a hobby operating system in Rust", href: "/work/chronosapien" },
      { text: "Project Management ATLAS, in production for one organisation", href: "/work/project-management-atlas" },
      { text: "Client products at Kreativ Vantage", href: "/experience#kreativ-vantage" },
    ],
  },
  {
    label: "Contributing",
    items: [
      { text: "PictoPy: clustering correctness, CI, and accessibility", href: "/open-source" },
      { text: "Plane: keyboard access and the mobile calendar", href: "/open-source" },
      { text: "Rocket.Chat: integration and admin UI fixes", href: "/open-source" },
    ],
  },
  {
    label: "Learning",
    items: [
      { text: "Filesystem design, by debugging one I wrote", href: null },
      { text: "How large codebases absorb a change from a stranger", href: null },
      { text: "Robustness of tabular models under missingness shift", href: "/research" },
    ],
  },
]

export default function AboutPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(generatePersonStructuredData())} />

      <PageHeader
        title="I keep going one layer down."
        intro={
          <p>
            I started with websites, moved into products and AI systems, and eventually got curious enough
            about what was underneath the abstractions to start writing an operating system.
          </p>
        }
      />

      <Section width="wide">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="max-w-prose space-y-5 leading-relaxed lg:col-span-7">
            <p>
              The order matters. Building products taught me that most hard problems are really data-model
              problems wearing a user-interface costume. Building AI products taught me that the interesting
              engineering is in routing, permissions, and metering, not in the model call. Writing a neural
              network framework from the autograd up taught me what that model call is actually doing.
            </p>
            <p>
              And writing a kernel taught me that I had been describing several layers of my own stack from
              memory rather than from understanding. That is the honest reason ChronoOS exists: not because
              the world needs another operating system, but because I did not like how vague my answers got
              below the runtime.
            </p>
            <p>
              The pattern in the work is not the technology. It is that every project is one abstraction level
              below the thing that made me curious. That is also why I contribute to open source: reading a
              large codebase you did not design, finding the actual cause of a bug, and getting a change
              accepted is a different skill from building something from scratch, and it is the one that
              transfers.
            </p>
            <p>
              I work as a principal engineer at{" "}
              <ExternalLink href="https://www.kreativvantage.com" label="Kreativ Vantage" className="text-primary">
                Kreativ Vantage
              </ExternalLink>
              , shipping and maintaining client products. Before that I ran a small product venture called
              Hypnosys, which is where the browser-IDE work started and where I learned how much scope one
              person can actually carry.
            </p>
            <p>
              I also have one{" "}
              <Link href="/research" className="text-primary hover:underline">
                research study
              </Link>{" "}
              in progress, on whether training-time masking makes tabular classifiers hold up when the data
              arrives with holes in it. Nothing is published, and the page says exactly that rather than
              implying a result I do not have.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-md border border-border p-6">
              <p className="label mb-5 text-muted-foreground">Elsewhere</p>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-baseline justify-between gap-4 font-mono text-sm transition-colors hover:text-primary"
                  >
                    <span>Email</span>
                    <span className="truncate text-xs text-muted-foreground">{person.email}</span>
                  </a>
                </li>
                {[
                  { label: "GitHub", href: person.github, handle: "@VanshajPoonia" },
                  { label: "LinkedIn", href: person.linkedin, handle: "vanshajpoonia" },
                  { label: "X", href: person.x, handle: person.xHandle },
                ].map((link) => (
                  <li key={link.label}>
                    <ExternalLink
                      href={link.href}
                      label={link.label}
                      showMarker={false}
                      className="flex items-baseline justify-between gap-4 font-mono text-sm"
                    >
                      <span>{link.label}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {link.handle}
                      </span>
                    </ExternalLink>
                  </li>
                ))}
                <li>
                  <a
                    href={person.resume}
                    className="flex items-baseline justify-between gap-4 font-mono text-sm transition-colors hover:text-primary"
                  >
                    <span>Résumé</span>
                    <span className="truncate text-xs text-muted-foreground">PDF</span>
                  </a>
                </li>
                <li className="border-t border-border pt-3.5">
                  <p className="flex items-baseline justify-between gap-4 font-mono text-sm">
                    <span className="text-muted-foreground">Studying at</span>
                    <span className="text-xs text-muted-foreground">{education.shortName}</span>
                  </p>
                </li>
                <li>
                  <p className="flex items-baseline justify-between gap-4 font-mono text-sm">
                    <span className="text-muted-foreground">Based in</span>
                    <span className="text-xs text-muted-foreground">{person.location}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="now" width="wide" className="border-t border-border">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Now</h2>
          <p className="label text-muted-foreground">Updated when the answer changes</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {now.map((group) => (
            <div key={group.label}>
              <h3 className="label mb-3.5 text-primary">{group.label}</h3>
              <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item.text}>
                    {item.href ? (
                      <Link href={item.href} className="transition-colors hover:text-primary">
                        {item.text}
                      </Link>
                    ) : (
                      item.text
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section width="wide" size="sm" className="border-t border-border">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Education</h2>

        <div className="grid gap-x-10 gap-y-3 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-4">
            <h3 className="text-lg font-medium tracking-tight">{education.institution}</h3>
            <p className="label text-muted-foreground">
              {education.current && (
                <Lamp lit className="mr-2 align-[-1px]" />
              )}
              {education.period}
            </p>
          </div>
          <div className="space-y-1.5 lg:col-span-8">
            <p className="font-mono text-sm">{education.degree}</p>
            <p className="text-sm text-muted-foreground">{education.location}</p>
          </div>
        </div>
      </Section>

      <Section width="wide" className="border-t border-border">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Tools</h2>
          <p className="text-muted-foreground">
            Grouped by what I use them for. No percentages: a number next to a language name is a claim nobody
            can check.
          </p>
        </div>

        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <dt className="label mb-3.5 text-primary">{group.label}</dt>
              <dd>
                <ul className="space-y-1.5 font-mono text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <ContactCTA />
    </SiteShell>
  )
}
