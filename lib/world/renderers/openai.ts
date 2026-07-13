import { DirectorDecision } from "../director";
import { WitnessWorld } from "../world-builder";

import {
  buildRenderContractFromWorld,
} from "./build-render-contract";

import {
  translateForOpenAI,
} from "./prompt-translator";

export type OpenAIRenderInput = {
  decision: DirectorDecision;
  world: WitnessWorld;
};

export function renderWithOpenAI({
  decision,
  world,
}: OpenAIRenderInput): string {
  const contract = buildRenderContractFromWorld({
    world,
    decision,
  });

  const instruction = translateForOpenAI({
    contract,
    decision,
  });

  console.log(
    "OPENAI RENDER INSTRUCTION =",
    instruction
  );

  return instruction;
}