import {
  Recognition,
  WorldMemory,
  WorldModel,
} from "./world-model";

export type WorldUpdateInput = {
  world: WorldModel;

  testimony?: string;
  whatHappened?: string;
  whatRemained?: string;
  namedEmotions?: string[];
};

/**
 * World Update
 *
 * Every testimony cultivates the world.
 */
export function updateWorld({
  world,
  whatHappened,
}: WorldUpdateInput): WorldModel {

  console.log("🌍 UPDATE WORLD");

  if (!whatHappened) {
    return world;
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const memory: WorldMemory = {
    id,
    type: "recognition",
    summary: whatHappened,
    createdAt,
  };

  const recognition: Recognition = {
    id,
    summary: whatHappened,
    createdAt,
  };

  return {
    ...world,

    memories: [
      ...world.memories,
      memory,
    ],

    recognitions: [
      ...world.recognitions,
      recognition,
    ],
  };
}