// src/app/login/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; // путь может быть "../../globals.css" если layout лежит глубже

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div style={{ background: "red", color: "white", padding: 16 }}>
          ЭТО ЛОКАЛЬНЫЙ ЛЕЙАУТ /LOGIN!
        </div>
        {children}
      </body>
    </html>
  );
}
