import type { NextConfig } from "next";
import createMDX from "@next/mdx";

import { env } from "@/lib/env";

const nextConfig: NextConfig = {
    experimental: {
        turbopackFileSystemCacheForDev: true,
    },
    output: "standalone",
    reactCompiler: true,
    transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
    typedRoutes: true,
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

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

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: ["remark-gfm", "remark-frontmatter", "remark-mdx-frontmatter"],
        rehypePlugins: [],
    },
});

export default withMDX(nextConfig);
