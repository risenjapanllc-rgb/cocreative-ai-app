// lib/visual-testimony/vt-parser.ts

export type TestimonySpec = {
  coreWitness: string[];
  spatialStructure: string[];
  boundaryStructure: string[];
  temporalStructure: string[];
  relationalStructure: string[];
  mustNotLose: string[];
};

export function parseTestimonyMarkdown(
  markdown: string
): TestimonySpec {
  const coreWitness: string[] = [];

  const coreWitnessMatch =
    markdown.match(
      /## Core Witness([\s\S]*?)(##|$)/
    );

  if (coreWitnessMatch) {
    coreWitness.push(
      coreWitnessMatch[1].trim()
    );
  }

  return {
    coreWitness,
    spatialStructure: [],
    boundaryStructure: [],
    temporalStructure: [],
    relationalStructure: [],
    mustNotLose: [],
  };
}