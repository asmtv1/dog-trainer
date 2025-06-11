import { PrismaClient } from "@prisma/client";

// в dev-контексте кешируем инстанс в globalThis, чтобы при хот-релоаде не плодить подключения
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
