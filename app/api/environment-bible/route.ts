import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const environmentBiblePrompt = fs.readFileSync(
  path.join(process.cwd(), "docs", "environment-bible.md"),
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
            environmentBiblePrompt +
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
      parsed = JSON.parse(outputText);
    } catch {
      return NextResponse.json(
        {
          error: "Failed to parse environment bible JSON",
          raw: outputText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      environment: parsed.environment || null,
    });
  } catch (error) {
    console.error("ENVIRONMENT BIBLE ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "environment bible failed",
      },
      { status: 500 }
    );
  }
}