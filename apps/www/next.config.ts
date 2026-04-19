import type { NextConfig } from "next";

import "@/env-var/client";
import "@/env-var/server";

// https://discord.com/channels/939851547590934610/1261831260318208081/1451918926828011672
const isDev = process.env.NODE_ENV === "development";
const tusWives = [
  "Angelina",
  "Fartooth",
  "Reed",
  "Mudrock",
  "Emilia",
  "Bagpipe",
  "Archetto",
  "Astesia",
  "Ray",
  "Whisperain",
  "Saileach",
  "Ptilopsis",
  "Vendela",
  "Manticore",
  "Typhon",
  "Dorothy",
  "Viviana",
  "Meteorite",
  "Aurora",
  "Savage",
  "Poncirus",
  "Robin",
];

const nextConfig: NextConfig = {
  reactCompiler: !isDev,
  typedRoutes: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ["@icons-pack/react-simple-icons", "motion"],
    sri: isDev
      ? // oxlint-disable-next-line no-undefined
        undefined
      : {
          algorithm: "sha512",
        },
  },
  poweredByHeader: false,
  transpilePackages: [
    "@arknights-vns/ts-config",
    "@arknights-vns/database",
    "@t3-oss/env-nextjs",
    "@t3-oss/env-core",
  ],
  images: {
    remotePatterns: [new URL("https://**.akvns.org/**")],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Tus-Wives",
            value: tusWives.join(", "),
          },
          {
            key: "X-Built-By",
            value: "Arknights Vietnam Station, terrastationvn, and you <3",
          },
          {
            key: "X-Powered-By",
            value: "Next.js 16.0.6 with CVE-2025-55182 and CVE-2025-66478 left unpatched *wink*",
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
            // https://github.com/vercel/next.js/discussions/81703
            // so yeah, 'unsafe-inline' for now.
            value: `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://*.googletagmanager.com https://*.cloudflareinsights.com https://www.clarity.ms;
    style-src 'self' 'unsafe-inline';
    connect-src 'self' https://*.sentry.io https://*.google-analytics.com;
    img-src 'self' https://*.akvns.org;
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

const theFinalsConfig = nextConfig

export default theFinalsConfig;
