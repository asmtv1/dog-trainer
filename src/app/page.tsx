import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <img className={styles.logo} src="/logo.png" alt="Logo" />

      <p className={styles.subtitle}>
        Умные прогулки с собакой: тренировки по шагам, отдых и обучение — всё в
        одном.
      </p>
      <Link href="/register">
        <button className={styles.button}>Зарегистрироваться</button>
      </Link>
      <Link href="/login">
        <button className={styles.button}>Авторизоваться</button>
      </Link>
    </main>
  );
}
