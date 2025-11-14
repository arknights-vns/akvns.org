import type { NextConfig } from "next";

import "@/lib/env";

const nextConfig: NextConfig = {
    experimental: {
        turbopackFileSystemCacheForDev: true,
    },
    output: "standalone",
    reactCompiler: true,
    transpilePackages: [
        "@t3-oss/env-nextjs",
        "@t3-oss/env-core",
    ],
    typedRoutes: true,
};

export default nextConfig;
