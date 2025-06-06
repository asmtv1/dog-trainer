import { notFound } from "next/navigation";
import Day from "./day";
import type { CourseType } from "@/types/training";
import { getTrainingDayWithUserSteps } from "@/lib/actions/training";

type Props = {
  params: {
    courseType: CourseType;
    day: number;
  };
};

export default async function TrainingDetailPage({ params }: Props) {
  const { day, courseType } = await params;

  // Получаем данные о дне и шагах из базы напрямую
  const training = await getTrainingDayWithUserSteps(courseType, Number(day));

  if (!training) return notFound();

  return <Day training={training} />;
}
