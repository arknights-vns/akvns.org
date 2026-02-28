import type { MetadataRoute } from "next";
import { BASE_URL } from "@/app/web-config";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${BASE_URL}`,
            priority: 1,
            lastModified: new Date(),
            changeFrequency: "always"
        },
        {
            url: `${BASE_URL}/crew`,
            priority: 0.9,
            lastModified: new Date()
        },
        {
            url: `${BASE_URL}/event/location`,
            priority: 0.9,
            lastModified: new Date()
        },
        {
            url: `${BASE_URL}/event/roadmap`,
            priority: 0.9,
            lastModified: new Date()
        },
        {
            url: `${BASE_URL}/event/rules`,
            priority: 0.9,
            lastModified: new Date()
        },
        {
            url: `${BASE_URL}/event/schedule`,
            priority: 0.9,
            lastModified: new Date()
        },
        {
            url: `${BASE_URL}/retro`,
            priority: 0.9,
            lastModified: new Date(),
            changeFrequency: "yearly"
        },
        {
            url: `${BASE_URL}/retro/the-show-must-go-on`,
            priority: 0.8,
            lastModified: new Date(),
            changeFrequency: "never"
        },
        {
            url: `${BASE_URL}/shikanoko.txt`,
            priority: 0.5,
            lastModified: new Date("2025-07-17T00:00:00+07:00"),
            changeFrequency: "never"
        }
    ];
}
