"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Eye } from "lucide-react"

interface NoticeFormData {
  noticeType: string
  recipientName: string
  recipientAddress: string
  senderName: string
  senderAddress: string
  subject: string
  description: string
  deadline: string
  consequences: string
  additionalInfo: string
}

export function LegalNoticeGenerator() {
  const [formData, setFormData] = useState<NoticeFormData>({
    noticeType: "",
    recipientName: "",
    recipientAddress: "",
    senderName: "",
    senderAddress: "",
    subject: "",
    description: "",
    deadline: "",
    consequences: "",
    additionalInfo: "",
  })

  const [generatedNotice, setGeneratedNotice] = useState<string>("")
  const [showPreview, setShowPreview] = useState(false)

  const handleInputChange = (field: keyof NoticeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateNotice = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const notice = `
LEGAL NOTICE

Date: ${currentDate}

TO: ${formData.recipientName}
ADDRESS: ${formData.recipientAddress}

FROM: ${formData.senderName}
ADDRESS: ${formData.senderAddress}

RE: ${formData.subject}

NOTICE TYPE: ${formData.noticeType}

Dear ${formData.recipientName},

You are hereby notified of the following matter:

DESCRIPTION OF ISSUE:
${formData.description}

REQUIRED ACTION:
You are required to take appropriate action regarding this matter within the specified timeframe.

DEADLINE FOR RESPONSE:
${formData.deadline}

CONSEQUENCES OF NON-COMPLIANCE:
${formData.consequences}

${formData.additionalInfo ? `ADDITIONAL INFORMATION:\n${formData.additionalInfo}` : ""}

This notice is served upon you in accordance with applicable laws and regulations. Failure to respond or take appropriate action within the specified timeframe may result in further legal proceedings.

Please govern yourself accordingly.

Sincerely,

${formData.senderName}

---
This document was generated using LegalNotice Pro. This notice should be reviewed by a qualified legal professional before use.
    `.trim()

    setGeneratedNotice(notice)
    setShowPreview(true)
  }

  const downloadNotice = () => {
    const blob = new Blob([generatedNotice], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `legal-notice-${formData.recipientName.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const isFormValid =
    formData.noticeType &&
    formData.recipientName &&
    formData.senderName &&
    formData.subject &&
    formData.description &&
    formData.deadline &&
    formData.consequences

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Notice Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notice Type */}
          <div className="space-y-2">
            <Label htmlFor="noticeType">Notice Type *</Label>
            <Select value={formData.noticeType} onValueChange={(value) => handleInputChange("noticeType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select notice type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demand">Demand Notice</SelectItem>
                <SelectItem value="cease-desist">Cease and Desist</SelectItem>
                <SelectItem value="breach-contract">Breach of Contract</SelectItem>
                <SelectItem value="eviction">Eviction Notice</SelectItem>
                <SelectItem value="payment-due">Payment Due Notice</SelectItem>
                <SelectItem value="termination">Termination Notice</SelectItem>
                <SelectItem value="compliance">Compliance Notice</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Recipient Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Recipient Information</h3>
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name *</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => handleInputChange("recipientName", e.target.value)}
                placeholder="Full name or company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipientAddress">Recipient Address *</Label>
              <Textarea
                id="recipientAddress"
                value={formData.recipientAddress}
                onChange={(e) => handleInputChange("recipientAddress", e.target.value)}
                placeholder="Complete mailing address"
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* Sender Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Sender Information</h3>
            <div className="space-y-2">
              <Label htmlFor="senderName">Your Name *</Label>
              <Input
                id="senderName"
                value={formData.senderName}
                onChange={(e) => handleInputChange("senderName", e.target.value)}
                placeholder="Your full name or company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderAddress">Your Address *</Label>
              <Textarea
                id="senderAddress"
                value={formData.senderAddress}
                onChange={(e) => handleInputChange("senderAddress", e.target.value)}
                placeholder="Your complete mailing address"
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* Notice Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Notice Details</h3>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Brief subject line for the notice"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description of Issue *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Detailed description of the issue or matter"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Response Deadline *</Label>
              <Input
                id="deadline"
                value={formData.deadline}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                placeholder="e.g., 30 days from receipt of this notice"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consequences">Consequences of Non-Compliance *</Label>
              <Textarea
                id="consequences"
                value={formData.consequences}
                onChange={(e) => handleInputChange("consequences", e.target.value)}
                placeholder="What will happen if the recipient does not comply"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Any additional relevant information (optional)"
                rows={3}
              />
            </div>
          </div>

          <Button onClick={generateNotice} disabled={!isFormValid} className="w-full" size="lg">
            <Eye className="h-4 w-4 mr-2" />
            Generate Preview
          </Button>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notice Preview
            </span>
            {showPreview && (
              <Button onClick={downloadNotice} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showPreview ? (
            <div className="bg-muted/30 p-6 rounded-lg border">
              <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">{generatedNotice}</pre>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Fill out the form and click "Generate Preview" to see your legal notice.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
