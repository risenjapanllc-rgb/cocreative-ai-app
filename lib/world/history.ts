import { WorldModel } from "./world-model";
import { DirectorDecision } from "./director";

export type WitnessJournalEntry = {
  id: string;
  createdAt: string;

  witness?: {
    whatHappened?: string;
    whatRemained?: string;
    namedEmotions?: string;
  };

  worldSnapshot: WorldModel;

  directorSnapshot?: DirectorDecision;

  image?: {
    prompt?: string;
    url?: string;
  };

  recognition?: {
    text?: string;
    emergedAt?: string;
  };

  expression?: {
    type: "language" | "image" | "testimony" | "reflection";
    content: string;
  };
};

export type WitnessJournal = {
  entries: WitnessJournalEntry[];
};

export function createJournalEntry({
  world,
  director,
  imagePrompt,
  whatHappened,
  whatRemained,
  namedEmotions,
}: {
  world: WorldModel;
  director?: DirectorDecision;
  imagePrompt?: string;
  whatHappened?: string;
  whatRemained?: string;
  namedEmotions?: string;
}): WitnessJournalEntry {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),

    witness: {
      whatHappened,
      whatRemained,
      namedEmotions,
    },

    worldSnapshot: world,

    directorSnapshot: director,

    image: imagePrompt
      ? {
          prompt: imagePrompt,
        }
      : undefined,
  };
}