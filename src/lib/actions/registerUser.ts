"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export async function registerUser(
  username: string,
  phone: string,
  password: string
) {
  const normalizedUsername = username.toLowerCase().trim();

  const phoneNumber = parsePhoneNumberFromString(phone, "RU");
  if (!phoneNumber || !phoneNumber.isValid()) {
    return { error: "Неверный номер телефона" };
  }

  const formattedPhone = phoneNumber.format("E.164");

  const existingUser = await prisma.user.findUnique({
    where: { phone: formattedPhone },
  });

  if (existingUser) {
    return { error: "Пользователь с таким телефоном уже существует" };
  }

  const existingByUsername = await prisma.user.findUnique({
    where: { username: normalizedUsername },
  });

  if (existingByUsername) {
    return { error: "Пользователь с таким именем уже существует" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username: normalizedUsername,
      phone: formattedPhone,
      password: hashedPassword,
      profile: {
        create: {},
      },
    },
  });

  return { success: true };
}
