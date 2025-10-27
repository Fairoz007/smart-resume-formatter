import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { text, type } = await request.json()

    if (!text) {
      return Response.json({ error: "Text is required" }, { status: 400 })
    }

    let prompt = ""

    switch (type) {
      case "enhance":
        prompt = `Improve the following resume text to be more professional, impactful, and ATS-friendly. Keep it concise but compelling:\n\n${text}`
        break
      case "expand":
        prompt = `Expand the following resume bullet point with more specific achievements and metrics:\n\n${text}`
        break
      case "tailor":
        prompt = `Tailor the following resume content to be more relevant for a job description. Make it more specific and impactful:\n\n${text}`
        break
      default:
        return Response.json({ error: "Invalid enhancement type" }, { status: 400 })
    }

    const { text: enhancedText } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
      temperature: 0.7,
      maxTokens: 500,
    })

    return Response.json({ enhanced: enhancedText })
  } catch (error) {
    console.error("Enhancement error:", error)
    return Response.json({ error: "Failed to enhance text" }, { status: 500 })
  }
}
