import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compiler: { removeConsole: process.env.NODE_ENV === "production" },
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                pathname: "**",
                port: "9000",
                protocol: "http",
                search: "",
            },
        ],
    },
    output: "standalone",
    typedRoutes: true,
};

export default nextConfig;
