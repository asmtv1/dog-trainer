"use server";

import { prisma } from "@/lib/db/prisma";
import { TrainingStatus } from "@prisma/client";
import type { TrainingDetail } from "@/types/training";
import { getCurrentUserId } from "@/utils/getCurrentUserId";

export async function getTrainingDays(typeParam?: string): Promise<{
  trainingDays: Array<
    Pick<
      TrainingDetail,
      "id" | "day" | "title" | "type" | "courseId" | "userStatus"
    >
  >;
  courseDescription: string | null;
  courseId: number | null;
}> {
  const userId = await getCurrentUserId();

  try {
    const where = typeParam ? { type: typeParam } : {};

    const firstTrainingDay = await prisma.trainingDay.findFirst({
      where,
      orderBy: { dayNumber: "asc" },
      select: {
        course: { select: { description: true, id: true } },
      },
    });

    const trainingDaysRaw = await prisma.trainingDay.findMany({
      where,
      orderBy: { dayNumber: "asc" },
      select: {
        id: true,
        dayNumber: true,
        title: true,
        type: true,
        courseId: true,
      },
    });

    const userTrainings = await prisma.userTraining.findMany({
      where: { userId },
      select: { trainingDayId: true, status: true },
    });

    const trainingDays = trainingDaysRaw.map((day) => ({
      id: day.id,
      day: day.dayNumber,
      title: day.title,
      type: day.type,
      courseId: day.courseId,
      userStatus:
        userTrainings.find((ut) => ut.trainingDayId === day.id)?.status ??
        TrainingStatus.NOT_STARTED,
    }));

    return {
      trainingDays,
      courseDescription: firstTrainingDay?.course.description ?? null,
      courseId: firstTrainingDay?.course.id ?? null,
    };
  } catch (error) {
    console.error("Ошибка в getTrainingDays:", error);
    throw new Error("Не удалось загрузить Тренировки");
  }
}
