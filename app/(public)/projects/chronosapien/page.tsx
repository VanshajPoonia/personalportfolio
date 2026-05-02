import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudy } from "@/components/shared/case-study"
import { getProjectBySlug } from "@/lib/data/projects"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Chronosapien — case study",
  description:
    "A beginner-friendly hobby OS in Rust: boot flow, framebuffer console, interrupts, in-memory filesystem, and a small era-themed shell.",
  alternates: { canonical: `${baseUrl}/projects/chronosapien` },
}

export default function ChronosapienCaseStudy() {
  const project = getProjectBySlug("chronosapien")
  if (!project) notFound()

  return (
    <div className="pt-20">
      <CaseStudy
        project={project}
        sections={[
          {
            id: "overview",
            label: "Overview",
            body: (
              <>
                <p>
                  Chronosapien is a hobby operating system written in Rust. It boots a <code>no_std</code> x86_64 kernel
                  in QEMU, renders a framebuffer graphics console, logs to serial, and runs a tiny era-themed shell on top
                  of an in-memory filesystem.
                </p>
                <p>
                  It is intentionally small. The point is not to compete with Linux or even Redox — it is to keep every
                  layer readable end to end, so a beginner can open the repo and follow how a machine becomes an
                  operating system.
                </p>
              </>
            ),
          },
          {
            id: "why",
            label: "Why I'm building it",
            body: (
              <>
                <p>
                  Most of my work lives in JavaScript runtimes that hide the machine. Chronosapien is a bet that I
                  understand systems better if I am forced to write them — interrupts, page faults, framebuffers,
                  keyboards, and all.
                </p>
                <p>
                  Rust forces honesty about ownership and lifetimes even when talking to hardware. <code>no_std</code>
                  forces honesty about what the standard library was actually doing for me. Both are exactly the
                  pressure I wanted.
                </p>
              </>
            ),
          },
          {
            id: "current-state",
            label: "Current state",
            body: (
              <>
                <p>
                  The kernel boots reliably in QEMU. Serial output works from very early in the boot process so
                  debugging is possible without a screen. The framebuffer console prints text and accepts input. CPU
                  exceptions, the timer, and PS/2 keyboard are wired through a real IDT.
                </p>
                <p>
                  Memory management is bump-allocated for now. The filesystem lives in RAM. The shell ships with a
                  small set of useful commands and a few built-in apps.
                </p>
              </>
            ),
          },
          {
            id: "architecture",
            label: "Architecture",
            body: (
              <>
                <ul>
                  <li>
                    <strong>Bootloader crate</strong> sets up long mode, hands the kernel a framebuffer and memory map.
                  </li>
                  <li>
                    <strong>Kernel entrypoint</strong> initializes serial logging first, then the framebuffer console,
                    GDT, IDT, PIC remap, and PIT timer.
                  </li>
                  <li>
                    <strong>Memory subsystem</strong> manages a bump heap and tracks the memory map handed in by the
                    bootloader.
                  </li>
                  <li>
                    <strong>Filesystem</strong> is a simple in-memory tree with files and metadata.
                  </li>
                  <li>
                    <strong>Shell</strong> polls the keyboard and dispatches into a small command table that includes
                    apps like notes, calc, and sysinfo.
                  </li>
                </ul>
              </>
            ),
          },
          {
            id: "boot-flow",
            label: "Boot flow in plain English",
            body: (
              <ol className="list-decimal pl-6 space-y-2">
                <li>QEMU emulates an x86_64 machine and loads the bootloader.</li>
                <li>The bootloader prepares CPU state and switches to long mode.</li>
                <li>It hands the kernel a framebuffer pointer and a memory map.</li>
                <li>The Rust kernel entrypoint runs.</li>
                <li>Serial logging initializes — debug output works from now on.</li>
                <li>The framebuffer console initializes — the screen shows text.</li>
                <li>GDT and IDT load — the CPU knows how to handle exceptions.</li>
                <li>The timer (PIT) starts ticking.</li>
                <li>The PS/2 keyboard is enabled.</li>
                <li>The shell loop begins, waiting for the first keystroke.</li>
              </ol>
            ),
          },
          {
            id: "features",
            label: "Features already working",
            body: (
              <ul>
                <li>Serial logging with a working <code>println!</code>-style macro</li>
                <li>Framebuffer text console with scrolling</li>
                <li>GDT, IDT, breakpoint / page fault / double fault handlers</li>
                <li>PIC remap and PIT timer interrupts</li>
                <li>PS/2 keyboard input through an IRQ handler</li>
                <li>Bump-allocated heap</li>
                <li>In-memory filesystem with files and listings</li>
                <li>
                  Shell commands: <code>ls</code>, <code>cat</code>, <code>write</code>, <code>rm</code>,{" "}
                  <code>mem</code>, <code>uptime</code>, <code>clock</code>, <code>clear</code>, <code>reboot</code>,
                  era switching
                </li>
                <li>Built-in apps: notes, calc, sysinfo</li>
              </ul>
            ),
          },
          {
            id: "hard-parts",
            label: "Hard parts",
            body: (
              <>
                <p>
                  Triple faults that boot-loop the VM with no output. The fix is always the same — ship serial logging
                  before anything else, then add prints aggressively while you isolate the line that broke the world.
                </p>
                <p>
                  Calling conventions and frame layouts for interrupt handlers. Rust&apos;s type system helps but the
                  hardware does not negotiate.
                </p>
                <p>
                  Memory management without a real allocator. A bump heap is fine while learning, but it forces you to
                  think about lifetimes the way Rust wanted you to all along.
                </p>
              </>
            ),
          },
          {
            id: "what-i-learned",
            label: "What I learned",
            body: (
              <>
                <p>
                  Logging is more important than features. If you cannot print, you cannot debug, and nothing else
                  matters.
                </p>
                <p>
                  Frameworks hide a staggering amount of work. Drawing a glyph yourself changes how you think about
                  every UI you have ever shipped.
                </p>
                <p>
                  Small, readable code beats clever, dense code in this domain. The whole project is a teaching
                  artifact for me first.
                </p>
              </>
            ),
          },
          {
            id: "roadmap",
            label: "Roadmap",
            body: (
              <ul>
                <li>Replace the bump heap with a real allocator</li>
                <li>Persist the in-memory filesystem to a virtual disk</li>
                <li>Userspace processes and a basic syscall layer</li>
                <li>Better framebuffer rendering: fonts, basic graphics primitives</li>
                <li>Networking stack experiments</li>
                <li>A long-form OS boot-flow visualizer on this site</li>
              </ul>
            ),
          },
        ]}
      />
    </div>
  )
}
