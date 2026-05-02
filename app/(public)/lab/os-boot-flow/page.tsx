import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "OS Boot Flow — visualizer",
  description:
    "A visual, step-based explainer for how Chronosapien boots from QEMU to a working shell.",
  alternates: { canonical: `${baseUrl}/lab/os-boot-flow` },
}

const steps = [
  {
    id: "qemu",
    label: "QEMU emulates an x86_64 machine",
    body: "QEMU pretends to be a real CPU with memory, disks, and devices. It loads our bootable image and gives us a virtual machine to boot into.",
  },
  {
    id: "bootloader-prep",
    label: "Bootloader prepares machine state",
    body: "The bootloader (we use the bootloader crate) sets the CPU into long mode, configures paging, and prepares everything the kernel needs to start running real Rust.",
  },
  {
    id: "bootloader-handoff",
    label: "Bootloader passes framebuffer and memory map",
    body: "The bootloader hands the kernel two crucial things: a pointer to the framebuffer (so we can draw to the screen) and a memory map (so we know what RAM is safe to use).",
  },
  {
    id: "kernel-entry",
    label: "Rust kernel entrypoint starts",
    body: "Execution jumps into our Rust no_std entrypoint. From this moment on, every line we write is the operating system.",
  },
  {
    id: "serial",
    label: "Serial logging initializes",
    body: "We bring up the serial port first so we can debug everything that comes after. If something explodes later, serial is how we find out why.",
  },
  {
    id: "framebuffer",
    label: "Framebuffer console initializes",
    body: "We start writing pixels — glyph by glyph — into the framebuffer. The screen now shows text. This is the first time the OS feels real.",
  },
  {
    id: "gdt-idt",
    label: "GDT and IDT load",
    body: "We tell the CPU about our segment table and our interrupt descriptor table. The CPU now knows what to do when something goes wrong (or when an interrupt fires).",
  },
  {
    id: "timer",
    label: "Timer starts",
    body: "The PIT (programmable interval timer) is configured and starts ticking. We can now measure time and schedule the next things.",
  },
  {
    id: "keyboard",
    label: "Keyboard input starts",
    body: "We enable the PS/2 keyboard IRQ. Keystrokes now arrive as interrupts and get translated into characters.",
  },
  {
    id: "shell",
    label: "Shell loop begins",
    body: "The shell starts polling for input and dispatching commands. The OS is now interactive — you can type, list files, run apps, and switch eras.",
  },
]

export default function OsBootFlowPage() {
  return (
    <div className="pt-24">
      <PageShell
        eyebrow="Lab · Visualizer"
        title="OS boot flow, in plain English"
        intro={
          <p>
            How <Link href="/projects/chronosapien" className="text-primary hover:text-foreground transition-colors">Chronosapien</Link>{" "}
            goes from a frozen QEMU window to a blinking cursor on a working shell — one step at a time.
          </p>
        }
        toolbar={
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> back to lab
          </Link>
        }
      >
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className="group relative flex gap-5 rounded-xl border border-border/60 bg-card/40 p-5 sm:p-6 glass transition-all duration-300 hover-lift hover:border-primary/40 hover:bg-card/70"
            >
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 font-mono text-sm text-primary">
                  {String(index + 1).padStart(2, "0")}
                </div>
                {index < steps.length - 1 && (
                  <div className="mt-2 flex-1 w-px bg-gradient-to-b from-primary/40 to-transparent" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-mono text-sm uppercase tracking-widest text-foreground">{step.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-xl border border-border/60 bg-card/40 p-6 glass">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">After boot</p>
          <p className="text-sm text-muted-foreground">
            Once the shell is running you can use commands like <code className="rounded border border-border/60 bg-secondary/40 px-1 py-0.5 font-mono text-xs">ls</code>,{" "}
            <code className="rounded border border-border/60 bg-secondary/40 px-1 py-0.5 font-mono text-xs">notes</code>,{" "}
            <code className="rounded border border-border/60 bg-secondary/40 px-1 py-0.5 font-mono text-xs">calc</code>, and{" "}
            <code className="rounded border border-border/60 bg-secondary/40 px-1 py-0.5 font-mono text-xs">sysinfo</code>.
            <Link href="/projects/chronosapien" className="ml-1 text-primary hover:text-foreground transition-colors inline-flex items-center gap-1">
              Read the case study <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </PageShell>
    </div>
  )
}
