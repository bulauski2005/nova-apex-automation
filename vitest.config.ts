import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateRoot = path.resolve(__dirname);

export default defineConfig({
  root: templateRoot,
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
    },
  },
  test: {
    environment: "node",
  },
});
