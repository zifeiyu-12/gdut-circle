// vite.config.ts
import { defineConfig } from "file:///D:/html/gdut-circle/node_modules/.pnpm/vite@5.4.10_less@4.2.0/node_modules/vite/dist/node/index.js";
import react from "file:///D:/html/gdut-circle/node_modules/.pnpm/@vitejs+plugin-react@4.3.3_vite@5.4.10_less@4.2.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      host: "localhost",
      port: "3000",
      // 指定代理所有/api请求
      "/api": {
        // 代理请求之后的请求地址
        target: "http://10.21.32.192:8888/",
        // 跨域
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxodG1sXFxcXGdkdXQtY2lyY2xlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxodG1sXFxcXGdkdXQtY2lyY2xlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9odG1sL2dkdXQtY2lyY2xlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxuICAgICAgcG9ydDogXCIzMDAwXCIsXG4gICAgICAvLyBcdTYzMDdcdTVCOUFcdTRFRTNcdTc0MDZcdTYyNDBcdTY3MDkvYXBpXHU4QkY3XHU2QzQyXG4gICAgICBcIi9hcGlcIjoge1xuICAgICAgICAvLyBcdTRFRTNcdTc0MDZcdThCRjdcdTZDNDJcdTRFNEJcdTU0MEVcdTc2ODRcdThCRjdcdTZDNDJcdTU3MzBcdTU3NDBcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly8xMC4yMS4zMi4xOTI6ODg4OC9cIixcbiAgICAgICAgLy8gXHU4REU4XHU1N0RGXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUCxTQUFTLG9CQUFvQjtBQUM5USxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBLE1BRU4sUUFBUTtBQUFBO0FBQUEsUUFFTixRQUFRO0FBQUE7QUFBQSxRQUVSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
