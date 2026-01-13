import type { Metadata } from "next";

import { fetchComicSeriesData } from "@/app/(main)/comic/_data/fetch-data";
import { getQueryClient } from "@/lib/query-client";
import { comicImageQueryOptions } from "@/query/comic";

export async function generateMetadata(props: LayoutProps<"/comic/[series]/[chapter]">): Promise<Metadata> {
  const { series, chapter } = await props.params;

  const comicData = await fetchComicSeriesData(series);
  const currentChapter = comicData.chapters.filter((x) => x.comicChapterId === chapter)[0].chapterName;

  return {
    title: `Arknights VNS | Truyện: ${comicData.title} | ${currentChapter}`,
  };
}

export default async function ComicSeriesChapterReadLayout(props: LayoutProps<"/comic/[series]/[chapter]">) {
  const { series, chapter } = await props.params;
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(comicImageQueryOptions({ series, chapter })).then();

  return <>{props.children}</>;
}
