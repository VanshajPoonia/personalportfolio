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
      { name: "Intacct", href: "/work#intacct" },
    ],
  },
  {
    layer: "AI systems",
    description: "Routing, tool use, memory, and metering around hosted models.",
    projects: [{ name: "ATLAS assistant", href: "/work/project-management-atlas#ai" }],
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
    <Section id="spectrum" className="border-b border-border">
      <SectionHeader
        title="I like moving between abstraction layers."
        description="The range is not scattered. Each layer down exists because the one above it raised a question I could not answer."
      />

      <ol className="trace border-t border-border">
        {layers.map((layer, index) => (
          <li
            key={layer.layer}
            style={{ ["--i" as string]: index }}
            className="relative grid gap-x-8 gap-y-2 border-b border-border py-6 pl-8 sm:grid-cols-12 sm:items-baseline"
          >
            {index < layers.length - 1 && (
              <span
                aria-hidden="true"
                className="trace-line absolute left-[3.5px] top-[calc(1.5rem+0.5em+8px)] h-[calc(100%-8px)] w-px bg-engraving/50"
              />
            )}
            <span
              aria-hidden="true"
              className={
                "trace-node absolute left-0 top-[calc(1.5rem+0.5em)] h-2 w-2 rounded-full border-[1.5px] border-ink " +
                (index === layers.length - 1 ? "bg-ink" : "bg-plate")
              }
            />
            <h3 className="text-lg font-medium sm:col-span-3">{layer.layer}</h3>

            <p className="text-muted-foreground sm:col-span-5">{layer.description}</p>

            <ul className="flex flex-wrap gap-x-5 gap-y-1 sm:col-span-4 sm:justify-end">
              {layer.projects.map((project) => (
                <li key={project.name}>
                  <Link
                    href={project.href}
                    className="underline decoration-seam underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
