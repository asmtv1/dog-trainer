//Bio/PetList/EditPetForm/EditPetForm.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { savePet } from "@/lib/actions/savePet";
import { Pet } from "../page"; // импорт Pet типа если надо

type EditPetFormProps = {
  pet: Pet;
  onClose: () => void;
  onSave: () => void;
};

export default function EditPetForm({
  pet,
  onClose,
  onSave,
}: EditPetFormProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Pet>({
    defaultValues: {
      ...pet,
      breed: pet.breed ?? "",
      photoUrl: pet.photoUrl ?? "",
      notes: pet.notes ?? "",
      birthDate: pet.birthDate?.split("T")[0] ?? "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Pet> = async (data) => {
    try {
      const cleanedData = {
        ...data,
        ownerId: pet.ownerId,
        heightCm: data.heightCm ?? undefined,
        weightKg: data.weightKg ?? undefined,
        photoUrl: data.photoUrl ?? undefined,
        notes: data.notes ?? undefined,
      };
      await savePet(cleanedData);
      onSave();
    } catch (error) {
      console.error("Ошибка при сохранении питомца:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
      <input type="hidden" {...register("id")} value={watch("id")} />

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
        >
          <option value="" disabled>
            -- выберите тип --
          </option>
          <option value="DOG">Собака</option>
          <option value="CAT">Кошка</option>
        </select>
        {errors.type && <p style={{ color: "red" }}>{errors.type.message}</p>}
      </div>

      <div>
        <label htmlFor="breed">Порода</label>
        <input id="breed" type="text" {...register("breed")} />
      </div>

      <div>
        <label htmlFor="birthDate">Дата рождения</label>
        <input
          id="birthDate"
          type="date"
          value={watch("birthDate")?.split("T")[0] ?? ""}
          {...register("birthDate")}
        />
      </div>

      <div>
        <label htmlFor="heightCm">Рост (см)</label>
        <input
          id="heightCm"
          type="number"
          step="0.1"
          {...register("heightCm", { valueAsNumber: true })}
        />
      </div>

      <div>
        <label htmlFor="weightKg">Вес (кг)</label>
        <input
          id="weightKg"
          type="number"
          step="0.1"
          {...register("weightKg", { valueAsNumber: true })}
        />
      </div>

      <div>
        <label htmlFor="notes">Заметки</label>
        <textarea
          id="notes"
          rows={4}
          {...register("notes", {
            maxLength: { value: 500, message: "Не более 500 символов" },
          })}
        />
        {errors.notes && <p style={{ color: "red" }}>{errors.notes.message}</p>}
      </div>

      <div style={{ marginTop: 16 }}>
        <button type="submit">Сохранить изменения</button>
        <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>
          Отмена
        </button>
      </div>
    </form>
  );
}
