"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Sticky section index for long case studies, desktop only.
 *
 * Uses IntersectionObserver rather than a scroll handler so nothing runs per
 * frame, and the links are plain anchors, so with JavaScript unavailable this
 * degrades to a working table of contents.
 */
export function CaseStudyNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="label mb-4 text-muted-foreground">On this page</p>
      <ol className="space-y-1 border-l border-border">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={activeId === section.id ? "true" : undefined}
              className={cn(
                "-ml-px flex gap-2.5 border-l py-1.5 pl-4 font-mono text-xs transition-colors",
                activeId === section.id
                  ? "border-ink text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
