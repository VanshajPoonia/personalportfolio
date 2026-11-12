import type { ReactNode } from "react"
import { ExternalLink } from "@/components/ui/external-link"

/**
 * Case-study content, one entry per project with `caseStudy: true`.
 *
 * Rules this file is written under:
 * - Nothing described as built unless it is in the repository today.
 * - Planned work lives in `whatsNext`, never in "What I built".
 * - Testing numbers are ones I have run, not ones a README claims.
 */

export interface CaseStudySection {
  id: string
  label: string
  body: ReactNode
}

export interface CaseStudy {
  /** One paragraph under the hero. Sets up the rest. */
  overview: string
  sections: CaseStudySection[]
  /** Slugs of thematically related projects, not a random sample. */
  related: string[]
}

/** Small helper so section bodies stay readable in this file. */
function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

/** Live and source links for one of several small apps inside a single case study. */
function AppLinks({ name, slug }: { name: string; slug: string }) {
  return (
    <span className="ml-1 inline-flex flex-wrap gap-x-4 font-mono text-xs">
      <ExternalLink href={`https://vanshajpoonia.github.io/${slug}/`} label={`Open ${name}`} className="text-primary">
        Open
      </ExternalLink>
      <ExternalLink
        href={`https://github.com/VanshajPoonia/${slug}`}
        label={`${name} source on GitHub`}
        className="text-muted-foreground"
      >
        Source
      </ExternalLink>
    </span>
  )
}

function Terminal({ title, lines }: { title: string; lines: string[] }) {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-lg border border-border/70 bg-secondary/30">
      <figcaption className="flex items-center gap-2 border-b border-border/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span aria-hidden="true" className="text-primary">
          $
        </span>
        {title}
      </figcaption>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed text-muted-foreground">
        <code>{lines.join("\n")}</code>
      </pre>
    </figure>
  )
}

export const caseStudies: Record<string, CaseStudy> = {
  chronosapien: {
    overview:
      "ChronoOS is a hobby operating system in Rust. It boots a no_std x86_64 kernel under QEMU, brings up its own framebuffer console, and drops you into a shell. I started it because I had spent years building on top of abstractions I could not describe, and the fastest way to fix that was to write the layer underneath one of them.",
    related: ["tensortrail", "volt"],
    sections: [
      {
        id: "motivation",
        label: "Why",
        body: (
          <>
            <P>
              Most of my work sits several layers above the machine. A request arrives, a framework routes it,
              a runtime schedules it, a kernel actually does it. I could describe the first two layers precisely
              and the last one only in outline, which is an uncomfortable thing to notice about your own stack.
            </P>
            <P>
              ChronoOS is the correction. It is not trying to be Linux and it is not going to run your servers.
              It is a small, readable teaching OS where every layer between power-on and a blinking cursor is
              something I had to write and can therefore explain.
            </P>
          </>
        ),
      },
      {
        id: "boot-flow",
        label: "Boot flow",
        body: (
          <>
            <P>
              The path from a frozen QEMU window to an interactive prompt runs through ten steps, and each one
              can fail in a way that looks identical from the outside: a black screen.
            </P>
            <List
              items={[
                <>
                  <strong>QEMU</strong> emulates an x86_64 machine and loads the bootable image.
                </>,
                <>
                  <strong>The bootloader</strong> puts the CPU into long mode and sets up paging.
                </>,
                <>
                  <strong>Handoff</strong> passes the kernel two things it cannot work without: a framebuffer
                  pointer and a memory map.
                </>,
                <>
                  <strong>Kernel entry</strong> jumps into the Rust <code>no_std</code> entrypoint. Everything
                  after this line is the operating system.
                </>,
                <>
                  <strong>Serial</strong> comes up first, deliberately, because it is the only output path that
                  works when graphics do not.
                </>,
                <>
                  <strong>Framebuffer console</strong> starts writing glyphs, pixel by pixel. This is the first
                  moment the thing looks like an OS.
                </>,
                <>
                  <strong>GDT and IDT</strong> load, so the CPU knows what to do on a fault or an interrupt.
                </>,
                <>
                  <strong>The PIT</strong> starts ticking, which is where time begins.
                </>,
                <>
                  <strong>Keyboard IRQs</strong> are enabled and scancodes start becoming characters.
                </>,
                <>
                  <strong>The shell loop</strong> begins polling and dispatching. The OS is now interactive.
                </>,
              ]}
            />
            <P>
              Bringing serial up before anything visual is the single decision that made the rest tractable.
              A blank screen is not a failure signal, it is the absence of one, and the fix is always to make
              the machine talk to you earlier than the thing you are debugging.
            </P>
          </>
        ),
      },
      {
        id: "what-i-built",
        label: "What is in the kernel",
        body: (
          <>
            <P>
              The kernel is around thirty modules. The ones that carry the most weight:
            </P>
            <List
              items={[
                <>
                  <strong>Memory</strong> - memory-map helpers and a free-list heap, so allocation is something
                  the OS does rather than something it inherits.
                </>,
                <>
                  <strong>Interrupts</strong> - GDT, IDT, PIC, and PIT wiring, with CPU exception handlers that
                  print something useful instead of triple-faulting.
                </>,
                <>
                  <strong>ChronoFS</strong> - the largest single module, with an ATA PIO backend,{" "}
                  <code>fsck</code>, a repair path, and a small journal.
                </>,
                <>
                  <strong>Shell</strong> - by far the biggest file in the repository, because it doubles as the
                  product surface: categorised help, onboarding, era themes, museum pages, quests, and status
                  screens.
                </>,
                <>
                  <strong>Apps</strong> - a static registry with notes, calc, and sysinfo, running against a
                  defined app boundary rather than reaching into the kernel.
                </>,
                <>
                  <strong>Teaching paths</strong> - a cooperative scheduler, Ring 3 demos, syscalls, static ELF
                  loading, early SMP, and a static IPv4 ARP/UDP stack.
                </>,
              ]}
            />
          </>
        ),
      },
      {
        id: "verification",
        label: "Implemented is not verified",
        body: (
          <>
            <P>
              The most useful thing I did on this project was not a feature. It was splitting every claim into
              two columns: <em>implemented in code</em> and <em>verified at runtime</em>. The repository carries
              a verification matrix that records, per system, what level of evidence exists and what is still
              missing.
            </P>
            <P>
              That split is unflattering by design. Single-core BIOS boot reaching{" "}
              <code>[CHRONO] boot complete</code> is verified, with serial logs and framebuffer screendumps.
              Typed input in QEMU, including Backspace and Shift, is verified. An unattended harness types 52 shell
              commands over the serial port and checks each one&apos;s output, including a full ChronoFS session
              on a throwaway disk: write, copy, search, delete, and a clean <code>fs check</code>. RTL8139
              initialisation and its MAC address have evidence.
            </P>
            <P>
              ChronoFS writes surviving a reboot, general userspace, ARP and UDP behaviour, most of the mouse
              and window paths, UEFI, the custom BIOS handoff, and application-processor startup are written but
              not yet proven at runtime. TCP, DHCP, DNS, USB, a dynamic linker, a package manager, and a real preemptive
              scheduler are design-only.
            </P>
            <P>
              It would be easy to write &quot;networking&quot; on a feature list. It is more useful, and more
              honest, to write &quot;an RTL8139 driver that initialises and reports its MAC, with ARP and UDP
              code that has not been observed working.&quot;
            </P>
          </>
        ),
      },
      {
        id: "hard-problems",
        label: "Hard problems",
        body: (
          <List
            items={[
              <>
                <strong>Observability before features.</strong> Every early bug presented as a black screen.
                The fix was always to move the debugging surface earlier in the boot, not to stare harder at
                the code that came later.
              </>,
              <>
                <strong>Text without a text renderer.</strong> A framebuffer gives you pixels. Getting readable
                characters means glyph rendering and a console abstraction before you can print your first
                error message.
              </>,
              <>
                <strong>A kernel bug I blamed on the emulator.</strong> From June to October typed commands
                came out with doubled letters, as in <code>woorrkssppaacee</code>, and I logged it as a QEMU
                quirk. It was
                the keyboard interrupt handler reading port <code>0x60</code> without checking the status port
                first. When the polling path had already taken the byte, QEMU handed back the same one again.
              </>,
              <>
                <strong>SMP is where confidence goes to die.</strong> Two-core smoke testing reached the
                bootstrap processor and no further. It is marked partially implemented and risky, because that
                is what it is.
              </>,
              <>
                <strong>Keeping the docs from drifting.</strong> A teaching OS whose documentation overstates
                it is worse than no teaching OS. Several commits in this repository do nothing but re-audit the
                status tables against the source.
              </>,
            ]}
          />
        ),
      },
      {
        id: "whats-next",
        label: "Current state and what is next",
        body: (
          <>
            <P>
              v0.3 is about verification rather than new features. The next step is running the serial smoke
              harness on every kernel change, and growing it to cover the remaining read-only commands and a
              reboot step that proves ChronoFS writes persist.
            </P>
            <P>
              After that, the order is window and input lifecycle, filesystem repair and recovery, userspace,
              and only then UEFI, SMP, networking, and real hardware.
            </P>
          </>
        ),
      },
    ],
  },

  "project-management-atlas": {
    overview:
      "ATLAS is a project and marketing workspace running in production for one organisation. It has boards, tasks, subtasks, custom fields, saved views, goals and milestones, a marketing content calendar, teams, and an AI assistant that can read the user's actual work. The engineering interest is not the board; it is what happens when you give an assistant database access without giving it a way around the permission model.",
    related: ["intacct", "tensortrail"],
    sections: [
      {
        id: "problem",
        label: "The problem",
        body: (
          <>
            <P>
              A project tool is easy to build badly. Boards and cards are a solved interface, and the second you
              add an AI assistant to one, the assistant becomes the most interesting and most dangerous part of
              the product: it needs to read across projects, boards, tasks, calendars, and personal items to be
              useful at all.
            </P>
            <P>
              The obvious implementation is to give the AI tooling a service-role database connection so it can
              answer anything. That also means every private board in the workspace is one prompt away from
              being readable, and the permission model you spent weeks on now applies to the UI only.
            </P>
          </>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        body: (
          <>
            <P>
              Every data path in the application, including the assistant&apos;s tools, goes through the Supabase
              session client, so Postgres row-level security applies to the AI exactly as it applies to the
              person typing. There is no privileged read path for convenience. When the assistant cannot see a
              private board, it is because the database refused, not because a prompt asked it not to look.
            </P>
            <P>
              Above that sits a capability layer: a single module that answers &quot;can this user do this
              thing&quot; for the whole product, so role checks are one decision rather than dozens of
              scattered conditionals. Board membership, team scopes, and managed task statuses all resolve
              through it.
            </P>
            <P>
              Schema changes are hand-written numbered SQL migrations rather than a generated diff, applied
              through a migration runner with a status command, and guarded by a database guard script that
              refuses to point development at production.
            </P>
          </>
        ),
      },
      {
        id: "ai",
        label: "The assistant",
        body: (
          <>
            <P>
              The assistant runs in two modes. Workspace mode reads the user&apos;s real tasks, boards, personal
              items, and marketing calendar through the tools described above. Ask-anything mode reaches
              outward instead, with Tavily-backed web search and a URL fetcher.
            </P>
            <P>
              Fetching URLs on a user&apos;s behalf is a server-side request forgery primitive if you implement it
              naively, so the fetcher validates its targets rather than trusting the string it was handed.
              Both modes are rate-limited separately, because a web search and a workspace query do not cost
              the same thing.
            </P>
            <P>
              Input is multimodal: images, PDFs, audio, video, and YouTube links, routed to a model that can
              actually handle the modality rather than a single default.
            </P>
          </>
        ),
      },
      {
        id: "shell",
        label: "The application shell",
        body: (
          <>
            <P>
              The product surfaces share one shell: sidebar, breadcrumbs, command palette, and mobile
              navigation, with commands registered per permission so the palette never offers an action the
              user cannot perform.
            </P>
            <P>
              Some smaller decisions that mattered more than they sound: undo-capable toasts on the two
              destructive deletes that were previously silent, restoring the original row identifier rather
              than inserting a copy; unsaved-change protection on the create dialog; and a per-user density
              setting, because the people living in this tool all day and the people opening it once a week
              want different information density.
            </P>
          </>
        ),
      },
      {
        id: "testing",
        label: "Testing and verification",
        body: (
          <>
            <P>
              Authorisation is the part of this product where a regression is invisible until it is a breach,
              so it is checked from two directions. Unit tests under Vitest cover the capability decisions and
              row-level-security write helpers. Alongside those sit standalone check scripts that run against a
              real database and assert behaviour rather than intent.
            </P>
            <Terminal
              title="pnpm run | authorisation and data checks"
              lines={[
                "check:access-matrix     who can read what, as a matrix",
                "check:isolation         cross-tenant isolation",
                "check:board-roles       board-scoped role enforcement",
                "check:grants            grant resolution",
                "check:deprovision       access removal on offboarding",
                "check:deactivation      deactivated-account behaviour",
                "check:task-lifecycle    task state transitions",
                "check:marketing-*       calendar access, channels, recurrence",
              ]}
            />
            <P>
              Automated accessibility checks with axe run against the shell, and there are dedicated passes at
              200% and 320% zoom. Those found four real defects that manual review had missed.
            </P>
          </>
        ),
      },
      {
        id: "tradeoffs",
        label: "Tradeoffs",
        body: (
          <List
            items={[
              <>
                <strong>Single organisation, permanently.</strong> This is not a multi-tenant SaaS and the
                roadmap does not pretend otherwise. Teams, roles, guests, and module activation all exist, but
                scoped within one organisation. That decision removed an entire class of work.
              </>,
              <>
                <strong>Build, do not fork.</strong> Adopting an existing open-source project engine would have
                meant running two backends and inheriting network copyleft. The existing stack already had
                auth, row-level security, and the AI layer, so the open-source tools became reference designs
                for data models rather than a foundation.
              </>,
              <>
                <strong>No privileged AI read path.</strong> Slower to build, and it means the assistant
                sometimes has to say it cannot see something. That is the correct answer.
              </>,
            ]}
          />
        ),
      },
      {
        id: "state",
        label: "Current state",
        body: (
          <>
            <P>
              In active development and deployed behind sign-in for one organisation, which is why there is no
              public link on this page and no product screenshots: the data in it belongs to a business, not to
              a portfolio.
            </P>
            <P>
              The source is public. Between August and September the first three roadmap phases reached
              production: a custom-fields engine with twelve field types validated in the database, four
              layouts rendered from one saved-view model, and goals kept separate from the work they measure.
              Milestones, an optional agile mode, and an inbox followed. Before the last modules were switched
              on, a read-only audit of production found all 79 tables under row-level security.
            </P>
            <P>
              Next are a deeper marketing calendar, forms and intake, and automation rules. Those are planned,
              not built.
            </P>
          </>
        ),
      },
    ],
  },

  tensortrail: {
    overview:
      "TensorTrail is a neural network framework written on top of NumPy: a reverse-mode autograd engine, layers, losses, optimisers, a trainer, serialisation, and a gradient checker. It exists because I could use PyTorch fluently and could not have told you, precisely, what happens when you call backward().",
    related: ["chronosapien", "project-management-atlas"],
    sections: [
      {
        id: "problem",
        label: "Why build one",
        body: (
          <>
            <P>
              There is a difference between knowing that gradients flow backwards through a graph and being
              able to write the code that makes them. The first is a sentence. The second requires deciding how
              a tensor remembers where it came from, how a broadcast is undone on the way back, and what a
              topological order means when the graph is built at runtime.
            </P>
            <P>
              TensorTrail is small enough to read end to end and complete enough to train MLPs and small
              convolutional networks. It is not competing with PyTorch. It is the version of PyTorch you can
              hold in your head.
            </P>
          </>
        ),
      },
      {
        id: "autograd",
        label: "The autograd engine",
        body: (
          <>
            <P>
              The core is a NumPy-backed <code>Tensor</code> that records the operation that produced it. Every
              operation appends a node to a dynamic graph, and the backward pass walks that graph in
              topological order, accumulating gradients as it goes.
            </P>
            <P>
              Broadcasting is where the subtlety lives. NumPy will happily expand a{" "}
              <code>(1, n)</code> tensor against an <code>(m, n)</code> one on the forward pass, which means the
              backward pass has to sum the gradient back down to the original shape. Getting that wrong
              produces a model that trains, slowly and incorrectly, which is the worst possible failure mode
              because nothing crashes.
            </P>
            <P>
              Graphs can be exported to Graphviz DOT, which turns &quot;why is this gradient zero&quot; from a
              print-statement exercise into a picture.
            </P>
          </>
        ),
      },
      {
        id: "what-i-built",
        label: "What is in it",
        body: (
          <List
            items={[
              <>
                <strong>Layers</strong> - Linear, Conv2D, pooling, normalisation, dropout, and activations,
                composable through <code>Sequential</code>.
              </>,
              <>
                <strong>Losses</strong> - mean squared error, binary cross entropy, BCE with logits for
                numerical stability, and multi-class cross entropy.
              </>,
              <>
                <strong>Optimisers</strong> - SGD, SGD with momentum, and Adam, with global gradient clipping
                and epoch-level StepLR and ExponentialLR schedules.
              </>,
              <>
                <strong>Data</strong> - offline synthetic datasets and a mini-batch DataLoader with{" "}
                <code>drop_last</code>.
              </>,
              <>
                <strong>Trainer</strong> - validation, metrics, early stopping, named checkpoints, and{" "}
                <code>.npz</code> save and load.
              </>,
              <>
                <strong>Gradient checker</strong> - centred finite differences, which is the only thing that
                will tell you your backward pass is wrong before your loss curve does.
              </>,
            ]}
          />
        ),
      },
      {
        id: "testing",
        label: "Testing",
        body: (
          <>
            <P>
              An autograd engine with a subtle bug still trains. That makes tests less optional here than
              almost anywhere else, and the suite is correspondingly large for the size of the codebase:
              thirteen test modules covering the tensor, operations, autograd, modules, losses, metrics,
              optimisers, data loading, the CNN path, serialisation, graph export, the trainer, and the
              gradient checker itself.
            </P>
            <Terminal
              title="python -m pytest -q"
              lines={[
                "........................................................................ [ 52%]",
                "................................................................. [100%]",
                "",
                "137 passed in 2.13s",
              ]}
            />
            <P>
              That run is from a clean clone of the repository, on 21 August 2026. CI runs the same suite on
              every push through GitHub Actions.
            </P>
          </>
        ),
      },
      {
        id: "learned",
        label: "What it changed",
        body: (
          <P>
            Mostly it changed how I read other people&apos;s machine-learning code. Framework behaviour that
            used to be a black box, gradient accumulation, why in-place operations are dangerous, why the
            stable loss and the naive loss are different functions, is now something I have implemented and
            debugged. It also made me considerably more suspicious of a loss curve that goes down.
          </P>
        ),
      },
    ],
  },

  "open-model-browser-apps": {
    overview:
      "In October 2026 I entered DEV's Hacktoberfest open-source AI challenge every week for four weeks, with two apps a week. Each one runs an open-weight model inside the browser tab, so it is a static page with no server, no API key, and nothing uploaded. Already Filed came out of the same run and has its own entry. These are the other seven.",
    related: ["already-filed", "tensortrail"],
    sections: [
      {
        id: "browser",
        label: "Why the browser",
        body: (
          <>
            <P>
              Running in the tab takes away the usual fix for a weak answer, which is a bigger hosted model.
              The models here are small: Gemma 3 1B, the 300M EmbeddingGemma, bge-small, Whisper base. What is
              left to work on is the code around the model, and a test that says whether a change helped.
            </P>
            <P>
              So six of the seven ship with an <code>npm test</code> that runs the real model on labelled data,
              and the numbers below come from those runs.
            </P>
          </>
        ),
      },
      {
        id: "apps",
        label: "The seven",
        body: (
          <List
            items={[
              <>
                <strong>Lazy Susan.</strong> Photograph a receipt, tap who had what, paste the split. Donut reads
                the receipt, and Florence-2 OCR takes a second look when the lines do not add up to the total. On
                436 receipts it had never seen, the green &quot;adds up&quot; tick was exactly right 93% of the
                time. <AppLinks name="Lazy Susan" slug="lazy-susan" />
              </>,
              <>
                <strong>Fine Print.</strong> Finds the clauses in a freelance contract that cost you money, with
                EmbeddingGemma and 14 small classifiers trained on lawyer-marked contracts. On 102 held-out
                contracts it found 66% of the highlighted clauses with 4.6 false alarms each. Ctrl+F found 49%
                with 10.5. <AppLinks name="Fine Print" slug="fine-print" />
              </>,
              <>
                <strong>Backlist.</strong> Turns a book you wrote into an audiobook on your own laptop. Kokoro
                narrates and Whisper listens back to every line. On books it was never tuned on, it caught 97% of
                296 planted faults with one false alarm in 80 clean lines.{" "}
                <AppLinks name="Backlist" slug="backlist" />
              </>,
              <>
                <strong>Proof of Grass.</strong> A daily outdoor bingo card that only a real photo can fill,
                judged by CLIP on the phone. The shipped judge fills the right square for 99 of 102 outdoor
                photos and for none of 29 indoor ones. <AppLinks name="Proof of Grass" slug="proof-of-grass" />
              </>,
              <>
                <strong>Sidequest.</strong> Turns the OpenStreetMap around you into a short walking quest. Code
                picks the stops and the route, and Gemma 3 1B only writes one small mission per stop. A checker
                that rejects invented names and dates, with a retry and a plain template as the last resort,
                took clean missions from 16 of 24 to 24 of 24. <AppLinks name="Sidequest" slug="sidequest" />
              </>,
              <>
                <strong>SafePlate.</strong> An allergy-aware meal planner that compares what an ingredient means
                instead of how it is spelled, with bge-small in the tab. On its 54-ingredient test set it flags 29
                of 30 real allergens, with one false alarm in 24 safe ones.{" "}
                <AppLinks name="SafePlate" slug="safeplate" />
              </>,
              <>
                <strong>Nani&apos;s Kitchen.</strong> Turns voice memos of spoken recipes into a printable
                recipe book, with Whisper transcribing in the tab. Its tests cover the recipe parser, not the
                transcription, so there is no accuracy number to quote.{" "}
                <AppLinks name="Nani's Kitchen" slug="nanis-kitchen" />
              </>,
            ]}
          />
        ),
      },
      {
        id: "carried-over",
        label: "What carried over",
        body: (
          <List
            items={[
              <>
                <strong>The code around the model moved the numbers.</strong> In Sidequest, better prompts went
                from 8 to 16 clean missions out of 24, and the checker did the rest. In Lazy Susan, checking the
                receipt&apos;s own arithmetic took fully right receipts from 3% to 21% before a second model was
                added.
              </>,
              <>
                <strong>Bigger was not better.</strong> A CLIP model with four times the compute scored 98 of
                102 against the small one&apos;s 99, so the small one ships.
              </>,
              <>
                <strong>Test the trap, not only the result.</strong> Proof of Grass&apos;s second design beat
                the first on outdoor photos. Then photos of rooms and screens went into the test set, and every
                one of them filled a square.
              </>,
              <>
                <strong>Report the bad number too.</strong> Lazy Susan reads receipts worse in Chrome than in
                Node, 23% fully right against 36% on the same 50 receipts, and its README says so.
              </>,
            ]}
          />
        ),
      },
    ],
  },
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug]
}
