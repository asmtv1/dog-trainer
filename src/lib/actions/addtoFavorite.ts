"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function toggleFavoriteCourse(courseId: number): Promise<boolean> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Пользователь не авторизован");
  }

  const existing = await prisma.favoriteCourse.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  if (existing) {
    await prisma.favoriteCourse.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    return false; // теперь не в избранном
  } else {
    await prisma.favoriteCourse.create({
      data: {
        userId,
        courseId,
      },
    });
    return true; // теперь в избранном
  }
}
