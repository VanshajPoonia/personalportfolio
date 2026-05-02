import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { exploreCards } from "@/lib/data/site"

export function ExploreTheLab() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            Site map
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Explore the lab
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Different parts of the site serve different purposes. Start wherever your curiosity fits.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exploreCards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex flex-col gap-3 rounded-xl border border-border/60 bg-card/40 p-6 glass transition-all duration-300 hover-lift hover:border-primary/40 hover:bg-card/70 animate-fade-in-up"
              style={{ animationDelay: `${(index % 6) * 60 + 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  {card.href}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-gradient">
                {card.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
