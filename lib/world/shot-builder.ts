export type Shot = {
  shot: number;

  event: string;

  camera: {
    viewpoint: string;
    position: string;
    height: string;
    framing: string;
  };

  mustShow: string[];

  mustNotShow: string[];

  continuity: string[];
};

export type ShotGraph = {
  shots: Shot[];
};

export function buildShotGraph(
  compositionBible: any,
  sceneBible: any
): ShotGraph {
  if (!sceneBible?.scenes) {
    return {
      shots: [],
    };
  }

  return {
    shots: sceneBible.scenes.map((scene: any, index: number) => ({
      shot: index + 1,

      event: scene.title,

      camera: {
        viewpoint:
          compositionBible?.composition?.camera?.viewpoint ??
          "Third Person",

        position:
          compositionBible?.composition?.camera?.position ??
          "",

        height:
          compositionBible?.composition?.camera?.height ??
          "",

        framing:
          compositionBible?.composition?.camera?.framing ??
          "",
      },

      mustShow: scene.mustPreserve ?? [],

      mustNotShow: [
        "camera angle change",
        "identity change",
        "room change",
        "hole in tatami",
        "trap door",
        "floor opening",
      ],

      continuity: [
        "same characters",
        "same room",
        "same camera",
        "same impossible condition",
      ],
    })),
  };
}