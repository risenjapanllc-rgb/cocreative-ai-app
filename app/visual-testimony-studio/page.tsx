"use client";

import { useState, type ReactNode } from "react";

const questions = [
  "この夢の中で、最も強く残っているものは何ですか？",
  "その中に、どんな感情がありましたか？",
  "その体験は、あなたに何を語っているように感じますか？",
  "この体験と共鳴する聖句はありますか？",
  "この証言を一言で表すなら？",
];

export default function VisualTestimonyStudioPage() {
  const [answer, setAnswer] = useState("");
  const [step, setStep] = useState(0);

  const [messages, setMessages] = useState([
    {
      role: "共創思考AI",
      text: questions[0],
    },
  ]);

  const [card, setCard] = useState({
    title: "Visual Testimony",
    coreWitness: "",
    coreEmotion: "",
    coreMeaning: "",
    scripture: "",
    essence: "",
  });

  function handleSend() {
    if (!answer.trim()) return;

    const userAnswer = answer.trim();

    setMessages((prev) => [
      ...prev,
      { role: "あなた", text: userAnswer },
    ]);

    if (step === 0) {
      setCard((prev) => ({
        ...prev,
        coreWitness: userAnswer,
      }));
    }

    if (step === 1) {
      setCard((prev) => ({
        ...prev,
        coreEmotion: userAnswer,
      }));
    }

    if (step === 2) {
      setCard((prev) => ({
        ...prev,
        coreMeaning: userAnswer,
      }));
    }

    if (step === 3) {
      setCard((prev) => ({
        ...prev,
        scripture: userAnswer,
      }));
    }

    if (step === 4) {
      setCard((prev) => ({
        ...prev,
        essence: userAnswer,
      }));
    }

    const nextStep = step + 1;

    if (nextStep < questions.length) {
      setMessages((prev) => [
        ...prev,
        {
          role: "共創思考AI",
          text: questions[nextStep],
        },
      ]);

      setStep(nextStep);
    }

    setAnswer("");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#111827",
        padding: 24,
      }}
    >
      <header style={{ color: "white", marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Visual Testimony Studio</h1>
        <p style={{ marginTop: 8, color: "#cbd5e1" }}>
          共創思考AIとの対話から、証言の核をカードとして形にする
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: 24,
        }}
      >
        <section
          style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <h2>共創思考AIとの対話</h2>

          <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  background:
                    message.role === "共創思考AI"
                      ? "#f8fafc"
                      : "#eef2ff",
                  padding: 16,
                  borderRadius: 12,
                }}
              >
                <strong>{message.role}</strong>
                <p style={{ marginBottom: 0 }}>{message.text}</p>
              </div>
            ))}
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="ここに答えを書いてください..."
            style={{
              width: "100%",
              minHeight: 140,
              marginTop: 24,
              padding: 16,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              fontSize: 16,
            }}
          />

          <button
            onClick={handleSend}
            style={{
              marginTop: 12,
              padding: "10px 18px",
              borderRadius: 10,
              border: "none",
              background: "#4f46e5",
              color: "white",
              cursor: "pointer",
            }}
          >
            送信
          </button>
        </section>

        <section
          style={{
            background: "#fff7ed",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <h2>Visual Testimony Card</h2>

          <div style={cardHeroStyle}>
            <p
              style={{
                letterSpacing: 3,
                fontSize: 12,
                opacity: 0.8,
                margin: 0,
              }}
            >
              VISUAL TESTIMONY
            </p>

            <h1
              style={{
                marginTop: 12,
                marginBottom: 24,
                fontSize: 38,
              }}
            >
              {card.title}
            </h1>

            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.5,
                maxWidth: 700,
                margin: "0 auto",
              }}
            >
              {card.coreWitness || "Core Witness"}
            </div>
          </div>

          <div style={gridStyle}>
            <Card title="Core Emotion">
              {card.coreEmotion || "未抽出"}
            </Card>

            <Card title="Core Meaning">
              {card.coreMeaning || "未抽出"}
            </Card>

            <Card title="Scripture Reflection">
              {card.scripture || "未選択"}
            </Card>

            <Card title="One Line Essence">
              {card.essence || "未抽出"}
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 18,
        border: "1px solid #fed7aa",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ lineHeight: 1.8 }}>{children}</p>
    </div>
  );
}

const cardHeroStyle = {
  marginTop: 20,
  padding: 24,
  borderRadius: 18,
  background: "linear-gradient(135deg, #78350f, #111827)",
  color: "white",
  textAlign: "center" as const,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  marginTop: 20,
};