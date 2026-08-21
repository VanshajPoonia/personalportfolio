import type { ReactNode } from "react"
import { Container } from "@/components/layout/section"

/**
 * Header for index pages. Deliberately quieter than the homepage hero: an
 * eyebrow, an h1, and a sentence, over the same hairline the sections use.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  meta,
  children,
  width = "default",
}: {
  eyebrow: string
  title: string
  intro?: ReactNode
  /** Small mono line for counts, dates, or verification notes. */
  meta?: ReactNode
  children?: ReactNode
  width?: "prose" | "default" | "wide"
}) {
  return (
    <div className="border-b border-border/60">
      <Container width={width}>
        <div className="space-y-5 pb-10 pt-14 sm:pb-12 sm:pt-20">
          <p className="label text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              /
            </span>{" "}
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {intro && <div className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{intro}</div>}
          {meta && <p className="font-mono text-[11px] text-muted-foreground">{meta}</p>}
          {children}
        </div>
      </Container>
    </div>
  )
}
