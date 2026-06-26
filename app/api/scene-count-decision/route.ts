import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptPath = path.join(
  process.cwd(),
  "docs",
  "scene-count-decision.md"
);

const systemPrompt = fs.readFileSync(promptPath, "utf8");

export async function POST(req: Request) {
  try {
    const { visualExtraction } = await req.json();

    if (!visualExtraction) {
      return NextResponse.json(
        { error: "visualExtraction is required" },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content:
            systemPrompt +
            `

Return JSON only.
Do not include markdown.
Do not include explanations.

Use this exact shape:

{
  "sceneCount": 1,
  "reason": "...",
  "scenes": ["..."]
}
`,
        },
        {
          role: "user",
          content: `Visual Extraction:\n${visualExtraction}`,
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
          error: "Failed to parse scene count JSON",
          raw: outputText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sceneCount: parsed.sceneCount,
      reason: parsed.reason,
      scenes: parsed.scenes,
    });
  } catch (error) {
    console.error("SCENE COUNT DECISION API ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown scene count decision error",
      },
      { status: 500 }
    );
  }
}