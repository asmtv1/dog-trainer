// src/components/training/Day.tsx
"use client";

import { useState } from "react";
import styles from "./day.module.css";
import { TrainingOverview } from "./TrainingOverview";
import { TrainingStepList } from "./TrainingStepList";
import { assignCoursesToUser } from "@/lib/user/userCourses";
import type { TrainingDetail } from "@/types/training";

interface DayProps {
  training: TrainingDetail;
}

export default function Day({ training }: DayProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [runningIndex, setRunningIndex] = useState<number | null>(null);
  const [courseAssigned, setCourseAssigned] = useState(false);
  const [assignError, setAssignError] = useState<Error | null>(null);
  async function handleStepStart(stepIndex: number) {
    setRunningIndex(stepIndex);
  }

  function handleReset(index: number) {
    if (runningIndex === index) {
      setRunningIndex(null);
    }
  }

  async function handleFirstStart() {
    if (courseAssigned) return;
    try {
      const result = await assignCoursesToUser(training.courseId);
      if (result.success) {
        setCourseAssigned(true);
      }
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error("Unknown error");
      setAssignError(errorObj);
    }
  }

  return (
    <main className={styles.main}>
      <header>
        <h1>{training.title}</h1>
      </header>

      {assignError && (
        <div className={styles.errorBox}>
          <p>Не удалось назначить курс. Пожалуйста, перезагрузите страницу.</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Перезагрузить
          </button>
        </div>
      )}

      <TrainingOverview
        description={training.description}
        duration={training.duration}
        title={""}
      />

      <TrainingStepList
        steps={training.steps}
        openIndex={openIndex}
        setOpenIndex={setOpenIndex}
        runningIndex={runningIndex}
        onRun={handleStepStart}
        onReset={handleReset}
        handleFirstStart={handleFirstStart}
        courseType={training.type}
        day={training.day}
        styles={styles}
      />
    </main>
  );
}
