import type { MetadataRoute } from "next";
import { getProductionUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const prodUrl = getProductionUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${prodUrl}/sitemap.xml`,
  };
}
