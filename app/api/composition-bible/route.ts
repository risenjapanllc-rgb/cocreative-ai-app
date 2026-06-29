import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const compositionBiblePrompt = fs.readFileSync(
  path.join(process.cwd(), "docs", "composition-bible.md"),
  "utf8"
);

export async function POST(req: Request) {
  try {
    const {
      blueprint,
      visualExtraction,
      characterBible,
      environmentBible,
    } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content:
            compositionBiblePrompt +
            `

Return JSON only.
Do not include markdown.
Do not include explanations.

Use exactly this JSON shape:

{
  "composition": {
    "camera": {
      "viewpoint": "",
      "position": "",
      "height": "",
      "direction": "",
      "framing": "",
      "lensFeeling": ""
    },
    "layout": {
      "foreground": [],
      "middleGround": [],
      "background": [],
      "leftSide": [],
      "rightSide": [],
      "fixedElements": []
    },
    "characterPlacement": [
      {
        "character": "",
        "position": "",
        "orientation": "",
        "lookingAt": "",
        "distance": ""
      }
    ],
    "focus": {
      "primary": "",
      "secondary": ""
    },
    "continuity": {
      "sameAcrossScenes": true
    }
  }
}
`,
        },
        {
          role: "user",
          content:
            `Blueprint:\n${blueprint || ""}\n\n` +
            `Visual Extraction:\n${visualExtraction || ""}\n\n` +
            `Character Bible:\n${JSON.stringify(
              characterBible || {},
              null,
              2
            )}\n\n` +
            `Environment Bible:\n${JSON.stringify(
              environmentBible || {},
              null,
              2
            )}`,
        },
      ],
    });

    const outputText = response.output_text.trim();

    console.log("COMPOSITION BIBLE RAW");
    console.log(outputText);

    let parsed: any;

    try {
      parsed = JSON.parse(outputText);
    } catch {
      return NextResponse.json(
        {
          error: "Failed to parse composition bible JSON",
          raw: outputText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      composition: parsed.composition || null,
    });
  } catch (error) {
    console.error("COMPOSITION BIBLE ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "composition bible failed",
      },
      { status: 500 }
    );
  }
}