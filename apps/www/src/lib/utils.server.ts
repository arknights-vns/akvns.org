import { cacheLife, cacheTag } from "next/cache";

/*
  Load Google fonts, server side is mandatory since this will be pre-rendered on server.

  https://vercel.com/kb/guide/using-custom-font
 */
export async function loadGoogleFont(font: string) {
  "use cache";
  cacheTag("og-fonts");
  cacheLife("max");

  const url = `https://fonts.googleapis.com/css2?family=${font}`;
  const css = await (await fetch(url)).text();
  // biome-ignore lint/performance/useTopLevelRegex: Vercel.
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    // biome-ignore lint/style/noNonNullAssertion: Vercel.
    const response = await fetch(resource[1]!);

    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

/**
 * A list of default Arknights VNS Opengraph typesetting.
 *
 * Should be cached unless I misread the doc.
 */
export async function getStationDefaultOpengraphFonts(): Promise<
  {
    name: string;
    data: ArrayBuffer;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
    style?: "normal" | "italic";
  }[]
> {
  "use cache";
  cacheTag("og-fonts");
  cacheLife("max");

  return [
    {
      name: "QuickSand",
      data: await loadGoogleFont("Quicksand:wght@700&display=swap"),
      weight: 700 as const,
    },
    {
      name: "Public Sans",
      data: await loadGoogleFont("Public+Sans&display=swap"),
    },
    {
      name: "JetBrains Mono",
      data: await loadGoogleFont("JetBrains+Mono"),
    },
  ];
}
