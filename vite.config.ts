import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: [
    ViteImageOptimizer({
      png: { quality: 75 },
      jpg: { quality: 75 },
      jpeg: { quality: 75 },
      webp: { quality: 75 },
      avif: { quality: 75 },
      svg: {
        plugins: [{ name: "sortAttrs" }],
      },
    }),
    devtools(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: false,
      },
      srcDirectory: "src",
      router: {
        routesDirectory: "app",
      },
    }),
    nitro({
      compressPublicAssets: true,
    }),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
  ],
});
