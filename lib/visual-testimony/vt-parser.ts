// lib/visual-testimony/vt-parser.ts

export type TestimonySpec = {
  coreWitness: string[];
  spatialStructure: string[];
  boundaryStructure: string[];
  temporalStructure: string[];
  relationalStructure: string[];
  mustNotLose: string[];
};

function extractSection(
  markdown: string,
  headings: string[]
): string[] {
  for (const heading of headings) {
    const match = markdown.match(
      new RegExp(
        `^## ${heading}\\s*([\\s\\S]*?)(?=^## |$)`,
        "m"
      )
    );

    if (match) {
      return [match[1].trim()];
    }
  }

  return [];
}

export function parseTestimonyMarkdown(
  markdown: string
): TestimonySpec {
  const coreWitness = extractSection(
    markdown,
    ["Core Witness"]
  );

  const spatialStructure = extractSection(
    markdown,
    ["Spatial Structure (Highest Priority)"]
  );

  const boundaryStructure = extractSection(
    markdown,
    ["Boundary Structure"]
  );

  const temporalStructure = extractSection(
    markdown,
    ["Temporal Structure"]
  );

  const relationalStructure = extractSection(
    markdown,
    ["Relational Structure"]
  );

  const mustNotLose = extractSection(
    markdown,
    [
      "Must Not Lose",
      "What Remains Most Strongly",
      "What Remained",
    ]
  );

  console.log({
    coreWitness,
    spatialStructure,
    boundaryStructure,
    temporalStructure,
    relationalStructure,
    mustNotLose,
  });

  return {
    coreWitness,
    spatialStructure,
    boundaryStructure,
    temporalStructure,
    relationalStructure,
    mustNotLose,
  };
}