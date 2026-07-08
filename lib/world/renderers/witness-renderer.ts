import { buildRenderContext } from "./render-context";

import { DirectorDecision } from "../director";

export function renderWitness(
  decision: DirectorDecision
): string {
  const context = buildRenderContext(decision);

  const lines: string[] = [];

  lines.push(context.directorText);

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("");
  lines.push("WITNESS RENDERER");
  lines.push("");

  lines.push("GLOBAL PRIORITY");

  context.priority.forEach((item, index) => {
    lines.push(`${index + 1}. ${item}`);
  });

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("");

  lines.push("RENDERING RULES");

  context.rendererRules.forEach((rule) => {
    lines.push(`- ${rule}`);
  });

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("");

  lines.push("FINAL GOAL");
  lines.push(context.finalGoal);

  return lines.join("\n");
}