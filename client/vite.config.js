import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [react()],
    build: {
      target: "es2022"
    },
    esbuild: {
      target: "es2022"
    },
    optimizeDeps:{
      esbuildOptions: {
        target: "es2022",
      }}
  };
});
