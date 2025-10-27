"use client"

import { createClient } from "@/lib/supabase/server"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download } from "lucide-react"

export default async function SharedResumePage({ params }: { params: { token: string } }) {
  const supabase = await createClient()

  const { data: share, error: shareError } = await supabase
    .from("shared_resumes")
    .select("resume_id, expires_at")
    .eq("share_token", params.token)
    .single()

  if (shareError || !share) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Resume not found</h1>
          <p className="text-muted-foreground mb-4">This resume link may have expired or been removed.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Check if share has expired
  if (share.expires_at && new Date(share.expires_at) < new Date()) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Link expired</h1>
          <p className="text-muted-foreground mb-4">This resume link has expired.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { data: resume, error: resumeError } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", share.resume_id)
    .single()

  if (resumeError || !resume) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Resume not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{resume.title}</h1>
            <p className="text-muted-foreground mt-2">Shared Resume</p>
          </div>
          <Button
            onClick={() => {
              window.print()
            }}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <ResumePreview data={resume.content} template={resume.template_id} />
        </div>
      </div>
    </div>
  )
}
