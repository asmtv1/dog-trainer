"use client";

import { useEffect, useRef, useState } from "react";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import LoopIcon from "@mui/icons-material/Loop";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { TrainingStatus } from "@prisma/client";
import { updateStepStatusServerAction } from "@/lib/actions/training";

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

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString(); // Без padStart!
  const s = (seconds % 60).toString().padStart(2, "0");
  if (s === "00") {
    return `${m}`;
  }
  return `${m}:${s}`;
}

export default function AccordionStep({
  durationSec,
  status,
  title,
  index,
  isOpen,
  courseType,
  dayId,
  isRunning,
  handleFirstStart,
  onToggle,
  onStart,
  onReset,

  styles,
  description,
}: Props) {
  const initialSeconds = durationSec;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isFinished, setIsFinished] = useState(
    status === TrainingStatus.COMPLETED
  );
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Таймер
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      onReset(index);
      setIsFinished(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
      updateStepStatusServerAction(
        courseType,
        dayId,
        index,
        TrainingStatus.COMPLETED
      );
    }
  }, [timeLeft, isRunning, index, dayId, onReset]);

  const handleStartPause = () => {
    if (!isRunning) {
      onStart(index);
      if (!hasStartedOnce) {
        setHasStartedOnce(true);
        handleFirstStart();
        // 👈 Вызов только один раз
      }
    } else {
      onReset(index); // пауза
    }
  };

  const handleReset = () => {
    onReset(index); // остановка
    setTimeLeft(initialSeconds);
    setIsFinished(false);
    updateStepStatusServerAction(
      courseType,
      dayId,
      index,
      TrainingStatus.NOT_STARTED
    ); //слабое место. нужен дебаунс например
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
