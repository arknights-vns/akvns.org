import type { Metadata } from "next";
import { clientEnv } from "@/env-var/client";

const trailingSlashRegex = /\/+$/g;

/**
 * Get the production URL.
 *
 * Hopefully it works, like I use this in both Server & Client components <(")
 */
export function getProductionUrl() {
  const PAGE_URL =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : clientEnv.NEXT_PUBLIC_PRODUCTION_URL;

  return PAGE_URL.replaceAll(trailingSlashRegex, "");
}

/**
 * get default Next.js metadata.
 *
 * Server Components only.
 */
export function createMetadata(title: string, description: string, keywords: string[] = []): Metadata {
  const prodUrl = getProductionUrl();

  return {
    title,
    description,
    metadataBase: new URL(prodUrl),
    publisher: "Arknights Vietnam Station",
    authors: [
      {
        name: "Arknights VNS",
        url: "https://www.facebook.com/terrastationvn",
      },
      {
        name: "Arknights VNS IT Squad",
        url: "https://github.com/arknights-vns",
      },
    ],
    openGraph: {
      title: `Arknights VNS | ${title}`,
      description,
      locale: "vi-VN",
    },
    keywords: [
      ...keywords,
      "akvns",
      "akvns.org",
      "dreamchasers.akvns.org",
      "arknights vns",
      "arknights vietnam",
      "arknights vietnam station",
      "terrastationvn",
      "@terrastationvn",
      "phoenix frontiers",
      "trạm dừng chân chốn Terra",
    ],
  };
}
