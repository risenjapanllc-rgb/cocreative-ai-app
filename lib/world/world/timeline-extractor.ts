import { TimelineEvent } from "../world-model";

export function extractTimeline(input: unknown): TimelineEvent[] {
  if (!input || typeof input !== "object") {
    return [];
  }

  const data = input as Record<string, unknown>;

  const scenes = Array.isArray(data.scenes) ? data.scenes : [];

  const timeline: TimelineEvent[] = [];

  scenes.forEach((scene: any, index: number) => {
    timeline.push({
      id: `scene-${index + 1}`,
      title: scene.title || scene.name || `Scene ${index + 1}`,
      description: scene.description || scene.summary || "",
    });
  });

  return timeline;
}