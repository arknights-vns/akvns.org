import { createFileRoute } from "@tanstack/react-router";

import { comicSeries } from "@/db/schema";
import { clientEnv } from "@/env/client";
import { drizzleDb } from "@/lib/drizzle";

const SITE_URL = clientEnv.VITE_PRODUCTION_URL;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = await drizzleDb.select({ seriesId: comicSeries.comicSeriesId }).from(comicSeries);

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/staff</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/projects</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/comic</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${entries
    .map((entry) => {
      return `<url>
    <loc>${SITE_URL}/comic/${entry.seriesId}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("")}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml",
          },
        });
      },
    },
  },
});
