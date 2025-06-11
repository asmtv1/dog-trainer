"use server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUserId } from "@/utils/getCurrentUserId";
import { TrainingStatus } from "@prisma/client";

export async function getFavoritesCourses() {
  const userId = await getCurrentUserId();

  try {
    const userFavorites = await prisma.favoriteCourse.findMany({
      where: { userId },
      select: { courseId: true },
    });

    const favoriteCourseIds = userFavorites.map((f) => f.courseId);

    const allCourses = await prisma.course.findMany({
      where: {
        id: {
          in: favoriteCourseIds,
        },
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        reviews: true,
        favoritedBy: true,
        access: true,
      },
    });
    const userCourses = await prisma.userCourse.findMany({
      where: { userId },
      select: {
        courseId: true,
        status: true,
        startedAt: true,
        completedAt: true,
      },
    });
    console.log(userCourses);
    const data = allCourses.map((course) => {
      const userCourse = userCourses.find((uc) => uc.courseId === course.id);
      return {
        id: course.id,
        name: course.name,
        type: course.type,
        description: course.description,
        shortDesc: course.shortDesc,
        duration: course.duration,
        logoImg: course.logoImg,
        isPrivate: course.isPrivate,
        avgRating: course.avgRating,
        createdAt: course.createdAt,
        authorUsername: course.author.username,
        favoritedBy: course.favoritedBy,
        reviews: course.reviews,
        access: course.access,
        userStatus: userCourse?.status ?? TrainingStatus.NOT_STARTED,
        startedAt: userCourse?.startedAt ?? null,
        completedAt: userCourse?.completedAt ?? null,
        isFavorite: true,
      };
    });

    return { data };
  } catch (error) {
    console.error("Ошибка в getFavoritesCourses:", error);
    throw new Error("Не удалось загрузить курсы с прогрессом");
  }
}
