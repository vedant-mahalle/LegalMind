"use client"

import { useState } from "react"
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
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PromptData {
  prompt: string
  senderName: string
  recipientName: string
  jurisdiction: string
  deadline: string
  urgency: string
}

const urgencyLevels = [
  { value: "low", label: "Standard (30+ days)", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Urgent (7-30 days)", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "Critical (1-7 days)", color: "bg-red-100 text-red-800" },
]

const examplePrompts = [
  {
    title: "Copyright Infringement",
    prompt:
      "Someone is using my copyrighted images on their website without permission. I want them to stop immediately and remove all my content. I registered the copyright last year and have proof of ownership.",
  },
  {
    title: "Unpaid Invoice",
    prompt:
      "A client owes me $5,000 for web development work completed 3 months ago. Despite multiple reminders, they haven't paid. I need to demand payment and threaten legal action if they don't pay within 30 days.",
  },
  {
    title: "Lease Violation",
    prompt:
      "My tenant is consistently late with rent payments and has unauthorized pets in the apartment. The lease clearly prohibits pets and requires rent by the 5th of each month. I want to give them notice to cure or quit.",
  },
  {
    title: "Harassment",
    prompt:
      "A former business partner is spreading false information about me on social media and contacting my clients with defamatory statements. I need them to stop this behavior immediately or I will pursue legal action.",
  },
]

export function PromptModeGenerator() {
  const [formData, setFormData] = useState<PromptData>({
    prompt: "",
    senderName: "",
    recipientName: "",
    jurisdiction: "",
    deadline: "",
    urgency: "",
  })

  const [generatedNotice, setGeneratedNotice] = useState("")
  const [context, setContext] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [error, setError] = useState<string>("")
  const [fontSize, setFontSize] = useState<number>(15)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [serverMeta, setServerMeta] = useState<{
    senderName?: string
    recipientName?: string
    jurisdiction?: string
    deadline?: string
    urgency?: string
    date?: string
  } | null>(null)

  const updateFormData = (field: keyof PromptData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
    a.download = `legal-notice-prompt-${new Date().toISOString().split("T")[0]}.txt`
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

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

  type Section = { key: string; title: string; content: string }
  const parseNoticeSections = (text: string): Section[] => {
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
    const sections: Section[] = []
    let current: Section | null = null

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
        // preamble before first heading
        if (!sections.length) sections.push({ key: "Preamble", title: "Preamble", content: line })
        else sections[sections.length - 1].content += "\n" + line
      }
    }
    if (current) sections.push(current)
    return sections.filter((s) => s.content && s.content.trim().length > 0)
  }

  const NoticeView = ({ text, meta, subjectFallback }: { text: string; meta?: any; subjectFallback?: string }) => {
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
      <div className="rounded-xl border bg-white shadow-sm" style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}>
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

  const isFormValid = formData.prompt.trim().length > 50 && formData.senderName && formData.recipientName

  const applyExamplePrompt = (prompt: string) => {
    updateFormData("prompt", prompt)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Prompt Interface */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="h-6 w-6" />
              Describe Your Legal Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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

            <div className="border-t pt-6">
              <h3 className="font-semibold text-slate-900 mb-4">Example Prompts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {examplePrompts.map((example, index) => (
                  <Card
                    key={index}
                    className="border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={() => applyExamplePrompt(example.prompt)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium text-slate-900 mb-2">{example.title}</h4>
                      <p className="text-sm text-slate-600 line-clamp-3">{example.prompt}</p>
                      <Button variant="outline" size="sm" className="mt-3 w-full bg-transparent">
                        Use This Example
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="flex justify-center">
          <Button
            onClick={generateFromPrompt}
            disabled={!isFormValid || isGenerating}
            size="lg"
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
        </div>
        {error && (
          <div className="mt-4 text-center text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Sidebar - Required Fields & Preview */}
      <div className="space-y-6">
        {/* Required Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Required Information</CardTitle>
            <p className="text-sm text-slate-600">These fields ensure legal completeness</p>
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
            <div>
              <Label htmlFor="recipientName">Recipient Name *</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => updateFormData("recipientName", e.target.value)}
                placeholder="Who you're sending this to"
              />
            </div>
            <div>
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
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

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Generated Notice</CardTitle>
          </CardHeader>
          <CardContent>
            {showPreview ? (
              <div
                className="cursor-pointer"
                onClick={() => setIsFullscreen(true)}
              >
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

        {/* Fullscreen Notice Dialog */}
        <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
          <DialogContent className="max-w-[200px] max-h-[90vh] overflow-hidden border-amber-400">
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
    </div>
  )
}
