import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptPath = path.join(
  process.cwd(),
  "prompts",
  "co-creative-ai.md"
);

const systemPrompt = fs.readFileSync(promptPath, "utf8");

const historyPath = path.join(
  process.cwd(),
  "docs",
  "co-creative-history.md"
);

const historyPrompt = fs.readFileSync(historyPath, "utf8");

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "system",
        content: systemPrompt + "\n\n" + historyPrompt,
      },
      ...messages.map((message: { role: string; text: string }) => ({
        role: message.role === "共創思考AI" ? "assistant" : "user",
        content: message.text,
      })),
    ],
  });

  const outputText = response.output_text;

  const witnessNotesMatch = outputText.match(
    /What Remained\s*\n([\s\S]*?)(\n\n|Core Emotion|Core Word \/ Message|Gifted Word|Core Meaning|Visual Form|Image Prompt|One Line Essence|$)/
  );

  const recognitionMatch = outputText.match(
    /Core Recognition\s*\n([\s\S]*?)(\n\n|What Remained|Core Emotion|Core Word \/ Message|Gifted Word|Core Meaning|Visual Form|Image Prompt|One Line Essence|$)/
  );

  const coreEmotionMatch = outputText.match(
    /Core Emotion\s*\n([\s\S]*?)(\n\n|Core Word \/ Message|Gifted Word|Core Meaning|Visual Form|Image Prompt|One Line Essence|$)/
  );

  const coreWordMatch = outputText.match(
    /Core Word \/ Message\s*\n([\s\S]*?)(\n\n|Gifted Word|Core Meaning|Visual Form|Image Prompt|One Line Essence|$)/
  );

  const giftedWordMatch = outputText.match(
    /Gifted Word\s*\n([\s\S]*?)(\n\n|Core Meaning|Visual Form|Image Prompt|One Line Essence|$)/
  );

  const coreMeaningMatch = outputText.match(
    /Core Meaning\s*\n([\s\S]*?)(\n\n|Gifted Word|Visual Form|Image Prompt|One Line Essence|$)/
  );

  const visualFormMatch = outputText.match(
    /Visual Form\s*\n([\s\S]*?)(\n\n|Image Prompt|One Line Essence|$)/
  );

  const imagePromptMatch = outputText.match(
    /Image Prompt\s*\n([\s\S]*?)(\n\n|One Line Essence|$)/
  );

  const essenceMatch = outputText.match(
    /One Line Essence\s*\n([\s\S]*?)(\n\n|$)/
  );

  const recognition = recognitionMatch?.[1]?.trim() || "";

  const witnessNotes =
    witnessNotesMatch?.[1]?.trim() || recognition || "";

  const coreEmotion = coreEmotionMatch?.[1]?.trim() || "";
  const coreWord = coreWordMatch?.[1]?.trim() || "";
  const giftedWord = giftedWordMatch?.[1]?.trim() || "";
  const coreMeaning = coreMeaningMatch?.[1]?.trim() || "";
  const visualForm = visualFormMatch?.[1]?.trim() || "";
  const imagePrompt = imagePromptMatch?.[1]?.trim() || "";
  const essence = essenceMatch?.[1]?.trim() || "";

  return Response.json({
    text: outputText,
    witnessNotes,
    presence: coreEmotion,
    recognition,
    visualForm,
    imagePrompt,
    coreEmotion,
    coreMeaning,
    coreWord,
    giftedWord,
    essence,
  });
}