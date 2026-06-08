// lib/visual-testimony/vt-builder.ts

export function buildVT002Spec() {
  return {
    id: "VT-002",
    title: "The Old Gentleman, the Gate, and the Hill",

    coreWitness: [
      'The old gentleman said: "Now from here, go on alone."',
      "I accepted the instruction naturally.",
      "There was no strong fear or resistance.",
      "Beginning, trust, dignity, and resolve remained.",
    ],

    spatialStructure: [
      "Car on near side of unpaved road.",
      "Road approximately 10 meters wide.",
      "Gate on opposite side of road.",
      "Gate parallel to road.",
      "Gate slightly set back from road.",
      "Gate does not block the road.",
      "Hill beyond the gate.",
      "Hill visible only after entering through the gate.",
      "Path climbs the hill in large zigzag switchbacks.",
      "Wooden sign stands beside the path and points toward the summit.",
    ],

    boundaryStructure: [
      "Gate is part of a larger boundary.",
      "Gate is not a standalone object.",
      "Boundary extends to both sides of the gate.",
      "Material and exact construction are uncertain.",
    ],

    temporalStructure: [
      "Old gentleman and dreamer sit in rear seat.",
      "Driver sits in front.",
      "Car stops near gate.",
      "Atmosphere changes and conversation stops.",
      'Old gentleman says: "Now from here, go on alone."',
      "Dreamer accepts naturally.",
      "Dreamer leaves car and walks toward gate.",
      "Dreamer turns around before entering.",
      "Old gentleman is watching.",
      "Gate is still closed.",
      "Dreamer opens gate.",
      "Hill becomes visible only after entering.",
      "Dreamer walks toward summit.",
      "Dreamer passes old wooden sign.",
    ],

    relationalStructure: [
      "Old gentleman is sender.",
      "Dreamer is receiver.",
      "Central action is entrustment.",
      "Response is natural acceptance.",
      "Movement: accompanied → entrusted → walking alone.",
      "Tone: quiet, dignified, trusting, solemn.",
    ],

    mustNotLose: [
      "Old gentleman's presence.",
      'The words: "Now from here, go on alone."',
      "Natural acceptance.",
      "Entrustment.",
      "Gate as boundary.",
      "Correct car-road-gate spatial relationship.",
      "Hill visible only after passing through gate.",
      "Zigzag path.",
      "Wooden sign pointing toward summit.",
      "Silence.",
    ],
  };
}