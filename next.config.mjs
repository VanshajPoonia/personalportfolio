/**
 * Redirects cover every public route the V2 site had. Each old URL either
 * lands on the page that now owns its content or on the closest surviving
 * destination. Nothing 404s that used to resolve, and no rule targets a path
 * that is itself redirected, so there are no loops.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // Projects became Work. Case-study slugs are unchanged, so the catch-all
      // carries them across; it is listed after the index rule so /projects
      // itself is not swallowed by it.
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },

      // Timeline was a generic developer journey. The professional half is now
      // Experience; the learning half is in the Archive.
      { source: "/timeline", destination: "/experience", permanent: true },

      // The standalone Now page is a section of About.
      { source: "/now", destination: "/about#now", permanent: true },

      // Learning maps and the graveyard both described earlier work.
      { source: "/learning", destination: "/archive", permanent: true },
      { source: "/workbench/graveyard", destination: "/archive", permanent: true },

      // Blueprints were designs for unbuilt systems: now the Workbench
      // incubator, with slugs preserved.
      { source: "/blueprints", destination: "/workbench#incubator", permanent: true },
      { source: "/blueprints/:slug", destination: "/workbench/incubator/:slug", permanent: true },

      // Artifacts never had a downloadable file behind it; every entry was a
      // placeholder. Its content belongs with the projects and notes it
      // described.
      { source: "/artifacts", destination: "/workbench", permanent: true },

      // The global roadmap is gone. Per-project status lives on the work page.
      { source: "/roadmap", destination: "/work", permanent: true },

      // The Lab is folded into Workbench; its OS explainer is now a section of
      // the ChronoOS case study.
      { source: "/lab", destination: "/workbench", permanent: true },
      { source: "/lab/os-boot-flow", destination: "/work/chronosapien#boot-flow", permanent: true },

      // The blog held template filler rather than authored writing. Workbench
      // is where the real notes are.
      { source: "/blog", destination: "/workbench", permanent: true },
      { source: "/blog/:slug", destination: "/workbench", permanent: true },

      // Introduction was an About page under another name.
      { source: "/introduction", destination: "/about", permanent: true },
    ]
  },
}

export default nextConfig
