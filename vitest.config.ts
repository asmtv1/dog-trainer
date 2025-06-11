import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@/shared/prisma": resolve(__dirname, "shared/prisma"),
    },
  },
  test: {
    environment: "node",
    globals: true,
  },
});
