import type { TrainingDetail } from "@/types/training";

export function calculateDuration(training: TrainingDetail): number {
  return training.steps.reduce((sum, step) => sum + step.durationSec, 0);
}
