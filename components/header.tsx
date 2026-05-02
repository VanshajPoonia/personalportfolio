"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Github, Twitter, Linkedin, ChevronDown } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { ThemeChanger } from "./theme-changer"
import Link from "next/link"

const primaryNavItems = [
  { label: "Projects", href: "/projects" },
  { label: "Lab", href: "/lab" },
  { label: "Workbench", href: "/workbench" },
  { label: "Blueprints", href: "/blueprints" },
  { label: "Research", href: "/research" },
]

const moreNavItems = [
  { label: "Now", href: "/now" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Timeline", href: "/timeline" },
  { label: "Learning", href: "/learning" },
  { label: "Artifacts", href: "/artifacts" },
  { label: "Blog", href: "/blog" },
]

const socialLinks = [
  { label: "GitHub", href: "https://github.com/VanshajPoonia", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vanshajpoonia/", icon: Linkedin },
  { label: "X", href: "https://x.com/PooniaVanshaj", icon: Twitter },
]

export function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMoreHovered, setIsMoreHovered] = useState(false)
  const [isMoreLocked, setIsMoreLocked] = useState(false)
  const isMoreOpen = isMoreHovered || isMoreLocked
  const moreRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close locked dropdown on outside click
  useEffect(() => {
    if (!isMoreLocked) return
    const handleOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreLocked(false)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [isMoreLocked])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm" : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 font-mono text-sm text-primary transition-all duration-400 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25">
              <span className="glitch">{"⚡"}</span>
            </div>
            <span className="font-mono text-sm tracking-tight">
              VANSHAJPOONIA
              <span className="bg-gradient-to-l from-primary/50 to-accent bg-clip-text text-transparent font-semibold">
                .COM
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {primaryNavItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative px-3 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-lg",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  hoveredIndex === index && !isActive(item.href) && "text-foreground",
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className={cn(
                    "absolute left-1 text-primary transition-all duration-200",
                    isActive(item.href)
                      ? "opacity-100 translate-x-0"
                      : hoveredIndex === index
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2",
                  )}
                >
                  {">"}
                </span>
                <span
                  className={cn(
                    "transition-transform duration-200",
                    (hoveredIndex === index || isActive(item.href)) && "translate-x-2",
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                    isActive(item.href) ? "w-6" : hoveredIndex === index ? "w-6" : "w-0",
                  )}
                />
              </Link>
            ))}

            {/* More dropdown */}
            <div
              ref={moreRef}
              className="relative"
              onMouseEnter={() => setIsMoreHovered(true)}
              onMouseLeave={() => setIsMoreHovered(false)}
            >
              <button
                type="button"
                onClick={() => setIsMoreLocked((l) => !l)}
                className={cn(
                  "relative flex items-center gap-1 px-3 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-lg",
                  moreNavItems.some((item) => isActive(item.href)) || isMoreLocked
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
                aria-haspopup="menu"
                aria-expanded={isMoreOpen}
              >
                <span>More</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    isMoreOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "absolute right-0 top-full z-50 mt-1 min-w-[200px] origin-top-right rounded-lg border border-border bg-card/95 p-1 shadow-xl backdrop-blur-xl transition-all duration-200",
                  isMoreOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "pointer-events-none opacity-0 scale-95 -translate-y-1",
                )}
                role="menu"
              >
                {moreNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => { setIsMoreLocked(false); setIsMoreHovered(false) }}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                    )}
                  >
                    <span className="text-primary/70">{">"}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="ml-2 flex items-center gap-1">
              <ThemeChanger />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1 sm:flex">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-primary/10"
                >
                  <link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-bottom-9 pointer-events-none shadow-lg">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="hidden h-5 w-px bg-border sm:block" />

            <div className="hidden items-center gap-2.5 font-mono text-xs text-muted-foreground sm:flex px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>status: building</span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 lg:hidden transition-colors hover:bg-secondary"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span
                  className={cn(
                    "h-0.5 bg-foreground transition-all duration-300 origin-center",
                    isMobileMenuOpen ? "w-5 translate-y-2 rotate-45" : "w-5",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 w-3.5 bg-foreground transition-all duration-300",
                    isMobileMenuOpen && "opacity-0 translate-x-2",
                  )}
                />
                <span
                  className={cn(
                    "h-0.5 bg-foreground transition-all duration-300 origin-center",
                    isMobileMenuOpen ? "w-5 -translate-y-2 -rotate-45" : "w-5",
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "transition-all duration-400 lg:hidden bg-background overflow-hidden",
            isMobileMenuOpen ? "max-h-[80vh] opacity-100 pt-4 overflow-y-auto" : "max-h-0 opacity-0",
          )}
        >
          <div className="flex flex-col gap-1 border-t border-border/50 pt-4">
            {[...primaryNavItems, ...moreNavItems].map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 font-mono text-sm uppercase tracking-widest transition-all duration-200 active:bg-secondary hover:bg-secondary/50",
                  isActive(item.href) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                )}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <span className="text-primary">{">"}</span>
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-4 px-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors active:bg-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/10"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50">
                <ThemeChanger />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/50">
                <ThemeToggle />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2.5 px-4 py-3 font-mono text-xs text-muted-foreground bg-secondary/30 rounded-lg mx-4 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>status: building</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
