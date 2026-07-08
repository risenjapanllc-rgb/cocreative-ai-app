import { Relationship } from "../world-model";

export function extractRelationships(
  input: unknown
): Relationship[] {
  if (!input || typeof input !== "object") {
    return [];
  }

  const data = input as Record<string, unknown>;

  const list = Array.isArray(data.relationships)
    ? data.relationships
    : [];

  return list.filter(
    (item): item is Relationship =>
      !!item && typeof item === "object"
  );
}