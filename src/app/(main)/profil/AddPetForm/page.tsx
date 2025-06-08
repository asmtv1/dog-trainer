"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { savePet } from "@/lib/actions/savePet";
import router from "next/router";

interface PetFormData {
  id: string;
  ownerId: string;
  name: string;
  type: string;
  breed: string;
  birthDate: string;
  heightCm?: number;
  weightKg?: number;
  photoUrl?: string;
  notes?: string;
}

const petTypes = [
  { label: "Собака", value: "DOG" },
  { label: "Кошка", value: "CAT" },
] as const;

export default function AddPetForm() {
  const searchParams = useSearchParams();
  const ownerId = searchParams.get("userId") || "";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetFormData>({
    mode: "onBlur",
    defaultValues: {
      id: "",
      ownerId,
      name: "",
      type: "",
      breed: "",
      birthDate: "",
      heightCm: undefined,
      weightKg: undefined,
      photoUrl: "",
      notes: "",
    },
  });

  const onSubmit: SubmitHandler<PetFormData> = async (data) => {
    try {
      // Если id пустое, Prisma создаст нового питомца
      await savePet({ ...data, ownerId, id: "" });

      // Возвращаемся назад и затем перезагружаем страницу
      window.history.back();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Ошибка при сохранении нового питомца:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
      <input type="hidden" {...register("id")} value="" />
      <input type="hidden" {...register("ownerId")} value={ownerId} />

      <div>
        <label htmlFor="name">Имя питомца</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Обязательное поле" })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="type">Тип питомца</label>
        <select
          id="type"
          {...register("type", { required: "Обязательное поле" })}
          defaultValue=""
        >
          <option value="" disabled>
            -- выберите тип --
          </option>
          {petTypes.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.type && <p style={{ color: "red" }}>{errors.type.message}</p>}
      </div>

      <div>
        <label htmlFor="breed">Порода</label>
        <input
          id="breed"
          type="text"
          {...register("breed", { required: "Укажите породу" })}
        />
        {errors.breed && <p style={{ color: "red" }}>{errors.breed.message}</p>}
      </div>

      <div>
        <label htmlFor="birthDate">Дата рождения</label>
        <input
          id="birthDate"
          type="date"
          defaultValue=""
          {...register("birthDate", {
            required: "Введите дату рождения",
            validate: (value) => {
              const selected = new Date(value);
              const now = new Date();
              return selected <= now || "Дата рождения не может быть в будущем";
            },
          })}
        />
        {errors.birthDate && (
          <p style={{ color: "red" }}>{errors.birthDate.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="heightCm">Рост (см)</label>
        <input
          id="heightCm"
          type="number"
          step="0.1"
          defaultValue=""
          {...register("heightCm", { valueAsNumber: true })}
        />
      </div>

      <div>
        <label htmlFor="weightKg">Вес (кг)</label>
        <input
          id="weightKg"
          type="number"
          step="0.1"
          defaultValue=""
          {...register("weightKg", { valueAsNumber: true })}
        />
      </div>

      <div>
        <label htmlFor="notes">Заметки</label>
        <textarea
          id="notes"
          rows={4}
          defaultValue=""
          {...register("notes", {
            maxLength: { value: 500, message: "Не более 500 символов" },
          })}
        />
        {errors.notes && <p style={{ color: "red" }}>{errors.notes.message}</p>}
      </div>

      <button type="submit" style={{ marginTop: 16 }}>
        Добавить питомца
      </button>
      <button type="button" onClick={() => router.back()}>
        Отмена
      </button>
    </form>
  );
}
