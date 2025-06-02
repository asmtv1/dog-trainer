"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { TrainingStatus } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function assignCoursesToUser(courseId: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const createdUserCourse = await prisma.userCourse.upsert({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        courseId,
        status: TrainingStatus.IN_PROGRESS,
        startedAt: new Date(), // ← добавь это
      },
    });

    return { success: true, data: createdUserCourse };
  } catch (error) {
    console.error("Ошибка при назначении курса:", error);
    return { success: false, error: "Не удалось назначить курс" };
  }
}

export async function completeUserCourse(courseId: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    // Сначала ищем запись
    const existingUserCourse = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    let createdOrUpdatedUserCourse;

    if (existingUserCourse) {
      if (existingUserCourse.completedAt) {
        // Уже завершён, не меняем дату
        createdOrUpdatedUserCourse = existingUserCourse;
      } else {
        // Первый раз завершаем
        createdOrUpdatedUserCourse = await prisma.userCourse.update({
          where: {
            userId_courseId: {
              userId: session.user.id,
              courseId,
            },
          },
          data: {
            status: TrainingStatus.COMPLETED,
            completedAt: new Date(),
          },
        });
      }
    } else {
      // Если вообще нет записи — создаём
      createdOrUpdatedUserCourse = await prisma.userCourse.create({
        data: {
          userId: session.user.id,
          courseId,
          status: TrainingStatus.COMPLETED,
          completedAt: new Date(),
        },
      });
    }

    console.log("RESULT completeUserCourse:", createdOrUpdatedUserCourse);

    return { success: true, data: createdOrUpdatedUserCourse };
  } catch (error) {
    console.error("Ошибка при назначении курса:", error);
    return { success: false, error: "Не удалось назначить курс" };
  }
}
