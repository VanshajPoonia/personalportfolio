"use client"

import { useEffect, useState, useCallback } from "react"

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY })
    })
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [handleMouseMove])

  return (
    <>
      {/*
        Position and size ride on `transform` only. Driving left/top would relayout
        on every mousemove, and growing width/height on hover would relayout again
        on every interactive element the pointer crosses.
      */}
      <div
        className="cursor-glow hidden lg:block pointer-events-none"
        style={{
          left: 0,
          top: 0,
          opacity: isVisible ? 1 : 0,
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isHovering ? 1.25 : 1
          })`,
          transition: "opacity 0.4s ease, transform 0.3s ease",
          willChange: "transform",
        }}
      />
      <div
        className="hidden lg:block pointer-events-none fixed left-0 top-0 w-8 h-8 rounded-full mix-blend-screen"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          opacity: isVisible ? 0.15 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  )
}
