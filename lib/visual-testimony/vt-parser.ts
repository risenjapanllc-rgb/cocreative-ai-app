// lib/visual-testimony/vt-parser.ts

export type TestimonySpec = {
  coreWitness: string[];
  spatialStructure: string[];
  boundaryStructure: string[];
  temporalStructure: string[];
  relationalStructure: string[];
  mustNotLose: string[];
};

export function parseTestimonyMarkdown(markdown: string): TestimonySpec {
  return {
    coreWitness: [],
    spatialStructure: [],
    boundaryStructure: [],
    temporalStructure: [],
    relationalStructure: [],
    mustNotLose: [],
  };
}