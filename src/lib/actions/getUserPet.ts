"use server";
import { prisma } from "@/lib/prisma";

export async function getUserPet(ownerId: string | null) {
  if (!ownerId) throw new Error("Не удалось получить профиль пользователя");

  try {
    const pets = await prisma.pet.findMany({
      where: { ownerId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        ownerId: true,
        name: true,
        type: true,
        breed: true,
        birthDate: true,
        heightCm: true,
        weightKg: true,
        photoUrl: true,
        notes: true,
        awards: {
          orderBy: { date: "desc" },
          select: {
            id: true,
            title: true,
            event: true,
            date: true,
            rank: true,
          },
        },
      },
    });

    console.log("🐾 Найденные питомцы:", pets); // ✅ Вот сюда

    return pets;
  } catch (error) {
    console.error("Ошибка при получении питомцев:", error);
    throw new Error("Не удалось получить питомцев пользователя");
  }
}
