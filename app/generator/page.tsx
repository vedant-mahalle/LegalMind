import { Navigation } from "@/components/navigation"
import { LegalNoticeGenerator } from "@/components/legal-notice-generator"

export default function GeneratorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-montserrat font-black text-4xl sm:text-5xl text-foreground mb-4">
              AI Legal Notice Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Describe your situation and let our AI generate a professional legal notice tailored to your needs.
            </p>
          </div>
          <LegalNoticeGenerator />
        </div>
      </div>
    </main>
  )
}
