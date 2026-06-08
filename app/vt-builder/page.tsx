import { buildVT002Spec } from "@/lib/visual-testimony/vt-builder";

export default function Page() {
  const spec = buildVT002Spec();

  return (
    <main style={{ padding: 32 }}>
      <h1>Visual Testimony Builder v0.1</h1>

      <h2>
        {spec.id}: {spec.title}
      </h2>

      <h3>Core Witness</h3>

      <ul>
        {spec.coreWitness.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Must Not Lose</h3>

      <ul>
        {spec.mustNotLose.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
