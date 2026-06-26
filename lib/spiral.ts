export type VisualStage =
  | "testimony"
  | "clarification"
  | "visual-extraction"
  | "image-prompt"
  | "image-generation"
  | "fidelity-check"
  | "witness-reflection"
  | "memory-emergence"
  | "recognition";

  const order: VisualStage[] = [
  "testimony",
  "clarification",
  "visual-extraction",
  "image-prompt",
  "image-generation",
  "fidelity-check",
  "witness-reflection",
  "memory-emergence",
  "recognition",
];

export function next(stage: VisualStage): VisualStage {
  const index = order.indexOf(stage);
  if (index === -1) return "testimony";
  return order[index + 1] ?? "testimony";
}

export function previous(stage: VisualStage): VisualStage {
  const index = order.indexOf(stage);
  if (index <= 0) return "testimony";
  return order[index - 1];
}

export function restart(): VisualStage {
  return "testimony";
}

export function goTo(stage: VisualStage): VisualStage {
  return stage;
}