import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { Container } from "@/components/layout/section"

export default function NotFound() {
  return (
    <SiteShell>
      <Container width="prose">
        <div className="flex min-h-[55vh] flex-col justify-center py-20">
          <p className="label text-muted-foreground">
            <span aria-hidden="true" className="text-primary">
              /
            </span>{" "}
            404
          </p>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">This route does not exist.</h1>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            The page may have moved during a redesign, or it may never have existed. Either way, the work is
            still where it should be.
          </p>

          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
            <li>
              <Link href="/work" className="text-primary transition-colors hover:text-foreground">
                Back to work →
              </Link>
            </li>
            <li>
              <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/archive" className="text-muted-foreground transition-colors hover:text-foreground">
                Archive
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </SiteShell>
  )
}
