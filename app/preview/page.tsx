import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PreviewExportSystem } from "@/components/preview-export-system"

export default function PreviewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-slate-900 mb-4">Preview & Export</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Review your legal notice in a professional format and export as PDF, DOCX, or print directly.
              </p>
            </div>
            <PreviewExportSystem />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
