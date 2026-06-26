import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptPath = path.join(
  process.cwd(),
  "prompts",
  "visual-extraction-generator.md"
);

const systemPrompt = fs.readFileSync(promptPath, "utf8");

export async function POST(req: Request) {
  const { whatHappened, whatRemained, namedEmotions } = await req.json();

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
          `Named Emotions:\n${namedEmotions || ""}`,
      },
    ],
  });

  const outputText = response.output_text;

  const visualForm = outputText
    .replace(/^Visual Extraction:\s*/i, "")
    .replace(/^Visual Form:\s*/i, "")
    .trim();

  console.log("VISUAL_EXTRACTION =", JSON.stringify(visualForm));

  return NextResponse.json({
    visualForm,
  });
}

