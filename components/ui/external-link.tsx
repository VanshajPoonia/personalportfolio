import type { ReactNode } from "react"
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
      className={cn(
        "group inline-flex items-center gap-1.5 transition-colors hover:text-primary",
        className,
      )}
    >
      {children}
      {showMarker && (
        <span
          aria-hidden="true"
          className="text-[0.85em] opacity-60 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100"
        >
          ↗
        </span>
      )}
    </a>
  )
}

export function TechList({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items
  return (
    <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted-foreground">
      {shown.map((item, i) => (
        <li key={item} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
          )}
          {item}
        </li>
      ))}
    </ul>
  )
}
