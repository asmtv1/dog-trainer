"use client";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import styles from "./register.module.css";
import { registerUser } from "@/lib/actions/registerUser";
import { FormInput } from "@/components/ui/FormInput";
import { PasswordInput } from "@/components/ui/PasswordInput";

type FormData = {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const result = await registerUser(
        data.name.toLowerCase(),
        data.phone,
        data.password
      );

      if (result?.error) {
        if (result.error.includes("телефон")) {
          setError("phone", { message: result.error });
        } else {
          alert(result.error);
        }
      } else {
        alert("✅ Пользователь создан");
        window.location.href = "/login";
      }
    });
  };

  return (
    <main className={styles.container}>
      <img className={styles.logo} src="/logo.png" alt="Logo" />
      <h1>Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          className={styles.input}
          type="text"
          placeholder="Имя пользователя"
          autoComplete="username"
          {...register("name", {
            required: "Введите имя",
            minLength: { value: 4, message: "Минимум 4 символа" },
            maxLength: { value: 10, message: "Максимум 10 символов" },
            pattern: {
              value: /^[A-Za-z0-9_]+$/,
              message: "Только английские буквы, цифры или _",
            },
          })}
          error={errors.name?.message}
        />

        <FormInput
          className={styles.input}
          type="tel"
          placeholder="+7-(123)-456-78-99"
          {...register("phone", {
            required: "Введите номер телефона",
          })}
          error={errors.phone?.message}
        />

        <PasswordInput
          className={styles.input}
          placeholder="Пароль"
          autoComplete="new-password"
          {...register("password", {
            required: "Введите пароль",
            minLength: { value: 6, message: "Минимум 6 символов" },
            maxLength: { value: 12, message: "Максимум 12 символов" },
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message: "Только английские буквы или цифры",
            },
          })}
          error={errors.password?.message}
        />

        <PasswordInput
          className={styles.input}
          placeholder="Повторите пароль"
          {...register("confirmPassword", {
            required: "Повторите пароль",
            validate: (value) =>
              value === getValues("password") || "Пароли не совпадают",
          })}
          error={errors.confirmPassword?.message}
        />

        <button className={styles.button} type="submit" disabled={isPending}>
          {isPending ? "Создание..." : "Зарегистрироваться"}
        </button>
      </form>
    </main>
  );
}
