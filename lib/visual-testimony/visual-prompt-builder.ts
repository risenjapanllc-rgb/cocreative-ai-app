import { TestimonySpec } from "./vt-parser";
import { getImageConstraints } from "./testimony-image-constraints";

export function buildVisualPrompt(
spec: TestimonySpec,
testimonyFile?: string
) {
const coreWitness = spec.coreWitness.join("\n");
const scene = spec.spatialStructure.join("\n");
const fidelity = spec.mustNotLose.join("\n");

const constraints = testimonyFile
? getImageConstraints(testimonyFile)
: "";

return `
Create a faithful visual testimony scene.

CORE WITNESS

${coreWitness}

SCENE

${scene}

CRITICAL FIDELITY REQUIREMENTS

${fidelity}

IMAGE CONSTRAINTS

${constraints}

IMPORTANT

Do not change the spatial relationships.

Do not remove key elements.

Do not introduce symbols, objects, people, animals, buildings, light sources, or scenery that are not present in the testimony.

The image should feel like a remembered experience rather than fantasy art.
`.trim();
}
