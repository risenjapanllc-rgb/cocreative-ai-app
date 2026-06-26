import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120_000,
});

type ImagePromptScene = {
  scene?: number;
  title?: string;
  prompt: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const imagePrompts: ImagePromptScene[] = Array.isArray(body.imagePrompts)
      ? body.imagePrompts
      : body.imagePrompt
        ? [
            {
              scene: 1,
              title: "Scene 1",
              prompt: body.imagePrompt,
            },
          ]
        : [];

    const targetScene = body.scene ?? imagePrompts[0]?.scene ?? 1;

    const item =
      imagePrompts.find((p) => p.scene === targetScene) ?? imagePrompts[0];

    console.log("GENERATE IMAGE PROMPT =", item);

    if (!item?.prompt || typeof item.prompt !== "string") {
      return NextResponse.json(
        { error: "Valid image prompt is required" },
        { status: 400 }
      );
    }

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: item.prompt,
      size: "1024x1024",
      n: 1,
    });

    const b64 = result.data?.[0]?.b64_json;

    if (!b64) {
      console.error("NO IMAGE DATA =", result);
      return NextResponse.json(
        { error: "No image returned" },
        { status: 500 }
      );
    }

    const image = {
      scene: item.scene ?? 1,
      title: item.title ?? `Scene ${item.scene ?? 1}`,
      imageUrl: `data:image/png;base64,${b64}`,
    };

    return NextResponse.json({
      image,
      images: [image],
      imageUrl: image.imageUrl,
    });
  } catch (error) {
    console.error("GENERATE IMAGE API ERROR =", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown image generation error",
      },
      { status: 500 }
    );
  }
}