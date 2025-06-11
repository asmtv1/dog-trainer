import Day from "@/components/training/Day";
import { getTrainingDayWithUserSteps } from "@/lib/training/getTrainingDayWithUserSteps";
import type { TrainingDetail } from "@/types/training";

export default async function DayPage(props: {
  params: Promise<{ courseType: string; day: string }>;
}) {
  const { courseType, day } = await props.params;
  const training: TrainingDetail | null = await getTrainingDayWithUserSteps(
    courseType,
    Number(day)
  );
  if (!training) throw new Error("Тренировка не найдена");

  return <Day training={training} />;
}
