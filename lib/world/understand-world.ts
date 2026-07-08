import { buildWorld, BuildWorldInput, WitnessWorld } from "./world-builder";

/**
 * Witness World does not generate prompts.
 *
 * Witness World understands testimony.
 *
 * Everything else serves that understanding.
 */
export function understandWorld(
  input: BuildWorldInput
): WitnessWorld {
  return buildWorld(input);
}