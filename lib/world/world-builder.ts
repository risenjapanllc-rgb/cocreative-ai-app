import { WorldModel } from "./world-model";
import {
  extractCharacters,
  buildLocations,
  buildObjects,
} from "./world";

export type WitnessWorld = {
  world: WorldModel;

  characters: unknown;
  environment: unknown;
  composition: unknown;
  objects: unknown;
  scenes: unknown;
};

export type BuildWorldInput = {
  characterBible?: unknown;
  environmentBible?: unknown;
  compositionBible?: unknown;
  objectBible?: unknown;
  sceneBible?: unknown;
};

export function buildWorld({
  characterBible,
  environmentBible,
  compositionBible,
  objectBible,
  sceneBible,
}: BuildWorldInput): WitnessWorld {
  console.log("🔥 BUILD WORLD CALLED");

  const characters = extractCharacters(characterBible);

  console.log(
    "🔥 CHARACTERS =",
    JSON.stringify(characters, null, 2)
  );

  const world: WorldModel = {
    characters,

    relationships: [],

    locations: buildLocations(environmentBible),

    objects: buildObjects(objectBible),

    timeline: [],

    themes: [],

    symbols: [],

    emotions: [],

    memories: [],
  };

  return {
    world,

    characters: characterBible || {},
    environment: environmentBible || {},
    composition: compositionBible || {},
    objects: objectBible || {},
    scenes: sceneBible || {},
  };
}