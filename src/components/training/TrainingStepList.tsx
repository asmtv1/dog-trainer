import { AccordionStep } from "./AccordionStep";
import type { TrainingStep } from "@/types/training";

interface Props {
  steps: TrainingStep[];
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
  runningIndex: number | null;
  onRun: (stepIndex: number) => void;
  onReset: (stepIndex: number) => void;
  handleFirstStart: () => void;
  courseType: string;
  day: number;
  styles: { [key: string]: string };
}

export function TrainingStepList({
  steps,
  openIndex,
  runningIndex,
  styles,
  setOpenIndex,
  handleFirstStart,
  onRun,
  onReset,
  courseType,
  day,
}: Props) {
  return (
    <div>
      {steps.map((step, index) => (
        <AccordionStep
          key={step.id}
          step={step}
          stepIndex={index}
          courseType={courseType}
          day={day}
          isOpen={openIndex === index}
          isRunning={runningIndex === index}
          onClick={() => setOpenIndex(index)}
          onRun={() => onRun(index)}
          onReset={onReset}
          handleFirstStart={handleFirstStart}
          styles={styles}
        />
      ))}
    </div>
  );
}
