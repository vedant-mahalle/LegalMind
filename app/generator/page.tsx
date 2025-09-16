"use client"

import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LegalNoticeWizard } from "@/components/legal-notice-wizard"
import { templates } from "@/lib/templates"

export default function GeneratorPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")

  const selectedTemplate = templates.find((t) => t.id === templateId)
  const initialPrompt = selectedTemplate ? selectedTemplate.preview : ""

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <main className="flex-1 py-8 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 rounded-lg bg-white">
              <h1 className="text-3xl font-semibold text-slate-900 mb-4 hover:text-blue-600 transition-colors duration-200">
                Legal Notice Generator
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto hover:text-slate-700 transition-colors duration-200">
                {selectedTemplate
                  ? `Using template: ${selectedTemplate.title}. The describe situation section is pre-filled with the template's context. Customize it and proceed with the steps.`
                  : "Follow the guided steps to create a professionally formatted legal notice. Your progress is automatically saved."
                }
              </p>
            </div>
            <div className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white p-6">
              <LegalNoticeWizard initialPrompt={initialPrompt} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
