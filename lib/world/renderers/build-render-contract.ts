import { DirectorDecision } from "../director";
import { WitnessWorld } from "../world-builder";

import {
  buildRenderContract,
  RenderContract,
} from "./render-contract";

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

function asString(
  value: unknown
): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const text = value.trim();

  return text || undefined;
}

function asStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

function pushUnique(
  target: string[],
  ...values: Array<string | undefined>
) {
  for (const value of values) {
    if (
      value &&
      !target.includes(value)
    ) {
      target.push(value);
    }
  }
}

function pushUniqueList(
  target: string[],
  values: string[]
) {
  for (const value of values) {
    pushUnique(target, value);
  }
}

function getCharacterItems(
  world: WitnessWorld
): unknown[] {
  if (!isRecord(world.characters)) {
    return [];
  }

  if (
    Array.isArray(
      world.characters.characters
    )
  ) {
    return world.characters.characters;
  }

  if (
    isRecord(
      world.characters.characters
    ) &&
    Array.isArray(
      world.characters.characters.characters
    )
  ) {
    return world.characters.characters.characters;
  }

  if (
    Array.isArray(
      world.characters.people
    )
  ) {
    return world.characters.people;
  }

  return [];
}

function addCharacters(
  contract: RenderContract,
  world: WitnessWorld
) {
  const characters =
    getCharacterItems(world);

  for (const item of characters) {
    if (!isRecord(item)) {
      continue;
    }

    const id = asString(item.id);
    const identity =
      asString(item.identity);
    const role = asString(item.role);
    const relationship =
      asString(item.relationship);

    const label =
      identity ||
      role ||
      id ||
      "Unknown character";

    pushUnique(
      contract.identity,
      `Character: ${label}`
    );

    if (relationship) {
      pushUnique(
        contract.identity,
        `${label} relationship: ${relationship}`
      );
    }

    if (isRecord(item.appearance)) {
      for (
        const [key, value]
        of Object.entries(item.appearance)
      ) {
        const text = asString(value);

        if (text) {
          pushUnique(
            contract.identity,
            `${label} ${key}: ${text}`
          );
        }
      }
    }

    pushUniqueList(
      contract.identity,
      asStringArray(
        item.mustPreserve
      ).map(
        (value) =>
          `${label} MUST PRESERVE: ${value}`
      )
    );

    pushUniqueList(
      contract.identity,
      asStringArray(
        item.neverBecome
      ).map(
        (value) =>
          `${label} MUST NOT BECOME: ${value}`
      )
    );

    if (
      isRecord(item.continuity) &&
      item.continuity
        .sameAcrossScenes === true
    ) {
      pushUnique(
        contract.continuity,
        `${label} remains the same person across scenes.`
      );
    }
  }
}

function collectStrings(
  value: unknown,
  limit = 20
): string[] {
  const result: string[] = [];

  function visit(current: unknown) {
    if (result.length >= limit) {
      return;
    }

    if (typeof current === "string") {
      const text = current.trim();

      if (
        text &&
        !result.includes(text)
      ) {
        result.push(text);
      }

      return;
    }

    if (Array.isArray(current)) {
      for (const item of current) {
        visit(item);

        if (
          result.length >= limit
        ) {
          break;
        }
      }

      return;
    }

    if (isRecord(current)) {
      for (
        const item
        of Object.values(current)
      ) {
        visit(item);

        if (
          result.length >= limit
        ) {
          break;
        }
      }
    }
  }

  visit(value);

  return result;
}

function getCurrentScene(
  world: WitnessWorld,
  decision: DirectorDecision
): UnknownRecord | undefined {
  if (!isRecord(world.scenes)) {
    return undefined;
  }

  const scenes =
    Array.isArray(world.scenes.scenes)
      ? world.scenes.scenes
      : [];

  const scene =
    scenes[
      Math.max(
        0,
        decision.currentShot - 1
      )
    ];

  return isRecord(scene)
    ? scene
    : undefined;
}

export function buildRenderContractFromWorld({
  world,
  decision,
}: {
  world: WitnessWorld;
  decision: DirectorDecision;
}): RenderContract {
  const contract =
    buildRenderContract();

  // ==========================
  // Established World
  // ==========================

  addCharacters(contract, world);

  pushUniqueList(
    contract.environment,
    collectStrings(
      world.environment,
      20
    )
  );

  pushUniqueList(
    contract.continuity,
    collectStrings(
      world.objects,
      15
    )
  );

  // ==========================
  // Current Scene Only
  // ==========================

  const currentScene =
    getCurrentScene(
      world,
      decision
    );

  if (currentScene) {
    pushUnique(
      contract.action,
      asString(currentScene.title),
      ...asStringArray(
        currentScene.actions
      )
    );

    pushUnique(
      contract.emotion,
      asString(
        currentScene.emotion
      )
    );

    pushUniqueList(
      contract.continuity,
      asStringArray(
        currentScene.mustPreserve
      )
    );

    pushUniqueList(
      contract.continuity,
      asStringArray(
        currentScene.objects
      )
    );
  }

  // ==========================
  // Director Observation
  // ==========================

  pushUnique(
    contract.action,
    `Current event: ${decision.currentEvent}`,
    `Visible action: ${decision.action.visible}`
  );

  pushUnique(
    contract.emotion,
    decision.action.emotional
      ? `Current emotion: ${decision.action.emotional}`
      : undefined
  );

  /*
    Camera は現在の Translator との互換性のため、
    一時的に Render Contract に保持する。

    次の段階で DirectorDecision を
    Translator に直接渡す形へ移す。
  */
  pushUnique(
    contract.camera,
    `Viewpoint: ${decision.camera.viewpoint}`,
    `Position: ${decision.camera.position}`,
    `Height: ${decision.camera.height}`,
    `Framing: ${decision.camera.framing}`
  );

  pushUniqueList(
    contract.continuity,
    decision.mustShow
  );

  pushUniqueList(
    contract.impossible,
    decision.mustNotShow
  );

  pushUniqueList(
    contract.continuity,
    decision.forbidden
  );

  console.log(
    "RENDER CONTRACT =",
    JSON.stringify(
      contract,
      null,
      2
    )
  );

  return contract;
}