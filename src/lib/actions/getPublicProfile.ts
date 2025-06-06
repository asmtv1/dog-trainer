// src/lib/actions/getPublicProfile.ts
"use server";

import { prisma } from "@/lib/prisma";

/**
 * Возвращает публичные данные профиля (bio + дипломы) по username
 * – именно то, что вы хотите показать любому посетителю страницы.
 *
 * @param username уникальный username пользователя в базе
 */
export async function getPublicProfile(username: string) {
  if (!username) throw new Error("username is required");

  return prisma.user.findUnique({
    where: { username },
    select: {
      username: true,

      // блок "О себе"
      profile: {
        select: {
          fullName: true,
          birthDate: true,
          about: true,
          telegram: true,
          instagram: true,
          website: true,
          avatarUrl: true,
        },
      },

      // дипломы / сертификаты
      diplomas: {
        orderBy: { issuedAt: "desc" },
        select: {
          id: true,
          title: true,
          issuedBy: true,
          issuedAt: true,
          url: true,
        },
      },

      // питомцы
      pets: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          type: true,
          breed: true,
          birthDate: true,
          heightCm: true,
          weightKg: true,
          photoUrl: true,
          notes: true,
          ownerId: true,
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
      },
    },
  });
}
