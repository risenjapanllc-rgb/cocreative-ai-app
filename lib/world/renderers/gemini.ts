// lib/world/renderers/gemini.ts

import { DirectorDecision } from "../director";
import { renderWitness } from "./witness-renderer";

export function renderWithGemini(
  decision: DirectorDecision
): string {
  return renderWitness(decision);
}