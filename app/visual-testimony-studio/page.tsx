"use client";

import { useState, type ReactNode } from "react";

export default function VisualTestimonyStudioPage() {
  const [dreamText, setDreamText] = useState("");

  const [card, setCard] = useState({
    title: "Visual Testimony",
    coreWitness: "",
    coreEmotion: "",
    coreMeaning: "",
    scripture: "",
    essence: "",
  });

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "#111827", padding: 24 }}>
      <header style={{ color: "white", marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Visual Testimony Studio</h1>
        <p style={{ marginTop: 8, color: "#cbd5e1" }}>
          共創思考AIとの対話から、証言の核をカードとして形にする
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 24 }}>
        <section style={{ background: "#ffffff", borderRadius: 20, padding: 24 }}>
          <h2>共創思考AIとの対話</h2>

          <textarea
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder="夢や体験を書いてください..."
            style={{
              width: "100%",
              minHeight: 260,
              marginTop: 24,
              padding: 16,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              fontSize: 16,
            }}
          />

          <button
            onClick={() => {
              setCard({
                title: "The Gate and the Hill",
                coreWitness: "「さあここからは一人で向かいなさい」",
                coreEmotion: "始まり・信頼・決意",
                coreMeaning: "一人で進む段階に入った。見捨てられたのではなく託された。",
                scripture: "「これが道だ。これに歩め。」 イザヤ書 30:21",
                essence: "託されて、一人で進む旅が始まった。",
              });
            }}
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
            Core抽出
          </button>
        </section>

        <section style={{ background: "#fff7ed", borderRadius: 20, padding: 24 }}>
          <h2>Visual Testimony Card</h2>

          <div style={cardHeroStyle}>
            <p style={{ letterSpacing: 3, fontSize: 12, opacity: 0.8, margin: 0 }}>
              VISUAL TESTIMONY
            </p>

            <h1 style={{ marginTop: 12, marginBottom: 24, fontSize: 38 }}>
              {card.title}
            </h1>

            <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.5, maxWidth: 700, margin: "0 auto" }}>
              {card.coreWitness || "Core Witness"}
            </div>
          </div>

          <div style={gridStyle}>
            <Card title="Core Emotion">{card.coreEmotion || "未抽出"}</Card>
            <Card title="Core Meaning">{card.coreMeaning || "未抽出"}</Card>
            <Card title="Scripture Reflection">{card.scripture || "未選択"}</Card>
            <Card title="One Line Essence">{card.essence || "未抽出"}</Card>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
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