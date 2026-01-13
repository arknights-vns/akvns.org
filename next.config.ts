import type { NextConfig } from "next";

import "@/env/client";
import "@/env/server";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
    optimizePackageImports: ["@icons-pack/react-simple-icons"],
  },
  poweredByHeader: false,
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  images: {
    remotePatterns: [new URL("https://cdn.akvns.org/**"), new URL("https://comic-assets.akvns.org/**")],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Tus-Wives",
            value:
              "Angelina, Fartooth, Reed, Mudrock, Emilia, Bagpipe, Archetto, Astesia, Ray, " +
              "Whisperain, Saileach, Ptilopsis, Vendela, Manticore, Vendela, Typhon, Dorothy, " +
              "Viviana, Meteorite, Aurora, Savage, Poncirus, Robin",
          },
          {
            key: "X-Powered-By",
            value: "Arknights VNS",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=(), payment=()",
          },
          {
            key: "Content-Security-Policy",
            value: `
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://*.akvns.org;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    worker-src 'self' blob:;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
