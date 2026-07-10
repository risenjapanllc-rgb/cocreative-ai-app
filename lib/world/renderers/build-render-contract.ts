import { DirectorDecision } from "../director";

import {
  buildRenderContract,
  RenderContract,
} from "./render-contract";

export function buildRenderContractFromDecision(
  decision: DirectorDecision
): RenderContract {
  const contract = buildRenderContract();

  contract.identity.push(
    `Primary subject: ${decision.subject.primary}`
  );

  contract.identity.push(
    `Subject focus: ${decision.subject.focus}`
  );

  contract.camera.push(
    `Viewpoint: ${decision.camera.viewpoint}`
  );

  contract.camera.push(
    `Position: ${decision.camera.position}`
  );

  contract.camera.push(
    `Height: ${decision.camera.height}`
  );

  contract.camera.push(
    `Framing: ${decision.camera.framing}`
  );

  contract.action.push(
    `Current event: ${decision.currentEvent}`
  );

  contract.action.push(
    `Visible action: ${decision.action.visible}`
  );

  contract.emotion.push(
    `Emotional direction: ${decision.action.emotional}`
  );

  for (const item of decision.mustShow) {
    contract.continuity.push(item);
  }

  for (const item of decision.mustNotShow) {
    contract.impossible.push(
      `Must not appear: ${item}`
    );
  }

  for (const item of decision.forbidden) {
    contract.continuity.push(
      `Forbidden: ${item}`
    );
  }

  return contract;
}