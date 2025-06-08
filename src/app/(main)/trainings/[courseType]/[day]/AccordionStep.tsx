"use client";

import { useEffect, useRef, useState } from "react";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import LoopIcon from "@mui/icons-material/Loop";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { TrainingStatus } from "@prisma/client";
import { updateStepStatusServerAction } from "@/lib/actions/training";
import { formatTime } from "@/utils/date";

type Props = {
  title: string;
  description?: string;
  durationSec: number;
  status: TrainingStatus;
  index: number;
  isOpen: boolean;
  dayId: number;
  courseType: string;
  styles: { [key: string]: string };
  isRunning: boolean;
  isAnyRunning: boolean;
  handleFirstStart: () => void;
  onToggle: () => void;
  onStart: (index: number) => void;
  onReset: (index: number) => void;
};

export default function AccordionStep({
  title,
  description,
  durationSec,
  status,
  index,
  isOpen,
  dayId,
  courseType,
  styles,
  isRunning,
  handleFirstStart,
  onToggle,
  onStart,
  onReset,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [isFinished, setIsFinished] = useState(
    status === TrainingStatus.COMPLETED
  );
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Обработка тикающего таймера
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Срабатывание окончания таймера
  useEffect(() => {
    let isMounted = true;

    if (timeLeft === 0 && isRunning) {
      handleTimerEnd(isMounted);
    }

    return () => {
      isMounted = false;
    };
  }, [timeLeft, isRunning]);

  const handleTimerEnd = async (isMounted: boolean) => {
    onReset(index);
    setIsFinished(true);
    audioRef.current?.play();

    if (isMounted) {
      await updateStepStatusServerAction(
        courseType,
        dayId,
        index,
        TrainingStatus.COMPLETED
      );
    }
  };

  const handleStartPause = () => {
    if (!isRunning) {
      onStart(index);
      if (!hasStartedOnce) {
        setHasStartedOnce(true);
        handleFirstStart();
      }
    } else {
      onReset(index); // пауза
    }
  };

  const handleReset = () => {
    onReset(index); // остановка
    setTimeLeft(durationSec);
    setIsFinished(false);

    // ❗ возможно нужен debounce
    updateStepStatusServerAction(
      courseType,
      dayId,
      index,
      TrainingStatus.NOT_STARTED
    );
  };

  return (
    <div className={styles.accordionItem}>
      <button
        className={`${styles.accordionHeader} ${
          isFinished ? styles.finished : ""
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`step-content-${index}`}
        id={`step-header-${index}`}
      >
        {title} — {formatTime(durationSec)} минут
      </button>

      {isOpen && (
        <div
          className={styles.accordionContent}
          role="region"
          id={`step-content-${index}`}
          aria-labelledby={`step-header-${index}`}
        >
          <p>{description ?? <em>Описание отсутствует</em>}</p>

          <div className={styles.timer}>
            <p>
              <AccessAlarmsIcon
                style={{ verticalAlign: "middle", marginRight: "4px" }}
              />
              {formatTime(timeLeft)}
            </p>
            <button onClick={handleStartPause}>
              {isRunning ? <PauseCircleIcon /> : <PlayCircleFilledIcon />}
            </button>
            <button onClick={handleReset}>
              <LoopIcon />
            </button>
          </div>
        </div>
      )}

      <audio ref={audioRef} src="/music/success.mp3" preload="auto" />
    </div>
  );
}
