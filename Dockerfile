# --- Stage 1: сборка ---
FROM node:18-alpine AS builder
WORKDIR /app

# 1) Устанавливаем зависимости и генерируем Prisma-клиент
COPY package.json package-lock.json tsconfig.json next.config.ts ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate

# 2) Копируем исходники и билдим Next.js
COPY src ./src
COPY public ./public
RUN npm run build

# --- Stage 2: runtime ---
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 1) Только prod-зависимости
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# 2) Копируем готовый билд + публичные файлы + Prisma-схему (если нужен клиент в runtime)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["npx", "next", "start"]