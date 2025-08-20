import { Navigation } from "@/components/navigation"
import { AboutHero } from "@/components/about-hero"
import { HowItWorks } from "@/components/how-it-works"
import { WhyChooseUs } from "@/components/why-choose-us"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <AboutHero />
      <HowItWorks />
      <WhyChooseUs />
      <TeamSection />
      <ContactSection />
    </main>
  )
}
