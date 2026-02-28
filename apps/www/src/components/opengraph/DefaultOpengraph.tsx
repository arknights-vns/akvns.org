/** biome-ignore-all lint/performance/noImgElement: next.js does not work here. */
/** and same for TailwindCSS - there is `tw`, but I love rawdog :D */

import { cacheLife, cacheTag } from "next/cache";
import { getProductionUrl } from "@/lib/utils";

const prodUrl = getProductionUrl();

// biome-ignore lint/suspicious/useAwait: required by "use cache"
export default async function DefaultOpengraph({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
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
