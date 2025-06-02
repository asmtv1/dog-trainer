"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { TrainingStatus, ActivityType } from "@prisma/client";

export async function getTrainingDayWithUserSteps(
  courseType: ActivityType | string,
  day: number // только число!
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const trainingDay = await prisma.trainingDay.findFirst({
    where: {
      type: courseType as ActivityType,
      dayNumber: day, // передаём как есть
    },
    include: {
      steps: true,
      course: true,
      userTrainings: {
        where: { userId: session.user.id }, // исправлено
        include: {
          steps: true,
        },
      },
    },
  });

  if (!trainingDay) return null;

  const userTraining = trainingDay.userTrainings[0];

  return {
    id: trainingDay.id,
    day: trainingDay.dayNumber,
    title: trainingDay.title,
    type: trainingDay.type,
    courseId: trainingDay.courseId,
    description: trainingDay.course?.description ?? "",
    duration: trainingDay.course?.duration ?? "",
    userStatus: userTraining ? userTraining.status : TrainingStatus.NOT_STARTED,
    steps: trainingDay.steps.map((step) => {
      const userStep = userTraining?.steps.find((us) => us.stepId === step.id);

      return {
        id: step.id,
        title: step.title,
        description: step.description,
        durationSec: step.durationSec,
        status: userStep ? userStep.status : TrainingStatus.NOT_STARTED,
      };
    }),
  };
}

export async function updateUserStepStatus(
  userId: string,
  courseType: ActivityType | string,
  day: number, // только число!
  stepIndex: number,
  status: TrainingStatus
) {
  // 1. Находим TrainingDay
  const trainingDay = await prisma.trainingDay.findFirst({
    where: { type: courseType as ActivityType, dayNumber: day },
    include: { steps: true },
  });
  if (!trainingDay) throw new Error("TrainingDay not found");

  // 2. Находим или создаём UserTraining для пользователя
  let userTraining = await prisma.userTraining.findFirst({
    where: { userId, trainingDayId: trainingDay.id },
    include: { steps: true },
  });

  if (!userTraining) {
    userTraining = await prisma.userTraining.create({
      data: {
        userId,
        trainingDayId: trainingDay.id,
      },
      include: { steps: true },
    });
  }

  // 3. Находим нужный step по индексу
  const step = trainingDay.steps[stepIndex];
  if (!step) throw new Error("Step not found");

  // 4. Находим или создаём UserStep
  let userStep = await prisma.userStep.findFirst({
    where: {
      userTrainingId: userTraining.id,
      stepId: step.id,
    },
  });

  if (!userStep) {
    await prisma.userStep.create({
      data: {
        title: step.title,
        durationSec: step.durationSec,
        userTrainingId: userTraining.id,
        stepId: step.id,
        status,
      },
    });
  } else {
    await prisma.userStep.update({
      where: { id: userStep.id },
      data: { status },
    });
  }

  // 5. Проверяем, все ли шаги в этом UserTraining completed
  const allUserSteps = await prisma.userStep.findMany({
    where: { userTrainingId: userTraining.id },
  });

  const allCompleted =
    allUserSteps.length === trainingDay.steps.length &&
    allUserSteps.every((s) => s.status === TrainingStatus.COMPLETED);

  await prisma.userTraining.update({
    where: { id: userTraining.id },
    data: {
      status: allCompleted
        ? TrainingStatus.COMPLETED
        : TrainingStatus.IN_PROGRESS,
    },
  });

  return { success: true };
}

/**
 * Server Action — получает userId из сессии и проксирует в updateUserStepStatus.
 * Вызывается напрямую из клиентских компонентов без fetch.
 */
export async function updateStepStatusServerAction(
  courseType: ActivityType | string,
  day: number,
  stepIndex: number,
  status: TrainingStatus
) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  return updateUserStepStatus(
    session.user.id,
    courseType,
    day,
    stepIndex,
    status
  );
}
