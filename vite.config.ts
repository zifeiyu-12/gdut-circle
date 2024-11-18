import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://10.21.32.192:8888",
        changeOrigin: true,
      },
    },
  },
});
