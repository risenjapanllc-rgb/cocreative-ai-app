// lib/visual-testimony/visual-prompt-builder.ts


import { TestimonySpec } from "./vt-parser";

export function buildVisualPrompt(spec: TestimonySpec) {
  return [
    ...spec.spatialStructure,
    ...spec.relationalStructure,
    ...spec.mustNotLose,
  ].join("\n\n");
}
