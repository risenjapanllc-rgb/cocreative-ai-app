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

  return Response.json({
    text: response.output_text,
  });
}