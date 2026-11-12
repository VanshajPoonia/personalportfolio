"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { person, primaryNav, secondaryNav } from "@/lib/data/site"
import { Lamp } from "@/components/ui/status-badge"
import { ExternalLink } from "@/components/ui/external-link"
import { ThemeToggle } from "./theme-toggle"
import { CommandPalette, useCommandPalette } from "./command-palette"

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  // Focus goes back to the menu button only after the drawer has actually been
  // open, not on first render, or every page load would focus it.
  const wasOpen = useRef(false)

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Route changes close the drawer; otherwise it stays open over the new page.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) {
      if (wasOpen.current) menuButtonRef.current?.focus?.()
      wasOpen.current = false
      return
    }
    wasOpen.current = true
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener("keydown", onKeyDown)
    }
    // Refs are stable, so menuOpen is the only real dependency here.
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-background transition-colors duration-300",
          scrolled ? "border-border" : "border-transparent",
        )}
      >
        <div className="container-wide">
          <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-6">
            <Link
              href="/"
              className="-ml-1 flex h-11 shrink-0 items-center rounded-md px-1 text-[15px] font-semibold tracking-[-0.01em] [font-stretch:108%]"
              aria-label="Vanshaj Poonia, home"
            >
              Vanshaj Poonia
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "label flex h-11 items-center gap-2 rounded-md px-3 transition-colors",
                        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Lamp lit={active} className={cn(!active && "border-transparent")} />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Open command palette"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-md text-muted-foreground transition-colors hover:text-foreground sm:w-auto sm:px-2"
              >
                <Search aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
                {/* The shortcut hint is only true where there is a keyboard. */}
                <kbd className="label hidden rounded-[4px] border border-seam border-b-2 px-1.5 py-[3px] sm:inline">
                  ⌘K
                </kbd>
              </button>

              {/* Text rather than an icon: there is no glyph for "résumé" that
                  anyone reads correctly. On narrow widths it lives in the drawer. */}
              <a
                href={person.resume}
                className="label hidden h-11 items-center rounded-md px-2 text-muted-foreground transition-colors hover:text-foreground sm:flex"
              >
                Résumé
              </a>

              <ThemeToggle />

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground lg:hidden"
              >
                <Menu aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer: a plate that slides over the page, not an app tab bar. */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/30"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="drawer-in absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border bg-background"
          >
            <div className="flex h-16 items-center justify-between px-4">
              <p className="text-[15px] font-semibold [font-stretch:108%]">Vanshaj Poonia</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <X aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-8">
              <ul className="border-t border-border">
                {primaryNav.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <li key={item.href} className="border-b border-border">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="flex min-h-[56px] items-start gap-3 py-3.5"
                      >
                        <Lamp lit={active} className="mt-[7px]" />
                        <span className="flex flex-col">
                          <span className="text-base font-medium">{item.label}</span>
                          {item.description && (
                            <span className="text-sm text-muted-foreground">{item.description}</span>
                          )}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
                {secondaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="label flex min-h-[44px] items-center text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${person.email}`} className="key key-lit">
                  Email
                </a>
                <ExternalLink href={person.github} label="GitHub profile" showMarker={false} className="key">
                  GitHub
                </ExternalLink>
                <a href={person.resume} className="key">
                  Résumé
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  )
}
