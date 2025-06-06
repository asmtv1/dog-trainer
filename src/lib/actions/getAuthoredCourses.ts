"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/actions/auth"; // путь может отличаться

export async function getAuthoredCourses() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Не авторизован");
  }

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
              : trainings.map((t) => t.trainingDay.dayNumber).sort((a, b) => a - b);

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
    console.error("Ошибка при получении курсов пользователя:", error);
    throw error;
  }
}
