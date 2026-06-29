import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sceneBiblePrompt = fs.readFileSync(
  path.join(process.cwd(), "docs", "scene-bible.md"),
  "utf8"
);

export async function POST(req: Request) {
  try {
    const {
      blueprint,
      visualExtraction,
      characterBible,
      environmentBible,
      compositionBible,
      objectBible,
    } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content:
            sceneBiblePrompt +
            `

Return JSON only.
Do not include markdown.
Do not include explanations.

Use exactly this JSON shape:

{
  "scenes": [
    {
      "scene": 1,
      "title": "",
      "purpose": "",
      "characters": [],
      "environment": "",
      "objects": [],
      "actions": [],
      "dialogue": [],
      "viewpoint": "",
      "emotion": "",
      "mustPreserve": []
    }
  ]
}
`,
        },
        {
          role: "user",
          content:
            `Blueprint:\n${blueprint || ""}\n\n` +
            `Visual Extraction:\n${visualExtraction || ""}\n\n` +
            `Character Bible:\n${JSON.stringify(characterBible || {}, null, 2)}\n\n` +
            `Environment Bible:\n${JSON.stringify(environmentBible || {}, null, 2)}\n\n` +
            `Composition Bible:\n${JSON.stringify(compositionBible || {}, null, 2)}\n\n` +
            `Object Bible:\n${JSON.stringify(objectBible || {}, null, 2)}`,
        },
      ],
    });

    const outputText = response.output_text.trim();

    console.log("SCENE BIBLE RAW");
    console.log(outputText);

    let parsed: any;

    try {
      parsed = JSON.parse(outputText);
    } catch {
      return NextResponse.json(
        {
          error: "Failed to parse scene bible JSON",
          raw: outputText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      scenes: Array.isArray(parsed.scenes) ? parsed.scenes : [],
    });
  } catch (error) {
    console.error("SCENE BIBLE ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "scene bible failed",
      },
      { status: 500 }
    );
  }
}