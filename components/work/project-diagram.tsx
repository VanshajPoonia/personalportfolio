import { cn } from "@/lib/utils"

/**
 * Architecture diagrams for projects that have no honest screenshot: a kernel,
 * a private deployment, a Python package.
 *
 * These are laid out with CSS rather than drawn as a fixed SVG so they reflow
 * on a phone instead of shrinking into illegibility, and so a screen reader
 * gets an ordered list of stages rather than an image with no text.
 *
 * Two densities. `full` carries a description per stage and needs the room a
 * case-study hero or a featured card gives it. `compact` drops to labels only,
 * so it fits a card thumbnail without being cropped mid-stage.
 */

type DiagramKey = "chronoos" | "atlas" | "tensortrail"

interface Stage {
  label: string
  detail: string
}

const diagrams: Record<DiagramKey, { caption: string; stages: Stage[] }> = {
  chronoos: {
    caption: "ChronoOS boot path",
    stages: [
      { label: "Firmware / QEMU", detail: "loads the bootable image" },
      { label: "Bootloader", detail: "long mode, paging, framebuffer + memory map" },
      { label: "Kernel entry", detail: "no_std Rust, serial before pixels" },
      { label: "Interrupts + memory", detail: "GDT, IDT, PIC, PIT, free-list heap" },
      { label: "ChronoFS", detail: "ATA PIO, fsck, repair, journal" },
      { label: "Shell + apps", detail: "commands, eras, notes, calc, sysinfo" },
    ],
  },
  atlas: {
    caption: "ATLAS request path",
    stages: [
      { label: "UI", detail: "shared shell, palette, boards, calendar" },
      { label: "Capability layer", detail: "one place that answers can-this-user" },
      { label: "Supabase session client", detail: "no service-role bypass, ever" },
      { label: "Postgres + RLS", detail: "the boundary the AI obeys too" },
      { label: "AI tools", detail: "workspace reads, web search, URL fetch" },
    ],
  },
  tensortrail: {
    caption: "TensorTrail gradient flow",
    stages: [
      { label: "Tensor", detail: "NumPy array that remembers its origin" },
      { label: "Operation graph", detail: "built at runtime, node per op" },
      { label: "Topological sort", detail: "reverse order for the backward pass" },
      { label: "Autograd", detail: "local derivative per node" },
      { label: "Broadcast reduction", detail: "gradients summed back to shape" },
      { label: "Optimiser step", detail: "SGD, momentum, or Adam" },
    ],
  },
}

export function ProjectDiagram({
  id,
  compact,
  className,
}: {
  id: DiagramKey
  compact?: boolean
  className?: string
}) {
  const diagram = diagrams[id]

  if (compact) {
    return (
      <figure
        className={cn(
          "flex h-full flex-col justify-center gap-4 bg-secondary/20 px-6 py-7",
          className,
        )}
      >
        <figcaption className="label text-muted-foreground">{diagram.caption}</figcaption>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {diagram.stages.map((stage, i) => (
            <li key={stage.label} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-xs text-muted-foreground">
                  →
                </span>
              )}
              <span
                className={cn(
                  "rounded border px-2 py-1 font-mono text-[11px]",
                  i === 0
                    ? "border-primary/50 text-primary"
                    : "border-border/70 text-muted-foreground",
                )}
              >
                {stage.label}
              </span>
            </li>
          ))}
        </ol>
      </figure>
    )
  }

  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-center overflow-hidden rounded-xl border border-border/70 bg-secondary/20 p-6 sm:p-8",
        className,
      )}
    >
      <figcaption className="label mb-5 text-muted-foreground">{diagram.caption}</figcaption>
      <ol className="space-y-0">
        {diagram.stages.map((stage, i) => (
          <li key={stage.label} className="relative flex gap-4 pb-5 last:pb-0">
            <div className="flex flex-col items-center pt-1.5">
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  i === 0 ? "bg-primary" : "bg-muted-foreground/50",
                )}
              />
              {i < diagram.stages.length - 1 && (
                <span aria-hidden="true" className="mt-1 w-px flex-1 bg-border" />
              )}
            </div>
            <div className="min-w-0 pb-1">
              <p className="font-mono text-xs text-foreground">{stage.label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{stage.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}
