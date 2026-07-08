import { SymbolMeaning } from "../world-model";

export function extractSymbols(
  input: unknown
): SymbolMeaning[] {
  if (!input || typeof input !== "object") {
    return [];
  }

  const data = input as Record<string, unknown>;

  const list = Array.isArray(data.symbols)
    ? data.symbols
    : [];

  return list.filter(
    (item): item is SymbolMeaning =>
      !!item && typeof item === "object"
  );
}