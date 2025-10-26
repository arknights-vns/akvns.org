import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compiler: { removeConsole: process.env.NODE_ENV === "production" },
    output: "standalone",
    typedRoutes: true,
};

export default nextConfig;
