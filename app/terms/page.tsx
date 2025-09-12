import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                <strong>Last Updated:</strong> December 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using LegalNotice Pro, you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Service Description</h2>
                <p className="text-muted-foreground mb-4">
                  LegalNotice Pro provides an automated legal notice generation service that:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Generates formatted legal notices based on user input</li>
                  <li>Provides templates for various types of legal notices</li>
                  <li>Offers guidance on proper legal notice formatting</li>
                  <li>Does not provide legal advice or representation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">User Responsibilities</h2>
                <p className="text-muted-foreground mb-4">As a user of our service, you agree to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Use the service for lawful purposes only</li>
                  <li>Not attempt to circumvent security measures</li>
                  <li>Respect intellectual property rights</li>
                  <li>Consult with legal professionals when appropriate</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Limitations and Disclaimers</h2>
                <p className="text-muted-foreground mb-4">Important limitations of our service:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>This service does not constitute legal advice</li>
                  <li>Generated documents should be reviewed by legal professionals</li>
                  <li>We make no guarantees about legal effectiveness</li>
                  <li>Users are responsible for compliance with applicable laws</li>
                  <li>Service availability is not guaranteed</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground">
                  The service, including all content, features, and functionality, is owned by LegalNotice Pro and is
                  protected by copyright, trademark, and other intellectual property laws. Users retain ownership of the
                  content they input and the documents they generate.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  LegalNotice Pro shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
                  losses, resulting from your use of the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Modifications</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                  posting. Your continued use of the service constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  Questions about these Terms of Service should be sent to:
                  <br />
                  Email: legal@legalnoticepro.com
                  <br />
                  Phone: 1-800-LEGAL-01
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
