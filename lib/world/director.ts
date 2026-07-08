import { ShotGraph } from "./shot-builder";
import { EventGraph } from "./event-builder";

import { planCamera, PlannedCamera } from "./director/camera-planner";
import { planSubject, PlannedSubject } from "./director/subject-planner";
import { planAction, PlannedAction } from "./director/action-planner";
import {
  planForbidden,
  PlannedForbidden,
} from "./director/forbidden-planner";

export type DirectorDecision = {
  currentShot: number;
  currentEvent: string;

  intent: string;

  priority: string[];

  subject: PlannedSubject;

  action: PlannedAction;

  camera: PlannedCamera;

  timing: {
    moment: string;
  };

  mustShow: string[];
  mustNotShow: string[];

  forbidden: PlannedForbidden;
};

export function directScene({
  shots,
  events,
  scene = 1,
}: {
  shots: ShotGraph;
  events: EventGraph;
  scene?: number;
}): DirectorDecision {
  const shot = shots.shots[scene - 1];
  const event = events.events[scene - 1];

  const mustShow = shot?.mustShow ?? [];
  const mustNotShow = shot?.mustNotShow ?? [];

  return {
    currentShot: shot?.shot ?? scene,

    currentEvent: event?.title ?? "",

    intent:
      event?.description ??
      "Reveal the inner truth of this testimony through a single cinematic moment.",

    priority: [
      "identity",
      "facial expression",
      "body interaction",
      "room continuity",
      "impossible condition",
      "composition",
    ],

    subject: planSubject({
      mustShow,
      eventTitle: event?.title,
    }),

    action: planAction({
      eventTitle: event?.title,
      eventDescription: event?.description,
    }),

    camera:
      shot?.camera ??
      planCamera({
        mustShow,
        mustNotShow,
        eventTitle: event?.title,
        eventDescription: event?.description,
      }),

    timing: {
      moment:
        event?.title ??
        "the decisive moment of the testimony",
    },

    mustShow,

    mustNotShow,

    forbidden: planForbidden({
      mustNotShow,
    }),
  };
}