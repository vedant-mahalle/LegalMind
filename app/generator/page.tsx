import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LegalNoticeWizard } from "@/components/legal-notice-wizard"

export default function GeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-slate-900 mb-4">Legal Notice Generator</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Follow the guided steps to create a professionally formatted legal notice. Your progress is
                automatically saved.
              </p>
            </div>
            <LegalNoticeWizard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
