"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Sparkles,
  FileText,
  AlertCircle,
  CheckCircle,
  Download,
  Copy,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface WizardData {
  prompt: string
  senderName: string
  recipientName: string
  jurisdiction: string
  deadline: string
  urgency: string
}

interface LegalNoticeWizardProps {
  initialPrompt?: string
}

const urgencyLevels = [
  { value: "low", label: "Standard (30+ days)", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Urgent (7-30 days)", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "Critical (1-7 days)", color: "bg-red-100 text-red-800" },
]

const steps = [
  { title: "Describe Situation", description: "Provide details about your legal issue" },
  { title: "Your Information", description: "Enter your details" },
  { title: "Recipient Details", description: "Enter recipient information" },
  { title: "Legal Details", description: "Specify jurisdiction and deadlines" },
  { title: "Generate Notice", description: "Review and generate your notice" },
]

export function LegalNoticeWizard({ initialPrompt = "" }: LegalNoticeWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<WizardData>({
    prompt: initialPrompt,
    senderName: "",
    recipientName: "",
    jurisdiction: "",
    deadline: "",
    urgency: "",
  })

  useEffect(() => {
    if (initialPrompt) {
      setFormData((prev) => ({ ...prev, prompt: initialPrompt }))
    }
  }, [initialPrompt])

  const [generatedNotice, setGeneratedNotice] = useState("")
  const [context, setContext] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [error, setError] = useState<string>("")
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [serverMeta, setServerMeta] = useState<{
    senderName?: string
    recipientName?: string
    jurisdiction?: string
    deadline?: string
    urgency?: string
    date?: string
  } | null>(null)

  const updateFormData = (field: keyof WizardData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const generateFromPrompt = async () => {
    setIsGenerating(true)
    setError("")
    setShowPreview(false)
    setGeneratedNotice("")
    setContext([])
    setServerMeta(null)
    try {
      const response = await fetch("http://localhost:8000/generate-notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: formData.prompt,
          senderName: formData.senderName,
          recipientName: formData.recipientName,
          jurisdiction: formData.jurisdiction,
          deadline: formData.deadline,
          urgency: formData.urgency,
        }),
      })
      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setGeneratedNotice(data.notice)
        setContext(data.context || [])
        setServerMeta(data.metadata || null)
        setShowPreview(true)
        nextStep() // Move to final step to show preview
      }
    } catch (err: any) {
      setError("Failed to generate notice. Please try again later.")
    }
    setIsGenerating(false)
  }

  const getSubjectFromPrompt = (prompt: string): string => {
    if (prompt.toLowerCase().includes("copyright")) return "Copyright Infringement Notice"
    if (prompt.toLowerCase().includes("payment") || prompt.toLowerCase().includes("invoice"))
      return "Payment Demand Notice"
    if (prompt.toLowerCase().includes("lease") || prompt.toLowerCase().includes("rent")) return "Lease Violation Notice"
    if (prompt.toLowerCase().includes("harassment") || prompt.toLowerCase().includes("defam"))
      return "Cease and Desist Notice"
    return "Legal Notice"
  }

  const downloadNotice = () => {
    const blob = new Blob([generatedNotice], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `legal-notice-wizard-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyNotice = async () => {
    try {
      await navigator.clipboard.writeText(generatedNotice)
    } catch {}
  }

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return formData.prompt.trim().length > 50
      case 1:
        return !!formData.senderName
      case 2:
        return !!formData.recipientName
      case 3:
        return !!formData.jurisdiction
      default:
        return true
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                Describe Your Situation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="prompt">Describe your situation in detail *</Label>
                <Textarea
                  id="prompt"
                  value={formData.prompt}
                  onChange={(e) => updateFormData("prompt", e.target.value)}
                  placeholder="Explain what happened, what you want the recipient to do, and any relevant details about your situation. Be as specific as possible - include dates, amounts, contract terms, etc."
                  rows={8}
                  className="resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-slate-600">
                    {formData.prompt.length < 50 ? (
                      <span className="text-amber-600">
                        <AlertCircle className="h-4 w-4 inline mr-1" />
                        Please provide more detail (minimum 50 characters)
                      </span>
                    ) : (
                      <span className="text-green-600">
                        <CheckCircle className="h-4 w-4 inline mr-1" />
                        Good level of detail provided
                      </span>
                    )}
                  </p>
                  <span className="text-sm text-slate-500">{formData.prompt.length} characters</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="senderName">Your Name *</Label>
                <Input
                  id="senderName"
                  value={formData.senderName}
                  onChange={(e) => updateFormData("senderName", e.target.value)}
                  placeholder="Your full legal name"
                />
              </div>
            </CardContent>
          </Card>
        )
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recipient Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) => updateFormData("recipientName", e.target.value)}
                  placeholder="Who you're sending this to"
                />
              </div>
            </CardContent>
          </Card>
        )
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Legal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jurisdiction">Jurisdiction *</Label>
                <Input
                  id="jurisdiction"
                  value={formData.jurisdiction}
                  onChange={(e) => updateFormData("jurisdiction", e.target.value)}
                  placeholder="e.g., State of California"
                />
              </div>
              <div>
                <Label htmlFor="deadline">Response Deadline</Label>
                <Input
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => updateFormData("deadline", e.target.value)}
                  placeholder="e.g., 30 days from receipt"
                />
              </div>
              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select value={formData.urgency} onValueChange={(value) => updateFormData("urgency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.urgency && (
                  <Badge className={urgencyLevels.find((l) => l.value === formData.urgency)?.color}>
                    {urgencyLevels.find((l) => l.value === formData.urgency)?.label}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Generated Notice</CardTitle>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="cursor-pointer" onClick={() => setIsFullscreen(true)}>
                  <NoticeView
                    text={generatedNotice}
                    meta={serverMeta || undefined}
                    subjectFallback={getSubjectFromPrompt(formData.prompt)}
                  />
                  <div className="mt-4 text-center text-sm text-slate-600">
                    Click to view full notice and context
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Your generated notice will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  const NoticeView = ({ text, meta, subjectFallback }: { text: string; meta?: any; subjectFallback?: string }) => {
    // Same as before, include the parsing and rendering logic
    const sections = parseNoticeSections(text)
    const byKey = sections.reduce<Record<string, string>>((acc, s) => {
      acc[s.key] = (acc[s.key] ? acc[s.key] + "\n" : "") + s.content.trim()
      return acc
    }, {})

    const orderedKeys = [
      "Date",
      "From",
      "To",
      "Subject",
      "Background / Facts",
      "Legal Basis",
      "Demands / Relief Sought",
      "Response Timeline",
      "Consequences of Non-Compliance",
      "Disclaimer",
      "Signature",
    ]

    const hasStructured = ["From", "To", "Subject"].some((k) => byKey[k]) || sections.length > 2

    return (
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-2">
          <div className="text-sm text-slate-600">Formatted preview</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyNotice}>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={downloadNotice}>
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(true)}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto overflow-x-auto px-6 py-6">
          {hasStructured ? (
            <div className="mx-auto max-w-[850px] font-serif text-slate-900">
              <div className="text-right text-sm text-slate-600">{byKey["Date"] || meta?.date || ""}</div>
              <h2 className="text-center text-xl font-bold tracking-wide mt-1 mb-4">LEGAL NOTICE</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">From</h4>
                  <div className="whitespace-pre-wrap break-words text-slate-800">{byKey["From"] || meta?.senderName || "<Your Name / Address>"}</div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-1">To</h4>
                  <div className="whitespace-pre-wrap break-words text-slate-800">{byKey["To"] || meta?.recipientName || "<Recipient / Address>"}</div>
                </div>
              </div>

              {(byKey["Subject"] || subjectFallback) && (
                <div className="text-center mb-5">
                  <div className="inline-block rounded bg-slate-50 px-3 py-1 text-slate-800 max-w-full break-words">
                    <span className="font-semibold">Subject: </span>
                    <span className="break-words">{byKey["Subject"] || subjectFallback}</span>
                  </div>
                </div>
              )}

              {orderedKeys
                .filter((k) => !["Date", "From", "To", "Subject"].includes(k))
                .map((k) => (
                  <section key={k} className="mb-5">
                    {(byKey[k] || (k === "Jurisdiction" && meta?.jurisdiction) ||
                      (k === "Response Timeline" && (meta?.deadline || meta?.urgency)) ||
                      (k === "Signature" && meta?.senderName)) && (
                      <h4 className="mb-1 text-base font-semibold text-slate-900">{k}</h4>
                    )}
                    {byKey[k] && <div className="whitespace-pre-wrap break-words text-slate-800">{byKey[k]}</div>}
                    {!byKey[k] && k === "Jurisdiction" && meta?.jurisdiction && (
                      <div className="whitespace-pre-wrap break-words text-slate-800">{meta.jurisdiction}</div>
                    )}
                    {!byKey[k] && k === "Response Timeline" && (meta?.deadline || meta?.urgency) && (
                      <div className="whitespace-pre-wrap break-words text-slate-800">
                        {(meta?.deadline || "").toString()} {meta?.urgency ? `(${meta.urgency})` : ""}
                      </div>
                    )}
                    {!byKey[k] && k === "Signature" && meta?.senderName && (
                      <div className="whitespace-pre-wrap break-words text-slate-800">{meta.senderName}</div>
                    )}
                  </section>
                ))}
            </div>
          ) : (
            <pre className="whitespace-pre-wrap break-all text-slate-800">{text}</pre>
          )}
        </div>
      </div>
    )
  }

  const parseNoticeSections = (text: string): { key: string; title: string; content: string }[] => {
    // Include the parsing logic as before
    const patterns: { key: string; title: string; regex: RegExp }[] = [
      { key: "Date", title: "Date", regex: /^date\s*:/i },
      { key: "From", title: "From", regex: /^from\s*:/i },
      { key: "To", title: "To", regex: /^to\s*:/i },
      { key: "Subject", title: "Subject", regex: /^subject\s*:/i },
      {
        key: "Background / Facts",
        title: "Background / Facts",
        regex: /^(background\s*(?:\/|and)?\s*facts|facts|background)\s*:/i,
      },
      { key: "Legal Basis", title: "Legal Basis", regex: /^(legal\s*basis|legal\s*grounds)\s*:/i },
      {
        key: "Demands / Relief Sought",
        title: "Demands / Relief Sought",
        regex: /^(demands?|relief\s*sought|demands?\s*\/\s*relief\s*sought)\s*:/i,
      },
      {
        key: "Response Timeline",
        title: "Response Timeline",
        regex: /^(response\s*timeline|time\s*for\s*response|deadline)\s*:/i,
      },
      {
        key: "Consequences of Non-Compliance",
        title: "Consequences of Non-Compliance",
        regex: /^(consequences(?:\s*of)?\s*(?:non[-\s]?compliance)?)\s*:/i,
      },
      { key: "Disclaimer", title: "Disclaimer", regex: /^disclaimer\s*:/i },
      { key: "Signature", title: "Signature", regex: /^signature\s*:/i },
      { key: "Jurisdiction", title: "Jurisdiction", regex: /^jurisdiction\s*:/i },
    ]

    const lines = text.split(/\r?\n/)
    const sections: { key: string; title: string; content: string }[] = []
    let current: { key: string; title: string; content: string } | null = null

    const matchHeading = (line: string) => patterns.find((p) => p.regex.test(line))

    for (const raw of lines) {
      const line = raw.trimEnd()
      const heading = matchHeading(line)
      if (heading) {
        if (current) sections.push(current)
        const idx = line.indexOf(":")
        const content = idx >= 0 ? line.slice(idx + 1).trim() : ""
        current = { key: heading.key, title: heading.title, content: content ? content + "\n" : "" }
      } else if (current) {
        current.content += (current.content ? "\n" : "") + line
      } else if (line) {
        if (!sections.length) sections.push({ key: "Preamble", title: "Preamble", content: line })
        else sections[sections.length - 1].content += "\n" + line
      }
    }
    if (current) sections.push(current)
    return sections.filter((s) => s.content && s.content.trim().length > 0)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    index < currentStep ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">{steps[currentStep].title}</h2>
          <p className="text-slate-600">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">{renderStepContent()}</div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            onClick={nextStep}
            disabled={!isStepValid(currentStep)}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={generateFromPrompt}
            disabled={!isStepValid(currentStep) || isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                Generating Notice...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Legal Notice
              </>
            )}
          </Button>
        )}
      </div>

      {error && (
        <div className="mt-4 text-center text-red-600">
          <p>{error}</p>
        </div>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="w-[90vw] max-h-[90vh] overflow-hidden border-amber-400">
          <DialogHeader>
            <DialogTitle>Generated Notice & Context</DialogTitle>
          </DialogHeader>
          {showPreview ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full overflow-hidden">
              <div className="space-y-4 overflow-y-auto">
                <h3 className="text-lg font-semibold">Notice</h3>
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <NoticeView
                    text={generatedNotice}
                    meta={serverMeta || undefined}
                    subjectFallback={getSubjectFromPrompt(formData.prompt)}
                  />
                </div>
              </div>
              <div className="space-y-4 overflow-y-auto">
                <h3 className="text-lg font-semibold">Retrieved Context</h3>
                {context.length > 0 ? (
                  <div className="border rounded-lg p-4 bg-white shadow-sm max-h-96 overflow-y-auto">
                    <ul className="space-y-3 text-sm text-slate-800">
                      {context.map((c, idx) => (
                        <li key={idx} className="border-b pb-3 last:border-b-0">
                          <div className="text-slate-600 text-xs mb-1">
                            [{idx + 1}] Source: {c.metadata?.source_label || c.metadata?.source || "unknown"}
                          </div>
                          <div className="line-clamp-6 whitespace-pre-wrap break-words">{c.document}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 bg-white shadow-sm text-center py-8 text-slate-500">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No context retrieved</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
