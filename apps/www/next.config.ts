import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

import "@/env-var/client";
import { serverEnv } from "@/env-var/server";

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
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: [
      "@icons-pack/react-simple-icons",
      "@sentry/nextjs",
      "motion",
      "@arknights-vns/database",
    ],
    sri: {
      algorithm: "sha384",
    },
  },
  poweredByHeader: false,
  transpilePackages: [
    "@arknights-vns/ts-config",
    "@arknights-vns/database",
    "@arknights-vns/shadcn-ui",
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
            value: "Next.js 16.0.7 with CVE-2025-55182 unpatched *wink*",
          },
          {
            key: "X-Swyrin-Was-Here",
            value: "true",
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
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://*.googletagmanager.com https://*.cloudflareinsights.com;
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

export default withSentryConfig(nextConfig, {
  org: serverEnv.SENTRY_ORG,
  project: serverEnv.SENTRY_PROJECT,
  authToken: serverEnv.SENTRY_AUTH_TOKEN,
  tunnelRoute: "/we-dont-even-care-if-you-block-this-route",

  silent: !process.env.CI,
  widenClientFileUpload: true,

  bundleSizeOptimizations: {
    excludeDebugStatements: true,
  },
});
