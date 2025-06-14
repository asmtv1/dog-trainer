"use client";

import { useState } from "react";
import { sendTelegramPasswordResetRequest } from "@/lib/auth/sendTelegramPasswordResetRequest";

export default function PasswordResetPage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [caughtError, setCaughtError] = useState<Error | null>(null);
  if (caughtError) {
    throw caughtError;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendTelegramPasswordResetRequest(username, phone);
      setStatus("Если данные верны, вам придёт сообщение в Telegram");
    } catch (error) {
      setCaughtError(error as Error);
    }
  };

  return (
    <main style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1>Сброс пароля</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Логин:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </label>
        <label>
          Телефон:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </label>
        <button type="submit">Отправить</button>
      </form>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </main>
  );
}
