export type PlannedForbidden = string[];

type ForbiddenPlannerInput = {
  mustNotShow?: string[];
};

export function planForbidden({
  mustNotShow = [],
}: ForbiddenPlannerInput): PlannedForbidden {
  return [
    "do not invent new story elements",
    "do not add religious clichés",
    "do not add fantasy glow",
    "do not make the scene theatrical",
    "do not turn the subject into a heroic icon",
    ...mustNotShow,
  ];
}