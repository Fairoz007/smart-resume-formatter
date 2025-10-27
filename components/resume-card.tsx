"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Edit, Trash2, Copy } from "lucide-react"

interface ResumeCardProps {
  id: string
  title: string
  updatedAt: string
  templateId: string
  onDelete: (id: string) => void
}

export function ResumeCard({ id, title, updatedAt, templateId, onDelete }: ResumeCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    setIsDeleting(true)
    try {
      const { error } = await supabase.from("resumes").delete().eq("id", id)
      if (error) throw error
      onDelete(id)
    } catch (error) {
      console.error("Error deleting resume:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDuplicate = async () => {
    try {
      const { data: resume, error: fetchError } = await supabase.from("resumes").select("*").eq("id", id).single()

      if (fetchError) throw fetchError

      const { error: insertError } = await supabase.from("resumes").insert({
        title: `${resume.title} (Copy)`,
        content: resume.content,
        template_id: resume.template_id,
      })

      if (insertError) throw insertError
      window.location.reload()
    } catch (error) {
      console.error("Error duplicating resume:", error)
    }
  }

  const templateNames: Record<string, string> = {
    modern: "Modern",
    classic: "Classic",
    minimal: "Minimal",
    creative: "Creative",
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="truncate text-lg">{title}</CardTitle>
            <CardDescription className="text-xs mt-1">
              {templateNames[templateId] || templateId} • Updated {new Date(updatedAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/editor/${id}`} className="flex items-center gap-2 cursor-pointer">
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate} className="flex items-center gap-2 cursor-pointer">
                <Copy className="h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 cursor-pointer text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/editor/${id}`}>
          <Button className="w-full">Edit Resume</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
