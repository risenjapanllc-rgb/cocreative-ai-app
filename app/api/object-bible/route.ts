import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const objectBiblePrompt = fs.readFileSync(
  path.join(process.cwd(), "docs", "object-bible.md"),
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
    } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content:
            objectBiblePrompt +
            `

Return JSON only.
Do not include markdown.
Do not include explanations.

Use exactly this JSON shape:

{
  "objects": [
    {
      "id": "",
      "name": "",
      "category": "",
      "owner": "",
      "appearance": {
        "color": "",
        "material": "",
        "shape": "",
        "size": ""
      },
      "location": "",
      "importance": "",
      "mustPreserve": [],
      "neverBecome": [],
      "continuity": {
        "sameAcrossScenes": true
      }
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
            `Composition Bible:\n${JSON.stringify(compositionBible || {}, null, 2)}`,
        },
      ],
    });

    const outputText = response.output_text.trim();

    console.log("OBJECT BIBLE RAW");
    console.log(outputText);

    let parsed: any;

    try {
      parsed = JSON.parse(outputText);
    } catch {
      return NextResponse.json(
        {
          error: "Failed to parse object bible JSON",
          raw: outputText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      objects: Array.isArray(parsed.objects) ? parsed.objects : [],
    });
  } catch (error) {
    console.error("OBJECT BIBLE ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "object bible failed",
      },
      { status: 500 }
    );
  }
}