// src/app/(auth)/register/page.tsx
import RegisterForm from "@/app/(auth)/register/RegisterForm";
import styles from "./register.module.css";
import Image from "next/image";

export default function RegisterPage() {
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
      <h1>Регистрация</h1>
      <RegisterForm />
    </main>
  );
}
