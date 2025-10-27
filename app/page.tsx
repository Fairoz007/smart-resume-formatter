import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, FileText, Share2, Download } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-svh bg-gradient-to-b from-background to-background/80">
      {/* Navigation */}
      <nav className="border-b backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Smart Resume Formatter</span>
          </div>
          <div className="flex gap-2">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Resume Builder</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
            Create Professional Resumes with AI
          </h1>

          <p className="text-xl text-muted-foreground text-balance">
            Build stunning resumes with AI-powered enhancements, beautiful templates, and instant sharing. Stand out to
            recruiters with a polished, professional resume.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Start Building
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader>
                <Sparkles className="w-6 h-6 text-primary mb-2" />
                <CardTitle>AI Enhancement</CardTitle>
                <CardDescription>Improve your resume content with AI-powered suggestions and rewrites</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader>
                <FileText className="w-6 h-6 text-primary mb-2" />
                <CardTitle>Beautiful Templates</CardTitle>
                <CardDescription>Choose from 4 professionally designed resume templates</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader>
                <Download className="w-6 h-6 text-primary mb-2" />
                <CardTitle>Easy Export</CardTitle>
                <CardDescription>Download your resume as PDF with a single click</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader>
                <Share2 className="w-6 h-6 text-primary mb-2" />
                <CardTitle>Instant Sharing</CardTitle>
                <CardDescription>Create shareable links to send your resume to recruiters</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Build Your Resume?</h2>
          <p className="text-muted-foreground">
            Join thousands of professionals who have created stunning resumes with Smart Resume Formatter.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="gap-2">
              <Sparkles className="w-5 h-5" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Smart Resume Formatter - Create professional resumes with AI</p>
        </div>
      </footer>
    </main>
  )
}
