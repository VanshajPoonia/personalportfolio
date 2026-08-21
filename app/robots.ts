import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/data/site"

/**
 * Generated rather than served from a static file. A `public/robots.txt` would
 * take precedence over this route, so it was removed: the old one still
 * pointed its sitemap at a domain that has nothing to do with this site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
