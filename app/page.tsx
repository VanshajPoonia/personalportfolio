import { SiteShell } from "@/components/site-shell"
import { ContactCTA } from "@/components/footer"
import { Hero } from "@/components/home/hero"
import { EngineeringSpectrum } from "@/components/home/engineering-spectrum"
import {
  ExperiencePreview,
  OpenSourcePreview,
  ResearchPreview,
  SelectedWork,
  WorkbenchPreview,
} from "@/components/home/home-sections"
import {
  generatePersonStructuredData,
  generateWebsiteStructuredData,
  jsonLd,
} from "@/lib/structured-data"

export default function Home() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(generateWebsiteStructuredData())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(generatePersonStructuredData())} />

      <Hero />
      <SelectedWork />
      <EngineeringSpectrum />
      <ExperiencePreview />
      <OpenSourcePreview />
      <WorkbenchPreview />
      <ResearchPreview />
      <ContactCTA />
    </SiteShell>
  )
}
