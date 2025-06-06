// lib/actions/userProfile.ts
"use server";
import { prisma } from "@/lib/prisma";

export async function getUserProfile(userId: string | null) {
  if (!userId) throw new Error("Не удалось получить профиль пользователя");
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
    });
    return profile;
  } catch (error) {
    console.error("Ошибка при получении профиля пользователя:", error);
    throw new Error("Не удалось получить профиль пользователя");
  }
}
