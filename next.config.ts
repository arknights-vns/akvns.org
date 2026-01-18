import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

import "@/env/client";
import "@/env/server";

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
  output: "standalone",
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
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
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self'${isDev ? " 'unsafe-inline'" : ""};
    connect-src 'self' https://*.sentry.io;
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
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "tien-dat-pham",

  project: "arknights-vns",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
