import Link from "next/link"
import { Section, SectionHeader } from "@/components/layout/section"

/**
 * The range argument, made concrete.
 *
 * Laid out as a CSS grid of layers rather than one large SVG, so it becomes a
 * readable vertical sequence on a phone instead of an unreadable diagram. The
 * projects named here all exist elsewhere on the site.
 */

const layers = [
  {
    layer: "Product",
    description: "Applications people sign into and use to do their job.",
    projects: [
      { name: "Project Management ATLAS", href: "/work/project-management-atlas" },
      { name: "LifeSort", href: "/work#lifesort" },
      { name: "Intacct", href: "/work#intacct" },
    ],
  },
  {
    layer: "AI systems",
    description: "Routing, tool use, memory, and metering around hosted models.",
    projects: [
      { name: "Zenquanta AI", href: "/work/zenquanta-ai" },
      { name: "ATLAS assistant", href: "/work/project-management-atlas#ai" },
    ],
  },
  {
    layer: "ML internals",
    description: "The layer under the API: autograd, gradients, optimisers.",
    projects: [{ name: "TensorTrail", href: "/work/tensortrail" }],
  },
  {
    layer: "Developer tools",
    description: "Editors, runners, and the infrastructure that hosts them.",
    projects: [
      { name: "Volt", href: "/work#volt" },
      { name: "Codash", href: "/archive#codash" },
    ],
  },
  {
    layer: "Systems",
    description: "Boot, memory, interrupts, filesystems. No runtime to fall back on.",
    projects: [{ name: "ChronoOS", href: "/work/chronosapien" }],
  },
]

export function EngineeringSpectrum() {
  return (
    <Section id="spectrum" className="border-b border-border/60">
      <SectionHeader
        index="03"
        eyebrow="Engineering spectrum"
        title="I like moving between abstraction layers."
        description="The range is not scattergun. Each layer down exists because the one above it raised a question I could not answer."
      />

      <ol className="border-t border-border/60">
        {layers.map((layer, index) => (
          <li
            key={layer.layer}
            className="group grid gap-x-8 gap-y-2 border-b border-border/60 py-6 sm:grid-cols-12 sm:items-baseline"
          >
            <div className="flex items-baseline gap-3 sm:col-span-4">
              <span aria-hidden="true" className="font-mono text-[11px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-mono text-sm uppercase tracking-[0.14em]">{layer.layer}</h3>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-4">{layer.description}</p>

            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 sm:col-span-4 sm:justify-end">
              {layer.projects.map((project) => (
                <li key={project.name}>
                  <Link
                    href={project.href}
                    className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <p className="mt-6 font-mono text-xs text-muted-foreground">
        <span aria-hidden="true" className="text-primary">
          ↓
        </span>{" "}
        Lower level
      </p>
    </Section>
  )
}
