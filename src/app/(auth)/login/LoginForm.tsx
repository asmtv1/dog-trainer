"use client";

import { useForm } from "react-hook-form";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { FormInput } from "@/components/ui/FormInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { checkUserConfirmed } from "@/lib/auth/checkUserConfirmed";
import { getUserPhoneByUsername } from "@/lib/auth/getUserPhoneByUsername";
import { useState } from "react";

type FormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const [caughtError, setCaughtError] = useState<Error | null>(null);

  if (caughtError) {
    throw caughtError;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await signIn("credentials", {
        username: data.username.toLowerCase().trim(),
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        alert("❌ Неверное имя пользователя или пароль");
      } else if (res?.ok) {
        const phone = await getUserPhoneByUsername(data.username);

        if (!phone) return;

        const isConfirmed = await checkUserConfirmed(phone);

        if (isConfirmed) {
          router.push("/courses");
        } else {
          router.push(`/confirm?phone=${encodeURIComponent(phone)}`);
        }
      }
    } catch (error) {
      setCaughtError(error as Error);
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
    </>
  );
}
