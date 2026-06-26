import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const repairPrompt = fs.readFileSync(
  path.join(
    process.cwd(),
    "docs",
    "image-repair-prompt-generator.md"
  ),
  "utf8"
);

export async function POST(req: Request) {
  try {
    const {
      testimony,
      visualExtraction,
      imagePrompt,
      fidelityReport,
    } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content:
            repairPrompt +
            `

Return JSON only.

Use this exact format:

{
  "repairPrompt": "...",
  "criticalRepairs": [
    "...",
    "..."
  ]
}
`,
        },
        {
          role: "user",
          content:
            `Testimony:\n${testimony || ""}\n\n` +
            `Visual Extraction:\n${visualExtraction || ""}\n\n` +
            `Original Image Prompt:\n${imagePrompt || ""}\n\n` +
            `Visual Fidelity Report:\n${fidelityReport || ""}`,
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
          error: "Failed to parse repair prompt JSON",
          raw: outputText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      repairPrompt: parsed.repairPrompt || "",
      criticalRepairs: Array.isArray(parsed.criticalRepairs)
        ? parsed.criticalRepairs
        : [],
    });
  } catch (error) {
    console.error(
      "IMAGE REPAIR PROMPT API ERROR =",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown repair prompt error",
      },
      { status: 500 }
    );
  }
}