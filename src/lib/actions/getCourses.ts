import { prisma } from "@/lib/prisma";
import { TrainingStatus } from "@prisma/client";

export async function getCoursesWithProgress(userId: string | null) {
  if (!userId) {
    return { data: [], error: "вы не авторизовались" };
  }

  try {
    const allCourses = await prisma.course.findMany();
    const userCourses = await prisma.userCourse.findMany({
      where: { userId },
      select: {
        courseId: true,
        status: true,
        startedAt: true,
        completedAt: true,
      },
    });

    const data = allCourses.map((course) => {
      const userCourse = userCourses.find((uc) => uc.courseId === course.id);
      return {
        ...course,
        userStatus: userCourse?.status ?? TrainingStatus.NOT_STARTED,
        startedAt: userCourse?.startedAt ?? null,
        completedAt: userCourse?.completedAt ?? null,
      };
    });

    return { data };
  } catch (error) {
    console.error("Ошибка при получении курсов с прогрессом:", error);
    return { data: [], error: "Не удалось загрузить курсы с прогрессом" };
  }
}
