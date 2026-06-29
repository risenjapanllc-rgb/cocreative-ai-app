import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const witnessReflectionPrompt = fs.readFileSync(
  path.join(process.cwd(), "docs", "witness-reflection.md"),
  "utf8"
);

export async function POST(req: Request) {
  try {
    const { testimony, generatedImage, fidelityReport } = await req.json();

    const compactFidelityReport = fidelityReport
      ? {
          result: fidelityReport.result ?? "",
          overallAssessment: fidelityReport.overallAssessment ?? "",
          lost: fidelityReport.lost ?? [],
          invented: fidelityReport.invented ?? [],
          summary: fidelityReport.summary ?? [],
        }
      : null;

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content:
            witnessReflectionPrompt +
            `

Return JSON only.
Do not include markdown.
Keep the response concise.
Do not analyze the full image prompt.
Do not reconstruct the whole scene.
Only support the witness in reflecting on the generated image.
`,
        },
        {
          role: "user",
          content:
            `Original Testimony Summary:\n${testimony || ""}\n\n` +
            `Generated Image URL:\n${generatedImage || ""}\n\n` +
            `Compact Fidelity Report:\n${JSON.stringify(
              compactFidelityReport,
              null,
              2
            )}`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "witness_reflection",
          schema: {
            type: "object",
            properties: {
              reflection: { type: "string" },
              questions: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["reflection", "questions"],
            additionalProperties: false,
          },
        },
      },
    });

    return NextResponse.json(JSON.parse(response.output_text));
  } catch (error) {
    console.error("WITNESS REFLECTION ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "witness reflection failed",
      },
      { status: 500 }
    );
  }
}
