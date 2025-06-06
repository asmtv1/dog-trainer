"use client";

import { useMemo } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useSession } from "next-auth/react";
import React from "react";
import { signOut } from "next-auth/react";

export default React.memo(function Header() {
  const { data: session } = useSession();
  const userName = useMemo(() => session?.user?.username ?? "", [session]);
  const avatarUrl = useMemo(
    () => session?.user?.avatarUrl ?? "/avatar.svg",
    [session]
  );

  return (
    <header className={styles.header}>
      <button
        className={styles.backButton}
        onClick={() => window.history.back()}
      >
        ← Назад
      </button>

      <Link href="/courses">
        <img src="/home.svg" alt="Home" width={24} height={24} />
      </Link>
      <Link href="/favorites/">
        <img src="/bookmarks.svg" alt="Bookmarks" width={24} height={24} />
      </Link>
      <Link
        className={styles.profil}
        href={{ pathname: "/profil", query: { username: userName } }}
      >
        <div className={styles.userName}>{userName || "\u00A0"}</div>
        <div className={styles.avatar}>
          {userName ? (
            <img src={avatarUrl} alt="Avatar" />
          ) : (
            <div
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#ccc",
                borderRadius: "50%",
              }}
            />
          )}
        </div>
      </Link>
      <button onClick={() => signOut()}>
        <img src="/logout.svg" alt="Logout" width={24} height={24} />
      </button>
    </header>
  );
});
