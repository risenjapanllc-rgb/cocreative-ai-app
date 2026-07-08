import { DirectorDecision } from "../director";
import { renderWithGemini } from "./gemini";

export type RendererType =
  | "gemini"
  | "imagen"
  | "firefly"
  | "flux";

export function renderDirectorDecision(
  decision: DirectorDecision,
  renderer: RendererType = "gemini"
): string {
  switch (renderer) {
    case "gemini":
      return renderWithGemini(decision);

    case "imagen":
      return renderWithGemini(decision);

    case "firefly":
      return renderWithGemini(decision);

    case "flux":
      return renderWithGemini(decision);

    default:
      return renderWithGemini(decision);
  }
}