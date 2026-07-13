import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sceneBiblePrompt = fs.readFileSync(
  path.join(
    process.cwd(),
    "docs",
    "scene-bible.md"
  ),
  "utf8"
);

type SceneBibleItem = {
  scene: number;
  title: string;
  purpose: string;
  characters: string[];
  environment: string;
  objects: string[];
  actions: string[];
  dialogue: string[];
  viewpoint: string;
  emotion: string;
  mustPreserve: string[];
};

export async function POST(req: Request) {
  try {
    const {
      blueprint,
      visualExtraction,
      characterBible,
      environmentBible,
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
            `Character Bible:\n${JSON.stringify(
              characterBible || {},
              null,
              2
            )}\n\n` +
            `Environment Bible:\n${JSON.stringify(
              environmentBible || {},
              null,
              2
            )}\n\n` +
            `Object Bible:\n${JSON.stringify(
              objectBible || {},
              null,
              2
            )}`,
        },
      ],
    });

    const outputText = response.output_text.trim();

    console.log("SCENE BIBLE RAW");
    console.log(outputText);

    let parsed: unknown;

    try {
      const cleaned = outputText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();

      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        {
          error:
            "Failed to parse scene bible JSON",
          raw: outputText,
        },
        { status: 500 }
      );
    }

    const result =
      parsed &&
      typeof parsed === "object" &&
      Array.isArray(
        (parsed as { scenes?: unknown }).scenes
      )
        ? (
            parsed as {
              scenes: Partial<SceneBibleItem>[];
            }
          ).scenes
        : [];

    const scenes: SceneBibleItem[] = result.map(
      (item, index) => ({
        scene:
          typeof item.scene === "number"
            ? item.scene
            : index + 1,

        title:
          typeof item.title === "string"
            ? item.title
            : `Scene ${index + 1}`,

        purpose:
          typeof item.purpose === "string"
            ? item.purpose
            : "",

        characters: Array.isArray(item.characters)
          ? item.characters.filter(
              (value): value is string =>
                typeof value === "string"
            )
          : [],

        environment:
          typeof item.environment === "string"
            ? item.environment
            : "",

        objects: Array.isArray(item.objects)
          ? item.objects.filter(
              (value): value is string =>
                typeof value === "string"
            )
          : [],

        actions: Array.isArray(item.actions)
          ? item.actions.filter(
              (value): value is string =>
                typeof value === "string"
            )
          : [],

        dialogue: Array.isArray(item.dialogue)
          ? item.dialogue.filter(
              (value): value is string =>
                typeof value === "string"
            )
          : [],

        viewpoint:
          typeof item.viewpoint === "string"
            ? item.viewpoint
            : "",

        emotion:
          typeof item.emotion === "string"
            ? item.emotion
            : "",

        mustPreserve: Array.isArray(
          item.mustPreserve
        )
          ? item.mustPreserve.filter(
              (value): value is string =>
                typeof value === "string"
            )
          : [],
      })
    );

    return NextResponse.json({
      scenes,
    });
  } catch (error) {
    console.error(
      "SCENE BIBLE ERROR =",
      error
    );

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