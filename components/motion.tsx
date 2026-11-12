"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Draws each schematic trace in once, the first time it scrolls into view.
 *
 * The page only hides traces when an inline script in the layout has already
 * confirmed that motion is allowed, so a visitor without script, or with
 * reduced motion, sees every line from the start. Re-scans on navigation,
 * because client routing mounts new traces without a reload.
 */
export function TraceObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const traces = Array.from(document.querySelectorAll<HTMLElement>(".trace:not([data-drawn])"))
    if (traces.length === 0) return

    if (!("IntersectionObserver" in window)) {
      traces.forEach((trace) => trace.setAttribute("data-drawn", ""))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-drawn", "")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    )

    traces.forEach((trace) => observer.observe(trace))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
