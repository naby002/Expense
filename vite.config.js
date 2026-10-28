import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    coverage: {
      reporter: ["text", "html"],
      include: ["src/**/*.js", "src/**/*.jsx"],
      exclude: ["src/main.jsx", "src/test/**", "src/**/*.test.js", "src/**/*.test.jsx"],
    },
  },
});
