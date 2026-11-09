export type WorkbenchNoteStatus =
  | "Build Log"
  | "Debugging"
  | "Architecture Note"
  | "Technical Note"
  | "Research Note"
  | "Product Note"
  | "Reflection"

export interface WorkbenchNote {
  slug: string
  title: string
  summary: string
  date: string
  tags: string[]
  relatedProject?: string
  status: WorkbenchNoteStatus
  readTime: string
  intro: string
  goal: string
  learnings: string[]
  technicalNotes: string[]
  openQuestions: string[]
  nextSteps: string[]
  relatedLinks?: { label: string; href: string }[]
}

export const workbenchPosts: WorkbenchNote[] = [
  {
    slug: "why-i-am-building-a-tiny-os",
    title: "Why I'm Building a Tiny OS in Rust",
    summary:
      "Why building a small OS is a good way to understand bootloaders, memory, interrupts, and how software starts running.",
    date: "2026-04-12",
    tags: ["Rust", "OSDev", "ChronoOS", "Bootloaders"],
    relatedProject: "ChronoOS",
    status: "Build Log",
    readTime: "6 min read",
    intro:
      "ChronoOS is not an attempt to build the next Linux. It is a learning system: a small, inspectable OS that forces me to touch the layers most application code hides.",
    goal:
      "I wanted to understand how software starts running before there is a browser, framework, filesystem, or friendly runtime. The point is to meet the machine closer to the beginning.",
    learnings: [
      "A hobby OS turns abstract systems concepts into concrete problems quickly.",
      "Bootloaders, target configuration, serial output, and framebuffer setup all become part of the product surface.",
      "Rust's no_std environment is a useful constraint because it removes assumptions from normal application development.",
      "Blank screens are not failure by themselves. They are feedback that the observability path is not good enough yet.",
    ],
    technicalNotes: [
      "The early stack is bootloader -> kernel entry -> serial logger -> framebuffer console -> interrupts -> keyboard -> shell.",
      "Serial logs are the first reliable UI because graphics can fail before a single pixel appears.",
      "Framebuffer output makes the OS feel visual, but text requires glyph rendering or a console abstraction.",
      "A tiny shell is useful even before there is a real filesystem because it creates a place to test commands and state.",
    ],
    openQuestions: [
      "How much memory management should be built before the shell becomes more capable?",
      "What is the cleanest way to teach interrupts without hiding too much detail?",
      "Should the OS stay educational or evolve into a more playful retro computing environment?",
    ],
    nextSteps: [
      "Keep serial logging boring and reliable.",
      "Make framebuffer text easier to debug.",
      "Add more shell commands that expose kernel state.",
      "Document each boot milestone as a short field note.",
    ],
    relatedLinks: [
      { label: "ChronoOS case study", href: "/work/chronosapien" },
      { label: "Framebuffer notes", href: "/workbench/framebuffer-rendering-notes" },
    ],
  },
  {
    slug: "qemu-debugging-notes",
    title: "QEMU Debugging Notes",
    summary:
      "A field note on why QEMU makes OS dev approachable, why serial logs matter, and why a blank screen can have many causes.",
    date: "2026-04-02",
    tags: ["QEMU", "Debugging", "OSDev", "Serial Logs"],
    relatedProject: "ChronoOS",
    status: "Debugging",
    readTime: "5 min read",
    intro:
      "QEMU makes OS development approachable because it gives fast iteration without rebooting real hardware. It also makes it easy to fool yourself when there is no output.",
    goal:
      "I was trying to separate boot image issues, target configuration problems, framebuffer failures, and kernel panics that all looked like the same blank screen.",
    learnings: [
      "A blank screen does not point to one specific bug.",
      "Serial logs are critical because graphics initialization can fail silently.",
      "QEMU flags, boot image layout, panic behavior, and target setup all affect the first visible signal.",
      "The fastest debugging path is to create a known-good minimal output path before adding visual complexity.",
    ],
    technicalNotes: [
      "Start with serial output before relying on framebuffer rendering.",
      "Confirm the boot image is being loaded before debugging kernel code.",
      "Treat panic handlers as part of the debugging interface.",
      "Keep QEMU launch commands reproducible so configuration does not become hidden state.",
    ],
    openQuestions: [
      "Which QEMU flags should become the default development profile?",
      "How much debug output belongs in normal boot logs?",
      "Should debug output be separated into levels this early?",
    ],
    nextSteps: [
      "Create a minimal smoke test for serial output.",
      "Document the QEMU command used for each milestone.",
      "Add clearer panic output before expanding keyboard or shell features.",
    ],
    relatedLinks: [
      { label: "ChronoOS case study", href: "/work/chronosapien" },
      { label: "Tiny OS note", href: "/workbench/why-i-am-building-a-tiny-os" },
    ],
  },
  {
    slug: "framebuffer-rendering-notes",
    title: "Framebuffer Rendering Notes",
    summary:
      "Notes on why writing pixels directly to framebuffer memory makes OS development feel visual for the first time.",
    date: "2026-03-18",
    tags: ["Framebuffer", "Graphics", "OSDev", "Rendering"],
    relatedProject: "ChronoOS",
    status: "Technical Note",
    readTime: "5 min read",
    intro:
      "The framebuffer is memory that represents pixels. Once the kernel can write to it, the OS stops feeling like invisible boot code and starts feeling like a machine you can draw on.",
    goal:
      "I wanted to understand how early graphics output works before there is a window system, font stack, canvas API, or terminal emulator.",
    learnings: [
      "Framebuffer rendering is direct and humbling: bytes become color if every offset is right.",
      "Text output is not free. It requires bitmap fonts, glyph rendering, or a console abstraction.",
      "Visual output makes debugging easier only after the pixel path itself is reliable.",
      "Scanline math and pixel formats matter more than expected.",
    ],
    technicalNotes: [
      "A framebuffer write is usually an offset calculation from x, y, stride, and bytes per pixel.",
      "Clearing the screen is just filling a memory range, but the range must match the frame buffer info.",
      "Rendering text means mapping characters to glyph bitmaps and drawing pixels for each glyph cell.",
      "A console abstraction can wrap cursor position, line wrapping, clearing, and color choices.",
    ],
    openQuestions: [
      "Should ChronoOS keep a simple bitmap font or introduce richer text rendering later?",
      "How should the console handle scrolling without becoming too complex?",
      "Can framebuffer routines be tested outside QEMU?",
    ],
    nextSteps: [
      "Keep the framebuffer API small.",
      "Add a basic console abstraction.",
      "Document pixel format assumptions.",
      "Add visual smoke tests for colors, rectangles, and text.",
    ],
    relatedLinks: [
      { label: "ChronoOS case study", href: "/work/chronosapien" },
      { label: "QEMU notes", href: "/workbench/qemu-debugging-notes" },
    ],
  },
  {
    slug: "enterprise-finance-ui-notes",
    title: "Building an Enterprise Finance UI Like a Real Product",
    summary:
      "Dense UI is not automatically bad. Finance tools need speed, filters, drilldowns, saved views, exports, and auditability.",
    date: "2026-02-26",
    tags: ["Intacct", "Enterprise UX", "Finance", "RBAC"],
    relatedProject: "Intacct",
    status: "Architecture Note",
    readTime: "7 min read",
    intro:
      "Enterprise finance software has a different definition of good UX. The best interface is often dense, predictable, auditable, and fast for someone who uses it every day.",
    goal:
      "I was trying to make Intacct feel like a serious finance workspace instead of a decorative dashboard.",
    learnings: [
      "Dense UI is not automatically bad when users need comparison, repetition, and speed.",
      "Finance tools need filters, saved views, exports, audit logs, and drilldowns more than marketing-style polish.",
      "Role-based workspaces make the product feel smaller for each user without reducing platform scope.",
      "Tables become product surfaces, not just data displays.",
    ],
    technicalNotes: [
      "AP, AR, GL, Cash, Reporting, Admin, Notifications, and Audit should share table and filter primitives.",
      "Saved views need durable metadata, not local-only UI state.",
      "Exports should be permissioned and audited.",
      "Drilldowns should preserve context so users can return to filtered lists without losing state.",
    ],
    openQuestions: [
      "How much configurability should be available before it overwhelms the UI?",
      "What is the right line between module-specific behavior and shared table infrastructure?",
      "How should audit log visibility vary by role?",
    ],
    nextSteps: [
      "Keep moving hardcoded UI data into service-layer calls.",
      "Standardize saved view metadata.",
      "Add module-specific empty, loading, and error states.",
      "Tie exports and drilldowns into audit logs.",
    ],
    relatedLinks: [
      { label: "Intacct", href: "/work#intacct" },
      { label: "Enterprise finance design study", href: "/workbench/incubator/enterprise-finance-workspace" },
    ],
  },
  {
    slug: "early-projects-learning-path",
    title: "Turning Old Clone Projects Into a Timeline of Growth",
    summary:
      "Clone projects are not the destination, but they honestly show the path from layouts and APIs to real systems work.",
    date: "2026-01-22",
    tags: ["Earlier Work", "Reflection", "Learning Builds"],
    relatedProject: "Moogle, Mewtube, Discord Clone, Amazon Prime Clone, Shopeee",
    status: "Reflection",
    readTime: "5 min read",
    intro:
      "Old clone projects should not be framed as flagship work. They are better as a visible learning timeline.",
    goal:
      "I wanted the site to keep early builds honest: not overclaimed, not hidden, and not competing with newer systems, AI, and enterprise work.",
    learnings: [
      "Clone projects are not the destination.",
      "They show learning progression if they are grouped and labeled clearly.",
      "They taught routing, layout, APIs, Firebase, deployment, and state management.",
      "Current work makes more sense when the earlier steps are visible.",
    ],
    technicalNotes: [
      "Moogle belongs under earlier search/API/UI learning.",
      "Mewtube belongs under React, Redux, Firebase, and external API practice.",
      "Discord Clone and Amazon Prime Clone belong under layout, data fetching, and product UI replication.",
      "Shopeee belongs under ecommerce/hackathon learning rather than flagship product work.",
    ],
    openQuestions: [
      "Which older projects still deserve live links?",
      "Should each earlier project have a short lesson attached?",
      "How much archive detail is useful before it distracts from active work?",
    ],
    nextSteps: [
      "Keep older projects in Earlier Work / Learning Builds or Archive.",
      "Add lessons learned to timeline entries.",
      "Avoid letting clone projects dominate homepage or featured sections.",
    ],
    relatedLinks: [
      { label: "Archive", href: "/archive" },
      { label: "Experience", href: "/experience" },
      { label: "Work", href: "/work" },
    ],
  },
  {
    slug: "intacct-service-layer-notes",
    title: "Intacct Service Layer Notes",
    summary:
      "Why service layers help avoid hardcoded UI data and keep enterprise finance modules consistent.",
    date: "2026-02-18",
    tags: ["Intacct", "Service Layer", "Enterprise", "Architecture"],
    relatedProject: "Intacct",
    status: "Architecture Note",
    readTime: "6 min read",
    intro:
      "A finance workspace becomes fragile when every page owns its own fake data, filtering logic, and business behavior. A service layer gives modules a shared contract.",
    goal:
      "I wanted to separate UI components from business logic so modules like AP, AR, GL, Cash, Reporting, and Admin could share patterns without becoming one giant component.",
    learnings: [
      "Service layers help avoid hardcoded UI data.",
      "UI components should render state and actions, not invent finance behavior.",
      "AP, AR, GL, Cash, Reporting, and Admin can share repository, table, filter, saved-view, and audit patterns.",
      "Metadata persistence matters for saved views, notifications, and preferences.",
    ],
    technicalNotes: [
      "A service method should own validation, permission checks, persistence, and audit side effects.",
      "Saved views should store filters, visible columns, sorting, grouping, and module identity.",
      "Audit logs should record actor, organization, action, entity, diff, and timestamp.",
      "Notifications should be created by domain events instead of sprinkled through UI code.",
    ],
    openQuestions: [
      "How generic should the module repository layer become?",
      "Should audit logging be explicit in services or automatic through middleware?",
      "How should saved view schema evolve as modules diverge?",
    ],
    nextSteps: [
      "Define a service contract per module.",
      "Move remaining hardcoded datasets behind service calls.",
      "Add saved view persistence across modules.",
      "Tie important service actions to audit logs.",
    ],
    relatedLinks: [
      { label: "Intacct", href: "/work#intacct" },
      { label: "Enterprise finance design study", href: "/workbench/incubator/enterprise-finance-workspace" },
    ],
  },
]

export function getWorkbenchPostBySlug(slug: string): WorkbenchNote | undefined {
  return workbenchPosts.find((post) => post.slug === slug)
}
