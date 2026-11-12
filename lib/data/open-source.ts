/**
 * Open-source contributions to codebases I did not write.
 *
 * Every entry below is a pull request I authored. Forks are not contributions
 * and do not appear here. Statuses were re-checked against the GitHub API on
 * `contributionsLastVerified`; if a status has since changed, the label is the
 * thing that is out of date, not the work.
 *
 * Pull requests that were closed without merging are left out. Everything
 * merged or still open since 2026 is listed. The ones worth a paragraph carry a
 * `writeUp`; the rest show as one line with their diff size.
 */

export const contributionsLastVerified = "2026-11-12"

export type ContributionStatus = "merged" | "open"

export interface UpstreamProject {
  /** Anchor on the open source page. */
  slug: string
  name: string
  /** What the project is, for a reader who has never heard of it. */
  about: string
  /** Every repository I have a pull request in, owner/name. */
  repos: string[]
}

export interface Contribution {
  id: string
  /** Matches `UpstreamProject.name`. */
  project: string
  repo: string
  title: string
  number: number
  url: string
  status: ContributionStatus
  /** Merge date when merged, opening date when open. */
  date: string
  /** Diff size, for readers who want to know whether this was a typo fix. */
  diff: { additions: number; deletions: number; files: number }
  /** problem -> change -> effect, in two sentences at most. */
  writeUp?: { summary: string; tags: string[] }
}

/** Ordered by merged work first, then by the depth of the open work. */
export const upstreamProjects: UpstreamProject[] = [
  {
    slug: "pictopy",
    name: "PictoPy",
    about: "AOSSIE's desktop photo gallery, which tags faces and objects on the device. Tauri, React and a Python backend.",
    repos: ["AOSSIE-Org/PictoPy"],
  },
  {
    slug: "plane",
    name: "Plane",
    about: "An open-source project management tool, used as an alternative to Jira and Linear.",
    repos: ["makeplane/plane"],
  },
  {
    slug: "layer5",
    name: "Layer5",
    about: "The Layer5 community website, in the middle of a move from Gatsby to Hugo.",
    repos: ["layer5io/layer5"],
  },
  {
    slug: "jaeger",
    name: "Jaeger",
    about: "The web UI for Jaeger, the CNCF distributed tracing platform.",
    repos: ["jaegertracing/jaeger-ui"],
  },
  {
    slug: "joplin",
    name: "Joplin",
    about: "The templates plugin for Joplin, the open-source note-taking app.",
    repos: ["joplin/plugin-templates"],
  },
  {
    slug: "rocket-chat",
    name: "Rocket.Chat",
    about: "An open-source team chat platform.",
    repos: ["RocketChat/Rocket.Chat"],
  },
  {
    slug: "openwisp",
    name: "OpenWISP",
    about: "Open-source network management for routers and Wi-Fi: an Ansible role and the Python libraries behind it.",
    repos: ["openwisp/ansible-openwisp2", "openwisp/netjsonconfig", "openwisp/netdiff"],
  },
  {
    slug: "googletest",
    name: "GoogleTest",
    about: "Google's C++ testing framework.",
    repos: ["google/googletest"],
  },
  {
    slug: "zulip",
    name: "Zulip",
    about: "The Flutter mobile app for Zulip, the open-source team chat.",
    repos: ["zulip/zulip-flutter"],
  },
]

function pr(
  project: string,
  repo: string,
  number: number,
  status: ContributionStatus,
  date: string,
  title: string,
  diff: [additions: number, deletions: number, files: number],
  writeUp?: Contribution["writeUp"],
): Contribution {
  return {
    id: `${repo.split("/")[1].toLowerCase()}-${number}`,
    project,
    repo,
    title,
    number,
    url: `https://github.com/${repo}/pull/${number}`,
    status,
    date,
    diff: { additions: diff[0], deletions: diff[1], files: diff[2] },
    writeUp,
  }
}

/**
 * Since 2026. Within a project, written-up pull requests come first, merged
 * before open and ordered by how much diagnosis the change needed rather than
 * by line count. One-line entries follow, merged first, then newest first.
 */
export const contributions: Contribution[] = [
  // PictoPy
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1392, "merged", "2026-07-29", "Remove stale face clusters after folder deletion", [392, 2, 5], {
    summary:
      "Deleted folders left their face clusters visible in the gallery, and clustering never started on a first tagging pass. Four independent causes behind one report: a bootstrap gap in the incremental clustering branch, a missing HAVING filter that kept empty clusters queryable, a return-shape bug that made recluster raise before it could clear them, and a React Query cache tag that never invalidated.",
    tags: ["Python", "SQL", "React Query", "Debugging"],
  }),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1374, "merged", "2026-07-19", "Accessibility and controls-visibility for the video player", [290, 36, 3], {
    summary:
      "The player's progress bar was invisible to assistive technology and its controls hid themselves while paused. Exposed the seek bar as a real slider with keyboard seeking, gave every control a state-aware label, and made hidden controls non-interactive rather than merely transparent.",
    tags: ["TypeScript", "React", "Accessibility", "Testing"],
  }),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1442, "merged", "2026-08-02", "Run lint checks without releasing the gated CI jobs", [62, 37, 3], {
    summary:
      "Fork pull requests need maintainer approval, and that approval is all-or-nothing, so a 44-second lint job could never run without also releasing the expensive build jobs. Moved lint to its own pull_request_target workflow, hardened with empty permissions, no secrets, an explicit head checkout without credentials, and an install that runs no scripts.",
    tags: ["CI", "GitHub Actions", "Supply-chain safety"],
  }),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1295, "merged", "2026-06-08", "Fix zoom behaviour that only broke in production builds", [2309, 499, 12], {
    summary:
      "Scroll-to-zoom fell back to the library default in production because the custom wheel listener depended on an internal wrapper that was not always mounted on the first effect run. Attached the listener to a container the component owns instead, so zoom anchors to the cursor only on axes that actually overflow.",
    tags: ["TypeScript", "React", "Production debugging"],
  }),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1289, "merged", "2026-05-28", "Auto-close inactive merge-conflicted pull requests", [58, 0, 1], {
    summary:
      "Maintainers were manually chasing pull requests that had gone stale behind merge conflicts. Added a workflow that closes them once they have been conflicted and untouched long enough to be abandoned.",
    tags: ["CI", "Maintainer tooling"],
  }),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1349, "open", "2026-06-28", "Run global reclustering as a background job", [888, 88, 14], {
    summary:
      "The frontend aborted every request after ten seconds, so reclustering a large library failed in the UI while the backend kept running to completion. Moved reclustering to a polled background job that refuses to start a second pass while one is running, and gave the slow search endpoints their own timeout.",
    tags: ["Python", "React", "Background jobs"],
  }),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1667, "open", "2026-10-27", "Keep a backend test from writing into the real thumbnails folder", [9, 1, 1]),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1498, "open", "2026-08-19", "Retire TEST_MODE and build on the test database guard", [37, 29, 8]),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1480, "open", "2026-08-09", "Strip filler comments and dead commented-out code across 171 files", [336, 1564, 171]),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1354, "open", "2026-06-30", "Rename a misleadingly named build feature and fail loudly when a release lacks it", [182, 134, 6]),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1353, "open", "2026-06-30", "Remove a SQLite pragma that affected no queries", [79, 5, 2]),
  pr("PictoPy", "AOSSIE-Org/PictoPy", 1266, "merged", "2026-05-14", "Fix Markdown lint errors and add the check to CI", [183, 125, 19]),

  // Plane
  pr("Plane", "makeplane/plane", 10232, "open", "2026-11-09", "Keyboard selection in selects without a search field", [143, 3, 5], {
    summary:
      "Twenty-seven selects, including work item priority, member role and module status, opened with Enter and then ignored every navigation key, because base-ui drives list navigation from a search input these selects do not have. The select now moves focus to the list when there is no search field, with tests that fail before the change.",
    tags: ["TypeScript", "React", "Accessibility", "Testing"],
  }),
  pr("Plane", "makeplane/plane", 10223, "open", "2026-11-08", "Keep the mobile calendar's selected day on screen", [27, 6, 1], {
    summary:
      "On mobile, moving to another month or week kept the old selected day, so the list under the calendar went empty and quick add created work items on the wrong date. The selected day is now derived from the range on screen, including weeks with hidden weekends, and was checked step by step across every navigation control.",
    tags: ["TypeScript", "React", "Mobile"],
  }),
  pr("Plane", "makeplane/plane", 10190, "open", "2026-11-03", "Show the mobile calendar's day list once instead of twice", [2, 28, 1]),

  // Layer5
  pr("Layer5", "layer5io/layer5", 8337, "open", "2026-11-08", "URL inventory and per-collection checks for the Hugo migration", [397, 25, 8], {
    summary:
      "Moving the Layer5 site from Gatsby to Hugo needed a way to tell which live URLs the new site still serves. Built an inventory of all 1,483 URLs from the sitemap, the redirects and the deployed build, and a CI check that reports what is missing per collection, so each collection can become a hard gate once it is migrated.",
    tags: ["JavaScript", "CI", "Hugo", "Site migration"],
  }),

  // Jaeger
  pr("Jaeger", "jaegertracing/jaeger-ui", 4718, "open", "2026-11-03", "Correct screen reader roles for expand toggles", [75, 61, 16], {
    summary:
      "Expand and collapse controls in the trace view used role=\"switch\", so screen readers announced them as on/off switches. Moved them to buttons with aria-expanded, and compared Chrome's accessibility tree before and after.",
    tags: ["TypeScript", "React", "Accessibility"],
  }),

  // Joplin
  pr("Joplin", "joplin/plugin-templates", 181, "open", "2026-10-12", "Fix a regex that lost its whitespace class in a template literal", [30, 2, 2], {
    summary:
      "The pattern that finds special variables was built in a template literal, where \\S collapses to a plain S, so a variable named my_template_title was mistaken for template_title and using the template threw an error. Escaped it, removed the lint suppression that had been hiding the warning, and added a regression test.",
    tags: ["TypeScript", "Regex", "Testing"],
  }),
  pr("Joplin", "joplin/plugin-templates", 182, "open", "2026-10-12", "Quote variable values that contain double quotes, so the YAML parses", [49, 4, 2]),
  pr("Joplin", "joplin/plugin-templates", 185, "open", "2026-10-12", "Keep dollar signs in variable values instead of reading them as replace patterns", [20, 1, 2]),
  pr("Joplin", "joplin/plugin-templates", 183, "open", "2026-10-12", "Fix the to-do alarm examples that failed outside one date format", [3, 3, 1]),

  // Rocket.Chat
  pr("Rocket.Chat", "RocketChat/Rocket.Chat", 41121, "open", "2026-06-30", "Fix DeepL attachment translation returning 403", [9, 1, 2], {
    summary:
      "Attachment translation authenticated with DeepL's deprecated auth_key query parameter, which the API had stopped accepting. Switched it to the header-and-POST method the rest of the integration already used.",
    tags: ["TypeScript", "API integration"],
  }),
  pr("Rocket.Chat", "RocketChat/Rocket.Chat", 41186, "open", "2026-07-05", "Return the permissions table to page one when the filter changes", [47, 26, 4]),
  pr("Rocket.Chat", "RocketChat/Rocket.Chat", 41134, "open", "2026-07-01", "Position overlays correctly inside tables", [30, 15, 3]),

  // OpenWISP
  pr("OpenWISP", "openwisp/ansible-openwisp2", 632, "open", "2026-07-01", "Keep the Django log owned by the web server user", [99, 0, 3], {
    summary:
      "The cron jobs ran from root's crontab, so when the Django log rotated the new file belonged to root, and every process running as www-data then failed at startup. Moved the jobs to the application user, created the log ahead of time with the right owner, and added regression tests for both.",
    tags: ["Ansible", "Linux permissions", "Provisioning"],
  }),
  pr("OpenWISP", "openwisp/netjsonconfig", 434, "open", "2026-11-10", "Test netjsonconfig on Python 3.14 and 3.15 in CI", [3, 1, 1]),
  pr("OpenWISP", "openwisp/netdiff", 187, "open", "2026-11-10", "Test netdiff on Python 3.14 and 3.15 in CI", [3, 1, 1]),

  // GoogleTest
  pr("GoogleTest", "google/googletest", 4989, "open", "2026-06-01", "Flags to suppress individual startup notes", [246, 9, 11], {
    summary:
      "GoogleTest prints filter, shard, and shuffle notes at startup with no way to silence them individually, which makes long filter strings drown the output. Added three independent boolean flags, each defaulting to the current behaviour.",
    tags: ["C++", "Testing"],
  }),

  // Zulip
  pr("Zulip", "zulip/zulip-flutter", 2486, "open", "2026-10-12", "Replace fixed waits in the topic list tests with the real transition length", [9, 6, 1]),
]

/**
 * Where it started: Hacktoberfest 2021 and 2022. Docs, policy and contributing
 * files, all merged. Kept apart from the counts above because none of it is
 * code, and the counts should not borrow from it.
 */
export const earlierContributions: Contribution[] = [
  pr("Android FHIR SDK", "ohs-foundation/android-fhir", 1662, "merged", "2022-11-02", "Move the contributing guide to the repository root and fix its links", [4, 3, 3]),
  pr("Scrapy w3lib", "scrapy/w3lib", 194, "merged", "2022-11-25", "Add a code of conduct", [132, 0, 1]),
  pr("QuestDB", "questdb/questdb", 2629, "merged", "2022-10-25", "Add a security policy", [9, 0, 2]),
  pr("Tailwind CSS", "tailwindlabs/tailwindcss", 7723, "merged", "2022-03-02", "Fix a typo in the contributing guide", [1, 1, 1]),
  pr("Appsmith", "appsmithorg/appsmith", 8921, "merged", "2021-11-12", "Clarify the security policy and the community events page", [5, 5, 2]),
  pr("Symbl.ai", "symblai/Symbl-powered-Agora-RTE-app", 45, "merged", "2021-11-01", "Add a security policy to the Agora video app", [10, 0, 1]),
]

export const mergedContributions = contributions.filter((c) => c.status === "merged")
export const openContributions = contributions.filter((c) => c.status === "open")

/** Most recently merged first. */
export const latestMerged = [...mergedContributions].sort((a, b) => b.date.localeCompare(a.date))[0]

/** Three picks for the homepage: two merged write-ups and the strongest open one. */
export const contributionHighlights = ["pictopy-1392", "pictopy-1374", "plane-10232"].map((id) => {
  const found = contributions.find((c) => c.id === id)
  if (!found) throw new Error(`Unknown contribution highlight: ${id}`)
  return found
})

/** Contributions grouped under their project, in `upstreamProjects` order. */
export const contributionsByProject = upstreamProjects.map((project) => {
  const items = contributions.filter((c) => c.project === project.name)
  return {
    project,
    writeUps: items.filter((c) => c.writeUp),
    // Merged before open, then newest first.
    others: items
      .filter((c) => !c.writeUp)
      .sort((a, b) => (a.status === b.status ? b.date.localeCompare(a.date) : a.status === "merged" ? -1 : 1)),
    merged: items.filter((c) => c.status === "merged").length,
    open: items.filter((c) => c.status === "open").length,
  }
})

{
  const known = new Set(upstreamProjects.map((p) => p.name))
  const stray = contributions.find((c) => !known.has(c.project))
  if (stray) throw new Error(`Contribution ${stray.id} names an unknown project: ${stray.project}`)
}

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

export const contributionCounts = {
  merged: mergedContributions.length,
  open: openContributions.length,
  projects: upstreamProjects.length,
  earlier: earlierContributions.length,
}
