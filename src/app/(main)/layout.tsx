import type { Metadata } from "next";
import "../globals.css";

import Footer from "@/components/Footer/Footer";
import SessionWrapper from "../../components/SessionWrapper";
import Header from "@/components/Header/Header";

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
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
