// src/app/login/page.tsx
import LoginForm from "./LoginForm";
import styles from "./login.module.css";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <Image className={styles.logo} src="/logo.png" alt="Logo" />
      <h1>Авторизация</h1>
      <LoginForm />
    </main>
  );
}
