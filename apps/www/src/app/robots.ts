import type { MetadataRoute } from "next";
import { clientEnv } from "@/env-var/client";

const PAGE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : clientEnv.NEXT_PUBLIC_PRODUCTION_URL;

const trailingSlashRegex = /\/$/;
const cleanedUrl = PAGE_URL.endsWith("/") ? PAGE_URL.replace(trailingSlashRegex, "") : PAGE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${cleanedUrl}/sitemap.xml`,
  };
}
