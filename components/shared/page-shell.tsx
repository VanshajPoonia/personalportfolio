import type { ReactNode } from "react"

interface PageShellProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
  toolbar?: ReactNode
}

export function PageShell({ eyebrow, title, intro, children, toolbar }: PageShellProps) {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 sm:mb-16 space-y-4 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && (
            <div className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {intro}
            </div>
          )}
          {toolbar}
        </div>
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  label: string
  description?: string
  count?: number
}

export function SectionHeading({ label, description, count }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{label}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {typeof count === "number" && (
        <span className="font-mono text-xs text-muted-foreground">{count} entries</span>
      )}
    </div>
  )
}
