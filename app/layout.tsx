import type React from "react"
import type { Metadata } from "next"
import { Public_Sans } from "next/font/google"
import { Source_Serif_4 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Legal Notice Generator - Government Grade Document Creation",
  description:
    "Draft legally formatted notices in minutes. Guided steps, clear language, export-ready documents. Professional legal notice generation tool.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${publicSans.variable} ${sourceSerif.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
