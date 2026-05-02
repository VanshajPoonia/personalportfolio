export type LabStatus = "live" | "planned"

export interface LabItem {
  slug: string
  title: string
  description: string
  tags: string[]
  status: LabStatus
  href?: string
  external?: string
}

export const labItems: LabItem[] = [
  {
    slug: "tiny-terminal",
    title: "Tiny Terminal",
    description: "An in-browser terminal toy with a handful of real commands — help, projects, lab, github, now.",
    tags: ["Terminal", "Interactive", "TypeScript"],
    status: "live",
    href: "/lab#tiny-terminal",
  },
  {
    slug: "os-boot-flow",
    title: "OS Boot Flow Visualizer",
    description: "A visual, step-based explainer for how Chronosapien boots from QEMU to shell.",
    tags: ["OS", "Visualization", "Chronosapien"],
    status: "live",
    href: "/lab/os-boot-flow",
  },
  {
    slug: "ascii-camera",
    title: "ASCII Camera",
    description: "Webcam-to-ASCII visual experiment that turns your camera feed into live characters.",
    tags: ["Creative Coding", "Camera", "TypeScript"],
    status: "live",
    external: "https://asciicamera-gold.vercel.app",
  },
  {
    slug: "pathfinding-visualizer",
    title: "Pathfinding Visualizer",
    description: "An interactive visualizer for A*, BFS, DFS, and Dijkstra on a grid you can paint walls onto.",
    tags: ["Algorithms", "Visualization", "Planned"],
    status: "planned",
  },
  {
    slug: "raycaster",
    title: "Raycaster / Graphics Experiment",
    description: "A small Wolfenstein-style raycaster to learn rendering math from first principles.",
    tags: ["Graphics", "Rendering", "Planned"],
    status: "planned",
  },
  {
    slug: "shader-playground",
    title: "Shader Playground",
    description: "An in-browser GLSL playground for fragment shaders, with a few starter scenes.",
    tags: ["Shaders", "WebGL", "Planned"],
    status: "planned",
  },
]
