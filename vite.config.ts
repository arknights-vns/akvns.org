import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: [
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
