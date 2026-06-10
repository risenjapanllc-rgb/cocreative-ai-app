// lib/visual-testimony/visual-prompt-builder.ts

import { TestimonySpec } from "./vt-parser";

export function buildVisualPrompt(spec: TestimonySpec) {
  return `
Create a faithful visual testimony scene.

SCENE

${spec.spatialStructure.join("\n")}

RELATIONAL CONTEXT

${spec.relationalStructure.join("\n")}

CRITICAL FIDELITY REQUIREMENTS

${spec.mustNotLose.join("\n")}

IMPORTANT

Preserve all critical elements.

Do not remove key participants.

Do not change the spatial relationships.

Do not introduce symbolic elements that are not present in the testimony.

The atmosphere must remain faithful to the testimony.
`.trim();
}