export type Character = {
  id: string;

  name: string;

  role: "witness" | "character";

  aliases: string[];
};

export function extractCharacters(input: unknown): Character[] {
  const characters: Character[] = [];

  if (!input || typeof input !== "object") {
    return characters;
  }

  const data = input as Record<string, unknown>;

  const list = Array.isArray(data.characters)
    ? data.characters
    : Array.isArray(data.people)
    ? data.people
    : [];

  for (const item of list) {
    if (!item || typeof item !== "object") continue;

    const person = item as Record<string, unknown>;

    const name =
      typeof person.name === "string"
        ? person.name
        : typeof person.character === "string"
        ? person.character
        : undefined;

    if (!name) continue;

    const role: "witness" | "character" =
      name === "私" ||
      name === "私（女性）" ||
      name === "わたし"
        ? "witness"
        : "character";

    characters.push({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      role,
      aliases: [],
    });
  }

  return characters;
}