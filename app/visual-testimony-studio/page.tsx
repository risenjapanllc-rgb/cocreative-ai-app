"use client";

import LivingSpiral from "@/components/LivingSpiral";
import { useLivingSpiral } from "@/hooks/useLivingSpiral";

import { useState, type ReactNode } from "react";

type Message = {
  role: "あなた" | "共創思考AI";
  text: string;
};

export default function VisualTestimonyStudioPage() {

const spiral = useLivingSpiral();
const visualStage = spiral.stage;

const [testimony, setTestimony] = useState("");
const [originalTestimony, setOriginalTestimony] = useState("");
const [visualClarification, setVisualClarification] = useState<any>(null);
const [clarificationAnswer, setClarificationAnswer] = useState("");


  const [messages, setMessages] = useState<Message[]>([
    {
      role: "共創思考AI",
      text:
        "印象に残っている夢や体験、\n" +
        "感じていること、\n" +
        "疑問などを自由に書いてください。",
    },
  ]);

  const [imagePrompt, setImagePrompt] = useState("");
  const [imagePrompts, setImagePrompts] = useState<any[]>([]);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);
  const [witnessReflection, setWitnessReflection] = useState<any>(null);
  const [memoryEmergence, setMemoryEmergence] = useState<any>(null);
  const [fidelityReport, setFidelityReport] = useState<any>(null);

  const [card, setCard] = useState({
    title: "Visual Testimony",
    whatHappened: "",
    whatRemained: "",
    namedEmotions: "",
    witnessNotes: "",
    presence: "",
    recognition: "",
    visualForm: "",
    imagePrompt: "",
    generatedImage: "",
    coreWitness: "",
    coreEmotion: "",
    coreMeaning: "",
    coreWord: "",
    giftedWord: "",
    essence: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isClarifying, setIsClarifying] = useState(false);


async function handleReceive() {
  if (!testimony.trim()) return;

  const userMessage = testimony.trim();

  setIsLoading(true);

  setMessages((prev) => [
    ...prev,
    {
      role: "あなた",
      text: userMessage,
    },
  ]);

  setTestimony("");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, { role: "あなた", text: userMessage }],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API ERROR", res.status, errorText);
      return;
    }

    const data = await res.json();
    console.log("API RESPONSE", data);

    if (Array.isArray(data.imagePrompts)) {
      setImagePrompts(data.imagePrompts);
    }

    if (typeof data.imagePrompt === "string") {
      setImagePrompt(data.imagePrompt);
    }

    setCard((prev) => ({
      ...prev,
      whatHappened: data.whatHappened ?? prev.whatHappened,
      whatRemained: data.whatRemained ?? prev.whatRemained,
      namedEmotions: data.namedEmotions ?? prev.namedEmotions,
      witnessNotes: data.witnessNotes ?? prev.witnessNotes,
      presence: data.presence ?? prev.presence,
      recognition: data.recognition ?? prev.recognition,
      visualForm: data.visualForm ?? prev.visualForm,
      imagePrompt: data.imagePrompt ?? prev.imagePrompt,
      coreEmotion: data.coreEmotion ?? prev.coreEmotion,
      coreMeaning: data.coreMeaning ?? prev.coreMeaning,
      coreWord: data.coreWord ?? prev.coreWord,
      giftedWord: data.giftedWord ?? prev.giftedWord,
      essence: data.essence ?? prev.essence,
    }));

    setMessages((prev) => [
      ...prev,
      {
        role: "共創思考AI",
        text: data.text,
      },
    ]);
  } catch (error) {
    console.error("HANDLE RECEIVE ERROR =", error);
  } finally {
    setIsLoading(false);
  }
}


async function handleVisualClarification() {
  const baseTestimony = originalTestimony || testimony.trim();

  if (!baseTestimony && !clarificationAnswer.trim()) return;

  setIsLoading(true);
  setIsClarifying(true);

  try {
    if (!originalTestimony && testimony.trim()) {
      setOriginalTestimony(testimony.trim());
    }

    const res = await fetch("/api/visual-clarification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testimony: baseTestimony,
        previousClarification: visualClarification,
        answer: clarificationAnswer,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("VISUAL CLARIFICATION ERROR", res.status, errorText);
      return;
    }

    const data = await res.json();

    console.log("VISUAL CLARIFICATION =", data);

    setVisualClarification(data);
    setClarificationAnswer("");

    if (data.readyForVisualExtraction) {
  spiral.goTo("visual-extraction");
} else {
  spiral.goTo("clarification");
}
  } catch (error) {
    console.error("VISUAL CLARIFICATION ERROR =", error);
  } finally {
    setIsLoading(false);
    setIsClarifying(false);
  }
}

  function handleRecognitionAccepted() {
  if (!card.recognition) return;

  setCard((prev) => ({
    ...prev,
    coreWitness: prev.recognition,
    title: prev.recognition.replace(/^- /, "") || "Visual Testimony",
  }));

  // Recognition becomes New Witness
  setTestimony(card.recognition);

    // 次の循環へ
  setVisualClarification(null);
  setClarificationAnswer("");

  setImagePrompt("");
  setImagePrompts([]);
  setGeneratedImages([]);
  setFidelityReport(null);
  setWitnessReflection(null);
  setMemoryEmergence(null);

  spiral.restart();
}


  async function handleGenerateVisualForm() {
  try {
    const visualClarificationText = visualClarification
      ? [
          `Summary:\n${visualClarification.summary || ""}`,
          "",
          `Known Visual Facts:\n${(visualClarification.knownVisualFacts || [])
            .map((item: string) => `- ${item}`)
            .join("\n")}`,
          "",
          `Must Preserve:\n${(visualClarification.mustPreserve || [])
            .map((item: string) => `- ${item}`)
            .join("\n")}`,
          "",
          `Unknowns:\n${(visualClarification.unknowns || [])
            .map((item: string) => `- ${item}`)
            .join("\n")}`,
        ].join("\n")
      : "";

    const res = await fetch("/api/visual-extraction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        whatHappened:
          visualClarification?.summary ||
          originalTestimony ||
          testimony ||
          "",

        whatRemained: visualClarificationText,

        namedEmotions: "",
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("VISUAL EXTRACTION API ERROR", res.status, errorText);
      return;
    }

    const data = await res.json();

    console.log("VISUAL EXTRACTION RESPONSE", data);

    setCard((prev) => ({
      ...prev,
      whatHappened:
        visualClarification?.summary || prev.whatHappened,
      whatRemained: visualClarificationText,
      visualForm: data.visualForm || "",
    }));

    spiral.next();
  } catch (error) {
    console.error("VISUAL EXTRACTION ERROR", error);
  }
}

  async function handleGenerateImagePrompt() {
    try {
      const res = await fetch("/api/image-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatHappened: card.whatHappened,
          whatRemained: card.whatRemained,
          namedEmotions: card.namedEmotions,
          visualExtraction: card.visualForm,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("IMAGE PROMPT API ERROR", res.status, errorText);
        return;
      }

      const data = await res.json();

      if (Array.isArray(data.imagePrompts)) {
        setImagePrompts(data.imagePrompts);
      }

      if (typeof data.imagePrompt === "string") {
        setImagePrompt(data.imagePrompt);
      }

      setCard((prev) => ({
        ...prev,
        imagePrompt: data.imagePrompt || "",
      }));
      spiral.next();

    } catch (error) {
      console.error("IMAGE PROMPT ERROR", error);
    }
  }

  async function handleGenerateImage() {
    const promptsToGenerate =
      imagePrompts.length > 0
        ? imagePrompts
        : [
            {
              scene: 1,
              title: "Scene 1",
              prompt: card.imagePrompt || imagePrompt,
            },
          ];

    try {
      const generated: any[] = [];

      for (const item of promptsToGenerate) {
        const res = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imagePrompts: [item],
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error(
            `IMAGE GENERATION API ERROR scene ${item.scene}`,
            res.status,
            errorText
          );
          continue;
        }

        const data = await res.json();

        if (Array.isArray(data.images)) {
          generated.push(...data.images);
        } else if (data.imageUrl) {
          generated.push({
            scene: item.scene,
            title: item.title,
            imageUrl: data.imageUrl,
          });
        }
      }

      setGeneratedImages(generated);

      setCard((prev) => ({
        ...prev,
        generatedImage: generated[0]?.imageUrl || "",
      }));
      spiral.next();

    } catch (error) {
      console.error("IMAGE GENERATION ERROR", error);
    }
  }

  async function handleVisualFidelityCheck() {
  console.log("VISUAL FIDELITY CLICKED");

  try {
    const res = await fetch("/api/visual-fidelity-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testimony: messages
          .filter((m) => m.role === "あなた")
          .map((m) => m.text)
          .join("\n"),

        visualExtraction: card.visualForm,

        imagePrompt:
          imagePrompts.length > 0
            ? JSON.stringify(imagePrompts)
            : card.imagePrompt,

        generatedImage:
          generatedImages?.[0]?.imageUrl || card.generatedImage || "",
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("VISUAL FIDELITY CHECK ERROR", res.status, errorText);
      return;
    }

    const data = await res.json();
    console.log("VISUAL FIDELITY REPORT =", data);
    setFidelityReport(data);
    spiral.next();

  } catch (error) {
    console.error("VISUAL FIDELITY CHECK ERROR =", error);
  }
}

async function handleWitnessReflection() {
  try {
    const res = await fetch("/api/witness-reflection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testimony: messages
          .filter((m) => m.role === "あなた")
          .map((m) => m.text)
          .join("\n"),
        generatedImage:
          generatedImages?.[0]?.imageUrl || card.generatedImage || "",
        fidelityReport,
      }),
    });

    const data = await res.json();
    console.log("WITNESS REFLECTION =", data);
    setWitnessReflection(data);
    spiral.next();

  } catch (error) {
    console.error("WITNESS REFLECTION ERROR =", error);
  }
}

async function handleMemoryEmergence() {
  try {
    const res = await fetch("/api/memory-emergence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testimony: messages
          .filter((m) => m.role === "あなた")
          .map((m) => m.text)
          .join("\n"),
        generatedImage:
          generatedImages?.[0]?.imageUrl || card.generatedImage || "",
        fidelityReport,
      }),
    });

    const data = await res.json();
    console.log("MEMORY EMERGENCE =", data);
    setMemoryEmergence(data);
    spiral.next();
    
  } catch (error) {
    console.error("MEMORY EMERGENCE ERROR =", error);
  }
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
  <div style={{ marginBottom: 24 }}>
  <div
    style={{
      fontSize: 14,
      fontWeight: 600,
      color: "#64748b",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}
  >
    Co-Creative Visual
  </div>

  <h2 style={{ margin: "8px 0 12px" }}>
    The Living Spiral
  </h2>

  <p
    style={{
      color: "#475569",
      lineHeight: 1.7,
      marginBottom: 20,
    }}
  >
    The purpose is not to generate images.
    <br />
    The purpose is to allow truth to become visible.
  </p>

  <LivingSpiral currentStage={visualStage} />
</div>

  {visualStage === "testimony" && (
    <>
      <h3>1. Witness Testimony</h3>

      <textarea
        value={testimony}
        onChange={(e) => setTestimony(e.target.value)}
        placeholder="夢・体験・証言をそのまま書いてください..."
        style={textareaStyle}
      />

      <button
        onClick={handleVisualClarification}
        disabled={isClarifying || !testimony.trim()}
        style={{
          ...sendButtonStyle,
          opacity: isClarifying || !testimony.trim() ? 0.6 : 1,
          cursor:
            isClarifying || !testimony.trim()
              ? "not-allowed"
              : "pointer",
        }}
      >
        {isClarifying
          ? "確認しています..."
          : "画像忠実性を確認する"}
      </button>
    </>
  )}

  {isClarifying && (
    <div style={loadingStyle}>
      回答を受け取っています。内容を確認しています...
    </div>
  )}

  {visualClarification && (
    <div
      style={{
        marginTop: 20,
        padding: 16,
        borderRadius: 12,
        background: "#eff6ff",
        border: "1px solid #93c5fd",
      }}
    >
      <h3>2. Visual Clarification</h3>

      <p><strong>Summary</strong></p>
      <p>{visualClarification.summary}</p>

      <p><strong>Known Visual Facts</strong></p>
      <ul>
        {visualClarification.knownVisualFacts?.map(
          (item: string, index: number) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>

      <p><strong>Must Preserve</strong></p>
      <ul>
        {visualClarification.mustPreserve?.map(
          (item: string, index: number) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>

      {visualClarification.questions?.length > 0 && (
        <>
          <p><strong>Questions</strong></p>
          <ul>
            {visualClarification.questions.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>

          <textarea
            value={clarificationAnswer}
            onChange={(e) =>
              setClarificationAnswer(e.target.value)
            }
            placeholder="質問への回答・修正・追加を書いてください"
            style={textareaStyle}
          />

          <button
            onClick={handleVisualClarification}
            disabled={isClarifying}
            style={{
              ...sendButtonStyle,
              opacity: isClarifying ? 0.6 : 1,
              cursor: isClarifying ? "not-allowed" : "pointer",
            }}
          >
            {isClarifying
              ? "回答を受け取っています..."
              : "回答を送る"}
          </button>
        </>
      )}

      {visualClarification.readyForVisualExtraction && (
        <button
          onClick={handleGenerateVisualForm}
          style={{
            ...generateButtonStyle,
            marginTop: 16,
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Visual Extractionへ進む
        </button>
      )}
    </div>
  )}
</section>

        <section style={rightPanelStyle}>
          <h2>Visual Testimony</h2>

          <Panel title="Draw what remained">
            <p style={labelStyle}>Principle</p>
            <p style={bodyStyle}>心に残ったものを描く。</p>

            {card.whatHappened && (
              <>
                <p style={{ ...labelStyle, marginTop: 16 }}>What Happened</p>
                <p style={bodyStyle}>{card.whatHappened}</p>
              </>
            )}

            {card.whatRemained && (
              <>
                <p style={{ ...labelStyle, marginTop: 16 }}>What Remained</p>
                <p style={bodyStyle}>{card.whatRemained}</p>
              </>
            )}

            {card.namedEmotions && (
              <>
                <p style={{ ...labelStyle, marginTop: 16 }}>Named Emotions</p>
                <p style={bodyStyle}>{card.namedEmotions}</p>
              </>
            )}

            {card.whatRemained && (
              <button
                onClick={handleGenerateVisualForm}
                style={{
                  ...sendButtonStyle,
                  marginTop: 16,
                  width: "100%",
                }}
              >
                Generate Visual Extraction
              </button>
            )}
          </Panel>

          <Panel title="Recognition">
  <p style={labelStyle}>Status</p>

  <p style={{ fontWeight: 600, marginBottom: 12 }}>
    {visualStage === "recognition"
      ? "Recognition Ready"
      : "Listening..."}
  </p>

  <p style={bodyStyle}>
    {card.recognition ||
      "対話の中から認識が現れるのを待っています。"}
  </p>

  <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
    <button style={smallButtonStyle}>違うなあ</button>

    <button style={smallButtonStyle}>近いな</button>

    <button
      style={smallButtonStyle}
      onClick={handleRecognitionAccepted}
      disabled={visualStage !== "recognition"}
    >
      {visualStage === "recognition"
        ? "Begin New Witness"
        : "それだ！"}
    </button>
  </div>
</Panel>

          <Panel title="Visual Extraction">
            <p style={bodyStyle}>
              {card.visualForm || "視覚要素の抽出を待っています。"}
            </p>
          </Panel>

          <Panel title="Image Prompt">
            {imagePrompts.length > 0 ? (
              <div style={{ display: "grid", gap: 12 }}>
                {imagePrompts.map((item) => (
                  <div key={item.scene}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>
                      Scene {item.scene}: {item.title}
                    </div>
                    <p style={bodyStyle}>{item.prompt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={bodyStyle}>
                {card.imagePrompt ||
                  "画像生成用プロンプトが現れるのを待っています。"}
              </p>
            )}

            {visualStage === "image-prompt" && (
  <button
    onClick={handleGenerateImagePrompt}
    disabled={!card.visualForm}
    style={{
      ...generateButtonStyle,
      marginBottom: 12,
      background: card.visualForm ? "#2563eb" : "#cbd5e1",
      cursor: card.visualForm ? "pointer" : "not-allowed",
    }}
  >
    Prepare Light
  </button>
)}

{visualStage === "image-generation" && (
  <button
    onClick={handleGenerateImage}
    disabled={!card.imagePrompt && imagePrompts.length === 0}
    style={{
      ...generateButtonStyle,
      background:
        card.imagePrompt || imagePrompts.length > 0
          ? "#ea580c"
          : "#cbd5e1",
      cursor:
        card.imagePrompt || imagePrompts.length > 0
          ? "pointer"
          : "not-allowed",
    }}
  >
    Reveal Light
  </button>
)}

{visualStage === "fidelity-check" && (
  <button
    onClick={handleVisualFidelityCheck}
    disabled={!generatedImages.length && !card.generatedImage}
    style={{
      ...generateButtonStyle,
      marginTop: 12,
      background: "#7c3aed",
      color: "#fff",
      cursor:
        generatedImages.length || card.generatedImage
          ? "pointer"
          : "not-allowed",
      opacity:
        generatedImages.length || card.generatedImage
          ? 1
          : 0.5,
    }}
  >
    Compare with Blueprint
  </button>
)}

{visualStage === "witness-reflection" && (
  <button
    onClick={handleWitnessReflection}
    style={{
      ...generateButtonStyle,
      marginTop: 12,
      background: "#0891b2",
      color: "#fff",
    }}
  >
    Observe the Image
  </button>
)}

{visualStage === "memory-emergence" && (
  <button
    onClick={handleMemoryEmergence}
    style={{
      ...generateButtonStyle,
      marginTop: 12,
      background: "#16a34a",
      color: "#fff",
    }}
  >
    Receive Emerging Memory
  </button>
)}


            {fidelityReport && (
              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  borderRadius: 12,
                  background: "#1e293b",
                  color: "#fff",
                }}
              >
                <h3>Visual Fidelity Report</h3>
                <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                  {JSON.stringify(fidelityReport, null, 2)}
                </pre>
              </div>
            )}

{witnessReflection && (
  <div
    style={{
      marginTop: 16,
      padding: 12,
      borderRadius: 12,
      background: "#0f172a",
      color: "#fff",
    }}
  >
    <h3>Witness Reflection</h3>

    <pre
      style={{
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
      }}
    >
      {JSON.stringify(witnessReflection, null, 2)}
    </pre>
  </div>
)}

{memoryEmergence && (
  <div
    style={{
      marginTop: 16,
      padding: 12,
      borderRadius: 12,
      background: "#14532d",
      color: "#fff",
    }}
  >
    <h3>Memory Emergence</h3>

    <pre
      style={{
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
      }}
    >
      {JSON.stringify(memoryEmergence, null, 2)}
    </pre>
  </div>
)}
            {generatedImages.length > 0 ? (
              <div style={{ display: "grid", gap: 24, marginTop: 16 }}>
                {generatedImages.map((image) => (
                  <div key={image.scene}>
                    <h3 style={{ color: "#111827", marginBottom: 8 }}>
                      Scene {image.scene}: {image.title}
                    </h3>

                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      style={{
                        width: "100%",
                        borderRadius: 12,
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              card.generatedImage && (
                <img
                  src={card.generatedImage}
                  alt="Generated Visual Testimony"
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    marginTop: 16,
                  }}
                />
              )
            )}
          </Panel>

          <Panel title="Core Formation">
            <p style={labelStyle}>Core Emotion</p>
            <p style={bodyStyle}>{card.coreEmotion || "未確定"}</p>

            <p style={{ ...labelStyle, marginTop: 16 }}>Core Meaning</p>
            <p style={bodyStyle}>{card.coreMeaning || "未確定"}</p>

            <p style={{ ...labelStyle, marginTop: 16 }}>
              Core Word / Message
            </p>
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
  width: "100%",
  marginTop: 12,
  padding: "12px 16px",
  borderRadius: 10,
  border: "none",
  fontWeight: 700,
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

const feedbackSubTextStyle = {
  fontSize: 11,
  opacity: 0.65,
};