import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compiler: { removeConsole: process.env.NODE_ENV === "production" },
    typedRoutes: true,
};

export default nextConfig;
