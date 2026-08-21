"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Menu, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { person, primaryNav, secondaryNav } from "@/lib/data/site"
import { ThemeToggle } from "./theme-toggle"
import { CommandPalette, useCommandPalette } from "./command-palette"

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

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
      menuButtonRef.current?.focus?.()
      return
    }
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
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "border-b border-border/60 bg-background/85 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="container-wide">
          <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-6">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 font-mono text-sm tracking-tight"
              aria-label="Vanshaj Poonia, home"
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded border border-primary/50 text-xs text-primary"
              >
                &gt;_
              </span>
              <span className="hidden sm:inline">
                VANSHAJ POONIA
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                      isActive(item.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-px h-px bg-primary"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Open command palette"
                className="flex h-9 items-center justify-center gap-2 rounded-md px-2 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground sm:h-auto sm:border sm:border-border/70 sm:px-2.5 sm:py-1.5 sm:hover:border-border"
              >
                <Search aria-hidden="true" className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                {/* The shortcut hint is only true where there is a keyboard. */}
                <kbd className="hidden font-mono sm:inline">⌘K</kbd>
              </button>

              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github aria-hidden="true" className="h-4 w-4" />
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
                <Menu aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer. A sheet rather than an app-style tab bar: this is a
          website, and the navigation is five links. */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border bg-background"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <p className="label text-muted-foreground">Menu</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-8">
              <ul className="space-y-1">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex min-h-[52px] flex-col justify-center rounded-lg px-4 py-3 transition-colors",
                        isActive(item.href) ? "bg-secondary text-foreground" : "text-foreground hover:bg-secondary/60",
                      )}
                    >
                      <span className="font-mono text-sm uppercase tracking-[0.14em]">{item.label}</span>
                      {item.description && (
                        <span className="mt-0.5 text-xs text-muted-foreground">{item.description}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="label px-4 pb-2 pt-7 text-muted-foreground">More</p>
              <ul className="space-y-1">
                {secondaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex min-h-[48px] items-center rounded-lg px-4 py-3 font-mono text-sm uppercase tracking-[0.14em] transition-colors",
                        isActive(item.href) ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-border/60 pt-5">
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center gap-3 rounded-lg px-4 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github aria-hidden="true" className="h-4 w-4" />
                  GitHub
                  <span aria-hidden="true" className="opacity-60">
                    ↗
                  </span>
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
