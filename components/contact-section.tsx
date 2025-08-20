import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "vedantmahalle39@gmail.com",
      description: "Drop us a mail for any queries or support.",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 9730665390",
      description: "Available 10 AM - 7 PM IST, Mon-Sat.",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Pune, Maharashtra, India",
      description: "We are based in Pune, Maharashtra.",
    },
    {
      icon: MessageCircle,
      title: "LinkedIn",
      details: "mahalle-vedant",
      description: "Connect with us on LinkedIn.",
      link: "https://www.linkedin.com/in/mahalle-vedant/",
    },
    {
      icon: MessageCircle,
      title: "GitHub",
      details: "vedant-mahalle",
      description: "See our projects on GitHub.",
      link: "https://github.com/vedant-mahalle/",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-foreground mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {contactInfo.map((contact, index) => (
            <div key={index} className="text-center group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-200">
                <contact.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-foreground mb-2">{contact.title}</h3>
              {contact.link ? (
                <a href={contact.link} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold mb-2 block hover:underline">{contact.details}</a>
              ) : (
                <p className="text-accent font-semibold mb-2">{contact.details}</p>
              )}
              <p className="text-muted-foreground text-sm">{contact.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h3 className="font-montserrat font-bold text-2xl text-card-foreground mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust LegalMind for their legal document needs. Start generating
            professional legal notices today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3">Start Free Trial</Button>
            <Button variant="outline" className="border-border bg-transparent px-8 py-3">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
