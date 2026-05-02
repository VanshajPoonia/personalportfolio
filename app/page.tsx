import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"
import { HeroSection } from "@/components/home/hero-section"
import { CurrentFocusStrip } from "@/components/home/current-focus"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { ExploreTheLab } from "@/components/home/explore-the-lab"
import { LatestFromWorkbench } from "@/components/home/latest-from-workbench"
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/lib/structured-data"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vanshajpoonia.com'

export const metadata: Metadata = {
  title: "Vanshaj Poonia — A living developer lab",
  description:
    "Not a portfolio. A living developer lab. Systems experiments, AI workspaces, enterprise tools, creative dev utilities, research notes, and technical artifacts in public.",
  openGraph: {
    title: "Vanshaj Poonia — A living developer lab",
    description: "Systems, AI, enterprise tools, creative experiments, and research — built in public.",
    url: `${baseUrl}/`,
  },
  other: {
    "script:ld+json:website": JSON.stringify(generateWebsiteStructuredData(baseUrl)),
    "script:ld+json:person": JSON.stringify(generatePersonStructuredData()),
  },
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <CurrentFocusStrip />
        <FeaturedProjects />
        <ExploreTheLab />
        <LatestFromWorkbench />
        <Footer />
      </div>
    </main>
  )
}
