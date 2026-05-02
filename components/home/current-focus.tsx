import { currentFocus } from "@/lib/data/site"

export function CurrentFocusStrip() {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-border/60 bg-card/40 glass p-6 sm:p-8 hover-lift animate-fade-in-up">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Current focus
              </p>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                What the lab is pointed at right now
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
              {currentFocus.map((focus) => (
                <span
                  key={focus}
                  className="rounded-md border border-border/60 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
