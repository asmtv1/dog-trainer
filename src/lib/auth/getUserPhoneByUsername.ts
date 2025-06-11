// src/lib/actions/getUserPhoneByUsername.ts
"use server";

import { prisma } from "@/lib/db/prisma";

export async function getUserPhoneByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase().trim() },
    select: { phone: true },
  });

  return user?.phone ?? null;
}
