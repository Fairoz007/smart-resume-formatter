"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { ResumeCard } from "@/components/resume-card"
import Link from "next/link"
import { Plus, Loader2 } from "lucide-react"

interface Resume {
  id: string
  title: string
  updated_at: string
  template_id: string
}

export default function DashboardPage() {
  const supabase = createClient()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [userEmail, setUserEmail] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          redirect("/auth/login")
        }

        setUserEmail(user.email)

        const { data: resumesData, error } = await supabase
          .from("resumes")
          .select("*")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })

        if (error) throw error
        setResumes(resumesData || [])
      } catch (error) {
        console.error("Error loading dashboard:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [supabase])

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter((r) => r.id !== id))
  }

  if (isLoading) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background">
      <DashboardHeader userEmail={userEmail} />

      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">My Resumes</h2>
            <p className="text-muted-foreground mt-2">Create and manage your professional resumes</p>
          </div>
          <Link href="/editor/new">
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              New Resume
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Resumes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{resumes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">
                {resumes.length > 0 ? new Date(resumes[0].updated_at).toLocaleDateString() : "—"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Templates Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{new Set(resumes.map((r) => r.template_id)).size || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Resumes Grid */}
        {resumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                id={resume.id}
                title={resume.title}
                updatedAt={resume.updated_at}
                templateId={resume.template_id}
                onDelete={handleDeleteResume}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
              <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
              <Link href="/editor/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Resume
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
