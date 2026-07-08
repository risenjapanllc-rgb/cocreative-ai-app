export interface WorldModel {
  characters: Character[];

  relationships: Relationship[];

  locations: Location[];

  objects: WorldObject[];

  timeline: TimelineEvent[];

  themes: string[];

  symbols: SymbolMeaning[];

  emotions: EmotionNode[];

  memories: WorldMemory[];

  recognitions: Recognition[];
}

export interface Character {
  id: string;
  name: string;
  role?: string;
}

export interface Relationship {
  from: string;
  to: string;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
}

export interface WorldObject {
  id: string;
  name: string;
  meaning?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
}

export interface SymbolMeaning {
  symbol: string;
  meaning: string;
}

export interface EmotionNode {
  subject: string;
  emotion: string;
}

export interface WorldMemory {
  id: string;
  type: "testimony" | "dialogue" | "recognition" | "image";
  summary: string;
  createdAt: string;
}

export interface Recognition {
  id: string;

  summary: string;

  createdAt: string;
}