export type PromptCompilerInput = {
  whatHappened?: string;
  whatRemained?: string;
  namedEmotions?: string;

  visualExtraction?: unknown;

  characterBible?: unknown;
  environmentBible?: unknown;
  compositionBible?: unknown;
  objectBible?: unknown;
  sceneBible?: unknown;
};

export function compilePrompt({
  whatHappened,
  whatRemained,
  namedEmotions,
  visualExtraction,
  characterBible,
  environmentBible,
  compositionBible,
  objectBible,
  sceneBible,
}: PromptCompilerInput): string {
  return (
    `What Happened:\n${whatHappened || ""}\n\n` +
    `What Remained:\n${whatRemained || ""}\n\n` +
    `Named Emotions:\n${namedEmotions || ""}\n\n` +
    `Visual Extraction:\n${visualExtraction || ""}\n\n` +
    `Character Bible:\n${JSON.stringify(characterBible || {}, null, 2)}\n\n` +
    `Environment Bible:\n${JSON.stringify(environmentBible || {}, null, 2)}\n\n` +
    `Composition Bible:\n${JSON.stringify(compositionBible || {}, null, 2)}\n\n` +
    `Object Bible:\n${JSON.stringify(objectBible || {}, null, 2)}\n\n` +
    `Scene Bible:\n${JSON.stringify(sceneBible || {}, null, 2)}`
  );
}