type StageId =
  | "testimony"
  | "clarification"
  | "visual-extraction"
  | "image-prompt"
  | "image-generation"
  | "fidelity-check"
  | "witness-reflection"
  | "memory-emergence"
  | "recognition";

import { stages } from "./stageConfig";

type Props = {
  currentStage: StageId;
};

export default function LivingSpiral({ currentStage }: Props) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 16,
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        marginBottom: 24,
      }}
    >
      <h3 style={{ marginBottom: 16 }}>Living Spiral</h3>

      {stages.map((stage) => {
        const active = stage.id === currentStage;

        return (
          <div
            key={stage.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 0",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: active ? "#facc15" : "#e5e7eb",
                fontSize: 18,
              }}
            >
              {stage.icon}
            </div>

            <div>
              <div style={{ fontWeight: active ? 700 : 500 }}>
                {stage.number}. {stage.title}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#64748b",
                }}
              >
                {stage.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}