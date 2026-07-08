console.log("LOADED image-engines/index.ts");

import {
  generateOpenAIImage,
  editOpenAIImage,
} from "./openai-image";

import { generateGeminiImage } from "./gemini-image";

export type ImagePromptItem = {
  scene: number;
  title: string;
  prompt: string;
};

export type EditImageItem = ImagePromptItem & {
  referenceImageUrl: string;
};

export async function generateImage(
  item: ImagePromptItem
) {
  const engine = process.env.IMAGE_ENGINE || "openai";

  console.log("================================");
  console.log("IMAGE_ENGINE =", engine);
  console.log("================================");

  if (engine === "gemini") {
    console.log("USING GEMINI");
    return generateGeminiImage(item);
  }

  console.log("USING OPENAI");
  return generateOpenAIImage(item);
}

export async function editImage(
  item: EditImageItem
) {
  const engine = process.env.IMAGE_ENGINE || "openai";

  console.log("================================");
  console.log("IMAGE_ENGINE =", engine);
  console.log("================================");

  if (engine === "gemini") {
    throw new Error(
      "Gemini image editing is not implemented yet."
    );
  }

  console.log("USING OPENAI IMAGE EDIT");

  return editOpenAIImage(item);
}