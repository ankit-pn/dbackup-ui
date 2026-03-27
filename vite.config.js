import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    build: {
      outDir: "build",
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
    preview: {
      host: "0.0.0.0",
      port: 4173,
    },
    define: {
      "process.env.REACT_APP_API_SERVER": JSON.stringify(
        env.REACT_APP_API_SERVER || "",
      ),
      "process.env.REACT_APP_API_URL": JSON.stringify(
        env.REACT_APP_API_URL || "",
      ),
    },
  };
});
