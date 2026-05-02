import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudy } from "@/components/shared/case-study"
import { getProjectBySlug } from "@/lib/data/projects"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Zenquanta AI — case study",
  description:
    "A premium multi-assistant AI workspace with assistant families, tier-aware model routing, prompt precheck, memory, and admin systems.",
  alternates: { canonical: `${baseUrl}/projects/zenquanta-ai` },
}

export default function ZenquantaCaseStudy() {
  const project = getProjectBySlug("zenquanta-ai")
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
              <p>
                Zenquanta AI is a premium multi-assistant workspace built with Next.js, TypeScript, Tailwind CSS,
                shadcn/ui, Supabase, and OpenRouter. Six assistant families share a workspace shell, model routing,
                memory, and a real plan ladder — closer to a desk than a chat box.
              </p>
            ),
          },
          {
            id: "product-idea",
            label: "Product idea",
            body: (
              <p>
                Most AI products collapse into a single chat input. That is a UX dead end. Zenquanta organizes
                assistants into families with their own surfaces, while sharing project context, memory, and a single
                billing layer underneath.
              </p>
            ),
          },
          {
            id: "assistant-families",
            label: "Assistant families",
            body: (
              <ul>
                <li>
                  <strong>Nova</strong> — general-purpose conversation
                </li>
                <li>
                  <strong>Velora</strong> — long-form writing and structure
                </li>
                <li>
                  <strong>Axiom</strong> — analytical and reasoning-heavy work
                </li>
                <li>
                  <strong>Forge</strong> — coding and developer workflows
                </li>
                <li>
                  <strong>Pulse</strong> — quick, low-latency responses
                </li>
                <li>
                  <strong>Prism</strong> — image generation and visual flows
                </li>
              </ul>
            ),
          },
          {
            id: "model-routing",
            label: "Model routing",
            body: (
              <p>
                Tier-aware routing picks the cheapest acceptable model per request, given the user&apos;s plan, the
                assistant family, and the intent of the message. Provider adapters sit behind a single interface so the
                UI never knows which model is running.
              </p>
            ),
          },
          {
            id: "prompt-precheck",
            label: "Prompt precheck",
            body: (
              <p>
                Before a request hits a model, prompt precheck inspects intent and recommends an assistant if the user
                landed in the wrong family. It also flags requests that should be routed to image generation instead of
                text and vice versa.
              </p>
            ),
          },
          {
            id: "text-vs-image",
            label: "Text vs image generation",
            body: (
              <p>
                Text and image flows are separate pipelines with their own routing, cost accounting, and surface. They
                share session context and memory but never silently swap with each other — Prism owns the image
                surface explicitly.
              </p>
            ),
          },
          {
            id: "memory-usage",
            label: "Memory and usage tracking",
            body: (
              <p>
                Conversation memory is scoped per assistant family but visible across the workspace. Usage tracking is
                split into two layers: raw / admin cost (what providers actually charged) and displayed user-facing
                usage (what the plan shows). Keeping these separate is what makes a real billing system possible.
              </p>
            ),
          },
          {
            id: "plan-ladder",
            label: "Plan ladder",
            body: (
              <p>
                Plans are explicit: tier defines model access, monthly usage, image quotas, and which assistants are
                available. Manual plan requests route through admin activation, so paid plans never quietly auto-grant.
              </p>
            ),
          },
          {
            id: "admin-product",
            label: "Admin / product systems",
            body: (
              <ul>
                <li>Admin dashboard for plan activation and abuse handling</li>
                <li>User dashboards with per-assistant usage breakdown</li>
                <li>Public assistant pages for discovery</li>
                <li>Working notes shown during streaming so the user sees thought, not just output</li>
              </ul>
            ),
          },
          {
            id: "hard-parts",
            label: "Hard parts",
            body: (
              <ul>
                <li>Keeping raw provider cost and displayed user usage from drifting apart</li>
                <li>Streaming-aware fallback when a provider goes down mid-response</li>
                <li>Handling memory across multiple assistant families without leaking context</li>
                <li>
                  Designing a plan ladder that is honest about what is included without burying the user in tier
                  matrices
                </li>
              </ul>
            ),
          },
          {
            id: "future",
            label: "Future roadmap",
            body: (
              <ul>
                <li>Long-running agents that keep state across sessions</li>
                <li>Background tasks queued from any assistant</li>
                <li>Team workspaces with shared memory and shared usage</li>
                <li>Self-serve plan changes with proration</li>
                <li>Open assistant SDK for community-built families</li>
              </ul>
            ),
          },
        ]}
      />
    </div>
  )
}
