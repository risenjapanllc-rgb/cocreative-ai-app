import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const characterBiblePrompt = fs.readFileSync(
  path.join(process.cwd(), "docs", "character-bible.md"),
  "utf8"
);

export async function POST(req: Request) {
  try {
    const { blueprint, visualExtraction } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content:
            characterBiblePrompt +
            `

Return JSON only.
Do not include markdown.
Do not include explanations.
`,
        },
        {
          role: "user",
          content:
            `Blueprint:\n${blueprint || ""}\n\n` +
            `Visual Extraction:\n${visualExtraction || ""}`,
        },
      ],
    });

    const outputText = response.output_text.trim();

    let parsed;

try {
  const cleaned = outputText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  parsed = JSON.parse(cleaned);
} catch (error) {
  console.error("RAW OUTPUT =", outputText);

  return NextResponse.json(
    {
      error: "Failed to parse character bible JSON",
      raw: outputText,
    },
    { status: 500 }
  );
}

return NextResponse.json({
  characters: Array.isArray(parsed.characters)
    ? parsed.characters
    : [],
});
} catch (error) {
  console.error("CHARACTER BIBLE ERROR =", error);

  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : "character bible failed",
    },
    { status: 500 }
  );
}
}