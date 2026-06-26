import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fidelityPrompt = fs.readFileSync(
  path.join(process.cwd(), "docs", "visual-fidelity-check.md"),
  "utf8"
);

export async function POST(req: Request) {
  try {
    const {
      testimony,
      visualExtraction,
      imagePrompt,
      generatedImage,
    } = await req.json();

    if (!testimony && !visualExtraction && !imagePrompt && !generatedImage) {
      return NextResponse.json(
        { error: "Nothing to check" },
        { status: 400 }
      );
    }

    const content: any[] = [
      {
        type: "input_text",
        text:
          fidelityPrompt +
          `

Return JSON only.
Do not include markdown.

Use this shape:

{
  "result": "PASS or FAIL",
  "preserved": [],
  "lost": [],
  "invented": [],
  "overallAssessment": "faithful | partially faithful | unfaithful"
}

Testimony:
${testimony || ""}

Visual Extraction:
${visualExtraction || ""}

Image Prompt:
${imagePrompt || ""}
`,
      },
    ];

    if (generatedImage) {
      content.push({
        type: "input_image",
        image_url: generatedImage,
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "user",
          content,
        },
      ],
    });

    const outputText = response.output_text.trim();

    let parsed;

    try {
      parsed = JSON.parse(outputText);
    } catch {
      return NextResponse.json({
        result: "UNKNOWN",
        report: outputText,
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("VISUAL FIDELITY CHECK ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "visual fidelity check failed",
      },
      { status: 500 }
    );
  }
}