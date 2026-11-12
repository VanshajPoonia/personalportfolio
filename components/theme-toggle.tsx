"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

/**
 * Finish switch: a two-position slide switch between the aluminium and the
 * black anodised panel. The slider clicks across on the detent curve.
 *
 * Renders an inert switch in the light position before mount, so the header
 * does not shift and server and client markup match.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark finish"
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group flex h-11 items-center gap-2 rounded-md px-1.5 text-muted-foreground transition-colors hover:text-foreground"
    >
      <span aria-hidden="true" className="label hidden sm:inline">
        Finish
      </span>
      <span
        aria-hidden="true"
        className="relative inline-flex h-[18px] w-[34px] items-center rounded-full border border-seam bg-plate transition-colors group-hover:border-engraving"
      >
        <span
          className={cn(
            "absolute left-[2px] h-3 w-3 rounded-full bg-ink transition-transform duration-300 [transition-timing-function:var(--ease-detent)]",
            isDark && "translate-x-4",
          )}
        />
      </span>
    </button>
  )
}
