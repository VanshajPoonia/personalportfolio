import type { BlogPost } from './blog-data'

export function generateBlogPostStructuredData(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${url}/og-images/${post.slug}.png`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: 'https://github.com/VanshajPoonia',
    },
    publisher: {
      '@type': 'Person',
      name: 'Vanshaj Poonia',
      url: 'https://vanshajpoonia.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    timeRequired: post.readTime,
  }
}

export function generateWebsiteStructuredData(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vanshaj Poonia',
    description: "Building in public, exploring different technologies. Experiments, prototypes, and open-source projects by Vanshaj Poonia.",
    url: url,
    author: {
      '@type': 'Person',
      name: 'Vanshaj Poonia',
      url: 'https://github.com/VanshajPoonia',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vanshaj Poonia',
    url: 'https://vanshajpoonia.com',
    image: 'https://vanshajpoonia.com/developer-portrait.png',
    sameAs: [
      'https://github.com/VanshajPoonia',
      'https://twitter.com/PooniaVanshaj',
      'https://www.linkedin.com/in/vanshajpoonia/',
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Vanshaj Poonia',
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
