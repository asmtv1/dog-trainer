// src/app/layout.tsx
import type { Metadata } from "next";
import type { Viewport } from "next";
import PWARegister from "@/components/PWARegister";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Гафус",
    statusBarStyle: "default",
  },
};
export const viewport: Viewport = {
  themeColor: "#4F46E5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Android: theme color for status bar */}
        <meta name="theme-color" content="#4F46E5" />

        {/* iOS: full-screen web app */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* iOS home-screen icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/icon180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/icons/icon512_rounded.png"
        />
      </head>
      <body>
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
