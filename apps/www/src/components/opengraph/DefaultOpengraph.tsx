/** biome-ignore-all lint/performance/noImgElement: next.js does not work here. */
/** and most TailwindCSS classes doesn't work. */

import { cacheLife, cacheTag } from "next/cache";
import { getProductionUrl } from "@/lib/utils";

const prodUrl = getProductionUrl();

declare module "react" {
  // biome-ignore lint/correctness/noUnusedVariables: React being BS, as usual.
  export interface HTMLAttributes<T> {
    /**
     * per the Playground (https://og-playground.vercel.app/), Satori uses `tw` instead of className for TailwindCSS.
     *
     * and most classes doesn't work since Satori is bundled with 3.1.8:
     * https://github.com/vercel/satori/issues/615
     *
     * should strictly be used only inside `components/opengraph/DefaultOpengraph`
     */
    tw?: string;
  }
}

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
        width: "100%",
        height: "100%",
      }}
      tw="relative flex flex-col text-white overflow-hidden"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          // CSS support is quite limited:
          // https://github.com/vercel/satori#css
          //
          // not even background-blend-mode.
          background: `url(${prodUrl}/Lens_Image_67.jpg)`,
        }}
        tw="flex flex-col p-15 relative justify-between"
      >
        <div
          style={{
            textWrap: "pretty",
            gap: "32px",
          }}
          tw="flex flex-col mb-28"
        >
          <div
            style={{
              fontFamily: "Quicksand",
            }}
            tw="text-7xl font-bold leading-relaxed text-[#ff2056]"
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "Public Sans",
              textOverflow: "ellipsis",
              lineClamp: 2,
              letterSpacing: "0.025em",
            }}
            tw="text-3xl text-gray-500 leading-relaxed overflow-hidden"
          >
            {description}
          </div>
        </div>
        <div
          style={{
            gap: "16px",
          }}
          tw="flex items-center justify-center"
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
              gap: "4px",
            }}
            tw="flex flex-col"
          >
            <div
              style={{
                fontFamily: "Quicksand",
              }}
              tw="text-3xl text-white font-bold"
            >
              Arknights Vietnam Station
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono",
              }}
              tw="text-neutral-400"
            >
              {prodUrl}
            </div>
          </div>
          <div tw="grow" />
          <div
            style={{
              fontFamily: "JetBrains Mono",
            }}
            tw="text-3xl text-[#ff2056]"
          >
            #FOR_THE_DREAMCHASERS
          </div>
        </div>
      </div>
    </div>
  );
}
