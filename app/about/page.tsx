import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, Clock, Scale, FileCheck } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About LegalNotice Pro</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                We are dedicated to providing accessible, professional-grade legal documentation tools that empower
                individuals and businesses to handle their legal notice requirements with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Legal documentation should not be a barrier to justice. Our mission is to democratize access to
                    professional legal notice generation, ensuring that everyone can create legally compliant documents
                    regardless of their legal background or budget.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We bridge the gap between complex legal requirements and everyday needs, providing tools that are
                    both sophisticated and user-friendly.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Scale className="h-48 w-48 text-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Core Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Legal Accuracy</h3>
                    <p className="text-muted-foreground">
                      Every template and format we provide is carefully crafted to meet current legal standards and
                      requirements, ensuring your notices are legally sound.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                    <p className="text-muted-foreground">
                      We believe legal tools should be accessible to everyone. Our platform is designed to be intuitive
                      and user-friendly, regardless of legal expertise.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Professional Quality</h3>
                    <p className="text-muted-foreground">
                      Our documents maintain the highest professional standards, suitable for official use in legal
                      proceedings and business communications.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose LegalNotice Pro</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <FileCheck className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Comprehensive Coverage</h3>
                    <p className="text-muted-foreground">
                      From demand notices to eviction notices, our platform covers all major types of legal notices
                      required in various legal and business situations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Time-Efficient</h3>
                    <p className="text-muted-foreground">
                      Generate professional legal notices in minutes, not hours. Our streamlined process saves you
                      valuable time while ensuring accuracy and compliance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Trusted by Professionals</h3>
                    <p className="text-muted-foreground">
                      Legal professionals, businesses, and individuals nationwide trust our platform for their legal
                      notice requirements. Join thousands of satisfied users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-6">Important Legal Disclaimer</h2>
              <p className="text-muted-foreground text-lg">
                LegalNotice Pro provides tools and templates for generating legal notices. While our documents are
                designed to meet general legal requirements, we strongly recommend consulting with a qualified legal
                professional for complex matters or when legal advice is needed. This service does not constitute legal
                advice.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
