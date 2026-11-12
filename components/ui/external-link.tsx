import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Outbound link with a consistent marker and safe target behaviour. The arrow
 * is decorative; "opens in a new tab" is announced through the accessible name
 * instead, so screen-reader users are told what will happen before it does.
 */
export function ExternalLink({
  href,
  children,
  className,
  label,
  showMarker = true,
}: {
  href: string
  children: ReactNode
  className?: string
  /** Overrides the accessible name when the visible text is not descriptive. */
  label?: string
  showMarker?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `${label} (opens in a new tab)` : undefined}
      className={cn("group inline-flex items-center gap-1 transition-colors hover:text-foreground", className)}
    >
      {children}
      {showMarker && (
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="h-[1em] w-[1em] shrink-0 opacity-60 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100"
        />
      )}
    </a>
  )
}

/** Technologies as a quiet readout line, separated by thin rules rather than dots. */
export function TechList({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items
  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] text-muted-foreground">
      {shown.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-seam" />}
          {item}
        </li>
      ))}
    </ul>
  )
}
