import { buildVT002FidelityChecklist } from "@/lib/visual-testimony/fidelity-checklist";
import fs from "fs";
import path from "path";
import { parseTestimonyMarkdown } from "@/lib/visual-testimony/vt-parser";

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h3>{title}</h3>

      {items.map((item, index) => (
        <pre
          key={index}
          style={{
            whiteSpace: "pre-wrap",
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
          {item}
        </pre>
      ))}
    </section>
  );
}

export default function Page() {
  const filePath = path.join(
    process.cwd(),
    "docs/visual-testimonies/002-the-old-gentleman-the-gate-and-the-hill.md"
  );

  const markdown = fs.readFileSync(filePath, "utf8");
  const spec = parseTestimonyMarkdown(markdown);
  const checklist = buildVT002FidelityChecklist();

  return (
    <main style={{ padding: 32, maxWidth: 1000 }}>
      <h1>Visual Testimony Builder v0.1</h1>

      <h2>Parsed from Markdown: VT-002</h2>

      <Section title="Core Witness" items={spec.coreWitness} />
      <Section title="Spatial Structure" items={spec.spatialStructure} />
      <Section title="Boundary Structure" items={spec.boundaryStructure} />
      <Section title="Temporal Structure" items={spec.temporalStructure} />
      <Section title="Relational Structure" items={spec.relationalStructure} />
      <Section title="Must Not Lose" items={spec.mustNotLose} />
      <section style={{ marginTop: 32 }}>
  <h3>Fidelity Checklist</h3>

   <ul>
          {checklist.map((item, index) => (
            <li key={index}>□ {item}</li>
          ))}
        </ul>
</section>
    </main>
  );
}
