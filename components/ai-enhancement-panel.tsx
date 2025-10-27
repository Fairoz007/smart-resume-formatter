"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles } from "lucide-react"
import type { ResumeData } from "./resume-editor"

interface AIEnhancementPanelProps {
  onEnhance: (enhanced: string) => void
  onTailor: (tailored: ResumeData) => void
}

export function AIEnhancementPanel({ onEnhance, onTailor }: AIEnhancementPanelProps) {
  const [activeTab, setActiveTab] = useState<"enhance" | "generate" | "tailor">("enhance")
  const [enhanceText, setEnhanceText] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState("")

  const handleEnhance = async () => {
    if (!enhanceText.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: enhanceText, type: "enhance" }),
      })

      const data = await response.json()
      setResult(data.enhanced)
      onEnhance(data.enhanced)
    } catch (error) {
      console.error("Enhancement failed:", error)
      setResult("Failed to enhance text. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateBullets = async () => {
    if (!jobTitle.trim() || !company.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, company, description: "" }),
      })

      const data = await response.json()
      setResult(data.bullets)
    } catch (error) {
      console.error("Generation failed:", error)
      setResult("Failed to generate bullets. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTailorResume = async (resumeData: ResumeData) => {
    if (!jobDescription.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/tailor-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeContent: resumeData, jobDescription }),
      })

      const data = await response.json()
      try {
        const tailored = JSON.parse(data.tailored)
        onTailor(tailored)
        setResult("Resume tailored successfully!")
      } catch {
        setResult(data.tailored)
      }
    } catch (error) {
      console.error("Tailoring failed:", error)
      setResult("Failed to tailor resume. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Enhancement
        </CardTitle>
        <CardDescription>Use AI to improve your resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab("enhance")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "enhance" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            }`}
          >
            Enhance
          </button>
          <button
            onClick={() => setActiveTab("generate")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "generate" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            }`}
          >
            Generate
          </button>
          <button
            onClick={() => setActiveTab("tailor")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "tailor" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            }`}
          >
            Tailor
          </button>
        </div>

        {/* Enhance Tab */}
        {activeTab === "enhance" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Text to Enhance</Label>
              <Textarea
                value={enhanceText}
                onChange={(e) => setEnhanceText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={4}
              />
            </div>
            <Button onClick={handleEnhance} disabled={isLoading || !enhanceText.trim()} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Enhance Text
                </>
              )}
            </Button>
          </div>
        )}

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Google" />
              </div>
            </div>
            <Button
              onClick={handleGenerateBullets}
              disabled={isLoading || !jobTitle.trim() || !company.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Bullets
                </>
              )}
            </Button>
          </div>
        )}

        {/* Tailor Tab */}
        {activeTab === "tailor" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={4}
              />
            </div>
            <Button
              onClick={() => {
                // This would need the resume data passed in
                handleTailorResume({
                  personalInfo: { fullName: "", email: "", phone: "", location: "", summary: "" },
                  experience: [],
                  education: [],
                  skills: [],
                })
              }}
              disabled={isLoading || !jobDescription.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Tailoring...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Tailor Resume
                </>
              )}
            </Button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Result:</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
