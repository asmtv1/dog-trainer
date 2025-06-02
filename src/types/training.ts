// app/types/training.ts

import type { TrainingStatus, TrainingType } from "@prisma/client";

// Шаг тренировки для пользователя
export type TrainingStep = {
  id: string;
  title: string;
  durationSec: number;
  status: TrainingStatus; // Статус прохождения шага этим пользователем
  description?: string; // Если такое поле есть в шаге
};

// Детальная информация о тренировочном дне с прогрессом пользователя
export type TrainingDetail = {
  id: number; // id TrainingDay
  day: number;
  title: string;
  type: TrainingType;
  courseId: number;
  description?: string; // Если есть у дня или у курса
  duration?: string; // Если есть у дня или у курса
  userStatus: TrainingStatus; // Статус всего дня для пользователя
  steps: TrainingStep[];
};

// Краткая информация о дне (без шагов)
export type TrainingDayShort = {
  courseId?: number;
  id: number;
  day: number;
  title: string;
  type: TrainingType;
  userStatus: string;
  userTrainings: any | { status: string }[];
};

export type CourseType = TrainingType; // Если хочешь поддерживать string-literal, можно оставить старое определение
