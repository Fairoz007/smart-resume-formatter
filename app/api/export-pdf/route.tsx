import { createClient } from "@/lib/supabase/server"

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

    const { data: resume, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", resumeId)
      .eq("user_id", user.id)
      .single()

    if (error || !resume) {
      return Response.json({ error: "Resume not found" }, { status: 404 })
    }

    // Generate HTML content from resume data
    const htmlContent = generateResumeHTML(resume.content, resume.template_id)

    // Return HTML that can be printed to PDF
    return new Response(htmlContent, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="${resume.title}.html"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return Response.json({ error: "Failed to export resume" }, { status: 500 })
  }
}

function generateResumeHTML(content: any, template: string): string {
  const { personalInfo, experience, education, skills } = content

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${personalInfo.fullName} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 8.5in; height: 11in; margin: 0 auto; padding: 0.5in; background: white; }
        h1 { font-size: 28px; margin-bottom: 5px; }
        h2 { font-size: 14px; font-weight: bold; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #333; padding-bottom: 5px; }
        .header { margin-bottom: 15px; }
        .contact { font-size: 12px; color: #666; margin-top: 5px; }
        .section { margin-bottom: 15px; }
        .entry { margin-bottom: 10px; }
        .entry-title { font-weight: bold; }
        .entry-subtitle { color: #666; font-size: 12px; }
        .entry-date { float: right; color: #666; font-size: 12px; }
        .entry-description { font-size: 12px; margin-top: 5px; }
        .skills { display: flex; flex-wrap: wrap; gap: 8px; font-size: 12px; }
        .skill-tag { background: #f0f0f0; padding: 4px 8px; border-radius: 4px; }
        @media print { body { margin: 0; padding: 0; } .container { margin: 0; padding: 0.5in; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${personalInfo.fullName || "Your Name"}</h1>
          <div class="contact">
            ${personalInfo.email ? `${personalInfo.email}` : ""} 
            ${personalInfo.phone ? `| ${personalInfo.phone}` : ""} 
            ${personalInfo.location ? `| ${personalInfo.location}` : ""}
          </div>
        </div>

        ${personalInfo.summary ? `<p style="font-size: 12px; margin-bottom: 10px;">${personalInfo.summary}</p>` : ""}

        ${
          experience.length > 0
            ? `
          <div class="section">
            <h2>Work Experience</h2>
            ${experience
              .map(
                (exp: any) => `
              <div class="entry">
                <div class="entry-title">${exp.position}</div>
                <div class="entry-subtitle">${exp.company}</div>
                <div class="entry-date">${exp.startDate} ${exp.endDate ? `- ${exp.endDate}` : "- Present"}</div>
                ${exp.description ? `<div class="entry-description">${exp.description}</div>` : ""}
              </div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }

        ${
          education.length > 0
            ? `
          <div class="section">
            <h2>Education</h2>
            ${education
              .map(
                (edu: any) => `
              <div class="entry">
                <div class="entry-title">${edu.degree} in ${edu.field}</div>
                <div class="entry-subtitle">${edu.school}</div>
                <div class="entry-date">${edu.graduationDate}</div>
              </div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }

        ${
          skills.length > 0
            ? `
          <div class="section">
            <h2>Skills</h2>
            <div class="skills">
              ${skills.map((skill: string) => `<span class="skill-tag">${skill}</span>`).join("")}
            </div>
          </div>
        `
            : ""
        }
      </div>
    </body>
    </html>
  `
}
