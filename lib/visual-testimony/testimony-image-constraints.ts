export function getImageConstraints(testimonyFile: string) {
  if (testimonyFile === "001-white-light.md") {
    return `
The entire scene must be underwater.
The dreamer is fully submerged beneath a lake.
The lakebed must be visible.
A tiny light rests in the sand.
The light must remain very small.
No caves.
No dry ground.
No walking.
No additional light sources.
`.trim();
  }

  if (testimonyFile === "002-the-old-gentleman-the-gate-and-the-hill.md") {
    return `
The car must remain on the near side of the unpaved road.
The gate must be on the opposite side of the road.
The gate must be part of a larger boundary.
The gate must be parallel to the road.
The hill must be beyond the gate.
The hill must not appear before the gate is entered.
The zigzag path must be visible on the hill.
The old gentleman must remain present.
`.trim();
  }

  return "";
}
