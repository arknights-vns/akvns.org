import type { MetadataRoute } from "next";
import { clientEnv } from "@/env-var/client";

const PAGE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : clientEnv.NEXT_PUBLIC_PRODUCTION_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PAGE_URL}/sitemap.xml`,
  };
}
