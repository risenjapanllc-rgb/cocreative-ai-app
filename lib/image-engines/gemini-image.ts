export type GeneratedImage = {
  scene: number;
  title: string;
  imageUrl: string;
};

function findImageBase64(value: any): string | null {
  if (!value) return null;

  if (
    typeof value === "object" &&
    value.type === "image" &&
    typeof value.data === "string"
  ) {
    return value.data;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findImageBase64(item);
      if (found) return found;
    }
  }

  if (typeof value === "object") {
    for (const key of Object.keys(value)) {
      const found = findImageBase64(value[key]);
      if (found) return found;
    }
  }

  return null;
}

export async function generateGeminiImage({
  prompt,
  scene,
  title,
}: {
  prompt: string;
  scene: number;
  title: string;
}): Promise<GeneratedImage> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/interactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        model: "gemini-3.1-flash-image",
        input: [
          {
            type: "text",
            text: prompt,
          },
        ],
        response_format: {
          type: "image",
          aspect_ratio: "1:1",
        },
      }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Gemini image generation failed: ${res.status} ${errorText}`
    );
  }

  const data = await res.json();

  const base64 = findImageBase64(data);

  if (!base64) {
    console.error("GEMINI RAW RESPONSE =", JSON.stringify(data, null, 2));
    throw new Error("Gemini image response did not include image data");
  }

  return {
    scene,
    title,
    imageUrl: `data:image/png;base64,${base64}`,
  };
}