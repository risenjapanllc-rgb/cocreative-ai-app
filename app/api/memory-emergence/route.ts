import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const memoryEmergencePrompt = fs.readFileSync(
  path.join(
    process.cwd(),
    "docs",
    "memory-emergence.md"
  ),
  "utf8"
);

export async function POST(req: Request) {
  try {
    const {
      testimony,
      generatedImage,
      fidelityReport,
    } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content: memoryEmergencePrompt,
        },
        {
          role: "user",
          content:
            `Original Testimony:\n${testimony}\n\n` +
            `Generated Image:\n${generatedImage}\n\n` +
            `Visual Fidelity Report:\n${JSON.stringify(
              fidelityReport,
              null,
              2
            )}`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "memory_emergence",
          schema: {
            type: "object",
            properties: {
              reflection: {
                type: "string",
              },
              newWitnessDetails: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              corrections: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              shouldRegenerate: {
                type: "boolean",
              },
            },
            required: [
              "reflection",
              "newWitnessDetails",
              "corrections",
              "shouldRegenerate",
            ],
            additionalProperties: false,
          },
        },
      },
    });

    const output = JSON.parse(
      response.output_text
    );

    return NextResponse.json(output);
  } catch (error) {
    console.error(
      "MEMORY EMERGENCE ERROR =",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "memory emergence failed",
      },
      {
        status: 500,
      }
    );
  }
}