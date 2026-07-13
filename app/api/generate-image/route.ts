import {
  generateImage,
  generateWorldSeedCandidates,
  editImage,
} from "@/lib/image-engines";

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

    const targetScene =
      body.scene ?? imagePrompts[0]?.scene ?? 1;

    const item =
      imagePrompts.find((p) => p.scene === targetScene) ??
      imagePrompts[0];

    if (!item?.prompt) {
      return NextResponse.json(
        { error: "Prompt required" },
        { status: 400 }
      );
    }

    if (mode === "world-seed") {
      const images = await generateWorldSeedCandidates({
        scene: item.scene ?? 1,
        title: item.title ?? `Scene ${item.scene ?? 1}`,
        prompt: sanitizeImagePrompt(item.prompt),
        count: body.count ?? 4,
      });

      return NextResponse.json({
        images,
      });
    }

    if (mode === "edit") {
      if (!body.referenceImageUrl) {
        return NextResponse.json(
          {
            error: "referenceImageUrl required",
          },
          {
            status: 400,
          }
        );
      }

      const image = await editImage({
        referenceImageUrl: body.referenceImageUrl,
        scene: item.scene ?? 1,
        title: item.title ?? `Scene ${item.scene ?? 1}`,
        prompt: sanitizeImagePrompt(item.prompt),
      });

      return NextResponse.json({
        image,
        images: [image],
        imageUrl: image.imageUrl,
      });
    }

    const image = await generateImage({
      scene: item.scene ?? 1,
      title: item.title ?? `Scene ${item.scene ?? 1}`,
      prompt: sanitizeImagePrompt(item.prompt),
    });

    return NextResponse.json({
      image,
      images: [image],
      imageUrl: image.imageUrl,
    });
  } catch (error: unknown) {
    console.error("GENERATE IMAGE API ERROR =", error);

    const apiError = error as {
      status?: number;
      code?: string;
      type?: string;
      message?: string;
    };

    const message =
      apiError?.message ||
      (error instanceof Error
        ? error.message
        : "Unknown image generation error");

    const isBillingLimit =
      /billing hard limit|billing limit|insufficient_quota/i.test(
        message
      );

    const status =
      typeof apiError?.status === "number"
        ? apiError.status
        : isBillingLimit
          ? 402
          : 500;

    return NextResponse.json(
      {
        error: message,
        code:
          apiError?.code ||
          (isBillingLimit
            ? "billing_hard_limit"
            : "image_generation_error"),
      },
      { status }
    );
  }
}

function sanitizeImagePrompt(prompt: string) {
  return prompt
    .replaceAll("face-to-face", "facing each other")
    .replaceAll("fully face-to-face", "facing each other")
    .replaceAll("full embrace", "family reunion hug")
    .replaceAll(
      "fully embracing",
      "sharing a respectful family hug"
    )
    .replaceAll("prolonged", "gentle")
    .replaceAll(
      "wrapped around",
      "resting around the shoulders"
    )
    .replaceAll("body contact", "family closeness")
    .replaceAll("身体の接触", "家族の抱擁")
    .replaceAll("密着", "近くで抱き合う")
    .replaceAll("upper body", "visible person")
    .replaceAll("torso", "visible person")
    .replaceAll("chest", "upper clothing area")
    .replaceAll("skin contact", "family hug")
    .replaceAll("pressed together", "standing close")
    .replaceAll("intimate", "family")
    .replaceAll("romantic", "family");
}