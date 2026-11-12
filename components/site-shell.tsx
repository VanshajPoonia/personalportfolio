import type { ReactNode } from "react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { TraceObserver } from "@/components/motion"

/**
 * One shell for every page, so the header, footer, skip link, and landmark
 * structure are defined once rather than re-declared per route.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#main"
        className="key sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="relative z-10 flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <TraceObserver />
    </div>
  )
}
