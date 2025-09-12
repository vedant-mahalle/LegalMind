"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Printer, Eye, ZoomIn, ZoomOut, RotateCcw, Share2, CheckCircle, AlertTriangle } from "lucide-react"

interface DocumentData {
  title: string
  content: string
  isDraft: boolean
  metadata: {
    created: string
    sender: string
    recipient: string
    type: string
  }
}

const sampleDocument: DocumentData = {
  title: "Cease and Desist Notice",
  isDraft: true,
  content: `CEASE AND DESIST NOTICE

Date: December 15, 2024

TO: John Smith
    123 Main Street
    Anytown, ST 12345

FROM: Jane Doe
      456 Oak Avenue
      Legal City, LC 67890
      Email: jane.doe@email.com
      Phone: (555) 123-4567

RE: Unauthorized Use of Copyrighted Material
JURISDICTION: State of California

Dear Mr. Smith,

You are hereby notified of the following matter:

FACTS AND CIRCUMSTANCES:
It has come to my attention that you are using copyrighted images owned by me on your website without proper authorization or licensing. These images were registered with the U.S. Copyright Office on January 15, 2023, under registration number VA 2-123-456.

INCIDENT DATE: November 30, 2024

TIMELINE:
- January 15, 2023: Copyright registration filed
- November 30, 2024: Unauthorized use discovered on your website
- December 1, 2024: Initial contact attempted via email
- December 15, 2024: Formal cease and desist notice issued

LEGAL GROUNDS:
Copyright Infringement, Intellectual Property Violation

APPLICABLE STATUTES:
17 U.S.C. § 501 (Copyright Infringement)
17 U.S.C. § 504 (Remedies for Infringement)

DEMANDS:
You are hereby demanded to immediately:
1. Remove all copyrighted images from your website
2. Cease any further use of the copyrighted material
3. Provide written confirmation of compliance within the specified deadline
4. Destroy any copies of the copyrighted material in your possession

DEADLINE FOR RESPONSE: 30 days from receipt of this notice
COMPLIANCE DEADLINE: 15 days from response

Failure to respond or comply within the specified timeframe may result in further legal action without additional notice, including but not limited to seeking monetary damages, injunctive relief, and attorney's fees pursuant to 17 U.S.C. § 505.

Please govern yourself accordingly.

Dated: December 15, 2024
Place: Legal City, California

Jane Doe
Copyright Owner

---
DISCLAIMER: This document was generated using an automated legal notice generator. This tool generates document drafts and does not constitute legal advice. Please consult with a qualified attorney before using this notice.`,
  metadata: {
    created: "December 15, 2024",
    sender: "Jane Doe",
    recipient: "John Smith",
    type: "Cease and Desist",
  },
}

export function PreviewExportSystem() {
  const [document] = useState<DocumentData>(sampleDocument)
  const [zoom, setZoom] = useState(100)
  const [exportFormat, setExportFormat] = useState("pdf")
  const [isExporting, setIsExporting] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))
  const handleResetZoom = () => setZoom(100)

  const handleExport = async (format: string) => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (format === "pdf") {
      // In a real implementation, this would call a server-side PDF generation API
      const blob = new Blob([document.content], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${document.title.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else if (format === "docx") {
      // In a real implementation, this would call a server-side DOCX generation API
      const blob = new Blob([document.content], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${document.title.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().split("T")[0]}.docx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    setIsExporting(false)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Legal Notice Document",
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    }
  }

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Preview Controls */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-700">Title</p>
              <p className="text-slate-600">{document.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Status</p>
              <Badge
                variant={document.isDraft ? "outline" : "default"}
                className={document.isDraft ? "border-amber-300 text-amber-700" : ""}
              >
                {document.isDraft ? (
                  <>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Draft
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Final
                  </>
                )}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Created</p>
              <p className="text-slate-600">{document.metadata.created}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Type</p>
              <p className="text-slate-600">{document.metadata.type}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">View Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Zoom Level</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
                <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={handleResetZoom} className="w-full mt-2 bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Format</p>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="docx">Word Document</SelectItem>
                  <SelectItem value="txt">Text File</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => handleExport(exportFormat)}
                disabled={isExporting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isExporting ? (
                  <>
                    <Download className="h-4 w-4 mr-2 animate-pulse" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export {exportFormat.toUpperCase()}
                  </>
                )}
              </Button>

              <Button onClick={handlePrint} variant="outline" className="w-full bg-transparent">
                <Printer className="h-4 w-4 mr-2" />
                Print Document
              </Button>

              <Button onClick={handleShare} variant="outline" className="w-full bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Preview */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Document Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 p-8 rounded-lg">
              <div
                ref={printRef}
                className="bg-white shadow-lg mx-auto legal-document-preview"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top center",
                  width: "8.5in",
                  minHeight: "11in",
                  padding: "1in",
                  position: "relative",
                }}
              >
                {/* Draft Watermark */}
                {document.isDraft && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="text-slate-200 font-bold text-6xl transform -rotate-45 select-none"
                      style={{ fontSize: "120px", opacity: 0.1 }}
                    >
                      DRAFT
                    </div>
                  </div>
                )}

                {/* Document Content */}
                <div className="relative z-10 legal-document">
                  <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-justify">
                    {document.content}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          
          .legal-document-preview,
          .legal-document-preview * {
            visibility: visible;
          }
          
          .legal-document-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            transform: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0.5in !important;
          }
          
          .legal-document {
            font-family: 'Source Serif 4', serif;
            font-size: 12pt;
            line-height: 1.5;
            text-align: justify;
          }
          
          @page {
            margin: 0.5in;
            size: letter;
          }
        }
        
        .legal-document-preview {
          font-family: 'Source Serif 4', serif;
        }
        
        .legal-document {
          font-size: 12pt;
          line-height: 1.5;
          text-align: justify;
        }
        
        .legal-document p {
          margin-bottom: 1rem;
          text-indent: 1.5em;
        }
        
        .legal-document .no-indent {
          text-indent: 0;
        }
      `}</style>
    </div>
  )
}
