export type PlannedAction = {
  visible: string;
  emotional: string;
};

type ActionPlannerInput = {
  eventTitle?: string;
  eventDescription?: string;
};

export function planAction({
  eventTitle = "",
  eventDescription = "",
}: ActionPlannerInput): PlannedAction {
  const text = `${eventTitle} ${eventDescription}`.toLowerCase();

  if (includesAny(text, ["deny", "denial"])) {
    return {
      visible: "turning away while speaking",
      emotional: "fear and inner conflict",
    };
  }

  if (includesAny(text, ["repent", "repentance", "weep", "cry", "tears"])) {
    return {
      visible: "head lowered with tears",
      emotional: "deep remorse and surrender",
    };
  }

  if (includesAny(text, ["pray", "prayer"])) {
    return {
      visible: "quietly praying",
      emotional: "communion with God",
    };
  }

  if (includesAny(text, ["heal", "healing"])) {
    return {
      visible: "reaching out with compassion",
      emotional: "mercy and restoration",
    };
  }

  if (includesAny(text, ["call", "calling", "follow"])) {
    return {
      visible: "responding to the invitation",
      emotional: "faith awakening",
    };
  }

  return {
    visible: "a quiet decisive moment",
    emotional: "honest inner movement",
  };
}

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some((k) => text.includes(k));
}