import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { getWorkbenchPostBySlug, workbenchPosts, type WorkbenchNote } from "@/lib/data/workbench"

interface WorkbenchNotePageProps {
  params: Promise<{ slug: string }>
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanshajpoonia.com"

export function generateStaticParams() {
  return workbenchPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: WorkbenchNotePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getWorkbenchPostBySlug(slug)

  if (!post) {
    return { title: "Workbench Note Not Found" }
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `${baseUrl}/workbench/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${baseUrl}/workbench/${post.slug}`,
    },
  }
}

function NoteSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-border/60 bg-card/40 p-6 glass">
      <h2 className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-primary">{title}</h2>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

function NoteList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function relatedProjectHref(note: WorkbenchNote) {
  if (note.relatedProject === "Chronosapien") return "/projects/chronosapien"
  if (note.relatedProject === "Intacct") return "/projects/intacct"
  if (note.relatedProject === "Zenquanta AI") return "/projects/zenquanta-ai"
  return undefined
}

export default async function WorkbenchNotePage({ params }: WorkbenchNotePageProps) {
  const { slug } = await params
  const post = getWorkbenchPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const projectHref = relatedProjectHref(post)

  return (
    <div className="pt-24">
      <PageShell
        eyebrow={`Workbench · ${post.status}`}
        title={post.title}
        intro={
          <div className="space-y-5">
            <p>{post.summary}</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                {post.status}
              </span>
              <span className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                {post.date}
              </span>
              <span className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                {post.readTime}
              </span>
              {post.relatedProject && (
                <span className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                  {post.relatedProject}
                </span>
              )}
            </div>
          </div>
        }
        toolbar={
          <Link
            href="/workbench"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> back to workbench
          </Link>
        }
      >
        <article className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="space-y-5">
            <NoteSection title="Short intro">
              <p>{post.intro}</p>
            </NoteSection>

            <NoteSection title="What I was trying to do">
              <p>{post.goal}</p>
            </NoteSection>

            <NoteSection title="What I learned">
              <NoteList items={post.learnings} />
            </NoteSection>

            <NoteSection title="Technical notes">
              <NoteList items={post.technicalNotes} />
            </NoteSection>

            <NoteSection title="Problems / open questions">
              <NoteList items={post.openQuestions} />
            </NoteSection>

            <NoteSection title="Next steps">
              <NoteList items={post.nextSteps} />
            </NoteSection>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border/60 bg-card/40 p-5 glass">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/60 bg-secondary/40 px-2 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(post.relatedLinks || projectHref) && (
              <div className="rounded-xl border border-border/60 bg-card/40 p-5 glass">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">Related links</p>
                <div className="space-y-2">
                  {projectHref && post.relatedProject && (
                    <Link
                      href={projectHref}
                      className="group flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      <span>{post.relatedProject}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                  {post.relatedLinks?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </article>
      </PageShell>
    </div>
  )
}
