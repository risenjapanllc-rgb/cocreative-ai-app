import { TestimonySpec } from "./vt-parser";

export function buildVisualPrompt(spec: TestimonySpec) {
  const coreWitness = spec.coreWitness.join("\n");

  const scene = spec.spatialStructure.join("\n");

  const fidelity = spec.mustNotLose.join("\n");

  return `
Create a faithful visual testimony scene.

CORE WITNESS

${coreWitness}

SCENE

${scene}

CRITICAL FIDELITY REQUIREMENTS

${fidelity}

IMPORTANT

Preserve all critical elements.

Do not change the spatial relationships.

Do not introduce symbols, people, animals, objects, or light sources that are not present in the testimony.

The emotional atmosphere must remain faithful to the testimony.

The image should feel like a remembered experience rather than a fantasy illustration.
`.trim();
}