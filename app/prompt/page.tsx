import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PromptModeGenerator } from "@/components/prompt-mode-generator"

export default function PromptModePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <main className="flex-1 py-8 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 rounded-lg bg-white">
              <h1 className="text-3xl font-semibold text-slate-900 mb-4 hover:text-blue-600 transition-colors duration-200">
                Prompt Mode
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto hover:text-slate-700 transition-colors duration-200">
                Describe your legal notice needs in plain language. Our AI will help structure your request while
                ensuring all required legal elements are included.
              </p>
            </div>
            <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white p-6">
              <PromptModeGenerator />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
