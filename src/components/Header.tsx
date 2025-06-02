"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import HomeIcon from "@mui/icons-material/Home";

import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const userName = session?.user?.username;

  return (
    <header className={styles.header}>
      <button
        className={styles.backButton}
        onClick={() => window.history.back()}
      >
        ← Назад
      </button>

      <Link href={`/courses`}>
        <HomeIcon sx={{ color: "black" }} />
      </Link>
      <Link
        className={styles.profil}
        href={{ pathname: "/profil", query: { username: userName ?? "" } }}
      >
        <div className={styles.userName}>{userName}</div>
        <div className={styles.avatar}>
          <img src="/avatar.svg" alt="Avatar" />
        </div>
      </Link>
    </header>
  );
}
