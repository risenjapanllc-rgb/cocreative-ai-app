export type ReferenceImage = {
  scene: number;
  imageUrl: string;
  createdAt: string;
};

export function createReferenceImage(
  scene: number,
  imageUrl: string
): ReferenceImage {
  return {
    scene,
    imageUrl,
    createdAt: new Date().toISOString(),
  };
}