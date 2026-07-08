import { renderWithOpenAI } from "./world/renderers";

export type PromptCompilerInput = {
  witnessWorld: {
    director: any;
  };
};

export function compilePrompt({
  witnessWorld,
}: PromptCompilerInput): string {
  if (!witnessWorld?.director) {
    throw new Error("Witness World does not contain a DirectorDecision.");
  }

  return renderWithOpenAI(witnessWorld.director);
}