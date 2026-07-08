export type WorldEvent = {
  id: string;
  order: number;
  title: string;
  description: string;
};

export type EventGraph = {
  events: WorldEvent[];
};

export function buildEventGraph(sceneBible: any): EventGraph {
  if (!sceneBible?.scenes) {
    return {
      events: [],
    };
  }

  return {
    events: sceneBible.scenes.map((scene: any, index: number) => ({
      id: `event-${index + 1}`,
      order: index + 1,
      title: scene.title,
      description: scene.purpose,
    })),
  };
}