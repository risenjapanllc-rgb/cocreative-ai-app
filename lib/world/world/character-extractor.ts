export type Character = {
  id: string;
  name: string;
  role: "witness" | "character";
  aliases: string[];
};

export function extractCharacters(input: unknown): Character[] {
  console.log(
    "extractCharacters INPUT =",
    JSON.stringify(input, null, 2)
  );

  if (!input || typeof input !== "object") {
    console.log("extractCharacters: input is not an object");
    return [];
  }

  const data = input as Record<string, unknown>;

  const list = findCharacterList(data);

  console.log(
    "extractCharacters LIST =",
    JSON.stringify(list, null, 2)
  );

  const characters: Character[] = [];

  for (const item of list) {
    if (!item || typeof item !== "object") {
      console.log("extractCharacters: skipped non-object", item);
      continue;
    }

    const person = item as Record<string, unknown>;

    console.log(
      "extractCharacters PERSON =",
      JSON.stringify(person, null, 2)
    );

    const rawId = firstString(
      person.id,
      person.characterId,
      person.personId
    );

    const name = firstString(
  person.name,
  person.identity,
  person.role,
  person.character,
  person.displayName,
  person.characterName,
  person.label,
  rawId
);

    console.log("rawId =", rawId);
    console.log("name =", name);

    if (!name) {
      console.log("extractCharacters: skipped (no name)");
      continue;
    }

    const rawRole = firstString(person.role)?.toLowerCase();

const normalizedName = name
  .replace(/[（）()]/g, "")
  .trim()
  .toLowerCase();

const role: "witness" | "character" =
  rawRole === "witness" ||
  rawId?.toLowerCase() === "yoko" ||
  rawId?.toLowerCase() === "witness" ||
  normalizedName.includes("ようこ") ||
  normalizedName.includes("私") ||
  normalizedName.includes("わたし") ||
  normalizedName === "yoko"
    ? "witness"
    : "character";

    const aliases = Array.isArray(person.aliases)
      ? person.aliases.filter(
          (value): value is string =>
            typeof value === "string" &&
            value.trim().length > 0
        )
      : [];

    const id =
      rawId?.trim() ||
      name
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-+|-+$/g, "") ||
      `character-${characters.length + 1}`;

    const character = {
      id,
      name: name.trim(),
      role,
      aliases,
    };

    console.log(
      "extractCharacters PUSH =",
      JSON.stringify(character, null, 2)
    );

    characters.push(character);
  }

  console.log(
    "extractCharacters RESULT =",
    JSON.stringify(characters, null, 2)
  );

  return characters;
}

function findCharacterList(
  data: Record<string, unknown>
): unknown[] {
  console.log(
    "findCharacterList DATA =",
    JSON.stringify(data, null, 2)
  );

  if (Array.isArray(data.characters)) {
    console.log("findCharacterList -> data.characters");
    return data.characters;
  }

  if (
    data.characters &&
    typeof data.characters === "object"
  ) {
    const nested = data.characters as Record<string, unknown>;

    console.log(
      "findCharacterList nested =",
      JSON.stringify(nested, null, 2)
    );

    if (Array.isArray(nested.characters)) {
      console.log(
        "findCharacterList -> nested.characters"
      );
      return nested.characters;
    }

    if (Array.isArray(nested.people)) {
      console.log("findCharacterList -> nested.people");
      return nested.people;
    }
  }

  if (Array.isArray(data.people)) {
    console.log("findCharacterList -> data.people");
    return data.people;
  }

  console.log("findCharacterList -> EMPTY");

  return [];
}

function firstString(
  ...values: unknown[]
): string | undefined {
  for (const value of values) {
    if (
      typeof value === "string" &&
      value.trim().length > 0
    ) {
      return value.trim();
    }
  }

  return undefined;
}