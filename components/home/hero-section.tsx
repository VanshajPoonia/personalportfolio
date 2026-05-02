"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { positioning, currentFocus } from "@/lib/data/site"

const focusRotation = currentFocus

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const targetText = focusRotation[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % focusRotation.length)
          }
        }
      },
      isDeleting ? 40 : 70,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section className="relative px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center lg:min-h-[70vh]">
          {/* Left column - Text */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-4 animate-fade-in-up">
              <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
                Vanshaj Poonia — Built in public
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl text-balance">
                Not a portfolio.
                <br />
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                  A living developer lab.
                </span>
              </h1>
              <p className="font-mono text-xs sm:text-sm text-muted-foreground">
                <span className="text-primary">$</span>{" "}
                <span className="text-foreground/80">focus:</span>{" "}
                <span className="text-primary typing-cursor">{displayText}</span>
              </p>
            </div>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-in-up stagger-2">
              {positioning.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border border-primary bg-primary/10 px-7 py-4 sm:py-3.5 font-mono text-sm text-primary transition-all duration-500 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
              >
                <span className="relative z-10">explore projects</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
              <Link
                href="/lab"
                className="group inline-flex items-center justify-center gap-3 rounded-lg border border-border px-7 py-4 sm:py-3.5 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground hover:bg-secondary/50 active:scale-[0.98]"
              >
                <span>open the lab</span>
                <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right column - ASCII Art / Visual */}
          <div className="relative animate-scale-in stagger-4">
            <div className="relative rounded-xl border border-border bg-card/60 glass p-5 sm:p-8 hover-lift">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-primary/60" />
              </div>
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 bg-background/50 rounded-md px-3 py-1 font-mono text-xs text-muted-foreground">
                lab://vanshaj
              </div>

              <pre className="mt-8 overflow-hidden font-mono text-[10px] leading-relaxed text-primary/80 sm:text-xs md:text-sm">
{`┌─────────────────────────────────────┐
│                                     │
│   systems     ▓▓▓▓▓▓▓▓▓░  Rust OS   │
│   ai          ▓▓▓▓▓▓▓▓░░  routing   │
│   enterprise  ▓▓▓▓▓▓▓░░░  finance   │
│   creative    ▓▓▓▓▓░░░░░  ascii     │
│   research    ▓▓▓▓░░░░░░  quantum   │
│   blueprints  ▓▓▓░░░░░░░  drafting  │
│                                     │
│   > status: building in public      │
│   > artifacts: tracked              │
│   > graveyard: kept honest          │
│                                     │
└─────────────────────────────────────┘`}
              </pre>
            </div>

            <div className="absolute -right-2 sm:-right-6 -top-2 sm:-top-6 rounded-lg border border-primary/40 bg-primary/15 glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-primary animate-float">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                lab v0.2.0
              </span>
            </div>
            <div
              className="absolute -bottom-3 sm:-bottom-6 -left-2 sm:-left-6 rounded-lg border border-border bg-card glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-muted-foreground animate-float"
              style={{ animationDelay: "1s" }}
            >
              built in public
            </div>

            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
