"use client";

import AddPetForm from "./AddPetForm";
import { Suspense } from "react";

export default function AddPetFormPage() {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        <h1>Добавить питомца</h1>
        <AddPetForm />
      </main>
    </Suspense>
  );
}
