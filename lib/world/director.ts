import { ShotGraph } from "./shot-builder";
import { EventGraph } from "./event-builder";

import {
  planCamera,
  PlannedCamera,
} from "./director/camera-planner";

import {
  planSubject,
  PlannedSubject,
} from "./director/subject-planner";

import {
  planAction,
  PlannedAction,
} from "./director/action-planner";

import {
  planForbidden,
  PlannedForbidden,
} from "./director/forbidden-planner";

export type DirectorDecision = {
  currentShot: number;
  currentEvent: string;

  /*
    Scene Bible に記録された出来事を、
    今回どのように観測するかを示す。
    新しい出来事や意味を創作しない。
  */
  intent: string;

  /*
    描画時に優先して保持する順序。
    World の事実そのものは Render Contract が保持する。
  */
  priority: string[];

  subject: PlannedSubject;
  action: PlannedAction;

  /*
    既存 Renderer との互換性のため保持する。
    Camera は Scene Bible の事実ではなく、
    Director が今回の観測方法として決める。
  */
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

  const currentEvent =
    event?.title || `Scene ${scene}`;

  const eventDescription =
    event?.description || currentEvent;

  return {
    currentShot: shot?.shot ?? scene,

    currentEvent,

    intent:
      `Observe the witnessed event faithfully: ${eventDescription}`,

    priority: [
      "witness identity",
      "relationship identity",
      "event fidelity",
      "impossible condition",
      "environment continuity",
      "current action",
      "current emotion",
      "observation",
    ],

    subject: planSubject({
      mustShow,
      eventTitle: currentEvent,
    }),

    action: planAction({
      eventTitle: currentEvent,
      eventDescription,
    }),

    camera:
      shot?.camera ??
      planCamera({
        mustShow,
        mustNotShow,
        eventTitle: currentEvent,
        eventDescription,
      }),

    timing: {
      moment: currentEvent,
    },

    mustShow,

    mustNotShow,

    forbidden: planForbidden({
      mustNotShow,
    }),
  };
}