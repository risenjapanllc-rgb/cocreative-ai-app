export function extractThemes(
  input: unknown
): string[] {
  if (!input || typeof input !== "object") {
    return [];
  }

  const data = input as Record<string, unknown>;

  const list = Array.isArray(data.themes)
    ? data.themes
    : [];

  return list.filter(
    (item): item is string =>
      typeof item === "string"
  );
}