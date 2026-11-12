import { cn } from "@/lib/utils"
import type { DeploymentStatus, ProjectStatus } from "@/lib/data/projects"
import { deploymentLabels, statusLabels } from "@/lib/data/projects"

/**
 * A pilot lamp. Lit means something is happening now (active, live, merged),
 * unlit means settled or unavailable. The lamp is never the only signal: every
 * use sits next to a word.
 */
export function Lamp({ lit, className }: { lit: boolean; className?: string }) {
  return <span aria-hidden="true" data-lit={lit} className={cn("lamp", className)} />
}

function Badge({ lit, quiet, children }: { lit: boolean; quiet?: boolean; children: string }) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2 whitespace-nowrap",
        quiet ? "text-muted-foreground" : "text-foreground",
      )}
    >
      <Lamp lit={lit} />
      {children}
    </span>
  )
}

const projectLit: Record<ProjectStatus, boolean> = {
  active: true,
  shipped: false,
  prototype: false,
  paused: false,
  archive: false,
  learning: false,
}

const deploymentLit: Record<DeploymentStatus, boolean> = {
  live: true,
  offline: false,
  private: false,
  none: false,
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge lit={projectLit[status]} quiet={!projectLit[status] && status !== "shipped"}>
      {statusLabels[status]}
    </Badge>
  )
}

export function DeploymentBadge({ status, note }: { status: DeploymentStatus; note?: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <Badge lit={deploymentLit[status]} quiet={!deploymentLit[status]}>
        {deploymentLabels[status]}
      </Badge>
      {note && <span className="text-[13px] leading-snug text-muted-foreground">{note}</span>}
    </span>
  )
}

export function ContributionBadge({ status }: { status: "merged" | "open" }) {
  return (
    <Badge lit={status === "merged"} quiet={status === "open"}>
      {status === "merged" ? "Merged" : "Open"}
    </Badge>
  )
}
