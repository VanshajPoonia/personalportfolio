import { cn } from "@/lib/utils"

/**
 * Schematics for projects that have no honest screenshot: a kernel, a private
 * deployment, a Python package, a self-hosted bot.
 *
 * Drawn as a signal path rather than boxed chips: one continuous line with a
 * node per stage, which draws itself in once when it scrolls into view (see
 * TraceObserver and the .trace rules in globals.css). It is HTML rather than a
 * fixed SVG so it reflows on a phone, and a screen reader gets an ordered list.
 *
 * Two densities. `full` carries a detail line per stage. `compact` keeps the
 * labels only, so it fits a thumbnail without cropping a stage.
 */

type DiagramKey = "chronoos" | "atlas" | "tensortrail" | "bigbrother" | "browserapps"

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
  bigbrother: {
    caption: "Big Brother issue check",
    stages: [
      { label: "GitHub event", detail: "new issue, pull request, or /bigbrother check" },
      { label: "Read the report", detail: "Qwen3 4B fills a fixed form, on the owner's machine" },
      { label: "Check premises", detail: "named functions and versions exist at that release" },
      { label: "Offline sandbox", detail: "Docker, no network, read-only, non-root" },
      { label: "Rules pick the label", detail: "confirmed, cannot reproduce, or invalid" },
      { label: "Comment", detail: "the evidence, posted back to the thread" },
    ],
  },
  browserapps: {
    caption: "What the seven apps share",
    stages: [
      { label: "Open-weight model", detail: "Whisper, CLIP, Gemma, Kokoro, Donut" },
      { label: "transformers.js in the tab", detail: "WebGPU, or WASM where it is missing" },
      { label: "Code around the model", detail: "checkers and rules decide what ships" },
      { label: "npm test", detail: "reproduces each measured number" },
      { label: "GitHub Pages", detail: "no server, no API key, nothing uploaded" },
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

  return (
    <figure
      className={cn(
        "trace flex h-full flex-col justify-center",
        compact ? "px-5 py-5" : "items-center p-6 sm:p-10 [&>*]:w-full [&>*]:max-w-md",
        className,
      )}
    >
      <figcaption className={cn("label text-muted-foreground", compact ? "mb-3" : "mb-6")}>{diagram.caption}</figcaption>
      <ol className={compact ? "space-y-1.5" : "space-y-4"}>
        {diagram.stages.map((stage, i) => (
          <li key={stage.label} className="relative pl-6" style={{ ["--i" as string]: i }}>
            {i < diagram.stages.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "trace-line absolute left-[3.5px] top-[calc(0.45em+8px)] w-px bg-engraving/50",
                  compact ? "h-[calc(100%+0.375rem-8px)]" : "h-[calc(100%+1rem-8px)]",
                )}
              />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "trace-node absolute left-0 top-[0.45em] h-2 w-2 rounded-full border-[1.5px] border-ink",
                i === 0 ? "bg-ink" : "bg-plate",
              )}
            />
            <p className={cn("font-medium leading-snug", compact ? "text-[13px]" : "text-[15px]")}>{stage.label}</p>
            {!compact && <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{stage.detail}</p>}
          </li>
        ))}
      </ol>
    </figure>
  )
}
