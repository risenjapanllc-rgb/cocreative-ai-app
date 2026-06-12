"use client";

import { useState, type ReactNode } from "react";

type Message = {
  role: "あなた" | "共創思考AI";
  text: string;
};

export default function VisualTestimonyStudioPage() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
  {
    role: "共創思考AI",
    text:
      "夢や体験を書いてください。\n\n" +
      "私はまず受け取ります。\n\n" +
      "まだ解釈はしません。",
  },
]);

 const [card, setCard] = useState({
  title: "Visual Testimony",
  recognition: "",
  coreWitness: "",
  coreEmotion: "",
  coreMeaning: "",
  giftedWord: "",
  essence: "",
});
const [isLoading, setIsLoading] = useState(false);


 async function handleReceive() {
  if (!input.trim()) return;

  const userMessage = input.trim();

  setIsLoading(true);

  setMessages((prev) => [
    ...prev,
    { role: "あなた", text: userMessage },
  ]);

  setInput("");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
   body: JSON.stringify({
  messages: [
    ...messages,
    { role: "あなた", text: userMessage },
  ],
}),
  });

  const data = await res.json();

  setMessages((prev) => [
    ...prev,
    {
      role: "共創思考AI",
      text: data.text,
    },
  ]);
  setCard((prev) => ({
  ...prev,
  recognition: "君なら大丈夫",
}));
  setIsLoading(false);
}

function handleRecognitionAccepted() {
  setCard((prev) => ({
    ...prev,
    coreEmotion:
      prev.recognition || "愛・安心感・信頼感",
  }));
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
                    message.role === "共創思考AI" ? "#f8fafc" : "#eef2ff",
                  padding: 16,
                  borderRadius: 12,
                  whiteSpace: "pre-wrap",
                }}
              >
                <strong>{message.role}</strong>
                <p style={{ marginBottom: 0 }}>{message.text}</p>
              </div>
            ))}
          </div>

          {isLoading && (
  <div
    style={{
      background: "#f8fafc",
      padding: 16,
      borderRadius: 12,
      color: "#64748b",
      marginTop: 12,
    }}
  >
    共創思考AIが受け取っています...
  </div>
)}

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="夢・体験・気づき・修正したいことを書いてください..."
            style={{
              width: "100%",
              minHeight: 160,
              marginTop: 24,
              padding: 16,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              fontSize: 16,
            }}
          />

          <button
            onClick={handleReceive}
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
          <h2>Visual Testimony</h2>

<div
  style={{
    marginTop: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    background: "#f8fafc",
    border: "1px solid #cbd5e1",
  }}
>
  <h3 style={{ marginTop: 0 }}>Recognition</h3>

  <p
    style={{
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#64748b",
    }}
  >
    Status
  </p>

  <p
    style={{
      fontWeight: 600,
      marginBottom: 12,
    }}
  >
    Listening...
  </p>

  <p style={{ lineHeight: 1.8 }}>
  {card.recognition || "対話の中から認識が現れるのを待っています。"}
</p>
<div
  style={{
    display: "flex",
    gap: 8,
    marginTop: 16,
  }}
>
  <button style={smallButtonStyle}>違う</button>
  <button style={smallButtonStyle}>近い</button>
  <button
  style={smallButtonStyle}
  onClick={handleRecognitionAccepted}
>
  それだ
</button>
</div>
</div>

<div
  style={{
    marginTop: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    background: "#f8fafc",
    border: "1px solid #cbd5e1",
  }}
>
  <h3 style={{ marginTop: 0 }}>Core Formation</h3>

  <p
    style={{
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#64748b",
    }}
  >
    Core Emotion
  </p>

  <p>
    {card.coreEmotion ||
      "対話の中から現れるのを待っています。"}
  </p>

  <p
    style={{
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#64748b",
      marginTop: 16,
    }}
  >
    Core Meaning
  </p>

  <p>
    {card.coreMeaning ||
      "対話の中から現れるのを待っています。"}
  </p>
</div>


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

            <h1 style={{ marginTop: 12, marginBottom: 24, fontSize: 38 }}>
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
              {card.coreWitness || "Core Witness will emerge through dialogue"}
            </div>
          </div>

          <div style={gridStyle}>
            <Card title="Core Emotion">{card.coreEmotion || "未確定"}</Card>
            <Card title="Core Meaning">{card.coreMeaning || "未確定"}</Card>
            <Card title="Gifted Word">
  {card.giftedWord || "対話の中から現れるのを待っています。"}
</Card>
            <Card title="One Line Essence">{card.essence || "未確定"}</Card>
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
const smallButtonStyle = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  background: "white",
  cursor: "pointer",
};