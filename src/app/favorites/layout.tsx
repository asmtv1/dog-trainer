// src/app/trainings/layout.tsx
import Header from "@/components/Header/Header";
import styles from "./layout.module.css";

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
