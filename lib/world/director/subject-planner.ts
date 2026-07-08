export type PlannedSubject = {
  primary: string;
  focus: string;
};

type SubjectPlannerInput = {
  mustShow?: string[];
  eventTitle?: string;
};

export function planSubject({
  mustShow = [],
  eventTitle = "",
}: SubjectPlannerInput): PlannedSubject {
  const primary =
    mustShow.length > 0
      ? mustShow[0]
      : eventTitle || "the central witness";

  const focus =
    mustShow.length > 0
      ? mustShow.join(", ")
      : primary;

  return {
    primary,
    focus,
  };
}