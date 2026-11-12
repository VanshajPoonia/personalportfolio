import type React from "react"
import type { Metadata, Viewport } from "next"
import { Archivo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { motionArmScript } from "@/lib/motion"
import { person, positioning, siteUrl } from "@/lib/data/site"
import "./globals.css"

/*
 * One family for everything. The width axis does the work a second face used
 * to: condensed for engraved legends and readouts, normal for reading, wide for
 * the nameplate.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

/*
 * Design direction, kept in the shipped markup so it can be audited against
 * the render. See PRODUCT.md and DESIGN.md.
 */
const directionContract = `<!--
THESIS: The site is a calibrated instrument. Each project is a channel with a lamp, a reading and a calibration date. It refuses the dark terminal portfolio with glow, grid and bento cards.
OWN-WORLD: Bead-blasted aluminium plate in four greys and one amber pilot lamp. Archivo only, engraved condensed legends, hairline seams. No shadow, blur, glow or gradient. Selection by inversion.
STORY: A maintainer or hiring manager turns the selector, reads the real state of each project, then emails, opens GitHub, takes the résumé or reads a case study.
FIRST VIEWPORT: Left, the name as a wide nameplate, one sentence and three push keys with Email lit in amber. Right, a detented rotary selector beside an inverted display window showing that channel's project, lamp and calibration date.
FORM: Instrument Panel, candidate 4 of 7, seed 52b928aa. Signature: the detented selector. Motion: detent snap, lamp warm-up, a power-on self-test sweep, traces drawn in once.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name}, ${person.title}`,
    template: `%s | ${person.name}`,
  },
  description: positioning.metaDescription,
  applicationName: person.name,
  keywords: [
    "Full stack developer",
    "AI developer",
    "Next.js",
    "TypeScript",
    "Rust",
    "Operating systems",
    "Machine learning",
    "Open source",
  ],
  authors: [{ name: person.name, url: person.github }],
  creator: person.name,
  publisher: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${person.name}, ${person.title}`,
    description: positioning.metaDescription,
    siteName: person.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${person.name}, ${person.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name}, ${person.title}`,
    description: positioning.metaDescription,
    creator: person.xHandle,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  // The plate. The finish is a class, not the system scheme, so one value.
  themeColor: "#e5e7ea",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={archivo.variable}>
      <body className="font-sans antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: directionContract }} />
        <script dangerouslySetInnerHTML={{ __html: motionArmScript }} />
        {/*
          Light is the designed default: the site is mostly read at a desk in
          daylight, between reviews. The switch in the header gives the black
          anodised version, which is designed too, not inverted.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="theme-mode"
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
