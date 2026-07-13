import {
  renderWithOpenAI,
} from "./world/renderers";

import type {
  DirectorDecision,
} from "./world/director";

import type {
  WitnessWorld,
} from "./world/world-builder";

export type PromptCompilerInput = {
  witnessWorld: {
    world: WitnessWorld;
    director: DirectorDecision;
  };
};

export function compilePrompt({
  witnessWorld,
}: PromptCompilerInput): string {
  if (!witnessWorld?.director) {
    throw new Error(
      "Witness World does not contain a DirectorDecision."
    );
  }

  if (!witnessWorld?.world) {
    throw new Error(
      "Witness World does not contain the visual world data."
    );
  }

  return renderWithOpenAI({
    decision: witnessWorld.director,
    world: witnessWorld.world,
  });
}