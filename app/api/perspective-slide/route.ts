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
  "perspective-slide-generator.md"
);

const systemPrompt = fs.readFileSync(promptPath, "utf8");

export async function POST(req: Request) {
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

  const outputText = response.output_text;

  const perspectiveSlide = outputText
    .replace(/^Perspective Slide:\s*/i, "")
    .trim();

  console.log("PERSPECTIVE_SLIDE =", JSON.stringify(perspectiveSlide));

  return NextResponse.json({
    perspectiveSlide,
  });
}