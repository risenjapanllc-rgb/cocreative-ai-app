import { useState } from "react";
import {
  next,
  previous,
  restart,
  goTo,
  type VisualStage,
} from "@/lib/spiral";

export function useLivingSpiral(initialStage: VisualStage = "testimony") {
  const [stage, setStage] = useState<VisualStage>(initialStage);

  return {
    stage,

    next() {
      setStage((prev) => next(prev));
    },

    previous() {
      setStage((prev) => previous(prev));
    },

    restart() {
      setStage(restart());
    },

    goTo(stage: VisualStage) {
      setStage(goTo(stage));
    },
  };
}