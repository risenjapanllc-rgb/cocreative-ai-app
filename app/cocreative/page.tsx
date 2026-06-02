"use client";

import { useMemo, useState } from "react";

export default function CoCreativePage() {
  const [experience, setExperience] = useState("");
  const [explored, setExplored] = useState(false);

  const [dialogueResponse, setDialogueResponse] = useState("");
  const [submittedResponse, setSubmittedResponse] = useState("");

  const [secondResponse, setSecondResponse] = useState("");
  const [submittedSecondResponse, setSubmittedSecondResponse] = useState("");

  const [dialogueHistory, setDialogueHistory] = useState<string[]>([]);

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

  if (isRecognition) {
    decisiveMoment = "Grandmother recognized Yoko and called her name.";
    emotionalCore = submittedSecondResponse
      ? `Being recognized and known by grandmother.\nThe felt response was: ${submittedSecondResponse}`
      : "Being recognized and known by grandmother.";
  } else if (isApproach) {
    decisiveMoment =
      "Grandmother moved toward Yoko in order to embrace her.";
    emotionalCore = submittedSecondResponse
      ? `Being approached in love before physical reunion.\nThe felt response was: ${submittedSecondResponse}`
      : "Being approached in love before physical reunion.";
  } else if (isEmbrace) {
    decisiveMoment = "Grandmother embraced Yoko.";
    emotionalCore = submittedSecondResponse
      ? `Reunion through physical closeness and affection.\nThe felt response was: ${submittedSecondResponse}`
      : "Reunion through physical closeness and affection.";
  }

  return `Characters:
- Grandmother (appearing approximately 40 years old)
- Dreamer (Yoko)

Setting:
- Traditional Japanese tatami room
- Kyoto-like atmosphere

Dream Logic:
- The dreamer existed with only the upper body emerging from the tatami.
- This condition felt natural within the dream.

Sequence:
1. Grandmother entered the room.
2. Grandmother saw Yoko.
3. Grandmother said "ようこ!".
4. Grandmother approached Yoko.
5. Grandmother embraced Yoko.
6. They remained together embracing.

Observed Elements:
- Recognition
- Approach
- Embrace
- Reunion

Decisive Moment:
${decisiveMoment}

Emotional Core:
${emotionalCore}`;
  }, [explored, submittedResponse, submittedSecondResponse]);

  const emergingInsight = useMemo(() => {
    if (!explored) return "";

    if (
      submittedResponse.includes("ようこ") ||
      submittedResponse.includes("呼んだ") ||
      submittedResponse.includes("見つけ")
    ) {
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

The dream may be centered on reunion and restored connection.

Possible Themes:
- Reunion
- Recognition
- Enduring affection

Questions:
- Which moment carried the strongest emotional weight?
- What did this dream allow you to receive?`;
  }, [explored, submittedResponse]);

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
            <p>
              <strong>Q1:</strong>
              <br />
              どの場面が最も強く心に残っていますか？
              <br />
              1. お婆ちゃんが「ようこ！」と呼んだ瞬間
              <br />
              2. 抱きしめようと近づいてきた瞬間
              <br />
              3. 抱きしめ合っていた時間
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
    </main>
  );
}
