import { getUserWithTrainings } from "@/lib/actions/getUserWithTrainings";
import styles from "./profil.module.css";
import MyCourses from "./MyCourses/page"; // Убедись, что путь корректный
import { Key } from "react";

type Course = {
  courseId: Key | null | undefined;
  courseName: string;
  completedAt: Date | null;
  startedAt: Date | null;
  completedDays: number[];
};

export default async function ProfilPage() {
  const data = await getUserWithTrainings();
  console.log(data);

  return (
    <main className={styles.container}>
      <h2>Профиль {data?.username}</h2>
      <p>Имя</p>
      <p>номер телефона: {data?.phone}</p>
      <button>Изменить данные</button>
      <div>
        <h3>Список ваших курсов:</h3>
        <ul>
          {data?.courses.map((curs: Course) => (
            <MyCourses
              key={curs.courseId}
              startedAt={curs.startedAt}
              courseName={curs.courseName}
              completedAt={curs.completedAt}
              completedDays={curs.completedDays}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
