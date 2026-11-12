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
      className="scrollbar-hide -mx-4 flex overflow-x-auto px-4 sm:mx-0 sm:px-0"
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
            // The count is decorative next to the label but load-bearing in the
            // accessible name: without it a disabled chip announces no reason
            // for being disabled.
            aria-label={`${filter.label}, ${count} ${count === 1 ? "project" : "projects"}`}
            className={cn(
              "label flex min-h-[44px] shrink-0 items-center gap-2 border border-l-0 border-seam px-3.5 transition-colors duration-150 first:rounded-l-md first:border-l last:rounded-r-md",
              isActive ? "border-ink bg-ink text-plate" : "text-muted-foreground hover:text-foreground",
              count === 0 && "cursor-not-allowed opacity-40 hover:text-muted-foreground",
            )}
          >
            {filter.label}
            <span aria-hidden="true" className={cn("tabular-nums", isActive ? "text-plate/60" : "opacity-60")}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
