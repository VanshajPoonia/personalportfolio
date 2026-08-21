import { person, positioning, siteUrl } from "@/lib/data/site"

/**
 * JSON-LD generators. Kept deliberately small: enough for a search engine to
 * resolve who this is and what each page is, without stuffing `knowsAbout`
 * with every technology on the site.
 */

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: siteUrl,
    jobTitle: person.title,
    address: { "@type": "PostalAddress", addressLocality: "Jodhpur", addressRegion: "Rajasthan", addressCountry: "IN" },
    // `affiliation` rather than `alumniOf`: the degree is in progress, not conferred.
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Technology Jodhpur",
      url: "https://iitj.ac.in",
    },
    sameAs: [person.github, person.linkedin, person.x],
    knowsAbout: ["Full-stack web development", "AI systems", "Systems programming", "Machine learning"],
  }
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: person.name,
    url: siteUrl,
    description: positioning.metaDescription,
    author: { "@type": "Person", name: person.name, url: siteUrl },
  }
}

export function generateProjectStructuredData(project: {
  title: string
  summary: string
  slug: string
  technologies: string[]
  github?: string
  deploymentUrl?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/work/${project.slug}`,
    codeRepository: project.github,
    programmingLanguage: project.technologies,
    author: { "@type": "Person", name: person.name, url: siteUrl },
    ...(project.deploymentUrl ? { targetProduct: { "@type": "WebApplication", url: project.deploymentUrl } } : {}),
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Renders a JSON-LD block. The data is generated in this file from typed
 * content, never from user input, but `<` is still escaped so a stray `</script>`
 * in future copy cannot break out of the tag.
 */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") }
}
