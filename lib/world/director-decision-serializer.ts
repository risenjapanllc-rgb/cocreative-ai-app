import { DirectorDecision } from "./director";

export function translateDirectorDecision(
  decision: DirectorDecision
): string {
  const lines: string[] = [];

  lines.push("DIRECTOR DECISION");
  lines.push("");

  lines.push("Intent");
  lines.push(decision.intent);
  lines.push("");

  // ★ Priority を追加
  if (decision.priority.length) {
    lines.push("PRIORITY ORDER");

    decision.priority.forEach((item, index) => {
      lines.push(`${index + 1}. ${item}`);
    });

    lines.push("");
  }

  lines.push("Current Shot");
  lines.push(String(decision.currentShot));
  lines.push("");

  lines.push("Current Event");
  lines.push(decision.currentEvent);
  lines.push("");

  lines.push("Camera");
  lines.push(`Viewpoint: ${decision.camera.viewpoint}`);
  lines.push(`Position: ${decision.camera.position}`);
  lines.push(`Height: ${decision.camera.height}`);
  lines.push(`Framing: ${decision.camera.framing}`);
  lines.push("");

  lines.push("Primary Subject");
  lines.push(decision.subject.primary);
  lines.push("");

  lines.push("Focus");
  lines.push(decision.subject.focus);
  lines.push("");

  lines.push("Visible Action");
  lines.push(decision.action.visible);
  lines.push("");

  lines.push("Inner Emotion");
  lines.push(decision.action.emotional);
  lines.push("");

  lines.push("Timing");
  lines.push(decision.timing.moment);
  lines.push("");

  if (decision.mustShow.length) {
    lines.push("Must Show");

    for (const item of decision.mustShow) {
      lines.push(`- ${item}`);
    }

    lines.push("");
  }

  if (decision.mustNotShow.length) {
    lines.push("Must Not Show");

    for (const item of decision.mustNotShow) {
      lines.push(`- ${item}`);
    }

    lines.push("");
  }

  if (decision.forbidden.length) {
    lines.push("Forbidden");

    for (const item of decision.forbidden) {
      lines.push(`- ${item}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}