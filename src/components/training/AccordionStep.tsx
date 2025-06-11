"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TrainingStatus } from "@prisma/client";
import { updateStepStatusServerAction } from "@/lib/training/updateUserStepStatus";
import { formatTime } from "@/utils/date";
import { declOfNum } from "@/utils/pluralize";
import type { TrainingStep } from "@/types/training";

interface AccordionStepProps {
  step: TrainingStep;
  stepIndex: number;
  courseType: string;
  day: number;
  isOpen: boolean;
  isRunning: boolean;
  onClick: () => void;
  onRun: (index: number) => void;
  onReset: (index: number) => void;
  handleFirstStart: () => void;
  styles: { [key: string]: string };
}

export default function AccordionStep({
  step,
  stepIndex,
  courseType,
  day,
  isOpen,
  isRunning,
  onClick,
  onRun,
  onReset,
  handleFirstStart,
  styles,
}: AccordionStepProps) {
  const [timeLeft, setTimeLeft] = useState(step.durationSec);
  const [isFinished, setIsFinished] = useState(
    step.status === TrainingStatus.COMPLETED
  );
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ⏱ запуск таймера
  useEffect(() => {
    if (isRunning && !isPaused && !isFinished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => Math.max(t - 1, 0));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning, isPaused, isFinished]);

  // ✅ шаг завершён
  useEffect(() => {
    if (isRunning && !isPaused && timeLeft === 0 && !isFinished) {
      finishStep();
    }
  }, [timeLeft, isRunning, isPaused, isFinished]);

  const finishStep = useCallback(async () => {
    clearInterval(intervalRef.current!);
    setIsFinished(true);
    onReset(stepIndex);
    audioRef.current?.play();
    await updateStepStatusServerAction(
      courseType,
      day,
      stepIndex,
      TrainingStatus.COMPLETED
    );
  }, [courseType, day, stepIndex, onReset]);

  const handleStart = useCallback(async () => {
    if (!isRunning && (!isFinished || timeLeft === step.durationSec)) {
      onRun(stepIndex);
      setIsPaused(false);
      if (stepIndex === 0) handleFirstStart(); // вызываем ДО запроса
      await updateStepStatusServerAction(
        courseType,
        day,
        stepIndex,
        TrainingStatus.IN_PROGRESS
      );
    }
  }, [
    isRunning,
    isFinished,
    timeLeft,
    step.durationSec,
    courseType,
    day,
    stepIndex,
    onRun,
    handleFirstStart,
  ]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
    clearInterval(intervalRef.current!);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleReset = useCallback(async () => {
    clearInterval(intervalRef.current!);
    setTimeLeft(step.durationSec);
    setIsFinished(false);
    setIsPaused(false);
    onReset(stepIndex);
    await updateStepStatusServerAction(
      courseType,
      day,
      stepIndex,
      TrainingStatus.NOT_STARTED
    );
  }, [step.durationSec, stepIndex, courseType, day, onReset]);

  const renderActions = () => {
    if (isRunning && !isFinished) {
      return (
        <>
          <button
            onClick={isPaused ? handleResume : handlePause}
            className={styles.button}
          >
            {isPaused ? "▶️ Продолжить" : "⏸ Пауза"}
          </button>
          <button onClick={handleReset} className={styles.button}>
            🔄 Сброс
          </button>
        </>
      );
    }

    if (!isRunning && !isFinished) {
      return (
        <button onClick={handleStart} className={styles.button}>
          ▶️ Начать
        </button>
      );
    }

    if (isFinished) {
      return (
        <>
          <p className={styles.finished}>Шаг завершён</p>
          <button onClick={handleReset} className={styles.button}>
            🔁 Пройти заново
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <div className={styles.accordionItem}>
      <div
        className={styles.accordionHeader}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <h3>
          {step.title} {isRunning ? "⏱" : isFinished ? "✅" : ""}
        </h3>
      </div>
      {isOpen && (
        <div className={styles.accordionContent}>
          <p>Описание шага: {step.description}</p>
          <p>
            Длительность: {formatTime(step.durationSec)}{" "}
            {declOfNum(Math.round(step.durationSec / 60), [
              "минута",
              "минуты",
              "минут",
            ])}
          </p>
          {isRunning && !isFinished && <p>Осталось: {formatTime(timeLeft)}</p>}
          <div className={styles.actions}>{renderActions()}</div>
          <audio ref={audioRef} src="/music/success.mp3" preload="auto" />
        </div>
      )}
    </div>
  );
}
