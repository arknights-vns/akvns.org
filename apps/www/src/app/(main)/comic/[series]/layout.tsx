import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { ArticleJsonLd } from "next-seo";
import { fetchComicSeriesData } from "@/app/(main)/comic/_data/fetch-data";
import { drizzleDb } from "@/lib/drizzle";

export async function generateMetadata(props: LayoutProps<"/comic/[series]">): Promise<Metadata> {
  const { series } = await props.params;
  const comicData = await fetchComicSeriesData(series);

  return {
    title: `Arknights VNS | ${comicData.title}`,
  };
}

export async function generateStaticParams() {
  "use cache";
  cacheLife("days");

  const series = await drizzleDb.query.comicSeries.findMany({
    columns: {
      comicSeriesId: true,
    },
  });

  return series.map((entry) => {
    return {
      series: entry.comicSeriesId,
    };
  });
}

export default async function ComicDataLayout(props: LayoutProps<"/comic/[series]">) {
  const { series } = await props.params;
  const data = await fetchComicSeriesData(series);

  // const queryClient = getQueryClient();

  // queryClient.prefetchQuery(comicSeriesDataQueryOptions(series)).then();

  return (
    <>
      <ArticleJsonLd
        author={data.author}
        dateModified={data.updatedAt}
        datePublished={data.createdAt}
        description={data.synopsis}
        headline={data.title}
        image={data.thumbnail || "https://example.com"}
        isAccessibleForFree={true}
        publisher="Arknights Vietnam Station"
        type="Article"
      />
      {props.children}
    </>
  );
}
