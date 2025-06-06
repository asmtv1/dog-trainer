import { CourseCard } from "@/components/CourseCard/CourseCard";
import styles from "./courses.module.css";
import { getCoursesWithProgress } from "@/lib/actions/getCourses";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // путь может отличаться в зависимости от структуры проекта

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id ?? null;

  const { data: courses = [], error } = await getCoursesWithProgress(id);
  console.log(courses, "курсы");
  if (error) {
    return (
      <div className={styles.error} aria-live="assertive">
        {error}
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Доступные курсы</h1>
      <ul className={styles.list}>
        {courses.length === 0 ? (
          <p>Курсы не найдены</p>
        ) : (
          courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))
        )}
      </ul>
    </main>
  );
}
