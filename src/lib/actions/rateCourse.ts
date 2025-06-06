"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/actions/auth";

export async function rateCourse(courseId: number, rating: number | null) {
  if (!rating || rating < 1 || rating > 5) return;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  // Создаём или обновляем отзыв
  await prisma.courseReview.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    update: {
      rating,
    },
    create: {
      userId,
      courseId,
      rating,
    },
  });

  // Пересчитываем средний рейтинг
  const result = await prisma.courseReview.aggregate({
    where: { courseId },
    _avg: { rating: true },
  });

  // Обновляем курс
  await prisma.course.update({
    where: { id: courseId },
    data: {
      avgRating: result._avg.rating,
    },
  });
}
