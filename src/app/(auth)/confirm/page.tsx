"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { checkUserConfirmed } from "@/lib/auth/checkUserConfirmed";
import Image from "next/image";
import Link from "next/link";
import styles from "./comfirm.module.css";

export default function ConfirmPage() {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <ConfirmContent />
    </Suspense>
  );
}

function ConfirmContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const [caughtError, setCaughtError] = useState<Error | null>(null);

  useEffect(() => {
    if (!phone) return;

    const interval = setInterval(async () => {
      try {
        const confirmed = await checkUserConfirmed(phone);
        if (confirmed) {
          clearInterval(interval);
          alert("✅ Номер подтверждён. Выполняется вход...");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Ошибка при проверке подтверждения номера:", error);
        setCaughtError(error as Error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [phone]);

  if (caughtError) {
    throw caughtError;
  }

  return (
    <main className={styles.container}>
      <Image
        className={styles.logo}
        src="/logo.png"
        alt="Logo"
        width={400}
        height={400}
        priority
      />
      <h1>Подтверждение номера</h1>
      <p>Пожалуйста, откройте Telegram-бота и подтвердите номер.</p>
      <Link href="https://t.me/dog_trainer_register_bot" target="_blank">
        <button className={styles.button}> Открыть Telegram-бота</button>
      </Link>
    </main>
  );
}