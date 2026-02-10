import {
  ScrollProgress,
  ScrollProgressContainer,
  ScrollProgressProvider,
} from "@arknights-vns/shadcn-ui/components/animate-ui/primitives/animate/scroll-progress";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@arknights-vns/shadcn-ui/components/breadcrumb";
import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentArea from "@/components/ContentArea";
import BottomDock from "@/components/comic/BottomDock";
import { fetchComicSeriesImagesByChapter } from "@/functions/comic/fetch-series-chapter-images";
import { fetchComicSeriesData } from "@/functions/comic/fetch-series-data";
import { drizzleDb } from "@/lib/drizzle";

export async function generateMetadata(props: PageProps<"/comic/[series]/[chapter]">): Promise<Metadata> {
  const { series, chapter } = await props.params;

  const comicData = await fetchComicSeriesData(series);

  if (!comicData) {
    notFound();
  }

  const currentChapter = comicData.chapters.filter((x) => x.comicChapterId === chapter)[0]?.chapterName;

  return {
    title: `Arknights VNS | ${comicData.title} | ${currentChapter}`,
  };
}

export async function generateStaticParams() {
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

export default async function ComicReadPage(props: PageProps<"/comic/[series]/[chapter]">) {
  "use cache";
  const { series, chapter } = await props.params;

  cacheTag("comic-images", series, chapter);
  cacheLife("max");

  const seriesData = await fetchComicSeriesData(series);
  const serverImages = await fetchComicSeriesImagesByChapter(series, chapter);

  // biome-ignore lint/complexity/useSimplifiedLogicExpression: no, thanks, De Morgan.
  if (!seriesData || !serverImages) {
    notFound();
  }

  const listOfChapters = seriesData.chapters.map((x) => x.comicChapterId);
  const chapterPosition = listOfChapters.indexOf(chapter);
  const chapterName = seriesData.chapters.filter((x) => x.comicChapterId === chapter)[0]?.chapterName;

  return (
    <ScrollProgressProvider global={true}>
      <div className="sticky top-0 flex flex-col">
        <Breadcrumb className="ml-4 bg-background py-2">
          <BreadcrumbList>
            <BreadcrumbLink render={<Link href="/comic">Truyện tại Trạm</Link>} />
            <BreadcrumbSeparator />
            <BreadcrumbLink
              className="line-clamp-1 max-w-1/3 text-ellipsis"
              render={<Link href={`/comic/${series}`}>{seriesData.title}</Link>}
            />
            <BreadcrumbSeparator />
            <BreadcrumbPage className="line-clamp-1 max-w-1/3 text-ellipsis"> {chapterName}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <ScrollProgress className="h-1 rounded-r-full bg-primary" />
      </div>

      <ContentArea className="flex flex-col gap-4 pt-0! pb-4!">
        <div className="flex flex-col gap-2">
          <Heading className="text-center text-primary" kind="h1">
            {seriesData.title}
          </Heading>
          <FavorText className="text-center">{chapterName}</FavorText>
        </div>
        <ScrollProgressContainer className="place-items-center-safe flex flex-col gap-4">
          {serverImages.map((x, index) => {
            return (
              <Image
                alt={x.name}
                className="scroll-mt-26 border object-contain"
                height={380}
                id={`page-${index + 1}`}
                key={x.url}
                priority={true}
                src={x.url}
                width={520}
              />
            );
          })}
        </ScrollProgressContainer>
      </ContentArea>

      <BottomDock
        chapterIndex={chapterPosition}
        chapterList={seriesData.chapters.map((x) => {
          return {
            id: x.comicChapterId,
            name: x.chapterName,
          };
        })}
        comicId={series}
      />
    </ScrollProgressProvider>
  );
}
