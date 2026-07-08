export type PlannedCamera = {
  viewpoint: string;
  position: string;
  height: string;
  framing: string;
};

type CameraPlannerInput = {
  mustShow?: string[];
  mustNotShow?: string[];
  eventTitle?: string;
  eventDescription?: string;
};

export function planCamera({
  mustShow = [],
  mustNotShow = [],
  eventTitle = "",
  eventDescription = "",
}: CameraPlannerInput): PlannedCamera {
  const text = [
    eventTitle,
    eventDescription,
    ...mustShow,
    ...mustNotShow,
  ]
    .join(" ")
    .toLowerCase();

  if (includesAny(text, ["alone", "lonely", "isolated", "empty", "desert"])) {
    return {
      viewpoint: "observational human viewpoint",
      position: "slightly distant from the subject",
      height: "eye level",
      framing: "wide cinematic frame with negative space",
    };
  }

  if (includesAny(text, ["confession", "repent", "shame", "weep", "tears", "sorrow"])) {
    return {
      viewpoint: "intimate human viewpoint",
      position: "close to the subject without intrusion",
      height: "eye level",
      framing: "cinematic close-up focused on face and hands",
    };
  }

  if (includesAny(text, ["awe", "glory", "presence", "holy", "light", "reveal"])) {
    return {
      viewpoint: "reverent human viewpoint",
      position: "slightly below the subject",
      height: "low eye level",
      framing: "medium wide frame with space for atmosphere",
    };
  }

  if (includesAny(text, ["walk", "journey", "road", "leave", "return", "follow"])) {
    return {
      viewpoint: "following human viewpoint",
      position: "behind and slightly to the side of the subject",
      height: "eye level",
      framing: "medium wide cinematic frame showing movement and environment",
    };
  }

  return {
    viewpoint: "human eye level viewpoint",
    position: "close enough to witness, not intrude",
    height: "eye level",
    framing: "cinematic medium close-up",
  };
}

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}