import type { Metadata } from "next";
import "../globals.css";

import SessionWrapper from "../../components/SessionWrapper";

export const metadata: Metadata = {
  applicationName: "Гафус",
  description: "Пошаговые тренировки собак онлайн",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, title: "Гафус", statusBarStyle: "default" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <SessionWrapper>
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
