const pdfParse = require("pdf-parse");

/**
 * Extracts raw text from a resume file. PDF only.
 * (DOCX support intentionally removed — PDF-only keeps the dependency
 * surface small: just `pdf-parse`, no `mammoth`.)
 */
export async function extractText(
  file: Buffer,
  mimeType: string
): Promise<string> {
  if (mimeType !== "application/pdf") {
    throw new Error(
      `Unsupported file type: "${mimeType}". Only PDF resumes are supported.`
    );
  }

  const result = await pdfParse(file);
  return result.text;
}
