import { generateImage, editImage } from "@/lib/image-engines";
import { NextResponse } from "next/server";

type ImagePromptScene = {
  scene?: number;
  title?: string;
  prompt: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mode = body.mode ?? "generate";

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
      imagePrompts.find((p) => p.scene === targetScene) ??
      imagePrompts[0];

    if (!item?.prompt) {
      return NextResponse.json(
        { error: "Prompt required" },
        { status: 400 }
      );
    }

    let image;

    if (mode === "edit") {
      if (!body.referenceImageUrl) {
        return NextResponse.json(
          { error: "referenceImageUrl required" },
          { status: 400 }
        );
      }

      image = await editImage({
        referenceImageUrl: body.referenceImageUrl,
        scene: item.scene ?? 1,
        title: item.title ?? `Scene ${item.scene ?? 1}`,
        prompt: sanitizeImagePrompt(item.prompt),
      });
    } else {
      image = await generateImage({
        scene: item.scene ?? 1,
        title: item.title ?? `Scene ${item.scene ?? 1}`,
        prompt: sanitizeImagePrompt(item.prompt),
      });
    }

    return NextResponse.json({
      image,
      images: [image],
      imageUrl: image.imageUrl,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      { status: 500 }
    );
  }
}

function sanitizeImagePrompt(prompt: string) {
  return prompt
    .replaceAll("胸から上", "肩から上")
    .replaceAll("胸", "上衣部分")
    .replaceAll("上半身", "見える範囲")
    .replaceAll("密着", "近くにいる")
    .replaceAll("頬が触れ合う", "顔が近い")
    .replaceAll("身体の接触", "家族の抱擁")
    .replaceAll("触れ合い", "抱擁")
    .replaceAll("肌", "人物")
    .replaceAll("intimate", "family")
    .replaceAll("chest", "upper clothing area")
    .replaceAll("torso", "upper clothing area")
    .replaceAll("skin contact", "family embrace")
    .replaceAll("body contact", "family embrace")
    .replaceAll("pressed together", "standing close")
    .replaceAll("cheek touching", "faces near each other");
}