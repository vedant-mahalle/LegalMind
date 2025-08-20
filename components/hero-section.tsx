import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Zap, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
              Generate Professional
              <span className="block text-accent">Legal Notices</span>
              <span className="block">Instantly</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create customized legal documents with AI-powered precision. Save time, reduce costs, and ensure
              compliance with our intelligent legal notice generator.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/generator">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold group"
              >
                Start Generating
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg font-semibold border-border hover:bg-accent/10 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors duration-200 group">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-200">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-card-foreground mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate comprehensive legal notices in seconds, not hours. Our AI processes your requirements
                instantly.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors duration-200 group">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-200">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-card-foreground mb-2">Professional Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every document follows legal standards and best practices, ensuring professional-grade output every
                time.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors duration-200 group">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-200">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-card-foreground mb-2">Secure & Compliant</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your data is protected with enterprise-grade security while maintaining full legal compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
