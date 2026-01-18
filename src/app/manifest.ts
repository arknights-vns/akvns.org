import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arknights Vietnam Station",
    short_name: "Arknights VNS",
    description: "For the Dreamchasers, by the Dreamchasers.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fe0606",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
