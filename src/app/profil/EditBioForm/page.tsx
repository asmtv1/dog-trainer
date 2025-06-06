"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./EditBioForm.module.css";
import { updateUserProfile } from "@/lib/actions/updateUserProfile";
import { useSearchParams } from "next/navigation";
import { getUserProfile } from "@/lib/actions/getUserProfile";

interface BioFormData {
  fullName: string;
  birthDate: string;
  about: string;
  telegram: string;
  instagram: string;
  website: string;
  userId: string; // добавлено
}

function mapProfileToForm(profile: any): Omit<BioFormData, "userId"> {
  return {
    fullName: profile.fullName || "",
    birthDate: profile.birthDate
      ? profile.birthDate.toISOString().split("T")[0]
      : "",
    about: profile.about || "",
    telegram: profile.telegram || "",
    instagram: profile.instagram || "",
    website: profile.website || "",
  };
}

export default function EditBioForm() {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BioFormData>();

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      if (!userId) return;
      try {
        const profile = await getUserProfile(userId);
        if (profile) {
          reset({ ...mapProfileToForm(profile), userId });
        }
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) {
      setValue("userId", userId);
      fetchProfile();
    }
  }, [userId, reset, setValue]);

  return (
    <div>
      <h1>Редактировать «О себе»</h1>

      <form
        onSubmit={handleSubmit(async (data) => {
          await updateUserProfile(data);
          reset(data);
          window.history.back();
          setTimeout(() => {
            window.location.reload();
          }, 100);
        })}
        className={styles.form}
      >
        <div className={styles.form_control}>
          <label htmlFor="fullName">Имя и фамилия</label>
          <input
            id="fullName"
            type="text"
            placeholder="Имя и фамилия"
            {...register("fullName", {
              pattern: {
                value: /^[А-Яа-яЁё\s]+$/,
                message: "Только русские буквы",
              },
              maxLength: {
                value: 60,
                message: "Не более 60 символов",
              },
            })}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor="birthDate">Дата рождения</label>
          <input id="birthDate" type="date" {...register("birthDate")} />
        </div>

        <div className={styles.form_control}>
          <label htmlFor="about">Заметки о себе</label>
          <textarea
            id="about"
            rows={4}
            placeholder="О себе"
            {...register("about", {
              maxLength: {
                value: 300,
                message: "Не более 300 символов",
              },
            })}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor="telegram">Telegram для связи</label>
          <input
            id="telegram"
            type="text"
            placeholder="Telegram username"
            {...register("telegram", {
              maxLength: {
                value: 50,
                message: "Не более 50 символов",
              },
            })}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor="instagram">Ваш Instagram</label>
          <input
            id="instagram"
            type="text"
            placeholder="Instagram username"
            {...register("instagram", {
              maxLength: {
                value: 50,
                message: "Не более 50 символов",
              },
            })}
          />
        </div>

        <div className={styles.form_control}>
          <label htmlFor="website">YouTube или сайт</label>
          <input
            id="website"
            type="url"
            placeholder="Website URL"
            {...register("website", {
              maxLength: {
                value: 50,
                message: "Не более 50 символов",
              },
            })}
          />
        </div>

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
