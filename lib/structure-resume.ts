import { GoogleGenerativeAI } from "@google/generative-ai";

const RESUME_SCHEMA_EXAMPLE = `{
  "hero": { "name": "", "title": "", "tagline": "" },
  "experience": [
    { "date": "", "role": "", "company": "", "location": "", "summary": "", "highlights": [] }
  ],
  "projects": [
    { "title": "", "description": "", "image": "", "ctaText": "View Project", "ctaLink": "", "overview": "", "keyFeatures": [], "technologies": [] }
  ]
}`;

/**
 * Turns raw resume text into structured JSON matching the site's schema,
 * using Gemini (cheap/fast) instead of the Claude API.
 */
export async function structureResume(
  rawText: string,
  existingProjects: any[]
): Promise<object> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

  const prompt = `You are extracting structured resume data from raw resume text.

Return ONLY a single JSON object matching exactly this schema (no markdown fences, no commentary, no extra keys, no trailing text):

${RESUME_SCHEMA_EXAMPLE}

Rules:
- Only use facts explicitly present in the resume text below. Do NOT invent, infer, or embellish dates, employers, titles, metrics, or project details that are not stated in the text.
- "highlights" and "keyFeatures" should be short bullet-style strings pulled directly from the resume text.
- For each project you extract, compare its "title" (case-insensitive) against this list of existing projects already on the site:

${JSON.stringify(existingProjects, null, 2)}

  - If a resume project matches an existing project by title, reuse that existing project's "image" and "ctaLink" values exactly as given above, and only update the other text fields (description, overview, keyFeatures, technologies) from the resume text.
  - If a resume project does NOT match any existing project by title, set "image" to "" and "ctaLink" to "".
- If the resume text doesn't contain enough information for a field, use an empty string or empty array rather than guessing.

Resume text:
"""
${rawText}
"""`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  const cleaned = responseText
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(
      `Gemini response was not valid JSON: ${(err as Error).message}\n` +
        `Raw response:\n${responseText}`
    );
  }
}
