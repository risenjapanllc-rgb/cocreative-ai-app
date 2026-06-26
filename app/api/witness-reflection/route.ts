import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const witnessReflectionPrompt = fs.readFileSync(
  path.join(
    process.cwd(),
    "docs",
    "witness-reflection.md"
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
          content: witnessReflectionPrompt,
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
          name: "witness_reflection",
          schema: {
            type: "object",
            properties: {
              reflection: {
                type: "string",
              },
              questions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: [
              "reflection",
              "questions",
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
      "WITNESS REFLECTION ERROR =",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "witness reflection failed",
      },
      {
        status: 500,
      }
    );
  }
}