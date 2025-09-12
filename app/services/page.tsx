import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Home, CreditCard, AlertTriangle, UserX, FileX, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: AlertTriangle,
      title: "Demand Notices",
      description: "Professional demand notices for payment, performance, or compliance with contractual obligations.",
      features: ["Payment demands", "Performance requirements", "Contract compliance", "Deadline specifications"],
    },
    {
      icon: UserX,
      title: "Cease and Desist",
      description:
        "Stop unwanted behavior, harassment, or infringement with legally formatted cease and desist notices.",
      features: ["Harassment cessation", "Copyright infringement", "Trademark violations", "Defamation claims"],
    },
    {
      icon: FileX,
      title: "Breach of Contract",
      description: "Formal notices addressing contract violations and demanding remedy or compliance.",
      features: ["Contract violations", "Remedy demands", "Cure periods", "Legal consequences"],
    },
    {
      icon: Home,
      title: "Eviction Notices",
      description: "Landlord notices for tenant eviction proceedings, including pay or quit and cure or quit notices.",
      features: ["Pay or quit notices", "Cure or quit notices", "Unconditional quit", "Lease violations"],
    },
    {
      icon: CreditCard,
      title: "Payment Due Notices",
      description: "Professional notices for overdue payments, invoices, and financial obligations.",
      features: ["Overdue invoices", "Late fees", "Payment schedules", "Collection notices"],
    },
    {
      icon: FileText,
      title: "Termination Notices",
      description: "Employment, contract, or service termination notices with proper legal formatting.",
      features: ["Employment termination", "Service cancellation", "Contract endings", "Notice periods"],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Legal Notice Services</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Comprehensive legal notice generation covering all major types of legal documentation needs for
                individuals, businesses, and legal professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <service.icon className="h-6 w-6 text-primary" />
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full">
                        <Link href="/generator">Generate Notice</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Select Notice Type</h3>
                  <p className="text-muted-foreground">
                    Choose from our comprehensive list of legal notice types that match your specific needs.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Fill Information</h3>
                  <p className="text-muted-foreground">
                    Complete our guided form with all necessary details for your legal notice.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Generate & Download</h3>
                  <p className="text-muted-foreground">
                    Review your professionally formatted notice and download it for immediate use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">Service Features</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Legal Compliance</h3>
                      <p className="text-muted-foreground">
                        All notices are formatted according to current legal standards and requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Professional Formatting</h3>
                      <p className="text-muted-foreground">
                        Documents are properly structured and formatted for official use.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Instant Generation</h3>
                      <p className="text-muted-foreground">
                        Generate your legal notices immediately with our automated system.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Multiple Formats</h3>
                      <p className="text-muted-foreground">
                        Download your notices in various formats suitable for printing or digital use.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Privacy Protection</h3>
                      <p className="text-muted-foreground">
                        Your information is secure and not stored after document generation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">No Legal Advice</h3>
                      <p className="text-muted-foreground">
                        Clear disclaimer that this is a documentation tool, not legal advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Generate Your Legal Notice?</h2>
              <p className="text-xl mb-8 opacity-90">
                Start creating professional legal notices in minutes with our easy-to-use generator.
              </p>
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                <Link href="/generator">Start Generator</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
