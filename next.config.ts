import type { NextConfig } from "next";

import "@/lib/env";

const nextConfig: NextConfig = {
    compiler: { removeConsole: process.env.NODE_ENV === "production" },
    output: "standalone",
    transpilePackages: [
        "@t3-oss/env-nextjs",
        "@t3-oss/env-core",
    ],
    typedRoutes: true,
};

export default nextConfig;
