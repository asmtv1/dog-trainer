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
  const { trainingDays, error } = await getTrainingDays(courseType);
  const courseId = trainingDays?.[0]?.courseId;
  const allDaysCompleted = trainingDays?.every(
    (day) => day.userStatus === "COMPLETED"
  );
  console.log(trainingDays, "тут блять что");
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
      <h1 className={styles.heading}>План тренировок: {courseType}</h1>
      <ul className={styles.list}>
        {trainingDays?.map((day) => (
          <li
            key={day.id}
            className={`${styles.item} ${
              day.userStatus === "COMPLETED" ? styles.completed : ""
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
