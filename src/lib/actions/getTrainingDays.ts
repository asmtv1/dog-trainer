import { prisma } from "@/lib/prisma";
import { ActivityType, TrainingStatus } from "@prisma/client";
import type { TrainingDayShort } from "@/types/training";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getTrainingDays(typeParam?: string): Promise<{
  trainingDays?: (TrainingDayShort & { userStatus: TrainingStatus })[];
  error?: string;
}> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { error: "вы не авторизовались" };
  }

  try {
    const type =
      typeParam &&
      Object.values(ActivityType).includes(typeParam as ActivityType)
        ? (typeParam as ActivityType)
        : undefined;

    const where: any = {};
    if (type) where.type = type;

    const trainingDays = await prisma.trainingDay.findMany({
      where,
      orderBy: { dayNumber: "asc" },
    });

    const userTrainings = await prisma.userTraining.findMany({
      where: { userId: session.user.id },
      select: {
        trainingDayId: true,
        status: true,
      },
    });

    const result = trainingDays.map((day) => {
      const userTraining = userTrainings.find(
        (ut) => ut.trainingDayId === day.id
      );
      return {
        id: day.id,
        title: day.title,
        type: day.type,
        dayNumber: day.dayNumber,
        courseId: day.courseId,
        day: day.dayNumber,
        userTraining: null,
        userTrainings: [],
        userStatus: userTraining?.status ?? TrainingStatus.NOT_STARTED,
      };
    });

    return { trainingDays: result };
  } catch (error) {
    console.error("Failed to get training days:", error);
    return { error: "Не удалось загрузить тренировочные дни" };
  }
}
