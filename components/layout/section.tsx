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
 * Section header used across the homepage and index pages. The heading carries
 * its own weight: no kicker above it and no section number.
 */
export function SectionHeader({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  action?: { label: string; href: string }
  className?: string
}) {
  return (
    <div className={cn("mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 sm:mb-14", className)}>
      <div className="max-w-2xl">
        <h2 className="text-[1.875rem] font-semibold leading-[1.1] sm:text-[2.5rem]">{title}</h2>
        {description && <p className="mt-4 max-w-[60ch] text-pretty text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="label group inline-flex min-h-[44px] items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          {action.label}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={2}
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  )
}
