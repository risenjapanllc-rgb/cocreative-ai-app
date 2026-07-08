import { Recognition, WorldMemory } from "./world-model";

/**
 * Recognition Engine
 *
 * Recognition emerges from memory.
 */
export function buildRecognition(
  memory: WorldMemory
): Recognition {

  return {
    id: memory.id,
    summary: memory.summary,
    createdAt: memory.createdAt,
  };

}