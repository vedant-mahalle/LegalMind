import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Eye, Keyboard, Volume2, Users, Mail, Phone } from "lucide-react"

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-semibold text-slate-900 mb-4">Accessibility Statement</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We are committed to ensuring our legal notice generator is accessible to all users, including those with
                disabilities. This page outlines our accessibility features and ongoing commitment to inclusive design.
              </p>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">WCAG 2.2 AA Compliance</h2>
                <Badge className="bg-green-100 text-green-800 text-sm px-4 py-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Level AA Compliant
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Eye className="h-5 w-5 text-blue-600" />
                      Visual Accessibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">High contrast color scheme (4.5:1 minimum ratio)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Scalable fonts up to 200% without horizontal scrolling</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Alternative text for all informative images</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Clear visual focus indicators</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Keyboard className="h-5 w-5 text-blue-600" />
                      Keyboard Navigation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Full keyboard navigation support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Logical tab order throughout all pages</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Skip navigation links for efficient browsing</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">No keyboard traps in interactive elements</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Volume2 className="h-5 w-5 text-blue-600" />
                      Screen Reader Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Semantic HTML structure with proper headings</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">ARIA labels and descriptions where needed</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Form labels properly associated with inputs</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Status messages announced to screen readers</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                      Cognitive Accessibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Clear, simple language throughout the interface</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Consistent navigation and layout patterns</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Auto-save functionality to prevent data loss</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">Clear error messages and validation feedback</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Assistive Technology Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">
                Supported Assistive Technologies
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border border-slate-200 text-center">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">Screen Readers</h3>
                    <p className="text-slate-600 text-sm">
                      NVDA, JAWS, VoiceOver, TalkBack, and other major screen reading software
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-slate-200 text-center">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">Voice Control</h3>
                    <p className="text-slate-600 text-sm">
                      Dragon NaturallySpeaking, Voice Control, and other voice navigation tools
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-slate-200 text-center">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">Switch Navigation</h3>
                    <p className="text-slate-600 text-sm">
                      Single-switch and multi-switch navigation devices and software
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Browser Support Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">Browser Compatibility</h2>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="text-slate-700 mb-4">
                  Our legal notice generator is fully accessible on the following browsers with assistive technology:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-slate-700">Chrome 90+ (Windows, macOS, Linux)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-slate-700">Firefox 88+ (Windows, macOS, Linux)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-slate-700">Safari 14+ (macOS, iOS)</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-slate-700">Edge 90+ (Windows, macOS)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-slate-700">Mobile Safari (iOS 14+)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-slate-700">Chrome Mobile (Android 10+)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">Accessibility Feedback</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle>Report Accessibility Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      If you encounter any accessibility barriers while using our service, please let us know. We are
                      committed to addressing issues promptly.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-slate-900">Email</p>
                          <p className="text-slate-600">accessibility@legalnoticepro.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-slate-900">Phone</p>
                          <p className="text-slate-600">1-800-LEGAL-01 (Press 3 for Accessibility)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle>Ongoing Improvements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      We continuously work to improve accessibility and regularly conduct:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Automated accessibility testing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Manual testing with assistive technologies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">User testing with people with disabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">Regular accessibility audits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Standards Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Accessibility Standards</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                This website conforms to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards
                published by the World Wide Web Consortium (W3C). These guidelines explain how to make web content more
                accessible for people with disabilities.
              </p>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <p className="text-slate-700">
                  <strong>Last Updated:</strong> December 2024
                  <br />
                  <strong>Next Review:</strong> June 2025
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
