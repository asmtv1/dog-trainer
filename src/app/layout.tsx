import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer/Footer";
import SessionWrapper from "./SessionWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionWrapper>
          <Footer />
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
