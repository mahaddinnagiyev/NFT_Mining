import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env.PROJECT_ID': JSON.stringify(process.env.PROJECT_ID),
    'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
  }
});
