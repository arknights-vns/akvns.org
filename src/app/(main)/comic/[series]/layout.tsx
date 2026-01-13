import type { Metadata } from "next";
import { ArticleJsonLd } from "next-seo";
import { cache } from "react";

import { elysianRealm } from "@/lib/elysian-realm";
import { getQueryClient } from "@/lib/query-client";
import { comicSeriesDataQueryOptions } from "@/query/comic";

const fetchComicSeriesData = cache(async (series: string) => {
  const resp = await elysianRealm
    .comic({
      series,
    })
    .get();

  if (resp.error) {
    throw new Error("Unable to fetch series Data");
  }

  return resp.data.message;
});

export async function generateMetadata(props: LayoutProps<"/comic/[series]">): Promise<Metadata> {
  const { series } = await props.params;

  const comicData = await fetchComicSeriesData(series);

  return {
    title: `Arknights VNS | Truyện: ${comicData.title}`,
  };
}

export default async function ComicSeriesInfoLayout(props: LayoutProps<"/comic/[series]">) {
  const { series } = await props.params;
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(comicSeriesDataQueryOptions(series)).then();

  const comicData = await fetchComicSeriesData(series);

  return (
    <>
      <ArticleJsonLd
        author={comicData.author}
        dateModified={comicData.updatedAt || new Date().toISOString()}
        datePublished={comicData.createdAt || new Date().toISOString()}
        description={comicData.synopsis}
        headline={comicData.title}
        image={comicData.thumbnail || "https://example.com"}
        isAccessibleForFree={true}
        publisher="Arknights Vietnam Station"
        type="Article"
      />
      {props.children}
    </>
  );
}
