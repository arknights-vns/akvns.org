import { prisma } from "@arknights-vns/database/client";
import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { fetchComicSeriesData } from "@/functions/comic/fetch-series-data";
import { getProductionUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheTag("sitemap.xml");
  cacheLife("days");

  const entries = await prisma.comicSeries.findMany({
    select: {
      series_id: true,
      chapters: {
        select: {
          chapter_id: true,
        },
      },
    },
  });

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
    const seriesData = await fetchComicSeriesData(entry.series_id);

    pages.push({
      url: `${prodUrl}/${seriesData?.series_id}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });

    if (!seriesData) {
      continue;
    }

    for (const chapter of seriesData.chapters) {
      pages.push({
        url: `${prodUrl}/${seriesData?.series_id}/${chapter.chapter_id}`,
        lastModified: new Date(),
        changeFrequency: "never",
        priority: 0.5,
      });
    }
  }

  return pages;
}
