import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PromptModeGenerator } from "@/components/prompt-mode-generator"

export default function PromptModePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-slate-900 mb-4">Prompt Mode</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Describe your legal notice needs in plain language. Our AI will help structure your request while
                ensuring all required legal elements are included.
              </p>
            </div>
            <PromptModeGenerator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
