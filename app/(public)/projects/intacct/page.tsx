import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudy } from "@/components/shared/case-study"
import { getProjectBySlug } from "@/lib/data/projects"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export const metadata: Metadata = {
  title: "Intacct — case study",
  description:
    "A Next.js + Supabase enterprise finance platform with role-based workspaces, dense accountant-friendly UX, and a service-layer architecture.",
  alternates: { canonical: `${baseUrl}/projects/intacct` },
}

export default function IntacctCaseStudy() {
  const project = getProjectBySlug("intacct")
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
                Intacct is a Next.js + Supabase enterprise finance platform with role-based workspaces, dense
                accountant-friendly UX, and a service-layer architecture. It covers AP, AR, GL, cash, reporting, admin,
                and a shared platform shell — built for people who live inside the product, not visit it.
              </p>
            ),
          },
          {
            id: "problem",
            label: "Problem",
            body: (
              <p>
                Finance teams juggle multiple workspaces, fragile exports, and tooling that was never designed for the
                way they actually work. Most internal finance UIs optimize for first impressions instead of the
                tenth thousand interaction. Accountants do not want playful — they want dense, predictable, fast.
              </p>
            ),
          },
          {
            id: "product-idea",
            label: "Product idea",
            body: (
              <p>
                One workspace shell with role-aware modules sitting on a shared service layer. Saved views, audit logs,
                and notifications are first-class primitives, not bolted on. Every module looks the same from the
                outside and behaves consistently from the inside.
              </p>
            ),
          },
          {
            id: "architecture",
            label: "Architecture",
            body: (
              <ul>
                <li>
                  <strong>App shell</strong> — Next.js App Router, shared chrome, role-aware navigation, persisted shell
                  preferences per user.
                </li>
                <li>
                  <strong>Service layer</strong> — typed services per module that own data fetching, mutations, and
                  audit metadata.
                </li>
                <li>
                  <strong>Supabase</strong> — Postgres + auth + RLS; runtime datasets pulled live for views and
                  reporting.
                </li>
                <li>
                  <strong>RBAC</strong> — org/user/role model; policies enforced at both the route and the action level.
                </li>
                <li>
                  <strong>Cross-cutting services</strong> — saved views, notifications, audit logs, report metadata
                  persistence.
                </li>
              </ul>
            ),
          },
          {
            id: "workspace-model",
            label: "Workspace model",
            body: (
              <ul>
                <li>
                  <strong>AP</strong> — accounts payable surfaces and approvals
                </li>
                <li>
                  <strong>AR</strong> — accounts receivable, including receivables APIs
                </li>
                <li>
                  <strong>GL</strong> — general ledger
                </li>
                <li>
                  <strong>Cash</strong> — cash management and reconciliation
                </li>
                <li>
                  <strong>Reporting</strong> — saved report metadata, runtime datasets
                </li>
                <li>
                  <strong>Admin</strong> — users, roles, org management
                </li>
                <li>
                  <strong>Platform</strong> — shared shell, search, settings, audit log
                </li>
              </ul>
            ),
          },
          {
            id: "data-service-layer",
            label: "Data / service layer",
            body: (
              <p>
                Every module exposes a typed service that returns DTOs the UI can rely on. Mutations carry audit
                metadata down through the same path as the data fetch, so logs and notifications are emitted
                consistently regardless of which screen triggered them.
              </p>
            ),
          },
          {
            id: "supabase-features",
            label: "Supabase-backed features",
            body: (
              <ul>
                <li>Organization / username / password login flows</li>
                <li>Admin users UI for managing org membership and roles</li>
                <li>Saved views with per-user persistence</li>
                <li>Shell preference persistence (layout, density, defaults)</li>
                <li>Report metadata persistence</li>
                <li>Notification summary APIs</li>
                <li>Audit log APIs</li>
                <li>Receivables APIs and Supabase-backed runtime datasets</li>
              </ul>
            ),
          },
          {
            id: "enterprise-ux",
            label: "Enterprise UX decisions",
            body: (
              <ul>
                <li>Density over whitespace — finance lives in tables</li>
                <li>Keyboard-first navigation across every workspace</li>
                <li>Saved views as a first-class primitive, not a hidden setting</li>
                <li>Audit and notification surface always reachable from the shell</li>
                <li>No surprises in destructive actions — every mutation is logged</li>
              </ul>
            ),
          },
          {
            id: "live-vs-cutover",
            label: "What is live vs still in cutover",
            body: (
              <p>
                Honest status: the shell, RBAC, saved views, audit logs, notifications, admin users UI, receivables
                APIs, and report metadata are live. Some module surfaces are still being moved into the shared service
                layer in later cutover batches. The next batches focus on cross-module reporting and bulk import.
              </p>
            ),
          },
          {
            id: "future",
            label: "Future improvements",
            body: (
              <ul>
                <li>Cross-module reporting and saved cross-views</li>
                <li>Approval workflows surfaced through the notification layer</li>
                <li>Bulk import and reconciliation flows</li>
                <li>External integrations behind a thin API gateway</li>
                <li>Accessibility audit pass across dense table surfaces</li>
              </ul>
            ),
          },
        ]}
      />
    </div>
  )
}
