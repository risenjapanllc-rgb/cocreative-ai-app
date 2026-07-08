import { WorldModel } from "./world-model";

export type WorldUpdateInput = {
  world: WorldModel;

  testimony?: string;

  whatHappened?: string;
  whatRemained?: string;
  namedEmotions?: string;
};

export function updateWorld({
  world,
  whatHappened,
  whatRemained,
  namedEmotions,
}: WorldUpdateInput): WorldModel {
  const updated: WorldModel = {
    ...world,

    timeline: [
      ...world.timeline,
      ...(whatHappened
        ? [
            {
              id: crypto.randomUUID(),
              title: "Witness",
              description: whatHappened,
            },
          ]
        : []),
    ],

    emotions: [
      ...world.emotions,
      ...(namedEmotions
        ? [
            {
              subject: "witness",
              emotion: namedEmotions,
            },
          ]
        : []),
    ],

    themes: [
      ...world.themes,
      ...(whatRemained ? [whatRemained] : []),
    ],
  };

  return updated;
}