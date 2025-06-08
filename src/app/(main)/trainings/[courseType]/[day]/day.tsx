"use client";

import { useState } from "react";
import styles from "./day.module.css";
import AccordionStep from "./AccordionStep";
import type { TrainingDetail } from "@/types/training";
import { assignCoursesToUser } from "@/lib/actions/userCourses";

export default function Day({ training }: { training: TrainingDetail }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [runningIndex, setRunningIndex] = useState<number | null>(null);
  const [courseAssigned, setCourseAssigned] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);

  const handleFirstStart = async () => {
    if (courseAssigned || isAssigning) return;

    setIsAssigning(true);
    try {
      const result = await assignCoursesToUser(training.courseId);
      if (result.success) setCourseAssigned(true);
    } catch (e) {
      console.error("Ошибка при назначении курса:", e);
    } finally {
      setIsAssigning(false);
    }
  };
  const toggleStep = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  console.log(training, "длит");

  const duration = Math.ceil(
    training.steps.reduce((acum, item) => acum + item.durationSec, 0) / 60
  );

  return (
    <main className={styles.main}>
      <h1>{training.title}</h1>
      <h2>Что вас ждёт в этом дне: </h2>
      <p>{training.description}</p>
      <p>
        <strong>Длительность:</strong> {duration} минут
      </p>
      <h2>План:</h2>
      <div>
        {training.steps.map((step, index) => (
          <AccordionStep
            key={step.id}
            index={index}
            durationSec={step.durationSec}
            courseType={training.type}
            status={step.status}
            title={step.title}
            dayId={training.day}
            handleFirstStart={handleFirstStart}
            isOpen={openIndex === index}
            onToggle={() => toggleStep(index)}
            styles={styles}
            isRunning={runningIndex === index}
            isAnyRunning={runningIndex !== null}
            onStart={(i) => setRunningIndex(i)}
            onReset={(i) => {
              if (runningIndex === i) setRunningIndex(null);
            }}
          />
        ))}
      </div>
    </main>
  );
}
