"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surfaced in the browser console and the platform logs; the digest is the
    // only thing that connects what the visitor saw to the server-side trace.
    console.error("Unhandled error", error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md">
        <p className="label text-muted-foreground">
          <span aria-hidden="true" className="text-primary">
            /
          </span>{" "}
          Error
        </p>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">Something broke on this page.</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Not your fault. Reloading usually fixes it; if it does not, the rest of the site is unaffected.
        </p>

        {error.digest && (
          <p className="mt-5 rounded-lg border border-border/70 bg-secondary/20 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
            digest: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm">
          <button
            type="button"
            onClick={reset}
            className="min-h-[44px] rounded-lg bg-primary px-5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
