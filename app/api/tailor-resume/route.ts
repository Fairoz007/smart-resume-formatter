import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { resumeContent, jobDescription } = await request.json()

    if (!resumeContent || !jobDescription) {
      return Response.json({ error: "Resume content and job description are required" }, { status: 400 })
    }

    const prompt = `You are an expert resume writer. Tailor the following resume to match the job description provided. Focus on highlighting relevant skills and experiences that match the job requirements. Keep the same structure but reorder and reword content to emphasize relevant qualifications.

Resume:
${JSON.stringify(resumeContent, null, 2)}

Job Description:
${jobDescription}

Provide the tailored resume content in the same JSON format as the input resume.`

    const { text: tailoredContent } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    return Response.json({ tailored: tailoredContent })
  } catch (error) {
    console.error("Tailoring error:", error)
    return Response.json({ error: "Failed to tailor resume" }, { status: 500 })
  }
}
