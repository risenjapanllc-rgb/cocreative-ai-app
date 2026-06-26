import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptFiles = [
  "prompts/image-prompt-generator.md",
  "docs/identity-fidelity.md",
  "docs/perspective-selection.md",
  "docs/scene-count-decision.md",
];

const systemPrompt = promptFiles
  .map((file) => fs.readFileSync(path.join(process.cwd(), file), "utf8"))
  .join("\n\n━━━━━━━━━━━━━━━━━━\n\n");

type ImagePromptScene = {
  scene: number;
  title: string;
  prompt: string;
};

function fallbackToSinglePrompt(outputText: string): ImagePromptScene[] {
  const imagePrompt = outputText
    .replace(/^Image Prompt:\s*/i, "")
    .trim();

  return [
    {
      scene: 1,
      title: "Scene 1",
      prompt: imagePrompt,
    },
  ];
}

export async function POST(req: Request) {
  try {
    const {
      whatHappened,
      whatRemained,
      namedEmotions,
      visualExtraction,
    } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content:
            `What Happened:\n${whatHappened || ""}\n\n` +
            `What Remained:\n${whatRemained || ""}\n\n` +
            `Named Emotions:\n${namedEmotions || ""}\n\n` +
            `Visual Extraction:\n${visualExtraction || ""}`,
        },
      ],
    });

    const outputText = response.output_text.trim();

    let imagePrompts: ImagePromptScene[];

    try {
      const parsed = JSON.parse(outputText);

      if (Array.isArray(parsed.imagePrompts)) {
        imagePrompts = parsed.imagePrompts.map(
          (item: Partial<ImagePromptScene>, index: number) => ({
            scene: typeof item.scene === "number" ? item.scene : index + 1,
            title: item.title || `Scene ${index + 1}`,
            prompt: item.prompt || "",
          })
        );
      } else if (typeof parsed.imagePrompt === "string") {
        imagePrompts = [
          {
            scene: 1,
            title: "Scene 1",
            prompt: parsed.imagePrompt,
          },
        ];
      } else {
        imagePrompts = fallbackToSinglePrompt(outputText);
      }
    } catch {
      imagePrompts = fallbackToSinglePrompt(outputText);
    }

    imagePrompts = imagePrompts.filter((item) => item.prompt.trim());

    console.log("IMAGE_PROMPTS =", JSON.stringify(imagePrompts, null, 2));

    return NextResponse.json({
      imagePrompts,
      imagePrompt: imagePrompts[0]?.prompt ?? "",
    });
  } catch (error) {
    console.error("IMAGE PROMPT API ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown image prompt error",
      },
      { status: 500 }
    );
  }
}