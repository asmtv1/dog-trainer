"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import styles from "./register.module.css";
import { registerUser } from "@/lib/actions/registerUser";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      }
    });
  };

  return (
    <main className={styles.container}>
      <img className={styles.logo} src="/logo.png" alt="Logo" />
      <h1>Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
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
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          className={styles.input}
          type="tel"
          placeholder="+7-(123)-456-78-99"
          {...register("phone", {
            required: "Введите номер телефона",
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}

        <div className={styles.passwordField}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
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

        <div className={styles.passwordField}>
          <input
            className={styles.input}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Повторите пароль"
            {...register("confirmPassword", {
              required: "Повторите пароль",
              validate: (value) =>
                value === getValues("password") || "Пароли не совпадают",
            })}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button className={styles.button} type="submit" disabled={isPending}>
          {isPending ? "Создание..." : "Зарегистрироваться"}
        </button>
      </form>
    </main>
  );
}
