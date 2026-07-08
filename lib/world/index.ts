import { understandWorld } from "./understand-world";
import { buildEventGraph } from "./event-builder";
import { buildShotGraph } from "./shot-builder";
import { directScene } from "./director";
import { buildDirectorScript } from "./director-script";

export function buildWitnessWorld({
  characterBible,
  environmentBible,
  compositionBible,
  objectBible,
  sceneBible,
  scene = 1,
}: {
  characterBible: any;
  environmentBible: any;
  compositionBible: any;
  objectBible: any;
  sceneBible: any;
  scene?: number;
}) {
  const world = understandWorld({
    characterBible,
    environmentBible,
    compositionBible,
    objectBible,
    sceneBible,
  });

  const events = buildEventGraph(sceneBible);

  const shots = buildShotGraph(compositionBible, sceneBible);

  const director = directScene({
    shots,
    events,
    scene,
  });

  const directorScript = buildDirectorScript(director);

  return {
    world,
    events,
    shots,
    director,
    directorScript,
  };
}