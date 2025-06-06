// /lib/actions/userProfileService.ts
"use server";

import { prisma } from "@/lib/prisma";

interface UpdateUserProfileInput {
  userId: string;
  fullName: string;
  about: string;
  telegram: string;
  instagram: string;
  website: string;
  birthDate: string;
}

export async function updateUserProfile({
  userId,
  fullName,
  about,
  telegram,
  instagram,
  website,
  birthDate,
}: UpdateUserProfileInput) {
  if (!userId) throw new Error("Поле userId обязательно");

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
      const parsed = new Date(birthDate);
      if (isNaN(parsed.getTime())) throw new Error("Неверная дата");
      data.birthDate = parsed;
    }
  }

  return await prisma.userProfile.update({
    where: { userId },
    data,
  });
}
