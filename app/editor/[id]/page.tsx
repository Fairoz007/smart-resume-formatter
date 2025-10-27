"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ResumeEditor, type ResumeData } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { ExportSharePanel } from "@/components/export-share-panel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
}

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const resumeId = params.id as string

  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [resumeTitle, setResumeTitle] = useState("My Resume")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadResume = async () => {
      if (resumeId === "new") {
        setIsLoading(false)
        return
      }

      try {
        const { data: resume, error } = await supabase.from("resumes").select("*").eq("id", resumeId).single()

        if (error) throw error

        if (resume) {
          setResumeTitle(resume.title)
          setResumeData(resume.content || defaultResumeData)
          setSelectedTemplate(resume.template_id || "modern")
        }
      } catch (error) {
        console.error("Error loading resume:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadResume()
  }, [resumeId, supabase])

  const handleSave = async (data: ResumeData) => {
    setIsSaving(true)
    try {
      if (resumeId === "new") {
        const { data: newResume, error } = await supabase
          .from("resumes")
          .insert({
            title: resumeTitle,
            content: data,
            template_id: selectedTemplate,
          })
          .select()
          .single()

        if (error) throw error
        router.push(`/editor/${newResume.id}`)
      } else {
        const { error } = await supabase
          .from("resumes")
          .update({
            title: resumeTitle,
            content: data,
            template_id: selectedTemplate,
            updated_at: new Date().toISOString(),
          })
          .eq("id", resumeId)

        if (error) throw error
      }
    } catch (error) {
      console.error("Error saving resume:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background">
      <div className="container mx-auto py-8 px-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-6">
          <label className="text-sm font-medium">Resume Title</label>
          <Input
            value={resumeTitle}
            onChange={(e) => setResumeTitle(e.target.value)}
            placeholder="e.g., Software Engineer Resume"
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Editor and Controls */}
          <div className="lg:col-span-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="space-y-6">
              <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
              {resumeId !== "new" && <ExportSharePanel resumeId={resumeId} resumeTitle={resumeTitle} />}
              <ResumeEditor initialData={resumeData} onSave={handleSave} isSaving={isSaving} />
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-3 sticky top-8 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="text-sm font-medium mb-4">Preview</div>
            <ResumePreview data={resumeData} template={selectedTemplate} />
          </div>
        </div>
      </div>
    </div>
  )
}
