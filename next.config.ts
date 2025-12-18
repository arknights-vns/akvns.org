import type { NextConfig } from "next";

import { env } from "@/lib/env";

const nextConfig: NextConfig = {
    output: "standalone",
    reactCompiler: true,
    transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
    typedRoutes: true,

    async rewrites() {
        return [
            {
                source: "/posthog/static/:path*",
                destination: `${env.NEXT_PUBLIC_POSTHOG_ASSET_HOST}/static/:path*`,
            },
            {
                source: "/posthog/:path*",
                destination: `${env.NEXT_PUBLIC_POSTHOG_HOST}/:path*`,
            },
        ];
    },
    skipTrailingSlashRedirect: true,
};

export default nextConfig;
