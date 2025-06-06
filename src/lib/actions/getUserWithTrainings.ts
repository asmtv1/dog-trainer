// src/app/actions/getUserWithTrainings.ts
"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma"; // путь к синглтону PrismaClient
import { getServerSession } from "next-auth";
import { TrainingStatus } from "@prisma/client";

/**
 * Возвращает пользователя и все связанные TrainingDay-и
 * вместе c текущим статусом (UserTraining.status)
 * и названием курса, к которому день относится.
 * Использует поле username вместо name.
 */
export async function getUserWithTrainings() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      phone: true,
      userTrainings: {
        orderBy: { trainingDay: { courseId: "asc" } }, // курс → день
        select: {
          status: true, // not_started / in_progress / completed
          trainingDay: {
            select: {
              id: true,
              title: true,
              dayNumber: true,
              type: true, // home / street / …
              course: {
                select: { id: true, name: true },
              },
            },
          },
        },
      },
      userCourses: {
        select: {
          courseId: true,
          startedAt: true,
          completedAt: true,
          course: {
            select: {
              id: true,
              name: true,
              trainingDays: {
                select: { id: true }
              }
            }
          },
        },
      },
    },
  });

  // (по желанию) превращаем в более удобный DTO
  if (!user) return null;

  // Assemble per‑course progress info
  const courses = user.userCourses.map((uc) => {
    const trainingsForCourse = user.userTrainings.filter(
      (ut) => ut.trainingDay.course.id === uc.courseId
    );

    const completedDays = trainingsForCourse
      .filter((t) => t.status === TrainingStatus.COMPLETED)
      .map((t) => t.trainingDay.dayNumber)
      .sort((a, b) => a - b);

    return {
      courseId: uc.courseId,
      courseName: uc.course.name,
      startedAt: uc.startedAt,
      completedAt: uc.completedAt,
      completedDays: uc.completedAt ? [] : completedDays,
      totalDays: uc.course.trainingDays.length,
    };
  });

  return {
    id: user.id,
    username: user.username,
    phone: user.phone,
    courses,
  };
}
