"use client";

import LivingSpiral from "@/components/LivingSpiral";
import { useLivingSpiral } from "@/hooks/useLivingSpiral";
import { useState, type ReactNode } from "react";

import {
  ReferenceImage,
} from "@/lib/world/reference-image";

import {
  WorldSeed,
  createWorldSeed,
} from "@/lib/world/world-seed";

type Message = {
  role: "あなた" | "共創思考AI";
  text: string;
};

export default function VisualTestimonyStudioPage() {
  const spiral = useLivingSpiral();
  const visualStage = spiral.stage;

  const [testimony, setTestimony] = useState("");
  const [originalTestimony, setOriginalTestimony] =
    useState("");

  const [visualClarification, setVisualClarification] =
    useState<any>(null);

  const [clarificationAnswer, setClarificationAnswer] =
    useState("");

  const [blueprintCorrection, setBlueprintCorrection] =
    useState("");

  const [
    blueprintUpdateMessage,
    setBlueprintUpdateMessage,
  ] = useState("");

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

  const [referenceImage, setReferenceImage] =
    useState<ReferenceImage | null>(null);

  const [worldSeed, setWorldSeed] =
    useState<WorldSeed | null>(null);

  const [witnessReflection, setWitnessReflection] =
    useState<any>(null);

  const [memoryEmergence, setMemoryEmergence] =
    useState<any>(null);

  const [fidelityReport, setFidelityReport] =
    useState<any>(null);

  const [characterBible, setCharacterBible] =
    useState<any>(null);

  const [environmentBible, setEnvironmentBible] =
    useState<any>(null);

  const [compositionBible, setCompositionBible] =
    useState<any>(null);

  const [objectBible, setObjectBible] =
    useState<any>(null);

  const [sceneBible, setSceneBible] =
    useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isClarifying, setIsClarifying] =
    useState(false);

  const [isCheckingFidelity, setIsCheckingFidelity] =
    useState(false);

  const [
    isGeneratingVisualForm,
    setIsGeneratingVisualForm,
  ] = useState(false);

  const [fidelityStatus, setFidelityStatus] =
    useState("");

  const [visualFormStatus, setVisualFormStatus] =
    useState("");

  const [imagePromptStatus, setImagePromptStatus] =
    useState("");

  const [
    imageGenerationStatus,
    setImageGenerationStatus,
  ] = useState("");

  const [
    witnessWorldProgress,
    setWitnessWorldProgress,
  ] = useState(0);

  const [witnessWorldStep, setWitnessWorldStep] =
    useState("");

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
  const baseTestimony =
    originalTestimony || testimony.trim();

  if (
    !baseTestimony &&
    !clarificationAnswer.trim() &&
    !blueprintCorrection.trim()
  ) {
    return;
  }

  setIsLoading(true);
  setIsClarifying(true);

  try {
    if (!originalTestimony && testimony.trim()) {
      setOriginalTestimony(testimony.trim());
    }

    const answer =
      clarificationAnswer.trim() ||
      blueprintCorrection.trim();

    console.log("SENDING VISUAL CLARIFICATION", {
      testimony: baseTestimony,
      answer,
      previousClarification: visualClarification,
    });

    const res = await fetch(
      "/api/visual-clarification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testimony: baseTestimony,
          previousClarification:
            visualClarification,
          answer,
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "VISUAL CLARIFICATION ERROR",
        res.status,
        errorText
      );

      setVisualFormStatus(
        "Visual Clarification の生成に失敗しました。"
      );

      return;
    }

    const data = await res.json();

    console.log(
      "VISUAL CLARIFICATION =",
      data
    );

    const unknowns = Array.isArray(data.unknowns)
      ? data.unknowns
      : [];

    const hasUnknowns = unknowns.length > 0;

    const shouldProceed =
      data.readyForVisualExtraction === true ||
      !hasUnknowns;

    const normalizedData = {
      ...data,
      unknowns,
      readyForVisualExtraction: shouldProceed,
      questions: shouldProceed
        ? []
        : Array.isArray(data.questions)
          ? data.questions
          : [],
      missingInformation: shouldProceed
        ? []
        : Array.isArray(data.missingInformation)
          ? data.missingInformation
          : [],
    };

    console.log(
      "NORMALIZED VISUAL CLARIFICATION =",
      normalizedData
    );

    setVisualClarification(normalizedData);

    if (!shouldProceed) {
      setVisualFormStatus(
        "追加情報が必要です。\n\n表示された質問に答えて、もう一度送信してください。"
      );

      setBlueprintUpdateMessage(
        "追加情報が必要です。表示された質問に答えて、もう一度送信してください。"
      );

      spiral.goTo("clarification");
      return;
    }

    setClarificationAnswer("");
    setBlueprintCorrection("");

    setBlueprintUpdateMessage(
      "証言内容を確定しました。次は「Build Witness World」を押してください。"
    );

    setVisualFormStatus(
      "Visual Clarification Completed.\n\nBuild Witness World を押してください。"
    );

    spiral.goTo("visual-extraction");
  } catch (error) {
    console.error(
      "VISUAL CLARIFICATION ERROR =",
      error
    );

    setVisualFormStatus(
      "Visual Clarification の生成中にエラーが発生しました。"
    );
  } finally {
    setIsLoading(false);
    setIsClarifying(false);
  }
}

function handleRecognitionAccepted() {
  if (!card.recognition) {
    return;
  }

  setCard((prev) => ({
    ...prev,
    coreWitness: prev.recognition,
    title:
      prev.recognition.replace(/^- /, "") ||
      "Visual Testimony",
  }));

  setTestimony(card.recognition);

  setVisualClarification(null);
  setClarificationAnswer("");
  setOriginalTestimony("");
  setBlueprintCorrection("");

  setImagePrompt("");
  setImagePrompts([]);
  setGeneratedImages([]);
  setFidelityReport(null);
  setWitnessReflection(null);
  setMemoryEmergence(null);

  spiral.restart();
}

async function handleGenerateVisualForm() {
  setIsGeneratingVisualForm(true);

  setWitnessWorldProgress(0);
  setWitnessWorldStep("証言を整理しています...");

  setVisualFormStatus("Witness World を構築しています...");

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
      headers: {
        "Content-Type": "application/json",
      },
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

      console.error(
        "VISUAL EXTRACTION API ERROR",
        res.status,
        errorText
      );

      setVisualFormStatus(
        "Visual Extraction の生成に失敗しました。"
      );

      return;
    }

    const data = await res.json();

    console.log("VISUAL EXTRACTION RESPONSE", data);

    setWitnessWorldProgress(17);
    setWitnessWorldStep("登場人物を整理しています...");

    setCard((prev) => ({
      ...prev,
      whatHappened:
        visualClarification?.summary || prev.whatHappened,
      whatRemained: visualClarificationText,
      visualForm: data.visualForm || "",
    }));

    await handleGenerateCharacterBible(
      visualClarificationText,
      data.visualForm
    );
  } catch (error) {
    setVisualFormStatus(
      "Visual Extraction の生成に失敗しました。"
    );

    console.error("VISUAL EXTRACTION ERROR", error);
  } finally {
    setIsGeneratingVisualForm(false);
  }
}

async function handleGenerateCharacterBible(
  blueprint: string,
  visualExtraction: string
) {
  try {
    const res = await fetch("/api/character-bible", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blueprint,
        visualExtraction,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "CHARACTER BIBLE API ERROR",
        res.status,
        errorText
      );

      return;
    }

    const characterData = await res.json();

    console.log("CHARACTER BIBLE =", characterData);

    setCharacterBible(characterData);

    setWitnessWorldProgress(33);
    setWitnessWorldStep("場所を整理しています...");

    await handleGenerateEnvironmentBible(
      blueprint,
      visualExtraction,
      characterData
    );
  } catch (error) {
    console.error("CHARACTER BIBLE ERROR =", error);
  }
}

async function handleGenerateEnvironmentBible(
  blueprint: string,
  visualExtraction: string,
  latestCharacterBible: any
) {
  try {
    const res = await fetch("/api/environment-bible", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blueprint,
        visualExtraction,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "ENVIRONMENT BIBLE API ERROR",
        res.status,
        errorText
      );

      return;
    }

    const environmentData = await res.json();

    console.log("ENVIRONMENT BIBLE =", environmentData);

    setEnvironmentBible(environmentData);

    setWitnessWorldProgress(50);
    setWitnessWorldStep("構図を整理しています...");

    await handleGenerateCompositionBible(
      blueprint,
      visualExtraction,
      latestCharacterBible,
      environmentData
    );
  } catch (error) {
    console.error("ENVIRONMENT BIBLE ERROR =", error);
  }
}

async function handleGenerateCompositionBible(
  blueprint: string,
  visualExtraction: string,
  latestCharacterBible: any,
  latestEnvironmentBible: any
) {
  try {
    const res = await fetch("/api/composition-bible", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blueprint,
        visualExtraction,
        characterBible: latestCharacterBible,
        environmentBible: latestEnvironmentBible,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "COMPOSITION BIBLE API ERROR",
        res.status,
        errorText
      );

      return;
    }

    const compositionData = await res.json();

    console.log(
      "COMPOSITION BIBLE =",
      compositionData
    );

    setCompositionBible(compositionData);

    setWitnessWorldProgress(67);
    setWitnessWorldStep("物体を整理しています...");

    await handleGenerateObjectBible(
      blueprint,
      visualExtraction,
      latestCharacterBible,
      latestEnvironmentBible,
      compositionData
    );
  } catch (error) {
    console.error(
      "COMPOSITION BIBLE ERROR =",
      error
    );
  }
}

async function handleGenerateObjectBible(
  blueprint: string,
  visualExtraction: string,
  latestCharacterBible: any,
  latestEnvironmentBible: any,
  latestCompositionBible: any
) {
  try {
    const res = await fetch("/api/object-bible", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blueprint,
        visualExtraction,
        characterBible: latestCharacterBible,
        environmentBible: latestEnvironmentBible,
        compositionBible: latestCompositionBible,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "OBJECT BIBLE API ERROR",
        res.status,
        errorText
      );

      return;
    }

    const objectData = await res.json();

    console.log("OBJECT BIBLE =", objectData);

    setObjectBible(objectData);

    setWitnessWorldProgress(83);
    setWitnessWorldStep("シーンを整理しています...");

    await handleGenerateSceneBible(
  blueprint,
  visualExtraction,
  latestCharacterBible,
  latestEnvironmentBible,
  latestCompositionBible,
  objectData
);
  } catch (error) {
    setVisualFormStatus(
      "Object Bible の生成中にエラーが発生しました。"
    );

    console.error("OBJECT BIBLE ERROR =", error);
  }
}

async function handleGenerateSceneBible(
  blueprint: string,
  visualExtraction: string,
  latestCharacterBible: any,
  latestEnvironmentBible: any,
  latestCompositionBible: any,
  latestObjectBible: any
) {
  try {
    console.log("CHARACTER BIBLE =", latestCharacterBible);
    console.log("ENVIRONMENT BIBLE =", latestEnvironmentBible);
    console.log("COMPOSITION BIBLE =", latestCompositionBible);
    console.log("OBJECT BIBLE =", latestObjectBible);

    console.log("SCENE INPUT =", {
      blueprint,
      visualExtraction,
    });

    const res = await fetch("/api/scene-bible", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blueprint,
        visualExtraction,
        characterBible: latestCharacterBible,
        environmentBible: latestEnvironmentBible,
        compositionBible: latestCompositionBible,
        objectBible: latestObjectBible,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "SCENE BIBLE API ERROR",
        res.status,
        errorText
      );

      setVisualFormStatus(
        "Scene Bible の生成に失敗しました。"
      );

      return;
    }

    const sceneData = await res.json();

    console.log("SCENE BIBLE =", sceneData);

    setSceneBible(sceneData);

    setWitnessWorldProgress(100);
    setWitnessWorldStep(
      "Witness World が完成しました。"
    );

    spiral.goTo("image-prompt");

    setVisualFormStatus(
      "Witness World Completed.\n\nImage Prompt を準備しています..."
    );

    await handleGenerateImagePrompt({
      characterBible: latestCharacterBible,
      environmentBible: latestEnvironmentBible,
      compositionBible: latestCompositionBible,
      objectBible: latestObjectBible,
      sceneBible: sceneData,
    });
  } catch (error) {
    console.error("SCENE BIBLE ERROR =", error);

    setVisualFormStatus(
      "Scene Bible の生成中にエラーが発生しました。"
    );
  } finally {
    setIsGeneratingVisualForm(false);
  }
}
  

  async function handleGenerateImage() {
  const isWorldSeed = !referenceImage;

  setImageGenerationStatus(
    isWorldSeed
      ? "🌎 Witness World を生成しています..."
      : "🌎 Witness World を編集しています..."
  );

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
      const isScene1 =
        !referenceImage && (item.scene ?? 1) === 1;

      setImageGenerationStatus(
        isScene1
          ? "🌎 World Seed Candidates を生成しています..."
          : referenceImage
          ? `Scene ${item.scene} を編集しています...`
          : `Scene ${item.scene} を生成しています...`
      );

      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: isScene1
            ? "world-seed"
            : referenceImage
            ? "edit"
            : "generate",

          count: 4,

          referenceImageUrl:
            referenceImage?.imageUrl,

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

    setImageGenerationStatus(
      isWorldSeed
        ? "🌎 候補世界が生成されました。最も近い世界を選んでください。"
        : "🌎 Witness World を更新しました。"
    );

    setCard((prev) => ({
      ...prev,
      generatedImage: generated[0]?.imageUrl || "",
    }));

    spiral.next();
  } catch (error) {
    setImageGenerationStatus(
      "画像生成中にエラーが発生しました。"
    );

    console.error(
      "IMAGE GENERATION ERROR",
      error
    );
  }
}

async function handleGenerateImagePrompt(overrides?: {
  characterBible?: any;
  environmentBible?: any;
  compositionBible?: any;
  objectBible?: any;
  sceneBible?: any;
}) {
  setImagePromptStatus("Image Prompt を生成しています...");

  const resolvedCharacterBible =
    overrides?.characterBible ?? characterBible;

  const resolvedEnvironmentBible =
    overrides?.environmentBible ?? environmentBible;

  const resolvedCompositionBible =
    overrides?.compositionBible ?? compositionBible;

  const resolvedObjectBible =
    overrides?.objectBible ?? objectBible;

  const resolvedSceneBible =
    overrides?.sceneBible ?? sceneBible;

  const missingBible =
    !resolvedCharacterBible ||
    !resolvedEnvironmentBible ||
    !resolvedCompositionBible ||
    !resolvedObjectBible ||
    !resolvedSceneBible;

  if (missingBible) {
    console.error("IMAGE PROMPT BIBLE MISSING", {
      characterBible: resolvedCharacterBible,
      environmentBible: resolvedEnvironmentBible,
      compositionBible: resolvedCompositionBible,
      objectBible: resolvedObjectBible,
      sceneBible: resolvedSceneBible,
    });

    setImagePromptStatus(
      "Witness World の情報がまだ揃っていません。先に Build Witness World を実行してください。"
    );

    setVisualFormStatus(
      "Character / Environment / Composition / Object / Scene Bible のいずれかが不足しています。"
    );

    setIsGeneratingVisualForm(false);
    return;
  }

  try {
    console.log("IMAGE PROMPT INPUT BIBLES =", {
      characterBibleLength: JSON.stringify(
        resolvedCharacterBible
      ).length,

      environmentBibleLength: JSON.stringify(
        resolvedEnvironmentBible
      ).length,

      compositionBibleLength: JSON.stringify(
        resolvedCompositionBible
      ).length,

      objectBibleLength: JSON.stringify(
        resolvedObjectBible
      ).length,

      sceneBibleLength: JSON.stringify(
        resolvedSceneBible
      ).length,
    });

    const res = await fetch("/api/image-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        whatHappened: card.whatHappened,
        whatRemained: card.whatRemained,
        namedEmotions: card.namedEmotions,
        visualExtraction: card.visualForm,

        characterBible: resolvedCharacterBible,
        environmentBible: resolvedEnvironmentBible,
        compositionBible: resolvedCompositionBible,
        objectBible: resolvedObjectBible,
        sceneBible: resolvedSceneBible,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();

      console.error(
        "IMAGE PROMPT API ERROR",
        res.status,
        errorText
      );

      setImagePromptStatus(
        "Image Prompt の生成に失敗しました。"
      );

      setVisualFormStatus(
        "Image Prompt の生成に失敗しました。"
      );

      setIsGeneratingVisualForm(false);
      return;
    }

    const data = await res.json();

    console.log("IMAGE PROMPT RESPONSE =", data);
    console.log("imagePrompts =", data.imagePrompts);
    console.log("imagePrompt =", data.imagePrompt);

    if (Array.isArray(data.imagePrompts)) {
      setImagePrompts(data.imagePrompts);
    }

    if (typeof data.imagePrompt === "string") {
      setImagePrompt(data.imagePrompt);
    }

    setCard((prev) => ({
      ...prev,
      imagePrompt:
        typeof data.imagePrompt === "string"
          ? data.imagePrompt
          : "",
    }));

    setImagePromptStatus(
      "Image Prompt を受け取りました。Reveal Light を押してください。"
    );

    setVisualFormStatus(
      "Witness World Completed.\n\nImage Prompt Ready.\nReveal Light を押してください。"
    );
  } catch (error) {
    console.error("IMAGE PROMPT ERROR =", error);

    setImagePromptStatus(
      "Image Prompt の生成に失敗しました。"
    );

    setVisualFormStatus(
      "Image Prompt の生成に失敗しました。"
    );
  } finally {
    setIsGeneratingVisualForm(false);
  }
}

  async function handleVisualFidelityCheck() {
  console.log("VISUAL FIDELITY CLICKED");

  setIsCheckingFidelity(true);
  setFidelityStatus("Blueprintと画像を比較しています...");

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

setFidelityStatus(
  "比較が完了しました。Witness Reflectionへ進んでください。"
);

spiral.next();

  } catch (error) {
  console.error("VISUAL FIDELITY CHECK ERROR =", error);
} finally {
  setIsCheckingFidelity(false);
}
}

async function handleWitnessReflection() {
  try {
    const compactTestimony =
      originalTestimony ||
      card.whatHappened ||
      visualClarification?.summary ||
      "";

    const compactFidelityReport = fidelityReport
      ? {
          result: fidelityReport.result,
          overallAssessment: fidelityReport.overallAssessment,
          lost: fidelityReport.lost,
          invented: fidelityReport.invented,
          summary: fidelityReport.summary,
        }
      : null;

    const res = await fetch("/api/witness-reflection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testimony: compactTestimony,
        generatedImage:
          generatedImages?.[0]?.imageUrl || card.generatedImage || "",
        fidelityReport: compactFidelityReport,
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

    {visualClarification.unknowns?.length > 0 && (
      <>
        <p><strong>Unknowns</strong></p>
        <ul>
          {visualClarification.unknowns.map(
            (item: string, index: number) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
      </>
    )}

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
          onChange={(e) => setClarificationAnswer(e.target.value)}
          placeholder="質問への回答を書いてください"
          style={textareaStyle}
        />

        <button
          onClick={handleVisualClarification}
          disabled={isClarifying || !clarificationAnswer.trim()}
          style={{
            ...sendButtonStyle,
            opacity:
              isClarifying || !clarificationAnswer.trim() ? 0.6 : 1,
            cursor:
              isClarifying || !clarificationAnswer.trim()
                ? "not-allowed"
                : "pointer",
          }}
        >
          {isClarifying ? "回答を受け取っています..." : "回答を送る"}
        </button>
      </>
    )}

    <div style={{ marginTop: 20 }}>
      <p>
        <strong>修正・補足</strong>
      </p>

      <p style={{ color: "#475569", fontSize: 14 }}>
        AIのまとめに違うところ、補足したいこと、Unknownに答えたいことがあれば書いてください。
      </p>

      <textarea
  value={blueprintCorrection}
  onChange={(e) => {
    setBlueprintCorrection(e.target.value);
    setBlueprintUpdateMessage("");
  }}
  placeholder="例：畳に穴があるのではなく、畳から上半身がスッと出ている感じ。穴や縁は見えない。"
  style={textareaStyle}
/>

      <button
  onClick={handleVisualClarification}
  disabled={isClarifying || !blueprintCorrection.trim()}
  style={{
    ...sendButtonStyle,
    opacity:
      isClarifying || !blueprintCorrection.trim() ? 0.6 : 1,
    cursor:
      isClarifying || !blueprintCorrection.trim()
        ? "not-allowed"
        : "pointer",
  }}
>
  {isClarifying
    ? "修正を反映しています..."
    : "修正を反映する"}
</button>
{isClarifying && (
  <p style={{ marginTop: 8 }}>
    Blueprintを更新しています...
  </p>
)}
       </div>

    {visualClarification.readyForVisualExtraction && (
  <>
    <button
      onClick={handleGenerateVisualForm}
      disabled={isGeneratingVisualForm}
      style={{
        ...generateButtonStyle,
        marginTop: 20,
        background: isGeneratingVisualForm ? "#94a3b8" : "#2563eb",
        color: "#fff",
        cursor: isGeneratingVisualForm ? "wait" : "pointer",
      }}
    >
      {isGeneratingVisualForm
  ? "Witness World を構築しています..."
  : "Build Witness World"}
    </button>

    {visualFormStatus && (
      <div
        style={{
          marginTop: 12,
          padding: 12,
          borderRadius: 10,
          background: "#eff6ff",
          color: "#1d4ed8",
          fontWeight: 600,
        }}
      >
        {visualFormStatus}
      </div>
    )}
  </>
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

           {card.whatRemained && !card.visualForm && (
  <button
    onClick={handleGenerateVisualForm}
    disabled={isGeneratingVisualForm}
    style={{
      ...sendButtonStyle,
      marginTop: 16,
      width: "100%",
      opacity: isGeneratingVisualForm ? 0.6 : 1,
      cursor: isGeneratingVisualForm ? "wait" : "pointer",
    }}
  >
    {isGeneratingVisualForm
      ? "Witness World を構築しています..."
      : "Build Witness World"}
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

  <Panel title="Witness World">
  
  {isGeneratingVisualForm && (
  <>
    <div
      style={{
        width: "100%",
        height: 12,
        background: "#e5e7eb",
        borderRadius: 999,
        overflow: "hidden",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          width: `${witnessWorldProgress}%`,
          height: "100%",
          background: "#2563eb",
          transition: "width .35s ease",
        }}
      />
    </div>

    <div
  style={{
    fontSize: 13,
    color: "#334155",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: 600,
  }}
>
  Witness World Construction — {witnessWorldProgress}%
</div>

<div
  style={{
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    marginBottom: 12,
  }}
>
  {witnessWorldStep}
</div>
  </>
)}


  {visualFormStatus && (
    <div
      style={{
        marginBottom: 12,
        padding: 10,
        borderRadius: 10,
        background: "#eef2ff",
        color: "#4338ca",
        fontWeight: 600,
      }}
    >
      {visualFormStatus}
    </div>
  )}

  <p style={bodyStyle}>
    {card.visualForm || "視覚要素の抽出を待っています。"}
  </p>

</Panel>
          {characterBible && (
  <Panel title="Character Bible">
    <pre
      style={{
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        fontSize: 12,
        lineHeight: 1.6,
      }}
    >
      {JSON.stringify(characterBible, null, 2)}
    </pre>
  </Panel>
)}

          <Panel title="Image Prompt">
            {imagePromptStatus && (
  <div
    style={{
      marginBottom: 12,
      padding: 10,
      borderRadius: 10,
      background: "#dbeafe",
      color: "#1d4ed8",
      fontWeight: 600,
    }}
  >
    {imagePromptStatus}
  </div>
)}
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

 {imagePrompts.length === 0 && !card.imagePrompt && !imagePrompt && (
  <button
    type="button"
    onClick={() => {
      console.log("🔥 BUILD BUTTON CLICKED");
      handleGenerateImagePrompt();
    }}
    disabled={
      !card.visualForm ||
      imagePromptStatus === "Image Prompt を生成しています..."
    }
    style={{
      ...generateButtonStyle,
      marginBottom: 12,
      background:
        !card.visualForm
          ? "#cbd5e1"
          : imagePromptStatus === "Image Prompt を生成しています..."
          ? "#94a3b8"
          : "#2563eb",
      cursor:
        !card.visualForm
          ? "not-allowed"
          : imagePromptStatus === "Image Prompt を生成しています..."
          ? "wait"
          : "pointer",
    }}
  >
    {imagePromptStatus === "Image Prompt を生成しています..."
      ? "Image Prompt を生成しています..."
      : "Image Prompt を生成"}
  </button>
)}

{(imagePrompts.length > 0 || card.imagePrompt || imagePrompt) && (
  <button
  onClick={handleGenerateImage}
  disabled={
    (!card.imagePrompt && imagePrompts.length === 0) ||
    imageGenerationStatus.includes("生成しています")
  }
  style={{
    ...generateButtonStyle,
    background:
      !card.imagePrompt && imagePrompts.length === 0
        ? "#cbd5e1"
        : imageGenerationStatus.includes("生成しています")
        ? "#94a3b8"
        : "#ea580c",
    cursor:
      !card.imagePrompt && imagePrompts.length === 0
        ? "not-allowed"
        : imageGenerationStatus.includes("生成しています")
        ? "wait"
        : "pointer",
  }}
>
  {imageGenerationStatus.includes("生成しています")
    ? imageGenerationStatus
    : "Reveal Light"}
</button>
)}

{visualStage === "fidelity-check" && (
  <>
    <button
      onClick={handleVisualFidelityCheck}
      disabled={
        isCheckingFidelity ||
        (!generatedImages.length && !card.generatedImage)
      }
      style={{
        ...generateButtonStyle,
        marginTop: 12,
        background: "#7c3aed",
        color: "#fff",
        cursor:
          generatedImages.length || card.generatedImage
            ? "pointer"
            : "not-allowed",
        opacity: isCheckingFidelity ? 0.6 : 1,
      }}
    >
      {isCheckingFidelity
        ? "Blueprintと画像を比較しています..."
        : "Compare with Blueprint"}
    </button>

    {fidelityStatus && (
      <div
        style={{
          marginTop: 12,
          padding: 12,
          borderRadius: 10,
          background: "#ede9fe",
          color: "#5b21b6",
          fontWeight: 600,
        }}
      >
        {fidelityStatus}
      </div>
    )}
  </>
)}

{visualStage === "witness-reflection" && (
  <button
    onClick={handleWitnessReflection}
    style={{
      ...generateButtonStyle,
      marginTop: 12,
      background: "#0891b2",
      color: "#fff",
      cursor: "pointer",
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

{imageGenerationStatus && (
  <div
    style={{
      marginTop: 12,
      marginBottom: 12,
      padding: 10,
      borderRadius: 10,
      background: "#fff7ed",
      color: "#c2410c",
      fontWeight: 600,
    }}
  >
    {imageGenerationStatus}
  </div>
)}

         {generatedImages.length > 0 ? (
  <div style={{ display: "grid", gap: 24, marginTop: 16 }}>
    {generatedImages.map((image, index) => (
  <div key={`${image.scene}-${index}`}>

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

        <button
          type="button"
          onClick={() => {
            const ref = {
              scene: image.scene,
              imageUrl: image.imageUrl,
              createdAt: new Date().toISOString(),
            };

            setReferenceImage(ref);

            setWorldSeed(
              createWorldSeed({
                selectedReferenceImageUrl: image.imageUrl,
              })
            );
          }}
          style={{
            marginTop: 12,
            padding: "12px 18px",
            borderRadius: 10,
            border: "none",
            background: "#15803d",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          🌎 この世界を採用する
        </button>

        {worldSeed?.acceptedByWitness &&
          referenceImage?.imageUrl === image.imageUrl && (
            <div
              style={{
                marginTop: 8,
                padding: "10px 14px",
                borderRadius: 8,
                background: "#ecfdf5",
                color: "#166534",
                fontWeight: 700,
                lineHeight: 1.5,
              }}
            >
              🌎 Witness World Confirmed
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  marginTop: 4,
                }}
              >
                証言者によって、この世界が「私の見た世界」として承認されました。
              </div>
            </div>
          )}
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