import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { getProductionUrl } from "@/lib/utils";

// biome-ignore lint/suspicious/useAwait: "use cache"
export default async function robots(): Promise<MetadataRoute.Robots> {
  "use cache";
  cacheTag("robots.txt");
  cacheLife("max");

  const prodUrl = getProductionUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${prodUrl}/sitemap.xml`,
  };
}
