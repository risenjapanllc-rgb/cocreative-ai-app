// lib/visual-testimony/vt-parser.ts

export type TestimonySpec = {
  coreWitness: string[];
  spatialStructure: string[];
  boundaryStructure: string[];
  temporalStructure: string[];
  relationalStructure: string[];
  mustNotLose: string[];
};

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractSection(markdown: string, headings: string[]): string[] {
  for (const heading of headings) {
    const escapedHeading = escapeRegExp(heading);

    const match = markdown.match(
      new RegExp(
        `(?:^|\\n)## ${escapedHeading}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`
      )
    );

    if (match) {
      return [match[1].trim()];
    }
  }

  return [];
}

export function parseTestimonyMarkdown(markdown: string): TestimonySpec {
  const coreWitness = extractSection(markdown, ["Core Witness"]);

  const spatialStructure = extractSection(markdown, [
    "Spatial Structure (Highest Priority)",
    "Spatial Structure",
  ]);

  const boundaryStructure = extractSection(markdown, ["Boundary Structure"]);

  const temporalStructure = extractSection(markdown, ["Temporal Structure"]);

  const relationalStructure = extractSection(markdown, ["Relational Structure"]);

  const mustNotLose = extractSection(markdown, [
    "Witness Preservation Analysis",
    "Must Not Lose",
    "What Remains Most Strongly",
    "What Remained",
  ]);

  return {
    coreWitness,
    spatialStructure,
    boundaryStructure,
    temporalStructure,
    relationalStructure,
    mustNotLose,
  };
}
