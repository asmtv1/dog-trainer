import { useState, useEffect } from "react";
import { updateStepStatusServerAction } from "@/lib/training/updateUserStepStatus";
import type { TrainingDetail } from "@/types/training";
import { TrainingStatus } from "@prisma/client";

export function useTrainingDay(training: TrainingDetail) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [runningIndex, setRunningIndex] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  async function handleStepStart(stepIndex: number) {
    setRunningIndex(stepIndex);
    try {
      await updateStepStatusServerAction(
        training.type,
        training.day,
        stepIndex,
        TrainingStatus.IN_PROGRESS
      );
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e);
    }
  }

  return {
    openIndex,
    setOpenIndex,
    runningIndex,
    setRunningIndex,
    handleStepStart,
  };
}
