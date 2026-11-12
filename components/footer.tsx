import Link from "next/link"
import { person, primaryNav, secondaryNav } from "@/lib/data/site"
import { Container } from "@/components/layout/section"
import { ExternalLink } from "@/components/ui/external-link"

export function ContactCTA() {
  return (
    <section id="contact" className="border-t border-border">
      <Container width="wide">
        <div className="section-lg grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-6xl">
              Have an interesting problem?
            </h2>
            <p className="mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted-foreground">
              I am most useful on the ones that cross a boundary: a product decision that turns out to be a
              data-model decision, or a bug that only reproduces in production. If that sounds like yours, I
              would like to hear about it.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${person.email}`} className="key key-lit">
                Email me
              </a>
              <ExternalLink href={person.github} label="GitHub profile" showMarker={false} className="key">
                GitHub
              </ExternalLink>
              <ExternalLink href={person.linkedin} label="LinkedIn profile" showMarker={false} className="key">
                LinkedIn
              </ExternalLink>
              <a href={person.resume} className="key">
                Résumé
              </a>
            </div>
            <p className="font-mono text-[15px] text-muted-foreground">
              <span className="select-all text-foreground">{person.email}</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container width="wide">
        <div className="flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[15px] font-semibold [font-stretch:108%]">Vanshaj Poonia</p>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {[...primaryNav, ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="label flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="label text-muted-foreground">© {new Date().getFullYear()} Vanshaj Poonia</p>
        </div>
      </Container>
    </footer>
  )
}
