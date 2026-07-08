import { WorldModel } from "./world-model";

export interface Recognition {
  id: string;

  summary: string;

  createdAt: string;
}

export function recognizeWorld(
  world: WorldModel
): Recognition[] {

  const recognitions: Recognition[] = [];

  for (const memory of world.memories) {

    recognitions.push({
      id: memory.id,
      summary: memory.summary,
      createdAt: memory.createdAt,
    });

  }

  return recognitions;
}