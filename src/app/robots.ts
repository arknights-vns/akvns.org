import type { MetadataRoute } from "next";

const baseUrl =
    process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/manage/",
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
