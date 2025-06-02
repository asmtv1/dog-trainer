import { Course as CourseType } from "@/types/course";
import { Course } from "./course/page";
import styles from "./courses.module.css";
import { getCoursesWithProgress } from "@/lib/actions/getCourses";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // путь может отличаться в зависимости от структуры проекта

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id ?? null;

  const { data: courses = [], error } = await getCoursesWithProgress(id);

  if (error) {
    return (
      <div className={styles.error} aria-live="assertive">
        {error}
      </div>
    );
  }
  console.log(courses, "всё сначала блять");
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Доступные курсы</h1>
      <ul className={styles.list}>
        {courses.length === 0 ? (
          <p>Курсы не найдены</p>
        ) : (
          courses.map((course) => (
            <Course
              key={course.id}
              userStatus={course.userStatus}
              name={course.name}
              type={course.type}
              description={course.description}
              duration={course.duration}
              logoImg={course.logoImg}
              startedAt={course.startedAt}
              completedAt={course.completedAt}
            />
          ))
        )}
      </ul>
    </main>
  );
}
