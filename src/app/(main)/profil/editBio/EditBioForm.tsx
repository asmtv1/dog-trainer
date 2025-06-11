"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./EditBioForm.module.css";
import { updateUserProfile } from "@/lib/user/updateUserProfile";
import { getUserProfile } from "@/lib/user/getUserProfile";
import { BioFormData } from "@/types/user";
import { FormField } from "@/components/ui/FormField";

function mapProfileToForm(profile: any): Omit<BioFormData, "userId"> {
  return {
    fullName: profile.fullName || "",
    birthDate: profile.birthDate
      ? new Date(profile.birthDate).toISOString().split("T")[0]
      : "",
    about: profile.about || "",
    telegram: profile.telegram || "",
    instagram: profile.instagram || "",
    website: profile.website || "",
  };
}

export default function EditBioForm() {
  const [caughtError, setCaughtError] = useState<Error | null>(null);
  if (caughtError) throw caughtError;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BioFormData>();

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const profile = await getUserProfile();
      if (profile) reset(mapProfileToForm(profile));
    } catch (error) {
      setCaughtError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const onSubmit = async (data: BioFormData) => {
    try {
      await updateUserProfile(data);
      reset(data);
      window.history.back();
      setTimeout(() => window.location.reload(), 100);
    } catch (error) {
      setCaughtError(error as Error);
    }
  };

  if (isLoading) return <p>Загрузка…</p>;

  return (
    <div>
      <h1>Редактировать «О себе»</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormField
          id="fullName"
          label="Имя и фамилия"
          type="text"
          placeholder="Имя и фамилия"
          register={register("fullName", {
            pattern: {
              value: /^[А-Яа-яЁё\s]+$/,
              message: "Только русские буквы",
            },
            maxLength: { value: 60, message: "Не более 60 символов" },
          })}
          error={errors.fullName?.message}
        />

        <FormField
          id="birthDate"
          label="Дата рождения"
          type="date"
          register={register("birthDate")}
        />

        <FormField
          id="about"
          label="Заметки о себе"
          as="textarea"
          placeholder="О себе"
          register={register("about", {
            maxLength: { value: 300, message: "Не более 300 символов" },
          })}
          error={errors.about?.message}
        />

        <FormField
          id="telegram"
          label="Telegram для связи"
          placeholder="Telegram username"
          register={register("telegram", {
            maxLength: { value: 50, message: "Не более 50 символов" },
          })}
          error={errors.telegram?.message}
        />

        <FormField
          id="instagram"
          label="Ваш Instagram"
          placeholder="Instagram username"
          register={register("instagram", {
            maxLength: { value: 50, message: "Не более 50 символов" },
          })}
          error={errors.instagram?.message}
        />

        <FormField
          id="website"
          label="YouTube или сайт"
          type="url"
          placeholder="Website URL"
          register={register("website", {
            maxLength: { value: 50, message: "Не более 50 символов" },
          })}
          error={errors.website?.message}
        />

        <div className={styles.form_button}>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={() => router.back()}>
            Вернуться без сохранения
          </button>
        </div>
      </form>
    </div>
  );
}
