import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const visualClarificationPrompt = fs.readFileSync(
  path.join(process.cwd(), "docs", "visual-clarification.md"),
  "utf8"
);

export async function POST(req: Request) {
  try {
    const { testimony, previousClarification, answer } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content:
            visualClarificationPrompt +
            `

Return JSON only.
Do not include markdown.

Use this exact format:

{
  "summary": "...",
  "knownVisualFacts": ["..."],
  "missingInformation": ["..."],
  "questions": ["..."],
  "mustPreserve": ["..."],
  "unknowns": ["..."],
  "readyForVisualExtraction": false
}

Rules:
- Ask only visual fidelity questions.
- Do not ask about emotions.
- Do not ask about meaning.
- Do not invent missing details.
- If information is unknown, put it in unknowns.
- Ask at most 5 questions.
- If the witness has answered the questions and provided must-preserve elements, do not keep asking repeated questions.
- If the core visual facts are enough to preserve the testimony, set readyForVisualExtraction to true.
- Missing minor details such as exact facial features, exact room layout, or unknown clothing details must not block progress.
- If remaining unknowns are not witness-critical, put them in unknowns and set readyForVisualExtraction to true.
`,
        },
        {
          role: "user",
          content:
            `Testimony:\n${testimony || ""}\n\n` +
            `Previous Clarification:\n${JSON.stringify(
              previousClarification || null,
              null,
              2
            )}\n\n` +
            `Witness Answer:\n${answer || ""}`,
        },
      ],
    });

    const outputText = response.output_text.trim();

    let parsed;

    try {
      parsed = JSON.parse(outputText);
    } catch {
      return NextResponse.json(
        {
          error: "Failed to parse visual clarification JSON",
          raw: outputText,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      summary: parsed.summary || "",
      knownVisualFacts: Array.isArray(parsed.knownVisualFacts)
        ? parsed.knownVisualFacts
        : [],
      missingInformation: Array.isArray(parsed.missingInformation)
        ? parsed.missingInformation
        : [],
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      mustPreserve: Array.isArray(parsed.mustPreserve)
        ? parsed.mustPreserve
        : [],
      unknowns: Array.isArray(parsed.unknowns) ? parsed.unknowns : [],
      readyForVisualExtraction: Boolean(parsed.readyForVisualExtraction),
    });
  } catch (error) {
    console.error("VISUAL CLARIFICATION ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "visual clarification failed",
      },
      { status: 500 }
    );
  }
}