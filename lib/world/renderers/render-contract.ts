export type RenderContract = {
  identity: string[];
  environment: string[];
  impossible: string[];
  continuity: string[];
  action: string[];
  emotion: string[];
};

export function buildRenderContract(): RenderContract {
  return {
    identity: [],
    environment: [],
    impossible: [],
    continuity: [],
    action: [],
    emotion: [],
  };
}