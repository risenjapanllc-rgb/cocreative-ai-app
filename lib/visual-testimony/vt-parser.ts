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

  const coreWitnessMatch = markdown.match(
    /## Core Witness([\s\S]*?)(##|$)/
  );

  if (coreWitnessMatch) {
    coreWitness.push(coreWitnessMatch[1].trim());
  }

  const spatialStructure: string[] = [];

  const spatialMatch = markdown.match(
    /## Spatial Structure([\s\S]*?)(##|$)/
  );

  if (spatialMatch) {
    spatialStructure.push(spatialMatch[1].trim());
  }

  const temporalStructure: string[] = [];

  const temporalMatch = markdown.match(
    /## Temporal Structure([\s\S]*?)(##|$)/
  );

  if (temporalMatch) {
    temporalStructure.push(temporalMatch[1].trim());
  }

  const boundaryStructure: string[] = [];

  const boundaryMatch = markdown.match(
    /## Boundary Structure([\s\S]*?)(##|$)/
  );

  if (boundaryMatch) {
    boundaryStructure.push(boundaryMatch[1].trim());
  }

  return {
    coreWitness,
    spatialStructure,
    boundaryStructure,
    temporalStructure,
    relationalStructure: [],
    mustNotLose: [],
  };
}