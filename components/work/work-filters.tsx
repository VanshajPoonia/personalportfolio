"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { cn } from "@/lib/utils"
import { workFilters, type WorkFilter } from "@/lib/data/projects"

/**
 * Filters live in the URL rather than component state, so a filtered view is
 * shareable, survives a refresh, and works with the back button. The filtering
 * itself happens on the server; this only writes the query string.
 */
export function WorkFilters({ active, counts }: { active: WorkFilter; counts: Record<string, number> }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const select = useCallback(
    (filter: WorkFilter) => {
      const params = new URLSearchParams(searchParams.toString())
      if (filter === "all") params.delete("filter")
      else params.set("filter", filter)
      const query = params.toString()
      // push, not replace: the brief for this page is that a filtered view is
      // shareable and that the back button undoes a filter change.
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  return (
    <div
      role="group"
      aria-label="Filter work by category"
      className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {workFilters.map((filter) => {
        const count = counts[filter.id] ?? 0
        const isActive = filter.id === active
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => select(filter.id)}
            aria-pressed={isActive}
            disabled={count === 0}
            className={cn(
              "flex min-h-[38px] shrink-0 items-center gap-2 rounded-full border px-3.5 font-mono text-xs transition-colors",
              isActive
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border/70 text-muted-foreground hover:border-border hover:text-foreground",
              count === 0 && "cursor-not-allowed opacity-40 hover:border-border/70 hover:text-muted-foreground",
            )}
          >
            {filter.label}
            <span aria-hidden="true" className="text-[10px] opacity-60">
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
