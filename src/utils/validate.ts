export function validatePetInput(input: {
  name: string;
  type: string;
  birthDate?: string;
  heightCm?: number;
  weightKg?: number;
}) {
  if (!input.name || input.name.trim() === "") {
    throw new Error("Имя питомца обязательно");
  }

  if (!["DOG", "CAT"].includes(input.type)) {
    throw new Error("Неизвестный тип питомца");
  }

  if (input.birthDate && input.birthDate !== "") {
    const date = new Date(input.birthDate);
    if (isNaN(date.getTime())) {
      throw new Error("Некорректная дата рождения");
    }
    if (date > new Date()) {
      throw new Error("Дата рождения не может быть в будущем");
    }
  }

  if (input.heightCm != null) {
    if (typeof input.heightCm !== "number" || input.heightCm <= 0) {
      throw new Error("Рост должен быть положительным числом");
    }
  }

  if (input.weightKg != null) {
    if (typeof input.weightKg !== "number" || input.weightKg <= 0) {
      throw new Error("Вес должен быть положительным числом");
    }
  }
}

export function validateProfileInput(input: {
  fullName: string;
  about: string;
  telegram: string;
  instagram: string;
  website: string;
  birthDate: string;
}) {
  if (input.fullName && input.fullName.trim() !== "") {
    if (!/^[A-Za-zА-Яа-яЁё\s-]{2,60}$/.test(input.fullName)) {
      throw new Error("Некорректное имя пользователя");
    }
  }

  if (input.telegram) {
    if (!/^[a-zA-Z0-9_]{5,32}$/.test(input.telegram)) {
      throw new Error("Некорректный Telegram username");
    }
  }

  if (input.instagram) {
    if (!/^[a-zA-Z0-9_.]{2,50}$/.test(input.instagram)) {
      throw new Error("Некорректный Instagram username");
    }
  }

  if (input.website) {
    try {
      new URL(input.website);
    } catch {
      throw new Error("Некорректный URL сайта");
    }
  }

  if (input.birthDate !== undefined) {
    if (input.birthDate === "") return;
    const date = new Date(input.birthDate);
    if (isNaN(date.getTime())) {
      throw new Error("Неверная дата");
    }
    if (date > new Date()) {
      throw new Error("Дата не может быть в будущем");
    }
  }
}
