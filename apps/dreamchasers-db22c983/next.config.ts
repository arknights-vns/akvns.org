import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "standalone",
    experimental: {
        reactCompiler: true,
        optimizePackageImports: ["@supabase/supabase-js", "@supabase/ssr"]
    },

    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "false" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "*" },
                    { key: "Access-Control-Allow-Headers", value: "*" }
                ]
            }
        ];
    },

    async redirects() {
        return [
            {
                source: "/contest/democracy",
                destination: "/contest/voting",
                permanent: false
            },
            {
                source: "/contest/podium",
                destination: "/contest/standing",
                permanent: false
            }
        ];
    }
};

export default nextConfig;
