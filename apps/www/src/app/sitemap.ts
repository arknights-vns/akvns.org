import type { MetadataRoute } from "next";
import { comicSeries } from "@/db/schema/vns-schema";
import { clientEnv } from "@/env-var/client";
import { fetchComicSeriesData } from "@/functions/comic/fetch-series-data";
import { drizzleDb } from "@/lib/drizzle";

const PAGE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : clientEnv.NEXT_PUBLIC_PRODUCTION_URL;

const trailingSlashRegex = /\/$/;
const cleanedUrl = PAGE_URL.endsWith("/") ? PAGE_URL.replace(trailingSlashRegex, "") : PAGE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await drizzleDb.select({ seriesId: comicSeries.comicSeriesId }).from(comicSeries);

  const pages: MetadataRoute.Sitemap = [
    {
      url: cleanedUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${cleanedUrl}/staff`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${cleanedUrl}/comic`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${cleanedUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  for (const entry of entries) {
    const seriesData = await fetchComicSeriesData(entry.seriesId);

    pages.push({
      url: `${cleanedUrl}/${seriesData?.comicSeriesId}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });

    if (!seriesData) {
      continue;
    }

    for (const chapter of seriesData.chapters) {
      pages.push({
        url: `${cleanedUrl}/${seriesData?.comicSeriesId}/${chapter.comicChapterId}`,
        lastModified: new Date(),
        changeFrequency: "never",
        priority: 0.5,
      });
    }
  }

  return pages;
}
