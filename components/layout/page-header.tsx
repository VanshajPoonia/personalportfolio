import type { ReactNode } from "react"
import { Container } from "@/components/layout/section"

/**
 * Header for index pages. Quieter than the homepage instrument: an h1, a
 * sentence, and a readout line for counts and verification dates.
 */
export function PageHeader({
  title,
  intro,
  meta,
  children,
  width = "default",
}: {
  title: string
  intro?: ReactNode
  /** Readout line for counts, dates, or verification notes. */
  meta?: ReactNode
  children?: ReactNode
  width?: "prose" | "default" | "wide"
}) {
  return (
    <div className="border-b border-border">
      <Container width={width}>
        <div className="pb-12 pt-16 sm:pb-16 sm:pt-24">
          <h1 className="max-w-4xl text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-6xl">
            {title}
          </h1>
          {intro && (
            <div className="mt-6 max-w-[62ch] text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</div>
          )}
          {meta && <p className="mt-6 font-mono text-[13px] text-muted-foreground">{meta}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </div>
  )
}
