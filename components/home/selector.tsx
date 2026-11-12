"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Reading {
  label: string
  value: string
}

export interface Channel {
  id: string
  legend: string
  title: string
  line: string
  status: { lit: boolean; word: string }
  readings: Reading[]
  calibrated: string
  link: { href: string; label: string; external?: boolean }
}

/*
 * Geometry. The selector turns through a 120° arc, a detent every 30°, like the
 * band switch on a bench radio. Everything below is in the 300 × 232 SVG box.
 */
const W = 320
const H = 248
const CX = 160
const CY = 162
const KNOB = 76
const SCALE = 94
const LEGEND_R = 124
const ARC = 60
const STEP = 30

const angleFor = (index: number) => -ARC + index * STEP
const clampAngle = (a: number) => Math.max(-ARC - 12, Math.min(ARC + 12, a))
/**
 * Rounded to three decimals because Node and the browser disagree on the last
 * digits of sin and cos, and the SVG attributes would then differ between the
 * server HTML and hydration.
 */
const round3 = (n: number) => Math.round(n * 1000) / 1000
const polar = (r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180
  return { x: round3(CX + r * Math.sin(rad)), y: round3(CY - r * Math.cos(rad)) }
}

const SWEEP_KEY = "selector-self-test"

/**
 * The homepage instrument: a detented rotary selector beside an inverted
 * display window. Turn it by dragging the knob, clicking a legend, or with the
 * arrow keys; the window reads out that channel's real project state.
 *
 * Semantically it is a radio group (the legends) and a live region (the
 * window); the knob drawing is decoration over that.
 */
export function Selector({ channels }: { channels: Channel[] }) {
  const [index, setIndex] = useState(0)
  const [dragAngle, setDragAngle] = useState<number | null>(null)
  const [sweepAngle, setSweepAngle] = useState<number | null>(null)
  const [powered, setPowered] = useState(false)
  const knobRef = useRef<SVGSVGElement>(null)
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([])

  const last = channels.length - 1
  const channel = channels[index]
  const angle = dragAngle ?? sweepAngle ?? angleFor(index)

  /*
   * Power-on self-test, once per session: the pointer runs to the end of its
   * travel and back, then the lamps warm up. Skipped entirely under reduced
   * motion, and nothing in the window is hidden while it runs.
   */
  useEffect(() => {
    const motionOk = document.documentElement.dataset.motion === "ok"
    let done = false
    try {
      done = sessionStorage.getItem(SWEEP_KEY) === "1"
    } catch {
      done = true
    }
    if (!motionOk || done) {
      setPowered(true)
      return
    }
    try {
      sessionStorage.setItem(SWEEP_KEY, "1")
    } catch {}
    const timers = [
      window.setTimeout(() => setSweepAngle(ARC), 260),
      window.setTimeout(() => setSweepAngle(null), 900),
      window.setTimeout(() => setPowered(true), 1280),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [])

  const select = useCallback(
    (next: number, focus = false) => {
      const clamped = Math.max(0, Math.min(last, next))
      setIndex(clamped)
      if (focus) radioRefs.current[clamped]?.focus()
    },
    [last],
  )

  const angleFromPointer = (event: React.PointerEvent) => {
    const svg = knobRef.current
    if (!svg) return 0
    const box = svg.getBoundingClientRect()
    const scale = box.width / W
    const dx = event.clientX - (box.left + CX * scale)
    const dy = event.clientY - (box.top + CY * scale)
    return clampAngle((Math.atan2(dx, -dy) * 180) / Math.PI)
  }

  const onPointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    setSweepAngle(null)
    setDragAngle(angleFromPointer(event))
  }

  const onPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (dragAngle === null) return
    setDragAngle(angleFromPointer(event))
  }

  const onPointerUp = () => {
    if (dragAngle === null) return
    select(Math.round((dragAngle + ARC) / STEP))
    setDragAngle(null)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowUp: index + 1,
      ArrowLeft: index - 1,
      ArrowDown: index - 1,
      Home: 0,
      End: last,
    }
    if (!(event.key in moves)) return
    event.preventDefault()
    select(moves[event.key], true)
  }

  const ticks = []
  for (let a = -ARC - 12; a <= ARC + 12; a += 6) {
    const detent = (a + ARC) % STEP === 0 && a >= -ARC && a <= ARC
    const inner = polar(SCALE - (detent ? 7 : 3), a)
    const outer = polar(SCALE + (detent ? 5 : 2), a)
    ticks.push(
      <line
        key={a}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        className={detent ? "stroke-ink" : "stroke-engraving"}
        strokeWidth={detent ? 1.5 : 1}
        strokeLinecap="round"
      />,
    )
  }

  const knurl = []
  for (let a = 0; a < 360; a += 7.5) {
    const p1 = polar(KNOB - 8, a)
    const p2 = polar(KNOB - 2, a)
    knurl.push(<line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="stroke-engraving" strokeWidth={1} />)
  }

  const pointerStart = polar(16, 0)
  const pointerEnd = polar(KNOB - 18, 0)
  const settling = dragAngle === null

  return (
    <div className="selector grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)] xl:items-center" data-powered={powered || undefined}>
      <div className="mx-auto w-full max-w-[320px]">
        <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg
            ref={knobRef}
            viewBox={`0 0 ${W} ${H}`}
            aria-hidden="true"
            className={cn("absolute inset-0 h-full w-full touch-none select-none", dragAngle !== null ? "cursor-grabbing" : "cursor-grab")}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {ticks}
            {/* The knob is two plates: a seam-grey skirt with a knurled edge, and a plate-grey cap set into it. */}
            <circle cx={CX} cy={CY} r={KNOB} className="fill-seam stroke-engraving" strokeWidth={1} />
            <g
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: `${CX}px ${CY}px`,
                transition: settling
                  ? `transform ${sweepAngle !== null ? 620 : 380}ms var(--ease-detent)`
                  : "none",
              }}
            >
              {knurl}
              <circle cx={CX} cy={CY} r={KNOB - 12} className="fill-plate stroke-engraving" strokeWidth={1} />
              <line
                x1={pointerStart.x}
                y1={pointerStart.y}
                x2={pointerEnd.x}
                y2={pointerEnd.y}
                className="stroke-ink"
                strokeWidth={3}
                strokeLinecap="round"
              />
            </g>
            <circle cx={CX} cy={CY} r={5} className="fill-ink" />
          </svg>

          <div role="radiogroup" aria-label="Channel" onKeyDown={onKeyDown}>
            {channels.map((c, i) => {
              const at = polar(LEGEND_R, angleFor(i))
              const active = i === index
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    radioRefs.current[i] = el
                  }}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(i)}
                  style={{ left: `${(at.x / W) * 100}%`, top: `${(at.y / H) * 100}%` }}
                  className={cn(
                    "label absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[4px] px-1.5 py-1 transition-colors duration-200",
                    "before:absolute before:-inset-2 before:content-['']",
                    active ? "bg-ink text-plate" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c.legend}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Fixed height across channels, so the window never jumps as the knob turns. */}
      <div className="window flex min-h-[26rem] flex-col p-6 xl:h-[28rem]" aria-live="polite" aria-atomic="true">
        <div key={channel.id} className="roll-in flex flex-1 flex-col">
          <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-[1.75rem]">{channel.title}</p>
          <p className="mt-2 text-pretty text-[15px] leading-snug text-[var(--window-dim)]">{channel.line}</p>

          <dl className="mt-6 divide-y divide-[var(--window-seam)] border-y border-[var(--window-seam)]">
            {channel.readings.map((reading) => (
              <div key={reading.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-2">
                <dt className="label pt-[3px] text-[var(--window-dim)]">{reading.label}</dt>
                <dd className="font-mono text-[14px] leading-snug">{reading.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between gap-4">
              <p className="label inline-flex items-center gap-2">
                <span aria-hidden="true" data-lit={channel.status.lit} className="lamp lamp-window" />
                {channel.status.word}
              </p>
              {channel.link.external ? (
                <a
                  href={channel.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${channel.link.label}: ${channel.title} (opens in a new tab)`}
                  className="label group inline-flex min-h-[44px] items-center gap-1.5 underline-offset-4 hover:underline sm:min-h-0"
                >
                  {channel.link.label}
                  <ArrowUpRight aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5" />
                </a>
              ) : (
                <Link
                  href={channel.link.href}
                  aria-label={`${channel.link.label}: ${channel.title}`}
                  className="label group inline-flex min-h-[44px] items-center gap-1.5 underline-offset-4 hover:underline sm:min-h-0"
                >
                  {channel.link.label}
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              )}
            </div>
            <p className="label mt-2 text-[var(--window-dim)]">Calibrated {channel.calibrated}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
