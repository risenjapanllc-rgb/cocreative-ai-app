import { planCamera } from "./camera-planner";
import { planSubject } from "./subject-planner";
import { planAction } from "./action-planner";
import { planForbidden } from "./forbidden-planner";

export type DirectorPlannerInput = {
  mustShow: string[];
  mustNotShow: string[];
  eventTitle?: string;
  eventDescription?: string;
};

export function buildDirectorDecision(input: DirectorPlannerInput) {
  return {
    camera: planCamera(input),

    subject: planSubject(input),

    action: planAction(input),

    forbidden: planForbidden(input),
  };
}