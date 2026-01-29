import { drizzleDb } from "@arknights-vns/drizzle";
import { comicSeries } from "@arknights-vns/drizzle/schema/vns-schema";
import { clientEnv } from "@arknights-vns/env-var/client";
import type { MetadataRoute } from "next";

const PAGE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : clientEnv.NEXT_PUBLIC_PRODUCTION_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  // minus first 3 entries.
  const entries = await drizzleDb
    .select({ seriesId: comicSeries.comicSeriesId })
    .from(comicSeries)
    .limit(50_000 - 3);

  return [
    {
      url: PAGE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${PAGE_URL}/staff`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${PAGE_URL}/comic`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...entries.map((entry) => ({
      url: `${PAGE_URL}/${entry.seriesId}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
