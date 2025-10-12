import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typedRoutes: true,
    output: "standalone",
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
};

export default nextConfig;
