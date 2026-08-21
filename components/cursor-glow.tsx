"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A soft accent glow that follows the pointer.
 *
 * Kept because it is part of the site's character, but it is not allowed to
 * cost anything: position is written straight to the element's transform inside
 * a single rAF, so pointermove never triggers React state or layout. It stays
 * off entirely for touch input, coarse pointers, and reduced-motion users.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)
  const next = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const evaluate = () => setEnabled(fine.matches && !reduced.matches)
    evaluate()
    fine.addEventListener("change", evaluate)
    reduced.addEventListener("change", evaluate)
    return () => {
      fine.removeEventListener("change", evaluate)
      reduced.removeEventListener("change", evaluate)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const paint = () => {
      frame.current = null
      const el = ref.current
      if (!el) return
      el.style.transform = `translate3d(${next.current.x}px, ${next.current.y}px, 0) translate(-50%, -50%)`
      el.style.opacity = "1"
    }

    const onMove = (event: PointerEvent) => {
      next.current = { x: event.clientX, y: event.clientY }
      if (frame.current === null) frame.current = requestAnimationFrame(paint)
    }

    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = "0"
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.body.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.body.removeEventListener("pointerleave", onLeave)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [enabled])

  if (!enabled) return null

  return <div ref={ref} aria-hidden="true" className="cursor-glow" style={{ left: 0, top: 0, opacity: 0 }} />
}
