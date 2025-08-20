import { FileText, Brain, Download, CheckCircle } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Describe Your Situation",
      description: "Simply fill out our intuitive form with details about your legal situation and requirements.",
    },
    {
      icon: Brain,
      title: "AI Processing",
      description:
        "Our advanced AI analyzes your input and generates a professional legal notice tailored to your needs.",
    },
    {
      icon: CheckCircle,
      title: "Review & Customize",
      description:
        "Review the generated document and make any necessary adjustments to ensure it meets your requirements.",
    },
    {
      icon: Download,
      title: "Download & Use",
      description: "Download your professional legal notice and use it immediately for your legal proceedings.",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate professional legal notices in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="bg-accent/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors duration-200">
                  <step.icon className="h-10 w-10 text-accent" />
                </div>
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-xl text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
