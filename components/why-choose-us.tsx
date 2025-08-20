import { Zap, Shield, DollarSign, Clock, Users, Award } from "lucide-react"

export function WhyChooseUs() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional legal notices in seconds, not hours or days.",
    },
    {
      icon: Shield,
      title: "Legally Compliant",
      description: "All documents follow current legal standards and best practices.",
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "Save thousands compared to traditional legal services.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access our service anytime, anywhere, whenever you need it.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our team of legal experts ensures quality and accuracy.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Trusted by thousands of users with a 99.9% success rate.",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-foreground mb-4">
            Why Choose LegalMind?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine cutting-edge AI technology with legal expertise to deliver unmatched value
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors duration-200 group"
            >
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-200">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-card-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
