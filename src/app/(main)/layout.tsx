import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/Footer/FooterClient";
import SessionWrapper from "../../components/SessionWrapper";
import HeaderServerWrapper from "@/components/Header/HeaderServerWrapper";

export const metadata: Metadata = {
  title: "Dog Trainer",
  description:
    "Умные прогулки с собакой: тренировки по шагам, отдых и обучение",
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
