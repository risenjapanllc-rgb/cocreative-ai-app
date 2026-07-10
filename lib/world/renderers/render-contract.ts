export type RenderContract = {
  identity: string[];
  environment: string[];
  camera: string[];
  impossible: string[];
  continuity: string[];
  action: string[];
  emotion: string[];
};

export function buildRenderContract(): RenderContract {
  return {
    identity: [],
    environment: [],
    camera: [],
    impossible: [],
    continuity: [],
    action: [],
    emotion: [],
  };
}

export function renderContractToPrompt(
  contract: RenderContract
): string {
  const lines: string[] = [];

  const addSection = (
    title: string,
    values: string[]
  ) => {
    const filtered = values.filter(
      (value) => value.trim().length > 0
    );

    if (filtered.length === 0) {
      return;
    }

    lines.push(title);

    for (const value of filtered) {
      lines.push(`- ${value}`);
    }

    lines.push("");
  };

  lines.push("RENDER CONTRACT");
  lines.push("");

  addSection("IDENTITY LOCK", contract.identity);
  addSection("ENVIRONMENT LOCK", contract.environment);
  addSection("CAMERA LOCK", contract.camera);
  addSection(
    "IMPOSSIBLE CONDITION LOCK",
    contract.impossible
  );
  addSection("CONTINUITY LOCK", contract.continuity);
  addSection("CURRENT ACTION", contract.action);
  addSection("CURRENT EMOTION", contract.emotion);

  return lines.join("\n").trim();
}