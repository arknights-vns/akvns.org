import { createFileRoute } from "@tanstack/react-router";

import { clientEnv } from "@/env/client";

const SITE_URL = clientEnv.VITE_PRODUCTION_URL;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
                `;

        return new Response(robots, {
          headers: {
            "Content-Type": "text/plain",
          },
        });
      },
    },
  },
});
