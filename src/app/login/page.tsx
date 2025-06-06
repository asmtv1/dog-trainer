// src/app/login/page.tsx
import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <img className={styles.logo} src="/logo.png" alt="Logo" />
      <h1>Авторизация</h1>
      <LoginForm />
    </main>
  );
}
