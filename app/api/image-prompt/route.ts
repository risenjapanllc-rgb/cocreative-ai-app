import { compilePrompt } from "@/lib/prompt-compiler";
import { buildWitnessWorld } from "@/lib/world";
import { createJournalEntry } from "@/lib/world/history";
import { updateWorld } from "@/lib/world/world-updater";
import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptFiles = [
  // Core Prompt
  "prompts/image-prompt-generator.md",

  // Translation Layer
  "prompts/cinematic-translation.md",

  // Lock Layer
  "prompts/locks/director-lock.md",
  "prompts/locks/identity-lock.md",
  "prompts/locks/room-lock.md",
  "prompts/locks/impossible-condition-lock.md",
  "prompts/locks/scene-continuity-lock.md",

  // Supporting Guides
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
  return [
    {
      scene: 1,
      title: "Scene 1",
      prompt: outputText.replace(/^Image Prompt:\s*/i, "").trim(),
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
      characterBible,
      environmentBible,
      compositionBible,
      objectBible,
      sceneBible,
    } = await req.json();

    console.log("SYSTEM PROMPT LENGTH =", systemPrompt.length);
    console.log("CHARACTER BIBLE LENGTH =", JSON.stringify(characterBible || {}).length);
    console.log("ENVIRONMENT BIBLE LENGTH =", JSON.stringify(environmentBible || {}).length);
    console.log("COMPOSITION BIBLE LENGTH =", JSON.stringify(compositionBible || {}).length);
    console.log("OBJECT BIBLE LENGTH =", JSON.stringify(objectBible || {}).length);
    console.log("SCENE BIBLE LENGTH =", JSON.stringify(sceneBible || {}).length);

    const witnessWorld = buildWitnessWorld({
      characterBible,
      environmentBible,
      compositionBible,
      objectBible,
      sceneBible,
    });
    const updatedWorld = updateWorld({
      world: witnessWorld.world.world,
      whatHappened,
      whatRemained,
      namedEmotions,
    });

witnessWorld.world.world = updatedWorld;

    console.log("WITNESS WORLD =", JSON.stringify(witnessWorld, null, 2));

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: compilePrompt({
        witnessWorld,
      }),
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

    const journalEntry = createJournalEntry({
      world: witnessWorld.world.world,
      director: witnessWorld.director,
      imagePrompt: imagePrompts[0]?.prompt ?? "",
      whatHappened,
      whatRemained,
      namedEmotions,
});

    console.log("IMAGE_PROMPTS =", JSON.stringify(imagePrompts, null, 2));

    return NextResponse.json({
      characterBible,
      environmentBible,
      compositionBible,
      objectBible,
      sceneBible,
      witnessWorld,
      journalEntry,
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