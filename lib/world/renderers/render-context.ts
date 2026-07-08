import { DirectorDecision } from "../director";
import { translateDirectorDecision } from "../director-decision-serializer";

export type RenderContext = {
  directorDecision: DirectorDecision;

  directorText: string;

  priority: string[];

  rendererRules: string[];

  finalGoal: string;
};

export function buildRenderContext(
  decision: DirectorDecision
): RenderContext {
  return {
    directorDecision: decision,

    directorText: translateDirectorDecision(decision),

    priority: decision.priority,

    rendererRules: [
      "Preserve witness recognition before visual beauty.",
      "Do not invent details not present in the testimony.",
      "Do not normalize impossible conditions.",
      "Do not weaken emotional expression.",
      "Do not weaken witnessed body interaction.",
      "Preserve the same people across scenes.",
      "Preserve the same place across scenes.",
      "Composition serves testimony, not the other way around.",
    ],

    finalGoal:
      'The witness should immediately recognize the scene and say: "Yes. This is what I saw."',
  };
}