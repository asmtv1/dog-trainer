"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./login.module.css";

type FormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    const res = await signIn("credentials", {
      username: data.username.toLowerCase().trim(),
      password: data.password,
      redirect: false,
      callbackUrl: "/courses",
    });
    if (res?.error) {
      alert("❌ Неверное имя пользователя или пароль");
    } else if (res?.ok) {
      window.location.href = res.url ?? "/courses";
    }
  };

  return (
    <main className={styles.container}>
      <img className={styles.logo} src="/logo.png" alt="Logo" />
      <h1>Авторизация</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          placeholder="Имя пользователя"
          autoComplete="username"
          {...register("username", {
            required: "Введите имя пользователя",
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <div className={styles.passwordField}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            autoComplete="current-password"
            {...register("password", {
              required: "Введите пароль",
              minLength: { value: 6, message: "Минимум 6 символов" },
            })}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}

        <button className={styles.button} type="submit">
          Войти
        </button>
      </form>
    </main>
  );
}
