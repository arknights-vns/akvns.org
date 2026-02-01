import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

import "@/env-var/client";
import "@/env-var/server";

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
  "Vendela",
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
    turbopackFileSystemCacheForBuild: true,
    optimizePackageImports: ["@icons-pack/react-simple-icons"],
  },
  poweredByHeader: false,
  transpilePackages: [
    "@arknights-vns/ts-config",
    "@arknights-vns/shadcn-ui",
    "@t3-oss/env-nextjs",
    "@t3-oss/env-core",
  ],
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
            value: tusWives.join(", "),
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
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://*.googletagmanager.com;
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
  org: "tien-dat-pham",
  project: "arknights-vns",

  silent: !process.env.CI,
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    automaticVercelMonitors: true,

    treeshake: {
      removeDebugLogging: true,
    },
  },
});
