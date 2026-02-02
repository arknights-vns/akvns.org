import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { fetchComicSeriesData } from "@/app/(main)/comic/_data/fetch-data";
import { drizzleDb } from "@/lib/drizzle";

export async function generateStaticParams() {
  "use cache";
  cacheLife("days");

  const series = await drizzleDb.query.comicSeries.findMany({
    columns: {
      comicSeriesId: true,
    },
    with: {
      chapters: true,
    },
  });

  const entries: { series: string; chapter: string }[] = [];

  for (const entry of series) {
    const chapters = entry.chapters.map((ch) => ch.comicChapterId);

    for (const chapter of chapters) {
      entries.push({
        series: entry.comicSeriesId,
        chapter,
      });
    }
  }

  return entries;
}

export async function generateMetadata(props: LayoutProps<"/comic/[series]/[chapter]">): Promise<Metadata> {
  const { series, chapter } = await props.params;

  const comicData = await fetchComicSeriesData(series);

  const currentChapter = comicData.chapters.filter((x) => x.comicChapterId === chapter)[0]?.chapterName;

  return {
    title: `Arknights VNS | ${comicData.title} | ${currentChapter}`,
  };
}

export default async function ComicSeriesChapterReadLayout(props: LayoutProps<"/comic/[series]/[chapter]">) {
  // const { series, chapter } = await props.params;
  // const queryClient = getQueryClient();

  // queryClient.prefetchQuery(comicImageQueryOptions({ series, chapter })).then();

  return <>{props.children}</>;
}
