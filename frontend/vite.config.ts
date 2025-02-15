import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
   // ... existing code ...
  server: {
    proxy: {
      "/api": {
        target: "https://sleepspace.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, _options) => {
          proxy.on("error", (err, req, res) => {
            console.error("Proxy Error:", {
              message: err.message,
              url: req.url,
              statusCode: res?.statusCode
            });
            if (!res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
            }
            res.end(JSON.stringify({ error: "Proxy error occurred" }));
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request:", {
              method: req.method,
              url: req.url,
              headers: req.headers
            });
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log("Received Response:", {
              status: proxyRes.statusCode,
              url: req.url,
              headers: proxyRes.headers
            });
          });
        },
      },
    },
  },
// ... existing code ...
});
