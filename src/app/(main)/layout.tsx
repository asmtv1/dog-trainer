import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/Footer/FooterClient";
import SessionWrapper from "../../components/SessionWrapper";
import HeaderServerWrapper from "@/components/Header/HeaderServerWrapper";

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
          <HeaderServerWrapper />
          <main>{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
