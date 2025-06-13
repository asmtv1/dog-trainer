import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <Image
        className={styles.logo}
        src="/logo.png"
        alt="Logo"
        width={400}
        height={400}
        priority
      />

      <p className={styles.subtitle}>
        Умные прогулки с собакой: тренировки по шагам, отдых и обучение — всё в
        одном.
      </p>
      <Link href="/register" prefetch={false}>
        <button className={styles.button}>Зарегистрироваться</button>
      </Link>
      <Link href="/login">
        <button className={styles.button}>Авторизоваться</button>
      </Link>
    </main>
  );
}
