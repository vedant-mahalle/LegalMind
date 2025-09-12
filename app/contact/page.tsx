import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contact Us</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Have questions about our legal notice generator? Need assistance with your documentation? We're here to
                help you navigate your legal notice requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" placeholder="Your first name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" placeholder="Your last name" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="your.email@example.com" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input id="subject" placeholder="How can we help you?" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Please describe your question or concern in detail..."
                          rows={6}
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Get in Touch</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Email Support</h3>
                          <p className="text-muted-foreground">support@legalnoticepro.com</p>
                          <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Phone Support</h3>
                          <p className="text-muted-foreground">1-800-LEGAL-01</p>
                          <p className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 6 PM EST</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Mailing Address</h3>
                          <p className="text-muted-foreground">
                            LegalNotice Pro
                            <br />
                            123 Legal Plaza, Suite 456
                            <br />
                            Legal City, LC 12345
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Business Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 9:00 AM - 6:00 PM EST
                            <br />
                            Saturday: 10:00 AM - 4:00 PM EST
                            <br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Is this service legally binding?</h4>
                          <p className="text-sm text-muted-foreground">
                            Our generator creates properly formatted legal notices, but we recommend consulting with a
                            legal professional for complex matters.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">How quickly can I generate a notice?</h4>
                          <p className="text-sm text-muted-foreground">
                            Most notices can be generated in under 5 minutes using our streamlined form process.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Do you store my information?</h4>
                          <p className="text-sm text-muted-foreground">
                            No, we do not store any personal information entered into our generator for privacy
                            protection.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
