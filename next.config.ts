import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

const withPWAConfigured = withPWA({
  dest: "public",
  scope: "/",
  register: true,
  disable: process.env.NODE_ENV === "development",
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^https?.*\.(?:js|css|png|jpg|jpeg|svg|gif|webp)$/,
        handler: "StaleWhileRevalidate",
        options: { cacheName: "static-assets" },
      },
      {
        urlPattern: ({ request }: { request: Request }) =>
          request.mode === "navigate",
        handler: "NetworkFirst",
        options: { cacheName: "pages", networkTimeoutSeconds: 10 },
      },
      {
        urlPattern: /^\/api\/(?!telegram).*$/,
        handler: "NetworkFirst",
        method: "GET",
        options: { cacheName: "api" },
      },
      {
        urlPattern: /^\/api\/telegram\/.*$/,
        handler: "NetworkOnly",
        method: "POST",
      },
    ],
  },
});

export default withPWAConfigured(nextConfig);
