import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { Container } from "@/components/layout/section"
import { getWorkbenchPostBySlug, workbenchPosts } from "@/lib/data/workbench"
import { pageMetadata } from "@/lib/data/site"

export function generateStaticParams() {
  return workbenchPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getWorkbenchPostBySlug(slug)
  if (!post) return {}

  return pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/workbench/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  })
}

function NoteSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="label mb-3.5 text-primary">{title}</h2>
      <div className="leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

function NoteList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-border" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function WorkbenchNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getWorkbenchPostBySlug(slug)
  if (!post) notFound()

  return (
    <SiteShell>
      <article>
        <div className="border-b border-border">
          <Container width="prose">
            <div className="pb-10 pt-10 sm:pt-14">
              <Link
                href="/workbench"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                Back to workbench
              </Link>

              <p className="label mt-8 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>{post.status}</span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>{post.readTime}</span>
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{post.summary}</p>
            </div>
          </Container>
        </div>

        <Container width="prose">
          <div className="space-y-10 py-12">
            <p className="text-lg leading-relaxed text-pretty">{post.intro}</p>

            <NoteSection title="What I was trying to do">
              <p>{post.goal}</p>
            </NoteSection>

            <NoteSection title="What I learned">
              <NoteList items={post.learnings} />
            </NoteSection>

            <NoteSection title="Technical notes">
              <NoteList items={post.technicalNotes} />
            </NoteSection>

            <NoteSection title="Open questions">
              <NoteList items={post.openQuestions} />
            </NoteSection>

            <NoteSection title="Next steps">
              <NoteList items={post.nextSteps} />
            </NoteSection>

            <div className="grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <p className="label mb-3 text-muted-foreground">Tags</p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-muted-foreground">
                  {post.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              {post.relatedLinks && post.relatedLinks.length > 0 && (
                <div>
                  <p className="label mb-3 text-muted-foreground">Related</p>
                  <ul className="space-y-2">
                    {post.relatedLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </article>

      <ContactCTA />
    </SiteShell>
  )
}
