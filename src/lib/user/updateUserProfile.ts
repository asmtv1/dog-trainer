// /lib/actions/userProfileService.ts
"use server";

import { prisma } from "@/shared/prisma";
import { getCurrentUserId } from "@/utils/getCurrentUserId";
import { validateProfileInput } from "@/utils/validate";

interface UpdateUserProfileInput {
  fullName: string;
  about: string;
  telegram: string;
  instagram: string;
  website: string;
  birthDate: string;
}

export async function updateUserProfile({
  fullName,
  about,
  telegram,
  instagram,
  website,
  birthDate,
}: UpdateUserProfileInput) {
  try {
    const userId = await getCurrentUserId();

    validateProfileInput({
      fullName,
      about,
      telegram,
      instagram,
      website,
      birthDate,
    });

    const data: any = {
      fullName: fullName || null,
      about: about || null,
      telegram: telegram || null,
      instagram: instagram || null,
      website: website || null,
    };

  if (birthDate !== undefined) {
    if (birthDate === "") {
      data.birthDate = null;
    } else {
      data.birthDate = new Date(birthDate);
    }
  }

    return await prisma.userProfile.update({
      where: { userId },
      data,
    });
  } catch (error) {
    console.error("Ошибка в updateUserProfile:", error);
    throw new Error(
      "Ошибка при обновлении профиля. Попробуйте перезагрузить страницу."
    );
  }
}
