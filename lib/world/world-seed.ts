export type WorldSeed = {
  worldId: string;

  selectedReferenceImageUrl: string;

  acceptedByWitness: boolean;

  acceptedAt?: string;
};

export function createWorldSeed({
  selectedReferenceImageUrl,
}: {
  selectedReferenceImageUrl: string;
}): WorldSeed {
  return {
    worldId: crypto.randomUUID(),
    selectedReferenceImageUrl,
    acceptedByWitness: true,
    acceptedAt: new Date().toISOString(),
  };
}