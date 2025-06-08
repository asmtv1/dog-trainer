import type { Metadata } from "next";
import "../globals.css";

import SessionWrapper from "../../components/SessionWrapper";

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
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
