import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Width = "prose" | "default" | "wide"

const widthClass: Record<Width, string> = {
  prose: "container-prose",
  default: "container-default",
  wide: "container-wide",
}

export function Container({
  width = "default",
  className,
  children,
}: {
  width?: Width
  className?: string
  children: ReactNode
}) {
  return <div className={cn(widthClass[width], className)}>{children}</div>
}

export function Section({
  id,
  size = "default",
  width = "default",
  className,
  children,
}: {
  id?: string
  size?: "sm" | "default" | "lg"
  width?: Width
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(size === "sm" ? "section-sm" : size === "lg" ? "section-lg" : "section", className)}
    >
      <Container width={width}>{children}</Container>
    </section>
  )
}

/**
 * Section header used across the homepage and index pages. The index is a
 * numbering device, not data, so it is hidden from assistive technology.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  index?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  action?: { label: string; href: string }
  className?: string
}) {
  return (
    <div className={cn("mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4", className)}>
      <div className="max-w-2xl space-y-3">
        {(index || eyebrow) && (
          <p className="label flex items-center gap-2.5 text-muted-foreground">
            {index && (
              <span aria-hidden="true" className="text-primary">
                {index}
              </span>
            )}
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h2>
        {description && <p className="text-pretty text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
        >
          {action.label}
          <ArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  )
}
