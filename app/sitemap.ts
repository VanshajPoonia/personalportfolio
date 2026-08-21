import type { MetadataRoute } from "next"
import { blueprints } from "@/lib/data/blueprints"
import { getCaseStudyProjects } from "@/lib/data/projects"
import { workbenchPosts } from "@/lib/data/workbench"
import { siteUrl } from "@/lib/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = ([
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/open-source`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${siteUrl}/experience`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/workbench`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/archive`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/research`, changeFrequency: "yearly", priority: 0.3 },
  ] as const).map((entry) => ({ ...entry, lastModified: now }))

  const caseStudies: MetadataRoute.Sitemap = getCaseStudyProjects().map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  const notes: MetadataRoute.Sitemap = workbenchPosts.map((post) => ({
    url: `${siteUrl}/workbench/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }))

  const designStudies: MetadataRoute.Sitemap = blueprints.map((blueprint) => ({
    url: `${siteUrl}/workbench/incubator/${blueprint.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.35,
  }))

  return [...staticRoutes, ...caseStudies, ...notes, ...designStudies]
}
