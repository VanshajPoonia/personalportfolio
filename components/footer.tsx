import Link from "next/link"
import { person, primaryNav, secondaryNav } from "@/lib/data/site"
import { Container } from "@/components/layout/section"
import { ExternalLink } from "@/components/ui/external-link"

const contactLinks = [
  { label: "Email", href: `mailto:${person.email}`, handle: person.email, external: false },
  { label: "GitHub", href: person.github, handle: "@VanshajPoonia", external: true },
  { label: "LinkedIn", href: person.linkedin, handle: "vanshajpoonia", external: true },
  // Same-origin PDF, so it takes the plain-anchor branch rather than ExternalLink.
  { label: "Résumé", href: person.resume, handle: "PDF", external: false },
]

export function ContactCTA() {
  return (
    <section id="contact" className="border-t border-border/60">
      <Container>
        <div className="section-lg grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-5 lg:col-span-6">
            <p className="label text-muted-foreground">
              <span aria-hidden="true" className="text-primary">
                08
              </span>{" "}
              / Contact
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Have an interesting problem?
            </h2>
            <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
              I am most useful on the ones that cross a boundary: a product decision that turns out to be a
              data-model decision, or a bug that only reproduces in production. If that sounds like yours, I
              would like to hear about it.
            </p>
          </div>

          <div className="lg:col-span-6 lg:pt-10">
            <ul className="divide-y divide-border/60 border-y border-border/60">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <ExternalLink
                      href={link.href}
                      label={link.label}
                      showMarker={false}
                      className="flex items-baseline justify-between gap-6 py-4 text-base"
                    >
                      <span className="font-medium">{link.label}</span>
                      <span className="truncate font-mono text-xs text-muted-foreground">
                        {link.handle} <span aria-hidden="true">↗</span>
                      </span>
                    </ExternalLink>
                  ) : (
                    <a
                      href={link.href}
                      className="flex items-baseline justify-between gap-6 py-4 text-base transition-colors hover:text-primary"
                    >
                      <span className="font-medium">{link.label}</span>
                      <span className="truncate font-mono text-xs text-muted-foreground">{link.handle}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <Container>
        <div className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <p className="font-mono text-sm">Vanshaj Poonia</p>
            <p className="font-mono text-xs text-muted-foreground">{person.title}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            <ul className="space-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <ExternalLink
                  href={person.github}
                  label="GitHub profile"
                  className="font-mono text-xs text-muted-foreground"
                >
                  GitHub
                </ExternalLink>
              </li>
              <li>
                <a
                  href={person.resume}
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Résumé
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/60 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Vanshaj Poonia
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              &gt;_
            </span>{" "}
            From interfaces to infrastructure
          </p>
        </div>
      </Container>
    </footer>
  )
}
