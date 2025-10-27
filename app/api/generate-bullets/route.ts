import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { jobTitle, company, description } = await request.json()

    if (!jobTitle || !company) {
      return Response.json({ error: "Job title and company are required" }, { status: 400 })
    }

    const prompt = `Generate 3-4 professional resume bullet points for someone who worked as a ${jobTitle} at ${company}. ${description ? `Context: ${description}` : ""} Make them specific, achievement-focused, and include metrics where possible. Format as a numbered list.`

    const { text: bullets } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.7,
      maxTokens: 400,
    })

    return Response.json({ bullets })
  } catch (error) {
    console.error("Generation error:", error)
    return Response.json({ error: "Failed to generate bullets" }, { status: 500 })
  }
}
