// src/lib/actions/savePet.ts
"use server";

import { prisma } from "@/shared/prisma";
import { getCurrentUserId } from "@/utils/getCurrentUserId";
import { validatePetInput } from "@/utils/validate";

interface UpdatePetInput {
  id?: string;
  ownerId?: string;
  name: string;
  type: string;
  breed?: string;
  birthDate?: string;
  heightCm?: number;
  weightKg?: number;
  notes?: string;
}

export async function savePet({
  id,
  name,
  type,
  breed,
  birthDate,
  heightCm,
  weightKg,
  notes,
}: UpdatePetInput) {
  try {
    const ownerId = await getCurrentUserId();

    if (!id && !ownerId) {
      throw new Error("Поле ownerId обязательно при создании");
    }

    validatePetInput({
      name,
      type,
      birthDate,
      heightCm,
      weightKg,
    });

    const parsedDate =
      birthDate && birthDate !== "" ? new Date(birthDate) : null;

    const dataToSave: any = {
      name: name || "",
      type: type || "",
      breed: breed ?? null,
      heightCm: heightCm ?? null,
      weightKg: weightKg ?? null,
      notes: notes ?? null,
      birthDate: parsedDate,
    };

    if (!id && ownerId) {
      dataToSave.owner = { connect: { id: ownerId } };
    }

    if (id) {
      return await prisma.pet.update({
        where: { id },
        data: dataToSave,
      });
    } else {
      return await prisma.pet.create({
        data: dataToSave,
      });
    }
  } catch (error) {
    console.error("Ошибка в savePet:", error);
    throw new Error(
      "Ошибка при сохранении питомца. Попробуйте перезагрузить страницу."
    );
  }
}
