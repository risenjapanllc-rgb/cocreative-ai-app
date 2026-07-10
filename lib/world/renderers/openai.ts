import { DirectorDecision } from "../director";
import { buildRenderContext } from "./render-context";

import {
  buildRenderContractFromDecision,
} from "../../renderer/build-render-contract";

import {
  renderContractToPrompt,
} from "../../renderer/render-contract";

export function renderWithOpenAI(
  decision: DirectorDecision
): string {
  const context = buildRenderContext(decision);

  const contract =
    buildRenderContractFromDecision(decision);

  const lines: string[] = [];

  lines.push(context.directorText);

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("");

  lines.push(renderContractToPrompt(contract));

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("");

  lines.push("OPENAI IMAGE RENDERER");
  lines.push("");

  lines.push(
    "The Render Contract is mandatory."
  );

  lines.push(
    "Do not violate any LOCK section."
  );

  lines.push(
    "Do not reinterpret or normalize the testimony."
  );

  lines.push("");

  lines.push("IMAGE STYLE");
  lines.push(
    "- Photorealistic documentary photograph."
  );
  lines.push("- Real camera appearance.");
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
  lines.push("- Do not display spoken dialogue.");
  lines.push("- Do not print names.");
  lines.push("- Do not add typography.");

  lines.push("");
  lines.push(context.finalGoal);

  return lines.join("\n");
}