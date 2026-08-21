import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { person, positioning, siteUrl } from "@/lib/data/site"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} — ${person.title}`,
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
    title: `${person.name} — ${person.title}`,
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
    title: `${person.name} — ${person.title}`,
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {/*
          defaultTheme is "system" so a first-time visitor gets the theme their
          OS asked for. Setting it to "dark" would override system preference
          until the visitor found the toggle.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
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
