import { NextRequest, NextResponse } from "next/server";
import { extractText } from "@/lib/parse-resume";
import { structureResume } from "@/lib/structure-resume";
import { commitResumeData } from "@/lib/github-commit";
import resumeData from "@/data/resume.json";

export async function POST(req: NextRequest) {
  try {
    const requiredSecret = process.env.ADMIN_PASSWORD;
    if (requiredSecret) {
      const provided = req.headers.get("x-upload-secret");
      if (provided !== requiredSecret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const formData = await req.formData();
    const file = formData.get("resume");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing 'resume' file field" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          error: `Unsupported file type: "${file.type}". Only PDF resumes are supported.`,
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Step 1: Extracting raw text from PDF...");
    const rawText = await extractText(buffer, file.type);
    console.log(`-> Successfully extracted ${rawText.length} characters of text.`);

    console.log("Step 2: Structuring resume data with Gemini AI...");
    const structured = await structureResume(rawText, resumeData.projects);
    console.log("-> Successfully structured data into JSON.");

    console.log("Step 3: Committing to GitHub...");
    await commitResumeData(structured);
    console.log("-> Successfully committed to GitHub!");

    return NextResponse.json({
      success: true,
      message:
        "Committed to GitHub. Vercel will redeploy automatically in a minute or two.",
      data: structured,
    });
  } catch (err) {
    console.error("Resume upload failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
