import type { MetadataRoute } from "next";
import { comicSeries } from "@/db/schema/vns-schema";
import { fetchComicSeriesData } from "@/functions/comic/fetch-series-data";
import { drizzleDb } from "@/lib/drizzle";
import { getProductionUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await drizzleDb.select({ seriesId: comicSeries.comicSeriesId }).from(comicSeries);
  const prodUrl = getProductionUrl();

  const pages: MetadataRoute.Sitemap = [
    {
      url: prodUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${prodUrl}/staff`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${prodUrl}/comic`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${prodUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  for (const entry of entries) {
    const seriesData = await fetchComicSeriesData(entry.seriesId);

    pages.push({
      url: `${prodUrl}/${seriesData?.comicSeriesId}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });

    if (!seriesData) {
      continue;
    }

    for (const chapter of seriesData.chapters) {
      pages.push({
        url: `${prodUrl}/${seriesData?.comicSeriesId}/${chapter.comicChapterId}`,
        lastModified: new Date(),
        changeFrequency: "never",
        priority: 0.5,
      });
    }
  }

  return pages;
}
