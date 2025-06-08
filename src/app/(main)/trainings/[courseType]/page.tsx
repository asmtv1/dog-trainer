import Link from "next/link";
import styles from "./trainings.module.css";
import { getTrainingDays } from "@/lib/actions/getTrainingDays";
import type { CourseType } from "@/types/training";
import { completeUserCourse } from "@/lib/actions/userCourses";

interface TrainingsPageProps {
  params: {
    courseType: CourseType;
  };
}

export default async function TrainingsPage({ params }: TrainingsPageProps) {
  const { courseType } = await params;
  const { trainingDays, courseDescription, error } = await getTrainingDays(
    courseType
  );

  const courseId = trainingDays?.[0]?.courseId;
  const allDaysCompleted = trainingDays?.every(
    (day) => day.userStatus === "COMPLETED"
  );

  if (allDaysCompleted) {
    if (courseId) {
      await completeUserCourse(courseId);
    }
  }

  if (error) {
    return (
      <div className={styles.error} aria-live="assertive">
        {error}
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.courseDescription}>
        <h1 className={styles.heading}>О курсе: </h1>
        <p>{courseDescription}</p>
      </div>

      <p className={styles.plan}>План занятий: </p>
      <ul className={styles.list}>
        {trainingDays?.map((day) => (
          <li
            key={day.id}
            className={`${styles.item} ${
              day.userStatus === "IN_PROGRESS"
                ? styles.inprogress
                : day.userStatus === "COMPLETED"
                ? styles.completed
                : ""
            }`}
          >
            <Link
              href={`/trainings/${courseType}/${day.day}`}
              className={styles.link}
            >
              <span className={styles.day}>{day.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
