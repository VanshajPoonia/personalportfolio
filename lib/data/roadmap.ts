export type RoadmapColumn = "now" | "next" | "later" | "paused" | "shipped"

export interface RoadmapItem {
  title: string
  description?: string
  related?: string
}

export const roadmapColumns: { id: RoadmapColumn; label: string; description: string }[] = [
  { id: "now", label: "Now", description: "Active focus this cycle." },
  { id: "next", label: "Next", description: "Queued and starting soon." },
  { id: "later", label: "Later", description: "Planned but not yet scheduled." },
  { id: "paused", label: "Paused", description: "Set down for now — may revisit." },
  { id: "shipped", label: "Shipped", description: "Live, public, or done." },
]

export const roadmap: Record<RoadmapColumn, RoadmapItem[]> = {
  now: [
    { title: "Chronosapien case study", description: "Long-form architecture + boot flow writeup." },
    { title: "Zenquanta AI case study", description: "Assistant families, routing, plan ladder." },
    { title: "Intacct case study", description: "Workspace model, service layer, cutover." },
    { title: "Lab section", description: "Interactive demos and visual experiments." },
    { title: "Workbench notes", description: "Build logs and rough thinking, in public." },
    { title: "Research section", description: "Exploratory papers and technical essays." },
  ],
  next: [
    { title: "OS boot-flow visualizer" },
    { title: "Tiny Terminal" },
    { title: "ASCII Camera embedded demo" },
    { title: "Mini Vercel Clone blueprint" },
    { title: "More project screenshots" },
    { title: "Upload/publish research papers" },
  ],
  later: [
    { title: "Raycaster" },
    { title: "Shader playground" },
    { title: "Tiny compiler" },
    { title: "Self-hosted AI workspace" },
    { title: "Public artifacts/downloads" },
    { title: "More research PDFs" },
  ],
  paused: [
    { title: "Cloud Code Docker Container" },
    { title: "Codash" },
    { title: "Some v0 prototypes" },
    { title: "Older clone projects" },
  ],
  shipped: [
    { title: "Zenquanta AI" },
    { title: "LifeSort" },
    { title: "ASCII Camera" },
    { title: "Moogle" },
    { title: "Mewtube" },
    { title: "Moogle Maps" },
    { title: "Discord Clone" },
    { title: "Shopeee" },
    { title: "Amazon Prime Clone" },
    { title: "Hypnover" },
  ],
}
