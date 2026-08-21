import { cn } from "@/lib/utils"
import type { DeploymentStatus, ProjectStatus } from "@/lib/data/projects"
import { deploymentLabels, statusLabels } from "@/lib/data/projects"

/**
 * Status is carried by the label, not the colour. The glyph distinguishes the
 * states a second time for anyone who cannot see the accent: a filled dot means
 * something is currently happening, a hollow one means it is settled.
 */

type Tone = "active" | "neutral" | "muted"

const toneClass: Record<Tone, string> = {
  active: "text-primary",
  neutral: "text-foreground/80",
  muted: "text-muted-foreground",
}

const projectTone: Record<ProjectStatus, { tone: Tone; filled: boolean }> = {
  active: { tone: "active", filled: true },
  shipped: { tone: "neutral", filled: false },
  prototype: { tone: "muted", filled: false },
  paused: { tone: "muted", filled: false },
  archive: { tone: "muted", filled: false },
  learning: { tone: "muted", filled: false },
}

const deploymentTone: Record<DeploymentStatus, { tone: Tone; filled: boolean }> = {
  live: { tone: "active", filled: true },
  offline: { tone: "muted", filled: false },
  private: { tone: "muted", filled: false },
  none: { tone: "muted", filled: false },
}

function Badge({ tone, filled, children }: { tone: Tone; filled: boolean; children: string }) {
  return (
    <span className={cn("label inline-flex items-center gap-1.5 whitespace-nowrap", toneClass[tone])}>
      <span aria-hidden="true">{filled ? "●" : "○"}</span>
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { tone, filled } = projectTone[status]
  return (
    <Badge tone={tone} filled={filled}>
      {statusLabels[status]}
    </Badge>
  )
}

export function DeploymentBadge({ status, note }: { status: DeploymentStatus; note?: string }) {
  const { tone, filled } = deploymentTone[status]
  return (
    <span className="inline-flex items-center gap-2">
      <Badge tone={tone} filled={filled}>
        {deploymentLabels[status]}
      </Badge>
      {note && <span className="font-mono text-[11px] text-muted-foreground">{note}</span>}
    </span>
  )
}

export function ContributionBadge({ status }: { status: "merged" | "open" }) {
  return (
    <Badge tone={status === "merged" ? "active" : "muted"} filled={status === "merged"}>
      {status === "merged" ? "Merged" : "Open"}
    </Badge>
  )
}
