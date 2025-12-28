import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    reactCompiler: true,
    typedRoutes: true,
    experimental: {
        typedEnv: true,
        turbopackFileSystemCacheForDev: true,
        turbopackFileSystemCacheForBuild: true,
        optimizePackageImports: ["@icons-pack/react-simple-icons"],
    },
    skipTrailingSlashRedirect: true,
    poweredByHeader: false,

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

    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Tus-Wives",
                        value: "Angelina,Fartooth,Reed,Mudrock,Emilia,Bagpipe,Archetto,Astesia,Ray,Whisperain,Saileach,Ptilopsis,Vendela,Manticore,Vendela,Typhon,Dorothy,Viviana,Meteorite,Aurora,Savage,Poncirus,Robin",
                    },
                    {
                        key: "X-Powered-By",
                        value: "Arknights VNS",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
