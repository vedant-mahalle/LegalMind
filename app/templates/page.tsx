import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TemplateLibrary } from "@/components/template-library"

export default function TemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-slate-900 mb-4">Template Library</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Choose from professionally crafted legal notice templates. Each template includes proper legal
                formatting and guidance for customization.
              </p>
            </div>
            <TemplateLibrary />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
