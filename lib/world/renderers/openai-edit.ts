import { DirectorDecision } from "../director";
import { buildRenderContext } from "./render-context";

export function renderOpenAIEdit(
  decision: DirectorDecision
): string {
  const context = buildRenderContext(decision);

  const lines: string[] = [];

  lines.push("OPENAI IMAGE EDIT");
  lines.push("");

  lines.push(
    "Use the provided reference image as the authoritative source."
  );

  lines.push("");

  lines.push(
    "Do not regenerate the scene."
  );

  lines.push(
    "Do not redesign the people."
  );

  lines.push(
    "Do not redesign the room."
  );

  lines.push(
    "Do not change clothing."
  );

  lines.push(
    "Do not change identity."
  );

  lines.push(
    "Do not change lighting."
  );

  lines.push("");

  lines.push(
    "Keep everything identical except the following changes:"
  );

  lines.push("");

  lines.push(
    `Current Event: ${decision.currentEvent}`
  );

  lines.push("");

  lines.push(
    `Visible Action: ${decision.action.visible}`
  );

  lines.push("");

  lines.push(
    `Emotion: ${decision.action.emotional}`
  );

  lines.push("");

  lines.push(
    "Maintain character identity."
  );

  lines.push(
    "Maintain room identity."
  );

  lines.push(
    "Maintain camera relationship."
  );

  lines.push(
    "Maintain impossible conditions."
  );

  lines.push("");

  lines.push(
    "Everything not explicitly mentioned above must remain identical to the reference image."
  );

  return lines.join("\n");
}