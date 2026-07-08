import { DirectorDecision } from "../director";
import { buildRenderContext } from "./render-context";

export function renderWithOpenAI(
  decision: DirectorDecision
): string {
  const context = buildRenderContext(decision);

  const lines: string[] = [];

  lines.push(context.directorText);

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("");
  lines.push("OPENAI IMAGE RENDERER");
  lines.push("");

  lines.push("Use the DirectorDecision as the source of truth.");
  lines.push("Do not reinterpret the testimony.");
  lines.push("");

  lines.push("Preserve, in this order:");
  context.priority.forEach((item, index) => {
    lines.push(`${index + 1}. ${item}`);
  });

  lines.push("");
  lines.push("Rendering rules:");
  context.rendererRules.forEach((rule) => {
    lines.push(`- ${rule}`);
  });

  lines.push("");
  lines.push("IMAGE STYLE");
  lines.push("- Photorealistic documentary photograph.");
  lines.push("- Real camera.");
  lines.push("- Natural lighting.");
  lines.push("- Not illustration.");
  lines.push("- Not anime.");
  lines.push("- Not painting.");
  lines.push("- Not drawing.");
  lines.push("- Not CGI.");

  lines.push("");
  lines.push("TEXT PROHIBITION");
  lines.push("- No visible text.");
  lines.push("- No captions.");
  lines.push("- No subtitles.");
  lines.push("- No watermark.");
  lines.push("- No symbols.");
  lines.push("- No graphic elements.");
  lines.push("- Dialogue must never appear as visible text.");
  lines.push("- Spoken words are not captions.");
  lines.push("- Do not render speech as writing.");
  lines.push("- Do not print names.");
  lines.push("- Do not print dialogue.");
  lines.push("- Do not add typography.");

  lines.push("");
  lines.push("FOR IMAGE EDITING");
  lines.push("- Keep existing identity unchanged.");
  lines.push("- Keep existing room unchanged.");
  lines.push("- Keep existing lighting unchanged.");
  lines.push("- Change only the requested expression, action, or timing.");
  lines.push("- Do not regenerate the world from scratch.");

  lines.push("");
  lines.push(context.finalGoal);

  return lines.join("\n");
}