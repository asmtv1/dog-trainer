"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import styles from "./login.module.css";
import { FormInput } from "@/components/ui/FormInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import Link from "next/link";

type FormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });

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
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          className={styles.input}
          type="text"
          placeholder="Имя пользователя"
          autoComplete="username"
          {...register("username", {
            required: "Введите имя пользователя",
          })}
          error={errors.username?.message}
        />

        <PasswordInput
          className={styles.input}
          placeholder="Пароль"
          autoComplete="current-password"
          {...register("password", {
            required: "Введите пароль",
            minLength: { value: 6, message: "Минимум 6 символов" },
          })}
          error={errors.password?.message}
        />

        <button className={styles.button} type="submit">
          Войти
        </button>
      </form>
      <Link href="/passwordReset" style={{ marginTop: "1rem" }}>
        <button>Забыли пароль?</button>
      </Link>
    </>
  );
}
