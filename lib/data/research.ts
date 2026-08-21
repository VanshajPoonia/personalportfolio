/**
 * Research status.
 *
 * There is no active research and nothing published. Rather than dress up
 * drafts and reading notes as a body of work, this page says so. Past research
 * would appear here only if there were a real, public artefact to point at.
 */

export const research = {
  status: "idle" as const,
  statusLabel: "Coming soon",
  headline: "No active research.",
  body: [
    "I am focused on engineering and shipping software. Research work will appear here when there is something worth publishing, with a date on it.",
    "Until then, the closest thing to research on this site is the Workbench: build logs, debugging writeups, and design studies for systems that do not exist yet.",
  ],
  /**
   * Empty by design. Populate only with published, publicly linkable work,
   * keeping the original date and status.
   */
  past: [] as Array<{
    title: string
    year: string
    status: string
    summary: string
    href?: string
  }>,
}
