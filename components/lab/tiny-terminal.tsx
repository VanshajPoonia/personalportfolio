"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Line = { kind: "input" | "output" | "system"; text: string }

const banner = [
  "tiny-terminal v0.1 — running locally in your browser",
  "type `help` for commands.",
]

const commands: Record<string, () => string[]> = {
  help: () => [
    "available commands:",
    "  help         show this list",
    "  whoami       a one-liner about me",
    "  projects     list flagship projects",
    "  lab          list lab experiments",
    "  github       open github profile",
    "  now          what i'm currently doing",
    "  research     list research papers",
    "  clear        wipe the screen",
  ],
  whoami: () => [
    "vanshaj poonia — building systems, ai products, and enterprise tools in public.",
  ],
  projects: () => [
    "flagship builds:",
    "  • chronosapien   — hobby OS in rust",
    "  • intacct        — enterprise finance platform",
    "  • zenquanta-ai   — multi-assistant ai workspace",
    "  • lifesort       — calendar-style productivity app",
    "  • ascii-camera   — webcam → ascii experiment",
    "→ see /projects for the full list",
  ],
  lab: () => [
    "lab experiments:",
    "  • tiny-terminal           (you are here)",
    "  • os-boot-flow visualizer — /lab/os-boot-flow",
    "  • ascii-camera            — asciicamera-gold.vercel.app",
    "  • pathfinding visualizer  (planned)",
    "  • raycaster               (planned)",
    "  • shader playground       (planned)",
  ],
  github: () => ["opening github → https://github.com/VanshajPoonia"],
  now: () => [
    "currently building chronosapien, intacct, zenquanta ai, and the lab/research sections of this site.",
    "→ see /now for the long version",
  ],
  research: () => [
    "research entries:",
    "  • neutral-atom vs superconducting qubits  (draft)",
    "  • quantum architectures: beyond two       (planned)",
    "  • ai developer tools and model routing    (planned)",
    "  • local-first software and sync engines   (planned)",
    "  • mini cloud platforms                    (planned)",
    "→ see /research",
  ],
  clear: () => [],
}

export function TinyTerminal() {
  const [history, setHistory] = useState<Line[]>(
    banner.map((text) => ({ kind: "system" as const, text })),
  )
  const [input, setInput] = useState("")
  const [recall, setRecall] = useState<string[]>([])
  const [recallIndex, setRecallIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [history])

  function runCommand(raw: string) {
    const trimmed = raw.trim()
    const next: Line[] = [...history, { kind: "input", text: `❯ ${trimmed || ""}` }]
    if (!trimmed) {
      setHistory(next)
      return
    }
    setRecall((r) => [trimmed, ...r].slice(0, 20))
    setRecallIndex(null)

    if (trimmed === "clear") {
      setHistory([])
      return
    }

    if (trimmed === "github") {
      window.open("https://github.com/VanshajPoonia", "_blank", "noopener,noreferrer")
    }

    const handler = commands[trimmed]
    const output = handler ? handler() : [`command not found: ${trimmed} — try \`help\``]
    setHistory([
      ...next,
      ...output.map((text) => ({ kind: "output" as const, text })),
    ])
  }

  function handleKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault()
      runCommand(input)
      setInput("")
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      if (recall.length === 0) return
      const idx = recallIndex === null ? 0 : Math.min(recallIndex + 1, recall.length - 1)
      setRecallIndex(idx)
      setInput(recall[idx])
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      if (recallIndex === null) return
      const idx = recallIndex - 1
      if (idx < 0) {
        setRecallIndex(null)
        setInput("")
      } else {
        setRecallIndex(idx)
        setInput(recall[idx])
      }
    }
  }

  return (
    <div
      id="tiny-terminal"
      className="rounded-xl border border-border/60 bg-card/40 glass overflow-hidden hover-lift scroll-mt-24"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-primary/60" />
        </div>
        <span className="font-mono text-xs text-muted-foreground ml-3">tiny-terminal — local</span>
        <span className="ml-auto flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          live
        </span>
      </div>
      <div
        ref={scrollRef}
        className="h-72 overflow-y-auto px-4 py-3 font-mono text-xs sm:text-sm leading-relaxed"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={cn(
              "whitespace-pre-wrap break-words",
              line.kind === "input" && "text-primary",
              line.kind === "system" && "text-muted-foreground italic",
              line.kind === "output" && "text-foreground/90",
            )}
          >
            {line.text}
          </div>
        ))}
        <form
          className="flex items-center gap-2 pt-1"
          onSubmit={(e) => {
            e.preventDefault()
            runCommand(input)
            setInput("")
          }}
        >
          <span className="text-primary">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none"
            placeholder="type a command and press enter…"
            aria-label="terminal input"
          />
        </form>
      </div>
    </div>
  )
}
