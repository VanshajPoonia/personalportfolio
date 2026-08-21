"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { primaryNav, secondaryNav, person } from "@/lib/data/site"
import { sortedProjects } from "@/lib/data/projects"

/**
 * Command palette.
 *
 * Hand-rolled rather than pulled from a library: the whole thing is a filter
 * over about thirty static items, and a dependency would cost more bytes than
 * the feature.
 *
 * Accessibility: it is a modal dialog with a focus trap, Escape to close,
 * arrow-key navigation over an aria-activedescendant listbox, and focus
 * restored to whatever opened it.
 */

interface Command {
  id: string
  label: string
  group: string
  hint?: string
  href?: string
  external?: boolean
  run?: () => void
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  const close = useCallback(() => onOpenChange(false), [onOpenChange])

  const commands = useMemo<Command[]>(() => {
    const navigate: Command[] = [...primaryNav, ...secondaryNav].map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      group: "Go to",
      hint: item.href,
      href: item.href,
    }))

    const projectCommands: Command[] = sortedProjects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      group: "Projects",
      hint: project.caseStudy ? "Case study" : "Work",
      href: project.caseStudy ? `/work/${project.slug}` : `/work#${project.slug}`,
    }))

    const actions: Command[] = [
      { id: "gh", label: "GitHub", group: "Elsewhere", hint: "VanshajPoonia", href: person.github, external: true },
      { id: "li", label: "LinkedIn", group: "Elsewhere", hint: "vanshajpoonia", href: person.linkedin, external: true },
      { id: "x", label: "X", group: "Elsewhere", hint: person.xHandle, href: person.x, external: true },
      {
        id: "email",
        label: "Email",
        group: "Elsewhere",
        hint: person.email,
        href: `mailto:${person.email}`,
        external: true,
      },
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        group: "Preferences",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
    ]

    return [...navigate, ...projectCommands, ...actions]
  }, [resolvedTheme, setTheme])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q),
    )
  }, [commands, query])

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>()
    for (const command of results) {
      const list = map.get(command.group) ?? []
      list.push(command)
      map.set(command.group, list)
    }
    return [...map.entries()]
  }, [results])

  // Reset transient state each time the palette opens, and remember where
  // focus came from so it can be handed back on close.
  useEffect(() => {
    if (!open) return
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    setQuery("")
    setActiveIndex(0)
    const id = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (open) return
    restoreFocusRef.current?.focus?.()
  }, [open])

  // The page behind a modal should not scroll.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const select = useCallback(
    (command: Command) => {
      close()
      if (command.run) {
        command.run()
        return
      }
      if (!command.href) return
      if (command.external) {
        window.open(command.href, "_blank", "noopener,noreferrer")
        return
      }
      router.push(command.href)
    },
    [close, router],
  )

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault()
      close()
      return
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0))
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
      return
    }
    if (event.key === "Enter") {
      event.preventDefault()
      const command = results[activeIndex]
      if (command) select(command)
      return
    }
    // Focus trap. There is exactly one focusable control inside the dialog,
    // so Tab has nowhere legitimate to go.
    if (event.key === "Tab") {
      event.preventDefault()
    }
  }

  // Keep the highlighted row in view during keyboard navigation.
  useEffect(() => {
    if (!open) return
    const active = listRef.current?.querySelector('[data-active="true"]')
    active?.scrollIntoView({ block: "nearest" })
  }, [activeIndex, open])

  if (!open) return null

  let flatIndex = -1

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh] sm:pt-[18vh]">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <span aria-hidden="true" className="font-mono text-sm text-primary">
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-list"
            aria-activedescendant={results[activeIndex] ? `command-${results[activeIndex].id}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search work, pages, and links"
            aria-label="Search work, pages, and links"
            className="w-full bg-transparent py-4 font-mono text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
            ESC
          </kbd>
        </div>

        <div ref={listRef} id="command-palette-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {grouped.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              Nothing matches <span className="font-mono text-foreground">{query}</span>.
            </p>
          )}
          {grouped.map(([group, items]) => (
            <div key={group} className="mb-1 last:mb-0">
              <p className="label px-3 pb-1.5 pt-2.5 text-muted-foreground">{group}</p>
              {items.map((command) => {
                flatIndex += 1
                const isActive = flatIndex === activeIndex
                const myIndex = flatIndex
                return (
                  <button
                    key={command.id}
                    id={`command-${command.id}`}
                    role="option"
                    aria-selected={isActive}
                    data-active={isActive}
                    type="button"
                    onClick={() => select(command)}
                    onMouseMove={() => setActiveIndex(myIndex)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                      isActive ? "bg-secondary text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span className="truncate">
                      {command.label}
                      {command.external && (
                        <span aria-hidden="true" className="ml-1.5 text-[0.8em] opacity-60">
                          ↗
                        </span>
                      )}
                    </span>
                    {command.hint && (
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{command.hint}</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Registers the global shortcut and owns the palette's open state. */
export function useCommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return { open, setOpen }
}
