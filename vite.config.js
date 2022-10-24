import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: process.env.NODE_ENV === "development" ? "/" : "/ironhack-task-app/"
  base: process.env.NODE_ENV === "production" ? "/ironhack-task-app/" : "/",
  server: {
    base: process.env.NODE_ENV === "production" ? "/nombre-repositorio/" : "/",
  },
  // build: { outDir: "docs" },
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        entryFileNames: `assets/file_[name].[hash].js`,
        chunkFileNames: `assets/file_[name].[hash].js`,
        assetFileNames: `assets/file_[name].[hash].[ext]`,
      },
    },
  },
});
