import { DirectorDecision } from "./director";

export function buildDirectorScript(director: DirectorDecision): string {
  return `
DIRECTOR SHOOTING SCRIPT

Current Shot:
${director.currentShot}

Current Event:
${director.currentEvent}

Purpose:
${director.intent}

Camera:
- Viewpoint: ${director.camera.viewpoint}
- Position: ${director.camera.position}
- Height: ${director.camera.height}
- Framing: ${director.camera.framing}

Must Show:
${director.mustShow.map((item) => `- ${item}`).join("\n")}

Must Not Show:
${director.mustNotShow.map((item) => `- ${item}`).join("\n")}

Instruction:
Depict only the current event.

Do not collapse multiple events into one generic emotional scene.

Do not beautify.

Do not normalize impossible conditions.

Preserve witness recognition before visual beauty.
`.trim();
}