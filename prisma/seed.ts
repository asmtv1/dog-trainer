// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  /* 1. Курсы -------------------------------------------------------------- */
  await prisma.course.createMany({
    data: [
      {
        name: "Тренировки дома",
        type: "home", // ActivityType
        description: "Как тренировать хвостика дома",
        duration: "2 недели",
        logoImg: "/course-logo.jpg",
      },
      {
        name: "Тренировки на улице",
        type: "street",
        description: "Как тренировать хвостика на улице",
        duration: "2 недели",
        logoImg: "/course-logo.jpg",
      },
      {
        name: "Щенок на карантине",
        type: "puppy",
        description: "Что делать, пока он маленький",
        duration: "1 месяц",
        logoImg: "/course-logo.jpg",
      },
      {
        name: "Авторский курс",
        type: "authors",
        description: "Супер-методика by Буй с Бугра",
        duration: "много лет",
        logoImg: "/course-logo.jpg",
      },
    ],
    skipDuplicates: true,
  });

  /* 2. Дни + шаги для курса «home» --------------------------------------- */
  await prisma.trainingDay.create({
    data: {
      title: "День 1",
      dayNumber: 1, // поле переименовано
      type: "home",
      courseId: 1,
      steps: {
        create: [
          { title: "Рядом", durationSec: 12, description: "" },
          { title: "Игра", durationSec: 6, description: "" },
          { title: "Повтор", durationSec: 30, description: "" },
        ],
      },
    },
  });

  await prisma.trainingDay.create({
    data: {
      title: "День 2",
      dayNumber: 2,
      type: "home",
      courseId: 1,
      steps: {
        create: [
          { title: "Команды", durationSec: 60, description: "" },
          { title: "Прогулка", durationSec: 60, description: "" },
          { title: "Игра", durationSec: 60, description: "" },
        ],
      },
    },
  });

  /* 3. Пример для курса «street» ----------------------------------------- */
  await prisma.trainingDay.create({
    data: {
      title: "День 1",
      dayNumber: 1,
      type: "street",
      courseId: 2,
      steps: {
        create: [{ title: "Упражнение A", durationSec: 600, description: "" }],
      },
    },
  });

  /* …добавляйте остальные дни тем же образом… */
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) =>
    prisma.$disconnect().finally(() => {
      throw e;
    })
  );
