import { DirectorDecision } from "../director";
import { RenderContract } from "./render-contract";

function section(
  title: string,
  items: string[]
): string {
  const filtered = items
    .map((item) => item.trim())
    .filter(Boolean);

  if (filtered.length === 0) {
    return "";
  }

  return [
    title,
    ...filtered.map((item) => `- ${item}`),
    "",
  ].join("\n");
}

export function translateForOpenAI({
  contract,
  decision,
}: {
  contract: RenderContract;
  decision: DirectorDecision;
}): string {
  const parts: string[] = [];

  parts.push(
    "Render the witnessed event exactly according to the following instructions."
  );

  parts.push(
    "Confirmed witness facts have higher priority than visual convention."
  );

  parts.push(
    "Do not redesign, reinterpret, normalize, embellish, or improve the witnessed world."
  );

  parts.push("");

  // 世界の固定情報
  parts.push(
    section(
      "IDENTITY LOCK",
      contract.identity
    )
  );

  parts.push(
    section(
      "ENVIRONMENT LOCK",
      contract.environment
    )
  );

  parts.push(
    section(
      "IMPOSSIBLE CONDITION LOCK",
      contract.impossible
    )
  );

  parts.push(
    section(
      "CONTINUITY LOCK",
      contract.continuity
    )
  );

  // 現在の出来事
  parts.push(
    section(
      "CURRENT EVENT",
      contract.action
    )
  );

  parts.push(
    section(
      "CURRENT EMOTION",
      contract.emotion
    )
  );

  // カメラや観測方法は DirectorDecision から取得
  parts.push(
    section(
      "DIRECTOR OBSERVATION",
      [
        `Current event: ${decision.currentEvent}`,
        `Primary subject: ${decision.subject.primary}`,
        `Subject focus: ${decision.subject.focus}`,
        `Visible action: ${decision.action.visible}`,
        `Viewpoint: ${decision.camera.viewpoint}`,
        `Position: ${decision.camera.position}`,
        `Height: ${decision.camera.height}`,
        `Framing: ${decision.camera.framing}`,
        `Moment: ${decision.timing.moment}`,
      ]
    )
  );

  parts.push(
    section(
      "MUST SHOW",
      decision.mustShow
    )
  );

  parts.push(
    section(
      "MUST NOT SHOW",
      decision.mustNotShow
    )
  );

  parts.push(
    section(
      "FORBIDDEN",
      decision.forbidden
    )
  );

  // 画像生成モデル専用の表現
  parts.push("RENDERING STYLE");
  parts.push("- Photorealistic documentary photograph.");
  parts.push("- Natural light.");
  parts.push("- Real camera appearance.");
  parts.push("- No illustration.");
  parts.push("- No anime.");
  parts.push("- No painting.");
  parts.push("- No CGI.");
  parts.push("- No visible text.");
  parts.push("- No captions.");
  parts.push("- No subtitles.");
  parts.push("- No watermark.");

  return parts
    .filter((part) => part.trim().length > 0)
    .join("\n");
}