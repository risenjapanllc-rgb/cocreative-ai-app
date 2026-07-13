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

type UnknownRecord = Record<string, unknown>;

function isRecord(
  value: unknown
): value is UnknownRecord {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value)
  );
}

function toStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string" &&
      item.trim().length > 0
  );
}

function getString(
  value: unknown,
  fallback = ""
): string {
  return typeof value === "string"
    ? value
    : fallback;
}

export function buildShotGraph(
  compositionBible: unknown,
  sceneBible: unknown
): ShotGraph {
  if (!isRecord(sceneBible)) {
    return {
      shots: [],
    };
  }

  const scenes = Array.isArray(sceneBible.scenes)
    ? sceneBible.scenes
    : [];

  const composition =
    isRecord(compositionBible) &&
    isRecord(compositionBible.composition)
      ? compositionBible.composition
      : {};

  const camera =
    isRecord(composition.camera)
      ? composition.camera
      : {};

  const continuity =
    isRecord(composition.continuity)
      ? composition.continuity
      : {};

  return {
    shots: scenes.map(
      (sceneValue, index): Shot => {
        const scene = isRecord(sceneValue)
          ? sceneValue
          : {};

        const sceneMustPreserve =
          toStringArray(scene.mustPreserve);

        const sceneMustNotShow =
          toStringArray(scene.mustNotShow);

        const continuityRules: string[] = [];

        if (
          continuity.sameAcrossScenes === true
        ) {
          continuityRules.push(
            "Preserve the established composition across scenes."
          );
        }

        continuityRules.push(
          "Preserve confirmed character identities.",
          "Preserve the established environment.",
          "Preserve confirmed impossible conditions.",
          "Preserve the witnessed event order."
        );

        return {
          shot: index + 1,

          event: getString(
            scene.title,
            `Scene ${index + 1}`
          ),

          camera: {
            viewpoint: getString(
              camera.viewpoint,
              "Third-person observation"
            ),

            position: getString(
              camera.position
            ),

            height: getString(
              camera.height
            ),

            framing: getString(
              camera.framing
            ),
          },

          /*
            Scene Bible に保存された事実を使用する。
            特定の証言専用ルールをここへ直書きしない。
          */
          mustShow: sceneMustPreserve,

          /*
            明示的な禁止事項だけを使用する。
            畳、穴、扉などを一般ルールとして追加しない。
          */
          mustNotShow: sceneMustNotShow,

          continuity: continuityRules,
        };
      }
    ),
  };
}