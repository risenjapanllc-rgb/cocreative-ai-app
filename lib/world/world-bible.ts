export type WorldBible = {
  characterBible: any;

  environmentBible: any;

  compositionBible: any;

  objectBible: any;

  sceneBible: any;
};

export function buildWorldBible({
  characterBible,
  environmentBible,
  compositionBible,
  objectBible,
  sceneBible,
}: WorldBible): WorldBible {
  return {
    characterBible,

    environmentBible,

    compositionBible,

    objectBible,

    sceneBible,
  };
}