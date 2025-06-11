"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "@/lib/auth/registerUser";
import { FormInput } from "@/components/ui/FormInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import styles from "./register.module.css";

type FormData = {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });

  const [isPending, setIsPending] = useState(false);
  const [caughtError, setCaughtError] = useState<Error | null>(null);
  if (caughtError) {
    throw caughtError;
  }

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
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
        setIsPending(false);
      } else {
        window.location.href = `/confirm?phone=${encodeURIComponent(data.phone)}`;
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setCaughtError(error as Error);
    }
  };

  return (
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
      <div>Требуется Подтверждение через Telegram</div>

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
  );
}
