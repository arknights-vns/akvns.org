import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    reactCompiler: true,
    typedRoutes: true,
    experimental: {
        typedEnv: true,
    },

    async rewrites() {
        return [
            {
                source: "/posthog/static/:path*",
                destination: `${process.env.NEXT_PUBLIC_POSTHOG_ASSET_HOST}/static/:path*`,
            },
            {
                source: "/posthog/:path*",
                destination: `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/:path*`,
            },
        ];
    },
    skipTrailingSlashRedirect: true,
};

export default nextConfig;
