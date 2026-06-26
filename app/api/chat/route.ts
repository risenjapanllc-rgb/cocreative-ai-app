import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const promptFiles = [
  "prompts/co-creative-ai.md",
  "prompts/image-prompt-generator.md",
  "docs/cocreative-ai-standard.md",
  "docs/dialogue-engine-v2.md",
  "docs/pattern-recognition.md",
  "docs/recognition.md",
  "docs/testimony-quality-standard.md",
  "docs/visual-clarification.md",   // ←追加
  "docs/visual-extraction.md",
  "docs/visual-extraction-fidelity.md",
  "docs/cinematic-translation.md",
];


const systemPrompt = promptFiles
  .map((file) => fs.readFileSync(path.join(process.cwd(), file), "utf8"))
  .join("\n\n━━━━━━━━━━━━━━━━━━\n\n");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const latestMessage = messages[messages.length - 1]?.text || "";

    let route = "testimony";

if (
  latestMessage.includes("確認完了") ||
  latestMessage.includes("この内容で画像") ||
  latestMessage.includes("これで画像") ||
  latestMessage.includes("この情報で画像") ||
  latestMessage.includes("画像生成") ||
  latestMessage.includes("プロンプト生成") ||
  latestMessage.includes("もう描いて") ||
  latestMessage.includes("これで描いて")
) {
  route = "visual-output";
} else if (
  latestMessage.includes("どう思う") ||
  latestMessage.includes("どう見える") ||
  latestMessage.includes("何歳")
) {
  route = "observation-request";
} else if (
  latestMessage.includes("絵にして") ||
  latestMessage.includes("画像") ||
  latestMessage.includes("描いて") ||
  latestMessage.includes("作画") ||
  latestMessage.includes("イラスト")
) {
  route = "visual-clarification";
} else if (
  latestMessage.includes("ひどい") ||
  latestMessage.includes("最悪") ||
  latestMessage.includes("違う")
) {
  route = "criticism";
} else if (
  latestMessage.includes("なぜ") ||
  latestMessage.includes("サボる") ||
  latestMessage.includes("できない")
) {
  route = "challenge";
}

    console.log("ROUTE =", route);

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content:
            systemPrompt +
            `

Current Route: ${route}

Follow the Dialogue Router.
Prioritize the current route over default witness reflection.

VISUAL ROUTE GUARD

If Current Route is visual-clarification:

The assistant is acting as a visual reference interviewer.

Do not ask about:

- emotions
- what remained
- meaning
- recognition
- lessons
- spiritual interpretation

Only ask questions that directly improve
visual fidelity.

Ask at most 5 concise questions.

Prefer questions about:

- appearance
- clothing
- hairstyle
- room layout
- spatial relationships
- sequence of actions
- details that must never change

If enough visual information already exists,
ask only:

"What must never be changed in the image?"

After clarification,
wait for the participant's answer.

Do not continue to Visual Extraction
until the participant confirms.

DO NOT generate Visual Form.

DO NOT generate Image Prompt.

DO NOT generate imagePrompts.

First determine whether enough witness-critical visual information exists.

If important visual information is missing,
ask only the missing visual questions.

Examples include:

* appearance
* age appearance
* clothing
* hairstyle
* spatial relationship
* order of events
* witness perspective
* elements that must never change

Do NOT ask emotional questions
unless they directly affect visual fidelity.

If the witness answers "unknown",
preserve it as unknown.

Do NOT invent missing details.

Only when visual information is sufficiently complete,
proceed to visual-output.

If sufficient witness-critical visual information
already exists,

DO NOT ask unnecessary clarification questions.

Proceed directly to visual-output.

━━━━━━━━━━━━━━━━━━

If Current Route is visual-output,
return either:

1. Visual Form + Image Prompt

OR

2. JSON with imagePrompts.

If multiple scenes are needed,
return JSON only:

{
"imagePrompts": [
{
"scene": 1,
"title": "...",
"prompt": "..."
}
]
}

Do not use diptych,
split-screen,
collage,
or multi-panel composition
unless explicitly requested.

━━━━━━━━━━━━━━━━━━

If Current Route is NOT visual-output,

DO NOT include:

Visual Form:
Image Prompt:
imagePrompts

A testimony alone is not sufficient
to generate visual output.

Unknown information is preferable
to invented information.

Never invent witness-critical details.

`,
        },
        ...messages.map((message: { role: string; text: string }) => ({
          role: message.role === "共創思考AI" ? "assistant" : "user",
          content: message.text,
        })),
      ],
    });

    const outputText = response.output_text.trim();

    console.log("OUTPUT_TEXT =");
    console.log(outputText);

    let parsedImagePrompts: any[] | null = null;

    try {
      const parsed = JSON.parse(outputText);

      if (Array.isArray(parsed.imagePrompts)) {
        parsedImagePrompts = parsed.imagePrompts;
      }
    } catch {
      parsedImagePrompts = null;
    }

    const getSection = (name: string) => {
      const lines = outputText.split(/\r?\n/);

      const headings = [
        "What Happened:",
        "What Remained:",
        "Named Emotions:",
        "Core Recognition:",
        "Core Emotion:",
        "Core Word / Message:",
        "Gifted Word:",
        "Core Meaning:",
        "Visual Form:",
        "Image Prompt:",
        "One Line Essence:",
      ];

      const startIndex = lines.findIndex(
        (line) => line.trim().toLowerCase() === `${name}:`.toLowerCase()
      );

      if (startIndex === -1) return "";

      const collected: string[] = [];

      for (let i = startIndex + 1; i < lines.length; i++) {
        const current = lines[i].trim();

        const isHeading = headings.some(
          (heading) => current.toLowerCase() === heading.toLowerCase()
        );

        if (isHeading) break;

        collected.push(lines[i]);
      }

      return collected.join("\n").trim();
    };

    const whatHappened = getSection("What Happened");
    const whatRemained = getSection("What Remained");
    const namedEmotions = getSection("Named Emotions");

    const recognition = getSection("Core Recognition");
    const coreEmotion = getSection("Core Emotion");
    const coreWord = getSection("Core Word / Message");
    const giftedWord = getSection("Gifted Word");
    const coreMeaning = getSection("Core Meaning");
    const visualForm = getSection("Visual Form");
    const imagePrompt = getSection("Image Prompt");
    const essence = getSection("One Line Essence");

    const witnessNotes = whatRemained || recognition || "";

    const visibleText = outputText
      .split(/\n\s*What Happened:\s*\n/i)[0]
      .trim();

    console.log("VISUAL_FORM =", JSON.stringify(visualForm));
    console.log("IMAGE_PROMPT =", JSON.stringify(imagePrompt));
    console.log("IMAGE_PROMPTS =", JSON.stringify(parsedImagePrompts));
    console.log("WHAT_HAPPENED =", JSON.stringify(whatHappened));
    console.log("WHAT_REMAINED =", JSON.stringify(whatRemained));
    console.log("NAMED_EMOTIONS =", JSON.stringify(namedEmotions));

    return NextResponse.json({
      text: visibleText,

      whatHappened,
      whatRemained,
      namedEmotions,

      witnessNotes,
      presence: coreEmotion,
      recognition,
      visualForm,
      imagePrompt: parsedImagePrompts?.[0]?.prompt ?? imagePrompt,
      imagePrompts: parsedImagePrompts,
      coreEmotion,
      coreMeaning,
      coreWord,
      giftedWord,
      essence,
    });
  } catch (error) {
    console.error("CHAT API ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown chat API error",
      },
      { status: 500 }
    );
  }
}