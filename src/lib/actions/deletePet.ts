"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";

export async function deletePet(petId: string, pathToRevalidate: string = "/") {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
      select: { photoUrl: true },
    });

    if (pet?.photoUrl) {
      const fileName = path.basename(pet.photoUrl);
      const filePath = path.join(process.cwd(), "public", "uploads", "pets", fileName);
      await unlink(filePath).catch(() => {
        console.warn("Не удалось удалить аватарку питомца:", fileName);
      });
    }

    await prisma.pet.delete({
      where: { id: petId },
    });

    revalidatePath(pathToRevalidate);
  } catch (err) {
    console.error("Ошибка при удалении питомца:", err);
    throw err;
  }
}
