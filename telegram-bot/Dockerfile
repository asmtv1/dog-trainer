# --- Stage 1: сборка TS ---
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем манифесты и устанавливаем все зависимости (включая dev)
COPY package.json tsconfig.json ./
RUN npm install

# Копируем код бота и компилируем его в папку dist
COPY bot.ts ./
RUN npx tsc --outDir dist

# --- Stage 2: runtime ---
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Копируем только продакшн-зависимости
COPY package.json ./
RUN npm install --omit=dev

# Забираем скомпилированный бот из билд-стадии
COPY --from=builder /app/dist ./dist

# Если у вас есть Prisma-клиент, его тоже нужно сгенерировать/скопировать:
COPY prisma ./prisma
RUN npx prisma generate

# По умолчанию Fly.io запускает CMD
CMD ["node", "dist/bot.js"]