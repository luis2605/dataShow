import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "dataShow",
        short_name: "dShow",
        start_url: "https://luis2605.github.io/dataShow/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/dataShowLogo.png",
            sizes: "192x192",
            type: "image/png",
          },
          // Add more icon sizes if needed
        ],
      },
    }),
  ],
  base: "/dataShow",
});
