import { getUserWithTrainings } from "@/lib/actions/getUserWithTrainings";
import styles from "./profil.module.css";
import MyCourses from "./MyCourses/page"; // Убедись, что путь корректный
import Bio from "./Bio/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { getAuthoredCourses } from "@/lib/actions/getAuthoredCourses";
import MyCreatedCourses from "./MyCreatedCourses/page";

export default async function ProfilPage({
  searchParams,
}: {
  searchParams: { username?: string };
}) {
  const { username } = await searchParams;

  if (!username) {
    return notFound();
  }

  const session = await getServerSession(authOptions);
  const currentUsername = session?.user?.username;
  const isOwner = currentUsername === username;

  // Загружаем только для владельца (приватные данные: телефон, прогресс и т.п.)
  const data = isOwner ? await getUserWithTrainings() : null;
  const createdCourses = isOwner ? await getAuthoredCourses() : null;

  return (
    <main className={styles.container}>
      {/* Публичный блок с био */}
      <h2>Профиль {username}</h2>
      <Bio username={username} isOwner={isOwner} />

      {/* Приватные данные и список курсов — только для владельца */}
      {isOwner && data && (
        <>
          <h2>Ваши приватные данные</h2>
          {/* Приватный раздел профиля владельца */}
          <section className={styles.privateSection}>
            <p>Ник: {data.username}</p>
            <p>Номер телефона: {data.phone}</p>
            {isOwner && createdCourses && createdCourses.length > 0 && (
              <>
                <h2>Список созданных курсов:</h2>
                {createdCourses.map((course) => (
                  <MyCreatedCourses key={course.id} course={course} />
                ))}
              </>
            )}
            <div>
              <h3>Список начатых курсов:</h3>
              {data.courses.length === 0 && (
                <div> Вы пока не начали ни один курс</div>
              )}
              <ul>
                {data.courses.map((course) => (
                  <MyCourses
                    key={course.courseId}
                    startedAt={course.startedAt}
                    courseName={course.courseName}
                    completedAt={course.completedAt}
                    completedDays={course.completedDays}
                  />
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
