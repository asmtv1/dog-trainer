// app/profil/AddPetForm/page.tsx

import AddPetForm from "./AddPetForm";

export default function AddPetFormPage() {
  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Добавить питомца</h1>
      <AddPetForm />
    </main>
  );
}