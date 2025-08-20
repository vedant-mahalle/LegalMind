import { Scale, Sparkles, Shield } from "lucide-react"

export function AboutHero() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-accent/10 rounded-2xl">
              <Scale className="h-16 w-16 text-accent" />
            </div>
          </div>

          <h1 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
            About
            <span className="block text-accent">LegalMind</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            LegalMind is a new legal tech startup based in Pune, Maharashtra, founded by Vedant Mahalle. Our mission is to make legal document creation simple, accessible, and affordable for everyone. As a small but passionate team, we are building tools to empower individuals and businesses to generate professional legal notices with ease.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">10,000+</h3>
              <p className="text-muted-foreground">Documents Generated</p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">99.9%</h3>
              <p className="text-muted-foreground">Accuracy Rate</p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-2xl text-foreground mb-2">5,000+</h3>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
