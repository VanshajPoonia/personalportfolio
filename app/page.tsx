import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProjectsGrid } from "@/components/projects-grid"
import { LabNotes } from "@/components/lab-notes"
import { Workbench } from "@/components/workbench"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/lib/structured-data"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vanshajpoonia.com'

export const metadata: Metadata = {
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
        <ProjectsGrid />
        <LabNotes />
        <Workbench />
        <Footer />
      </div>
    </main>
  )
}
