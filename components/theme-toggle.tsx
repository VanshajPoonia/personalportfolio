"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

/**
 * Light/dark toggle.
 *
 * Renders a fixed-size placeholder before mount so the header does not shift
 * when the resolved theme arrives, and so the server and client markup match.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="h-11 w-11" aria-hidden="true" />
  }

  const isDark = resolvedTheme === "dark"
  const next = isDark ? "light" : "dark"
  const Icon = isDark ? Moon : Sun

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </button>
  )
}
