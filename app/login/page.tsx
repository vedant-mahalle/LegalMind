import Link from "next/link"
import { LoginForm } from "@/components/login-form"
import { Navigation } from "@/components/navigation"
import { Scale } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Scale className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h1 className="font-montserrat font-bold text-2xl text-card-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your LegalMind account</p>
            </div>

            <LoginForm />

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-accent hover:text-accent/80 font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
