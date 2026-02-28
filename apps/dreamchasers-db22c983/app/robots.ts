import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: [
                "/",
                "/crew",
                "/event/*",
                "/retro/*",
                "/contest/*",
                "/favicon.ico",
                "/opengraph-image.jpg",
                "/sitemap.xml",
                "/robots.txt"
            ],
            disallow: [
                "/api/*"
            ]
        }
    };
}
