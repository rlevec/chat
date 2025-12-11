import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      svgr({
        include: "**/*.svg",
        svgrOptions: {
          exportType: "default",
          ref: true,
          svgo: false,
          titleProp: true,
        },
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:6060",
          changeOrigin: true,
        },
        "/socket.io": {
          target: env.VITE_SOCKET_URL || "ws://localhost:6060",
          ws: true,
        },
        "/profile_picture": {
          target: env.VITE_API_URL || "http://localhost:6060",
          changeOrigin: true,
        },
      },
    },
  });
};
