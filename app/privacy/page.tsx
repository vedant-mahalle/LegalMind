import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                <strong>Last Updated:</strong> December 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  LegalNotice Pro is committed to protecting your privacy. We collect minimal information necessary to
                  provide our legal notice generation service:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Information you voluntarily provide when generating legal notices</li>
                  <li>Technical information such as IP address and browser type for security purposes</li>
                  <li>Contact information when you reach out to our support team</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">Your information is used solely for:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Generating your requested legal notices</li>
                  <li>Providing customer support when requested</li>
                  <li>Improving our service quality and user experience</li>
                  <li>Ensuring the security and integrity of our platform</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Data Storage and Security</h2>
                <p className="text-muted-foreground mb-4">We prioritize your privacy and data security:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Personal information entered in our generator is not permanently stored</li>
                  <li>All data transmission is encrypted using industry-standard SSL technology</li>
                  <li>We implement appropriate security measures to protect against unauthorized access</li>
                  <li>Generated documents are not retained on our servers after download</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>When required by law or legal process</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access information we have about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of communications from us</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy, please contact us at:
                  <br />
                  Email: privacy@legalnoticepro.com
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
