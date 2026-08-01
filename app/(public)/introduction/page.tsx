import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { exploreCards } from "@/lib/data/site"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "About this site",
  description:
    "What this site is, how it is organized, and why the unfinished work stays visible alongside the finished work.",
  alternates: { canonical: `${baseUrl}/introduction` },
}

const principles = [
  {
    title: "Everything is public",
    body: "Every project links to its GitHub repository. The finished ones and the abandoned ones get the same treatment.",
  },
  {
    title: "Unfinished work stays up",
    body: "The workbench holds build logs and debugging notes. The graveyard holds things I stopped. Both are more useful than a page of screenshots.",
  },
  {
    title: "Depth over breadth",
    body: "A hobby OS in Rust, an AI workspace, and an enterprise finance platform. Three things I can actually explain, rather than twenty I cannot.",
  },
  {
    title: "The stack is boring on purpose",
    body: "Next.js, TypeScript, Tailwind, and Supabase. The interesting problems are in what gets built, not in what it gets built with.",
  },
]

export default function IntroductionPage() {
  return (
    <div className="px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-4xl">
        <header className="space-y-6 animate-fade-in-up">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            What this site is
          </h1>
          <div className="max-w-2xl space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p>
              A working record of what I am building, kept in public while it is still in progress. Most portfolios
              show you the three things that went well. This one shows the whole shelf, including the parts still
              on the bench and the parts I gave up on.
            </p>
            <p>
              The reason is selfish: writing things down while they are unresolved is how I find out whether I
              actually understand them. Publishing that is just a side effect.
            </p>
          </div>
        </header>

        <section className="mt-16 sm:mt-20 border-t border-border/40 pt-12 sm:pt-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How it works</h2>
          <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="space-y-2">
                <dt className="font-semibold tracking-tight text-foreground">{principle.title}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{principle.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16 sm:mt-20 border-t border-border/40 pt-12 sm:pt-16">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Where things live</h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            The site splits by how finished the thinking is, not by topic.
          </p>
          <ul className="mt-8 divide-y divide-border/40 border-y border-border/40">
            {exploreCards.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="w-32 shrink-0 font-mono text-xs uppercase tracking-widest text-primary">
                    {card.label}
                  </span>
                  <span className="flex-1 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                    {card.description}
                  </span>
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
