"use client";

import { useMemo, useState } from "react";

export default function CoCreativePage() {
  const [experience, setExperience] = useState("");
  const [explored, setExplored] = useState(false);

  const [dialogueResponse, setDialogueResponse] = useState("");
  const [submittedResponse, setSubmittedResponse] = useState("");

  const [secondResponse, setSecondResponse] = useState("");
  const [submittedSecondResponse, setSubmittedSecondResponse] = useState("");

  const [thirdResponse, setThirdResponse] = useState("");
  const [submittedThirdResponse, setSubmittedThirdResponse] = useState("");

  const [dialogueHistory, setDialogueHistory] = useState<string[]>([]);

  const firstQuestion = useMemo(() => {
  if (!experience) {
    return `どの場面が最も強く心に残っていますか？`;
  }

  if (
    experience.includes("老紳士") ||
    experience.includes("門") ||
    experience.includes("丘")
  ) {
    return `どの場面が最も強く心に残っていますか？
1. 老紳士に「ここからは一人で向かいなさい」と言われた瞬間
2. 古い大きな門の前で車を降りた場面
3. 門を入り、丘へ続く小道を見上げた場面`;
  }

  if (
  experience.includes("お高く止まって") ||
  experience.includes("飲み会") ||
  experience.includes("保険会社")
) {
  return `どの場面が最も強く心に残っていますか？

1. 「お高く止まっている」と指摘された瞬間

2. 「だから飲み会に誘われない」と言われた瞬間

3. 「仕事に来ているだけだ」と言い返した瞬間

4. 相手が去っていった瞬間`;
}

  return `どの場面が最も強く心に残っていますか？
1. 最初に強く印象に残った場面
2. 感情が大きく動いた場面
3. もう一度見つめたい場面`;
}, [experience]);



  
  const nextQuestion = useMemo(() => {
    if (!submittedResponse) return "";

    if (
      submittedResponse.includes("ようこ") ||
      submittedResponse.includes("呼んだ") ||
      submittedResponse.includes("見つけ")
    ) {
      return "お婆ちゃんに名前を呼ばれた時、あなたの内側にはどんな感覚がありましたか？";
    }

    if (
      submittedResponse.includes("近づいて") ||
      submittedResponse.includes("近付いて")
    ) {
      return "お婆ちゃんが近づいてくる姿に、どんな気持ちを感じましたか？";
    }

    if (
      submittedResponse.includes("抱きしめ") ||
      submittedResponse.includes("抱擁")
    ) {
      return "抱きしめ合っていた時間は、どんな感覚として残っていますか？";
    }

    return "その場面のどこが一番心に残っていますか？";
  }, [submittedResponse]);

  const thirdQuestion = useMemo(() => {
    if (!submittedSecondResponse) return "";

    if (
      submittedResponse.includes("ようこ") ||
      submittedResponse.includes("呼んだ") ||
      submittedResponse.includes("見つけ")
    ) {
      return "お婆ちゃんに認められ、見つけてもらえた感覚は、あなたにどんな大切なことを思い出させますか？";
    }

    if (
      submittedResponse.includes("近づいて") ||
      submittedResponse.includes("近付いて")
    ) {
      return "お婆ちゃんが近づいてきたことは、あなたにどんな意味として残っていますか？";
    }

    if (
      submittedResponse.includes("抱きしめ") ||
      submittedResponse.includes("抱擁")
    ) {
      return "その抱擁は、あなたに何を受け取らせてくれましたか？";
    }

    return "この夢は、あなたにどんな意味を残していますか？";
  }, [submittedResponse, submittedSecondResponse]);

  const canonicalDescription = useMemo(() => {
  if (!explored) return "";

  const isRecognition =
    submittedResponse.includes("ようこ") ||
    submittedResponse.includes("呼んだ") ||
    submittedResponse.includes("見つけ");

  const isApproach =
    submittedResponse.includes("近づいて") ||
    submittedResponse.includes("近付いて");

  const isEmbrace =
    submittedResponse.includes("抱きしめ") ||
    submittedResponse.includes("抱擁");

  let decisiveMoment = "";
  let emotionalCore = "";
  let emergentMeaning = "";

 if (isRecognition) {
  decisiveMoment = "Grandmother recognized Yoko and called her name.";

  emotionalCore = submittedSecondResponse
    ? `Being recognized and known by grandmother.\nThe felt response was: ${submittedSecondResponse}`
    : "Being recognized and known by grandmother.";

  if (submittedThirdResponse.includes("つながり")) {
    emergentMeaning =
      "The recognition itself carried the joy of reunion, revealing an enduring connection that remained alive beyond separation.";
  } else {
    emergentMeaning =
      "The recognition itself carried the joy of reunion.";
  }

  } else if (isApproach) {
    decisiveMoment =
      "Grandmother moved toward Yoko in order to embrace her.";
    emotionalCore = submittedSecondResponse
      ? `Being approached in love before physical reunion.\nThe felt response was: ${submittedSecondResponse}`
      : "Being approached in love before physical reunion.";
    emergentMeaning =
      "The movement toward connection carried the meaning of reunion.";
  } else if (isEmbrace) {
    decisiveMoment = "Grandmother embraced Yoko.";
    emotionalCore = submittedSecondResponse
      ? `Reunion through physical closeness and affection.\nThe felt response was: ${submittedSecondResponse}`
      : "Reunion through physical closeness and affection.";
    emergentMeaning =
      "The embrace revealed a bond that remained alive beyond separation.";
  }

return `Experience:
${experience}

Core Moment:
${submittedResponse || "Not yet explored"}

Emotional Core:
${submittedSecondResponse || "Not yet explored"}

Emergent Meaning:
${submittedThirdResponse || "Not yet explored"}`;
}, [
  explored,
  experience,
  submittedResponse,
  submittedSecondResponse,
  submittedThirdResponse,
]);

const fieldSummary = useMemo(() => {
  if (!submittedThirdResponse) return "";

  return `Core Moment:
${submittedResponse}

Core Emotion:
${submittedSecondResponse}

Core Meaning:
${submittedThirdResponse}

Gift Received:
${
  submittedThirdResponse.includes("つながり")
    ? "温かさ"
    : "A renewed sense of meaning"
}`;
}, [
  submittedResponse,
  submittedSecondResponse,
  submittedThirdResponse,
]);

  const emergingInsight = useMemo(() => {
  if (!explored) return "";

  const emotionalTone = submittedSecondResponse;
  const meaningTone = submittedThirdResponse;

  if (
    meaningTone.includes("新しい") ||
    meaningTone.includes("あたらしい") ||
    meaningTone.includes("世界") ||
    meaningTone.includes("確信") ||
    submittedResponse.includes("門") ||
    submittedResponse.includes("一人")
  ) {
    return `Emerging Insight:

The dream may be centered on entering a new stage of life.

Possible Themes:
- Guidance
- Trust
- Initiation
- New beginnings

Questions:
- What new path are you being invited to walk?
- Why did the guide stop at the gate while you continued alone?`;
  }

  if (
    submittedResponse.includes("ようこ") ||
    submittedResponse.includes("呼んだ") ||
    submittedResponse.includes("見つけ")
  ) {
    if (
      emotionalTone.includes("驚") ||
      emotionalTone.includes("嬉") ||
      emotionalTone.includes("喜")
    ) {
      return `Emerging Insight:

The emotional center may be joyful recognition.

Possible Themes:
- Joyful recognition
- Being found
- Love that still knows your name

Questions:
- What did it mean to be called by name again?
- Did being recognized feel like being found?`;
    }

    return `Emerging Insight:

The emotional center may be recognition before embrace.

Possible Themes:
- Being recognized
- Reunion
- Enduring affection

Questions:
- What changed when your grandmother called your name?
- Why did recognition carry more weight than the embrace itself?`;
  }

  if (
    submittedResponse.includes("近づいて") ||
    submittedResponse.includes("近付いて")
  ) {
    if (emotionalTone.includes("嬉") || emotionalTone.includes("喜")) {
      return `Emerging Insight:

The emotional center may be the joyful movement toward reunion.

Possible Themes:
- Joyful reunion
- Love returning
- Anticipated connection

Questions:
- What made the reunion feel joyful?
- Did the joy begin before the embrace itself?`;
    }

    return `Emerging Insight:

The emotional center may be the movement toward embrace, before the embrace itself.

Possible Themes:
- Anticipation
- Being approached
- Love moving toward connection

Questions:
- What did it mean that your grandmother moved toward you?
- Was the emotional weight in the embrace itself, or in seeing it come toward you?`;
  }

  if (
    submittedResponse.includes("抱きしめ") ||
    submittedResponse.includes("抱擁")
  ) {
    return `Emerging Insight:

The emotional center may be the embrace itself.

Possible Themes:
- Reunion through touch
- Longing fulfilled
- Presence beyond words

Questions:
- What did the embrace communicate without words?
- Did the embrace feel like arrival, healing, or reunion?`;
  }

  return `Emerging Insight:

The experience may be pointing toward a meaningful inner transition.

Possible Themes:
- Threshold
- Guidance
- Change
- New perspective

Questions:
- What part of this experience feels like a threshold?
- What are you being invited to receive or enter?`;
}, [explored, submittedResponse, submittedSecondResponse, submittedThirdResponse]);

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
      <h1>Co-Creative Field</h1>

      <section>
        <h2>Experience Input</h2>

        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="What experience would you like to explore?"
          rows={10}
          style={{ width: "100%", padding: "12px" }}
        />

        <br />
        <br />

        <button onClick={() => setExplored(true)}>Explore</button>
      </section>

      <section>
        <h2>Dialogue</h2>

        {!explored ? (
          <p>AI dialogue will appear here.</p>
        ) : (
          <>
            <p style={{ whiteSpace: "pre-wrap" }}>
  <strong>Q1:</strong>
  <br />
  {firstQuestion}
</p>

            <textarea
              value={dialogueResponse}
              onChange={(e) => setDialogueResponse(e.target.value)}
              placeholder="Your response..."
              rows={4}
              style={{ width: "100%", padding: "12px" }}
            />

            <br />
            <br />

            <button
              onClick={() => {
                setSubmittedResponse(dialogueResponse);
                setDialogueHistory([
                  "Q1: どの場面が最も強く心に残っていますか？",
                  `A1: ${dialogueResponse}`,
                ]);
              }}
            >
              Submit Response
            </button>

            {submittedResponse && (
              <>
                <p>
                  <strong>Your Response:</strong>
                  <br />
                  {submittedResponse}
                </p>

                <p>
                  <strong>Next Question:</strong>
                  <br />
                  {nextQuestion}
                </p>

                <textarea
                  value={secondResponse}
                  onChange={(e) => setSecondResponse(e.target.value)}
                  placeholder="Your response to the next question..."
                  rows={4}
                  style={{ width: "100%", padding: "12px" }}
                />

                <br />
                <br />

                <button
                  onClick={() => {
                    setSubmittedSecondResponse(secondResponse);
                    setDialogueHistory([
                      "Q1: どの場面が最も強く心に残っていますか？",
                      `A1: ${submittedResponse}`,
                      `Q2: ${nextQuestion}`,
                      `A2: ${secondResponse}`,
                    ]);
                  }}
                >
                  Submit Second Response
                </button>
              </>
            )}

            {submittedSecondResponse && (
              <p>
                <strong>Your Second Response:</strong>
                <br />
                {submittedSecondResponse}
              </p>
            )}
            {submittedSecondResponse && (
  <>
    <p>
      <strong>Q3:</strong>
      <br />
      {thirdQuestion}
    </p>

    <textarea
      value={thirdResponse}
      onChange={(e) => setThirdResponse(e.target.value)}
      placeholder="Your response to the third question..."
      rows={4}
      style={{ width: "100%", padding: "12px" }}
    />

    <br />
    <br />

    <button
      onClick={() => {
        setSubmittedThirdResponse(thirdResponse);

        setDialogueHistory([
          "Q1: どの場面が最も強く心に残っていますか？",
          `A1: ${submittedResponse}`,
          `Q2: ${nextQuestion}`,
          `A2: ${submittedSecondResponse}`,
          `Q3: ${thirdQuestion}`,
          `A3: ${thirdResponse}`,
        ]);
      }}
    >
      Submit Third Response
    </button>
  </>
)}
{submittedThirdResponse && (
  <p>
    <strong>Your Third Response:</strong>
    <br />
    {submittedThirdResponse}
  </p>
)}

            {dialogueHistory.length > 0 && (
              <>
                <h3>Dialogue History</h3>
                <ul>
                  {dialogueHistory.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </section>

      <section>
        <h2>Canonical Description</h2>

        {explored ? (
          <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
            {canonicalDescription}
          </pre>
        ) : (
          <p>Living document will appear here.</p>
        )}
      </section>

      <section>
        <h2>Emerging Insights</h2>

        {explored ? (
          <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
            {emergingInsight}
          </pre>
        ) : (
          <p>Insights will appear here.</p>
        )}
      </section>

      {fieldSummary && (
  <section>
    <h2>Field Summary</h2>

    <pre
      style={{
        whiteSpace: "pre-wrap",
        background: "#f5f5f5",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      {fieldSummary}
    </pre>
  </section>
)}
    </main>
  );
}