// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001", // 后端服务器地址
        changeOrigin: true, // 修改 origin 头
        rewrite: (path) => path.replace(/^\/api/, ""), // 去掉 "/api" 前缀
      },
    },
  },
});
