import { createClient } from "@/lib/supabase/server"
import { randomBytes } from "crypto"

export async function POST(request: Request) {
  try {
    const { resumeId } = await request.json()

    if (!resumeId) {
      return Response.json({ error: "Resume ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify resume belongs to user
    const { data: resume, error: resumeError } = await supabase
      .from("resumes")
      .select("id")
      .eq("id", resumeId)
      .eq("user_id", user.id)
      .single()

    if (resumeError || !resume) {
      return Response.json({ error: "Resume not found" }, { status: 404 })
    }

    // Check if share already exists
    const { data: existingShare } = await supabase
      .from("shared_resumes")
      .select("share_token")
      .eq("resume_id", resumeId)
      .single()

    if (existingShare) {
      return Response.json({ shareToken: existingShare.share_token })
    }

    // Create new share
    const shareToken = randomBytes(16).toString("hex")

    const { error: insertError } = await supabase.from("shared_resumes").insert({
      resume_id: resumeId,
      share_token: shareToken,
    })

    if (insertError) throw insertError

    return Response.json({ shareToken })
  } catch (error) {
    console.error("Share error:", error)
    return Response.json({ error: "Failed to create share" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { resumeId } = await request.json()

    if (!resumeId) {
      return Response.json({ error: "Resume ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase.from("shared_resumes").delete().eq("resume_id", resumeId)

    if (error) throw error

    return Response.json({ success: true })
  } catch (error) {
    console.error("Unshare error:", error)
    return Response.json({ error: "Failed to remove share" }, { status: 500 })
  }
}
