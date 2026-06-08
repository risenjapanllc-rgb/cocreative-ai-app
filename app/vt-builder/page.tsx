import { buildVT002Spec } from "@/lib/visual-testimony/vt-builder";

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function Page() {
  const spec = buildVT002Spec();

  return (
    <main style={{ padding: 32, maxWidth: 1000 }}>
      <h1>Visual Testimony Builder v0.1</h1>

      <h2>
        {spec.id}: {spec.title}
      </h2>

      <Section title="Core Witness" items={spec.coreWitness} />
      <Section title="Spatial Structure" items={spec.spatialStructure} />
      <Section title="Boundary Structure" items={spec.boundaryStructure} />
      <Section title="Temporal Structure" items={spec.temporalStructure} />
      <Section title="Relational Structure" items={spec.relationalStructure} />
      <Section title="Must Not Lose" items={spec.mustNotLose} />
    </main>
  );
}