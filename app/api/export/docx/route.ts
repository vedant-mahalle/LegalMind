import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { content, title, isDraft } = await request.json()

    // In a real implementation, you would use the 'docx' library:
    // import { Document, Packer, Paragraph, TextRun } from 'docx'

    // For now, we'll return a mock response
    const docxBuffer = Buffer.from(content, "utf-8")

    const headers = new Headers()
    headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    headers.set("Content-Disposition", `attachment; filename="${title.replace(/\s+/g, "-").toLowerCase()}.docx"`)

    return new NextResponse(docxBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate DOCX" }, { status: 500 })
  }
}
