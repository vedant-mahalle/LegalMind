import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Shield, Lock, Github, Scale, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="bg-slate-50">
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
                Draft a legally formatted notice in minutes
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
                Guided steps, clear language, export-ready documents. Professional legal notice generation with
                government-grade reliability.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-8 py-4"
                >
                  <Link href="/generator">Generate a Legal Notice</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-lg px-8 py-4 bg-transparent"
                >
                  <Link href="/templates">Browse Templates</Link>
                </Button>
              </div>

              {/* Trust markers */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Privacy-First</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Github className="h-4 w-4" />
                  <span>Open Source</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-slate-900 text-center mb-12">Popular Legal Notice Types</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border border-slate-200 hover:border-blue-300 transition-colors group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <Scale className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Cease & Desist</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Stop unauthorized use of intellectual property, harassment, or other unwanted activities with
                    professionally formatted cease and desist notices.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                  >
                    Create Notice
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 hover:border-blue-300 transition-colors group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Payment & Recovery</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Demand payment for overdue invoices, loans, or services with legally compliant payment demand
                    notices and debt recovery letters.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                  >
                    Create Notice
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 hover:border-blue-300 transition-colors group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                    <Users className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Property & Tenancy</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Handle landlord-tenant disputes, eviction notices, lease violations, and property-related legal
                    matters with proper documentation.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                  >
                    Create Notice
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 mb-12">Three simple steps to generate your legal notice</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Fill the Form</h3>
                <p className="text-slate-600">
                  Enter party details, legal grounds, and specific demands through our guided wizard
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Review & Preview</h3>
                <p className="text-slate-600">
                  See your notice formatted in real-time with proper legal structure and language
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Export & Send</h3>
                <p className="text-slate-600">Download as PDF or DOCX, print, or send directly to the recipient</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-slate-900 mb-12">Trusted by Professionals</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border border-slate-200 p-8">
                <CardContent className="p-0">
                  <p className="text-slate-600 mb-4 italic">
                    "This tool has streamlined our legal notice process significantly. The formatting is always correct
                    and saves us hours of work."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-slate-900">Sarah Johnson</p>
                      <p className="text-sm text-slate-600">Legal Assistant</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 p-8">
                <CardContent className="p-0">
                  <p className="text-slate-600 mb-4 italic">
                    "Professional quality documents every time. The step-by-step process ensures we don't miss any
                    critical information."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-slate-900">Michael Chen</p>
                      <p className="text-sm text-slate-600">Small Business Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <Card className="border border-slate-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Are the generated notices legally valid?</h3>
                  <p className="text-slate-600">
                    Our notices follow standard legal formatting and include all necessary elements. However, this tool
                    generates document drafts and does not constitute legal advice.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Can I customize the generated notices?</h3>
                  <p className="text-slate-600">
                    Yes, you can edit all content fields and add specific legal grounds, demands, and deadlines relevant
                    to your situation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">What file formats are available for export?</h3>
                  <p className="text-slate-600">
                    You can export your notices as PDF, DOCX, or print directly from the browser. All formats maintain
                    proper legal document formatting.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-4">Ready to Generate Your Legal Notice?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals who trust our platform for their legal documentation needs.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 font-medium text-lg px-8 py-4">
              <Link href="/generator" className="flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
