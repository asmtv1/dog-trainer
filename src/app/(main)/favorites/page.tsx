import { getFavoritesCourses } from "@/lib/actions/getFavoritesCourses";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "./favorites.module.css";
import { FavoritesList } from "@/components/CourseCard/FavoritesCourseList";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id ?? null;

  const { data: courses = [], error } = await getFavoritesCourses(id);

  if (error) {
    return (
      <div className={styles.error} aria-live="assertive">
        {error}
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Избранные курсы</h1>

      <ul className={styles.list}>
        <FavoritesList initialCourses={courses} />
      </ul>
    </main>
  );
}
