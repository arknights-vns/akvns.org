/** biome-ignore-all lint/performance/noImgElement: next.js does not work here. */
/** and same for TailwindCSS - there is `tw`, but I love rawdog :D */

import { getProductionUrl } from "@/lib/utils";

const prodUrl = getProductionUrl();

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

// biome-ignore lint/suspicious/useAwait: required by "use cache"
export async function DefaultOpengraph({ title, description }: { title: string; description: string }) {
  "use cache";
  cacheTag("og", title, description);
  cacheLife("max");

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "48px",
          position: "relative",
          justifyContent: "space-between",
          // CSS support is quite limited:
          // https://github.com/vercel/satori#css
          //
          // not even background-blend-mode.
          background: `url(${prodUrl}/Lens_Image_67.jpg)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textWrap: "pretty",
            gap: "32px",
            marginBottom: "112px",
          }}
        >
          <div
            style={{
              fontFamily: "Quicksand",
              fontSize: "72px",
              fontWeight: "700",
              color: "#ff2056",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "Public Sans",
              fontSize: "32px",
              textOverflow: "ellipsis",
              lineClamp: 2,
              color: "white",
              letterSpacing: "0.025em",
              lineHeight: 1.5,
              overflow: "hidden",
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <img
            alt="VNS_Icon"
            height={62}
            src={`${prodUrl}/VNS_Icon.svg`}
            style={{
              filter: "invert(1)",
            }}
            width={60}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                color: "white",
                fontFamily: "Quicksand",
                fontWeight: "700",
              }}
            >
              Arknights Vietnam Station
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono",
                color: "gray",
              }}
            >
              {prodUrl}
            </div>
          </div>
          <div style={{ flexGrow: "1" }} />
          <div
            style={{
              fontSize: "32px",
              fontFamily: "JetBrains Mono",
              color: "#ff2056",
            }}
          >
            #DREAMCHASERS
          </div>
        </div>
      </div>
    </div>
  );
}
