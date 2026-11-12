/**
 * Open-source contributions to codebases I did not write.
 *
 * Every entry below is a pull request I authored. Forks are not contributions
 * and do not appear here. Statuses were re-checked against the GitHub API on
 * `contributionsLastVerified`; if a status has since changed, the label is the
 * thing that is out of date, not the work.
 */

export const contributionsLastVerified = "2026-08-23"

export type ContributionStatus = "merged" | "open"

export interface Contribution {
  id: string
  project: string
  repo: string
  repoUrl: string
  title: string
  /** problem -> change -> effect, in two sentences at most. */
  summary: string
  number: number
  url: string
  status: ContributionStatus
  date: string
  tags: string[]
  /** Diff size, for readers who want to know whether this was a typo fix. */
  diff: { additions: number; deletions: number; files: number }
}

/**
 * Merged work, strongest first. Ordering is by how much diagnosis the change
 * needed, not by line count.
 */
export const mergedContributions: Contribution[] = [
  {
    id: "pictopy-1392",
    project: "PictoPy",
    repo: "AOSSIE-Org/PictoPy",
    repoUrl: "https://github.com/AOSSIE-Org/PictoPy",
    title: "Remove stale face clusters after folder deletion",
    summary:
      "Deleted folders left their face-clusters visible in the gallery, and clustering never started on a first tagging pass. Four independent causes behind one report: a bootstrap gap in the incremental clustering branch, a missing HAVING filter that kept empty clusters queryable, a return-shape bug that made recluster raise before it could clear them, and a React Query cache tag that never invalidated.",
    number: 1392,
    url: "https://github.com/AOSSIE-Org/PictoPy/pull/1392",
    status: "merged",
    date: "2026-07-29",
    tags: ["Python", "SQL", "React Query", "Debugging"],
    diff: { additions: 392, deletions: 2, files: 5 },
  },
  {
    id: "pictopy-1374",
    project: "PictoPy",
    repo: "AOSSIE-Org/PictoPy",
    repoUrl: "https://github.com/AOSSIE-Org/PictoPy",
    title: "Accessibility and controls-visibility for the video player",
    summary:
      "The player's progress bar was invisible to assistive technology and its controls hid themselves while paused. Exposed the seek bar as a real slider with keyboard seeking, gave every control a state-aware label, and made hidden controls non-interactive rather than merely transparent.",
    number: 1374,
    url: "https://github.com/AOSSIE-Org/PictoPy/pull/1374",
    status: "merged",
    date: "2026-07-19",
    tags: ["TypeScript", "React", "Accessibility", "Testing"],
    diff: { additions: 290, deletions: 36, files: 3 },
  },
  {
    id: "pictopy-1442",
    project: "PictoPy",
    repo: "AOSSIE-Org/PictoPy",
    repoUrl: "https://github.com/AOSSIE-Org/PictoPy",
    title: "Run lint checks without releasing the gated CI jobs",
    summary:
      "Fork pull requests need maintainer approval, and that approval is all-or-nothing, so a 44-second lint job could never run without also releasing the expensive build jobs. Moved lint to its own pull_request_target workflow, hardened with empty permissions, no secrets, an explicit head checkout without credentials, and an install that runs no scripts.",
    number: 1442,
    url: "https://github.com/AOSSIE-Org/PictoPy/pull/1442",
    status: "merged",
    date: "2026-08-02",
    tags: ["CI", "GitHub Actions", "Supply-chain safety"],
    diff: { additions: 62, deletions: 37, files: 3 },
  },
  {
    id: "pictopy-1295",
    project: "PictoPy",
    repo: "AOSSIE-Org/PictoPy",
    repoUrl: "https://github.com/AOSSIE-Org/PictoPy",
    title: "Fix zoom behaviour that only broke in production builds",
    summary:
      "Scroll-to-zoom fell back to the library default in production because the custom wheel listener depended on an internal wrapper that was not always mounted on the first effect run. Attached the listener to a container the component owns instead, so zoom anchors to the cursor only on axes that actually overflow.",
    number: 1295,
    url: "https://github.com/AOSSIE-Org/PictoPy/pull/1295",
    status: "merged",
    date: "2026-06-08",
    tags: ["TypeScript", "React", "Production debugging"],
    diff: { additions: 2309, deletions: 499, files: 12 },
  },
  {
    id: "pictopy-1289",
    project: "PictoPy",
    repo: "AOSSIE-Org/PictoPy",
    repoUrl: "https://github.com/AOSSIE-Org/PictoPy",
    title: "Auto-close inactive merge-conflicted pull requests",
    summary:
      "Maintainers were manually chasing pull requests that had gone stale behind merge conflicts. Added a workflow that closes them once they have been conflicted and untouched long enough to be abandoned.",
    number: 1289,
    url: "https://github.com/AOSSIE-Org/PictoPy/pull/1289",
    status: "merged",
    date: "2026-05-28",
    tags: ["CI", "Maintainer tooling"],
    diff: { additions: 58, deletions: 0, files: 1 },
  },
]

/** Open pull requests. Labelled open, never counted as accepted work. */
export const openContributions: Contribution[] = [
  {
    id: "pictopy-1349",
    project: "PictoPy",
    repo: "AOSSIE-Org/PictoPy",
    repoUrl: "https://github.com/AOSSIE-Org/PictoPy",
    title: "Run global reclustering as a background job",
    summary:
      "The frontend aborted every request after ten seconds, so reclustering a large library failed in the UI while the backend kept running to completion. Moved reclustering to a polled background job that refuses to start a second pass while one is running, and gave the slow search endpoints their own timeout.",
    number: 1349,
    url: "https://github.com/AOSSIE-Org/PictoPy/pull/1349",
    status: "open",
    date: "2026-06-28",
    tags: ["Python", "React", "Background jobs"],
    diff: { additions: 888, deletions: 88, files: 14 },
  },
  {
    id: "googletest-4989",
    project: "GoogleTest",
    repo: "google/googletest",
    repoUrl: "https://github.com/google/googletest",
    title: "Flags to suppress individual startup notes",
    summary:
      "GoogleTest prints filter, shard, and shuffle notes at startup with no way to silence them individually, which makes long filter strings drown the output. Added three independent boolean flags, each defaulting to the current behaviour.",
    number: 4989,
    url: "https://github.com/google/googletest/pull/4989",
    status: "open",
    date: "2026-06-01",
    tags: ["C++", "Testing"],
    diff: { additions: 246, deletions: 9, files: 11 },
  },
  {
    id: "openwisp-632",
    project: "OpenWISP",
    repo: "openwisp/ansible-openwisp2",
    repoUrl: "https://github.com/openwisp/ansible-openwisp2",
    title: "Keep the Django log owned by the web server user",
    summary:
      "The cron jobs ran from root's crontab, so when the Django log rotated the new file belonged to root, and every process running as www-data then failed at startup. Moved the jobs to the application user, created the log ahead of time with the right owner, and added regression tests for both.",
    number: 632,
    url: "https://github.com/openwisp/ansible-openwisp2/pull/632",
    status: "open",
    date: "2026-07-01",
    tags: ["Ansible", "Linux permissions", "Provisioning"],
    diff: { additions: 99, deletions: 0, files: 3 },
  },
  {
    id: "rocketchat-41121",
    project: "Rocket.Chat",
    repo: "RocketChat/Rocket.Chat",
    repoUrl: "https://github.com/RocketChat/Rocket.Chat",
    title: "Fix DeepL attachment translation returning 403",
    summary:
      "Attachment translation authenticated with DeepL's deprecated auth_key query parameter, which the API had stopped accepting. Switched it to the header-and-POST method the rest of the integration already used.",
    number: 41121,
    url: "https://github.com/RocketChat/Rocket.Chat/pull/41121",
    status: "open",
    date: "2026-06-30",
    tags: ["TypeScript", "API integration"],
    diff: { additions: 9, deletions: 1, files: 2 },
  },
]

/** My own public repositories. Separate from contributing to other people's. */
export const personalOpenSource = [
  {
    name: "ChronoOS",
    repo: "VanshajPoonia/chronosapien",
    url: "https://github.com/VanshajPoonia/chronosapien",
    description: "A Rust no_std x86_64 hobby operating system, documented down to which claims are runtime-verified.",
    language: "Rust",
    caseStudy: "/work/chronosapien",
  },
  {
    name: "TensorTrail",
    repo: "VanshajPoonia/TensorTrail",
    url: "https://github.com/VanshajPoonia/TensorTrail",
    description: "A NumPy-backed neural network framework with a readable autograd engine and 137 tests.",
    language: "Python",
    caseStudy: "/work/tensortrail",
  },
  {
    name: "ASCII Camera",
    repo: "VanshajPoonia/asciicamera",
    url: "https://github.com/VanshajPoonia/asciicamera",
    description: "A real-time webcam-to-ASCII renderer, MIT licensed with contribution guidelines.",
    language: "TypeScript",
  },
]

export const allContributions = [...mergedContributions, ...openContributions]

export const contributionCounts = {
  merged: mergedContributions.length,
  open: openContributions.length,
  projects: new Set(allContributions.map((c) => c.repo)).size,
}
