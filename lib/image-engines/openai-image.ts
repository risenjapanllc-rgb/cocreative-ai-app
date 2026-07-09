import OpenAI, { toFile } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120_000,
});

export type GeneratedImage = {
  scene: number;
  title: string;
  imageUrl: string;
};

async function generateOne({
  prompt,
  scene,
  title,
}: {
  prompt: string;
  scene: number;
  title: string;
}): Promise<GeneratedImage> {
  const result = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
    n: 1,
  });

  const b64 = result.data?.[0]?.b64_json;

  if (!b64) {
    throw new Error("OpenAI image generation failed.");
  }

  return {
    scene,
    title,
    imageUrl: `data:image/png;base64,${b64}`,
  };
}

export async function generateOpenAIImage(args: {
  prompt: string;
  scene: number;
  title: string;
}): Promise<GeneratedImage> {
  return generateOne(args);
}

export async function generateOpenAICandidates(args: {
  prompt: string;
  scene: number;
  title: string;
  count?: number;
}): Promise<GeneratedImage[]> {
  const count = args.count ?? 4;

  const images: GeneratedImage[] = [];

  for (let i = 0; i < count; i++) {
    console.log(
      `WORLD SEED CANDIDATE ${i + 1}/${count}`
    );

    const image = await generateOne(args);

    images.push(image);
  }

  return images;
}

export async function editOpenAIImage({
  referenceImageUrl,
  prompt,
  scene,
  title,
}: {
  referenceImageUrl: string;
  prompt: string;
  scene: number;
  title: string;
}): Promise<GeneratedImage> {
  const base64 = referenceImageUrl.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  const imageBuffer = Buffer.from(base64, "base64");

  const imageFile = await toFile(
    imageBuffer,
    "reference.png",
    {
      type: "image/png",
    }
  );

  const result = await openai.images.edit({
    model: "gpt-image-1",
    image: imageFile,
    prompt,
    size: "1024x1024",
    n: 1,
    input_fidelity: "high",
  });

  const b64 = result.data?.[0]?.b64_json;

  if (!b64) {
    throw new Error("OpenAI image edit failed.");
  }

  return {
    scene,
    title,
    imageUrl: `data:image/png;base64,${b64}`,
  };
}