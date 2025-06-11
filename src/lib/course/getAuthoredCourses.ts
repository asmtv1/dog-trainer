"use server";

"use server";

import type { LiteCourse } from "@/types/course";
import { prisma } from "@/shared/prisma";
import { getCurrentUserId } from "@/utils/getCurrentUserId";

export async function getAuthoredCourses(): Promise<LiteCourse[]> {
  const userId = await getCurrentUserId();

  try {
    const courses = await prisma.course.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        name: true,
        userCourses: {
          select: {
            startedAt: true,
            completedAt: true,

            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    const coursesWithCompletedDays = await Promise.all(
      courses.map(async (course) => {
        const updatedUserCourses = await Promise.all(
          course.userCourses.map(async (uc) => {
            const trainings = await prisma.userTraining.findMany({
              where: {
                userId: uc.user.id,
                trainingDay: {
                  courseId: course.id,
                },
                status: "COMPLETED",
              },
              select: {
                trainingDay: {
                  select: {
                    dayNumber: true,
                  },
                },
              },
            });

            const completedDays = uc.completedAt
              ? []
              : trainings
                  .map((t) => t.trainingDay.dayNumber)
                  .sort((a, b) => a - b);

            return {
              ...uc,
              completedDays,
            };
          })
        );

        return {
          ...course,
          userCourses: updatedUserCourses,
        };
      })
    );

    return coursesWithCompletedDays;
  } catch (error) {
    console.error("Ошибка в getAuthoredCourses:", error);
    throw new Error("Ошибка при получении курсов пользователя");
  }
}
