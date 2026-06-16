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
        "印象に残っている夢や体験、\n" +
        "感じていること、\n" +
        "疑問などを自由に書いてください。",
    },
  ]);

  const [card, setCard] = useState({
    title: "Visual Testimony",
    witnessNotes: "",
    presence: "",
    recognition: "",
    visualForm: "",
    imagePrompt: "",
    coreWitness: "",
    coreEmotion: "",
    coreMeaning: "",
    coreWord: "",
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

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API ERROR", res.status, errorText);
      setIsLoading(false);
      return;
    }

    const data = await res.json();

    console.log("API RESPONSE", data);

    setMessages((prev) => [
      ...prev,
      {
        role: "共創思考AI",
        text: data.text,
      },
    ]);

    setCard((prev) => ({
      ...prev,
      witnessNotes: data.witnessNotes || "",
      presence: data.presence || "",
      recognition: data.recognition || "",
      visualForm: data.visualForm || "",
      imagePrompt: data.imagePrompt || "",
      coreEmotion: data.coreEmotion || "",
      coreMeaning: data.coreMeaning || "",
      coreWord: data.coreWord || "",
      giftedWord: data.giftedWord || "",
      essence: data.essence || "",
    }));

    setIsLoading(false);
  }

  function handleRecognitionAccepted() {
    if (!card.recognition) return;

    setCard((prev) => ({
      ...prev,
      coreWitness: prev.recognition,
      title: prev.recognition.replace(/^- /, "") || "Visual Testimony",
    }));
  }

  return (
    <main style={mainStyle}>
      <header style={{ color: "white", marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Visual Testimony Studio</h1>
        <p style={{ marginTop: 8, color: "#cbd5e1" }}>
          共創思考AIとの対話から、証言の核をカードとして形にする
        </p>
      </header>

      <div style={layoutStyle}>
        <section style={leftPanelStyle}>
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
            <div style={loadingStyle}>共創思考AIが受け取っています...</div>
          )}

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="夢・体験・気づき・修正したいことを書いてください..."
            style={textareaStyle}
          />

          <button onClick={handleReceive} style={sendButtonStyle}>
            送信
          </button>
        </section>

        <section style={rightPanelStyle}>
          <h2>Visual Testimony</h2>

          <Panel title="Witness Reflection">
            <p style={labelStyle}>Witness Notes</p>
            <p style={bodyStyle}>
              {card.witnessNotes ||
                "証言の中で目撃したものがここに現れます。"}
            </p>

            <p style={{ ...labelStyle, marginTop: 16 }}>Presence</p>
            <p style={bodyStyle}>
              {card.presence ||
                "場の空気や静けさが現れるのを待っています。"}
            </p>
          </Panel>

          <Panel title="Recognition">
            <p style={labelStyle}>Status</p>
            <p style={{ fontWeight: 600, marginBottom: 12 }}>Listening...</p>

            <p style={bodyStyle}>
              {card.recognition ||
                "対話の中から認識が現れるのを待っています。"}
            </p>

            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button style={smallButtonStyle}>違う</button>
              <button style={smallButtonStyle}>近い</button>
              <button style={smallButtonStyle} onClick={handleRecognitionAccepted}>
                それだ
              </button>
            </div>
          </Panel>

          <Panel title="Visual Form">
            <p style={bodyStyle}>
              {card.visualForm || "視覚形式が現れるのを待っています。"}
            </p>
          </Panel>

          <Panel title="Image Prompt">
            <p style={bodyStyle}>
              {card.imagePrompt ||
                "画像生成用プロンプトが現れるのを待っています。"}
            </p>

            <button
              disabled={!card.imagePrompt}
              onClick={() => {
                console.log(card.imagePrompt);
                alert("画像生成準備OK");
              }}
              style={{
                ...generateButtonStyle,
                background: card.imagePrompt ? "#ea580c" : "#cbd5e1",
                cursor: card.imagePrompt ? "pointer" : "not-allowed",
              }}
            >
              Generate Image
            </button>
          </Panel>

          <Panel title="Core Formation">
            <p style={labelStyle}>Core Emotion</p>
            <p style={bodyStyle}>
              {card.coreEmotion || "対話の中から現れるのを待っています。"}
            </p>

            <p style={{ ...labelStyle, marginTop: 16 }}>Core Meaning</p>
            <p style={bodyStyle}>
              {card.coreMeaning || "対話の中から現れるのを待っています。"}
            </p>

            <p style={{ ...labelStyle, marginTop: 16 }}>Core Word / Message</p>
            <p style={bodyStyle}>
              {card.coreWord || "証言の中の言葉がここに現れます。"}
            </p>

            <p style={{ ...labelStyle, marginTop: 16 }}>Gifted Word</p>
            <p style={bodyStyle}>
              {card.giftedWord || "御言葉がここに現れます。"}
            </p>

            <p style={{ ...labelStyle, marginTop: 16 }}>One Line Essence</p>
            <p style={bodyStyle}>{card.essence || "未確定"}</p>
          </Panel>

          <div style={cardHeroStyle}>
            <p style={heroLabelStyle}>VISUAL TESTIMONY</p>

            <h1 style={{ marginTop: 12, marginBottom: 24, fontSize: 38 }}>
              {card.title}
            </h1>

            <div style={heroTextStyle}>
              {card.coreWitness || "Core Witness will emerge through dialogue"}
            </div>
          </div>

          <div style={gridStyle}>
            <Card title="Core Emotion">{card.coreEmotion || "未確定"}</Card>
            <Card title="Core Meaning">{card.coreMeaning || "未確定"}</Card>
            <Card title="Core Word / Message">
              {card.coreWord || "証言の中の言葉がここに現れます。"}
            </Card>
            <Card title="Gifted Word">
              {card.giftedWord || "御言葉がここに現れます。"}
            </Card>
            <Card title="One Line Essence">{card.essence || "未確定"}</Card>
          </div>
        </section>
      </div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={panelStyle}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{children}</p>
    </div>
  );
}

const mainStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "#111827",
  padding: 24,
};

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1.15fr",
  gap: 24,
};

const leftPanelStyle = {
  background: "#ffffff",
  borderRadius: 20,
  padding: 24,
};

const rightPanelStyle = {
  background: "#fff7ed",
  borderRadius: 20,
  padding: 24,
};

const panelStyle = {
  marginTop: 16,
  marginBottom: 24,
  padding: 20,
  borderRadius: 16,
  background: "#f8fafc",
  border: "1px solid #cbd5e1",
};

const loadingStyle = {
  background: "#f8fafc",
  padding: 16,
  borderRadius: 12,
  color: "#64748b",
  marginTop: 12,
};

const textareaStyle = {
  width: "100%",
  minHeight: 160,
  marginTop: 24,
  padding: 16,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  fontSize: 16,
};

const sendButtonStyle = {
  marginTop: 12,
  padding: "10px 18px",
  borderRadius: 10,
  border: "none",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
};

const generateButtonStyle = {
  marginTop: 12,
  padding: "10px 18px",
  borderRadius: 10,
  border: "none",
  color: "white",
};

const bodyStyle = {
  lineHeight: 1.8,
  whiteSpace: "pre-wrap" as const,
};

const labelStyle = {
  fontSize: 12,
  textTransform: "uppercase" as const,
  letterSpacing: 1,
  color: "#64748b",
};

const cardHeroStyle = {
  marginTop: 20,
  padding: 24,
  borderRadius: 18,
  background: "linear-gradient(135deg, #78350f, #111827)",
  color: "white",
  textAlign: "center" as const,
};

const heroLabelStyle = {
  letterSpacing: 3,
  fontSize: 12,
  opacity: 0.8,
  margin: 0,
};

const heroTextStyle = {
  fontSize: 28,
  fontWeight: 700,
  lineHeight: 1.5,
  maxWidth: 700,
  margin: "0 auto",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  marginTop: 20,
};

const cardStyle = {
  background: "white",
  borderRadius: 16,
  padding: 18,
  border: "1px solid #fed7aa",
};

const smallButtonStyle = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  background: "white",
  cursor: "pointer",
};