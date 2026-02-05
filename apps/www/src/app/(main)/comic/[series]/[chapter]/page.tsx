import { Button } from "@arknights-vns/shadcn-ui/components/button";
import { ButtonGroup } from "@arknights-vns/shadcn-ui/components/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@arknights-vns/shadcn-ui/components/dropdown-menu";
import { ScrollProgress } from "@arknights-vns/shadcn-ui/components/scroll-progress";
import { ArrowLeft, ArrowRight, ArrowUpFromLine, BookOpen, StickyNote } from "lucide-react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchComicSeriesData, fetchComicSeriesImagesByChapter } from "@/app/(main)/comic/_data/fetch-data";
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

export default async function ComicReadPage(props: PageProps<"/comic/[series]/[chapter]">) {
  const { series, chapter } = await props.params;

  const seriesData = await fetchComicSeriesData(series);

  if (!seriesData) {
    notFound();
  }

  const serverImages = await fetchComicSeriesImagesByChapter(series, chapter);

  if (!serverImages) {
    notFound();
  }

  const listOfChapters = seriesData.chapters.map((x) => x.comicChapterId);
  const currentPosition = listOfChapters.indexOf(chapter);

  const hasPrev = currentPosition - 1 >= 0;
  const hasNext = currentPosition + 1 < listOfChapters.length;
  const chapterName = seriesData.chapters.filter((x) => x.comicChapterId === chapter)[0]?.chapterName;

  const images = serverImages.map((x, index) => {
    return (
      <Image
        alt={x.name}
        className="scroll-mt-19 border object-contain"
        height={380}
        id={`page-${index + 1}`}
        key={x.url}
        src={x.url}
        width={520}
      />
    );
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <aside className="place-items-center-safe sticky top-0 z-2 flex w-full flex-col gap-2 bg-background/75 p-2 pt-1 backdrop-blur-lg">
        <div className="flex gap-1 text-lg">
          <Link className="hover:underline" href={`/comic/${series}`}>
            {seriesData.title}
          </Link>
        </div>
        <div className="place-items-center-safe flex justify-between gap-2">
          <Button disabled={!hasPrev} variant={hasPrev ? "default" : "secondary"}>
            <Link
              className="place-items-center-safe flex gap-1"
              href={hasPrev ? `/comic/${series}/${listOfChapters[currentPosition - 1]}` : "/"}
            >
              <ArrowLeft />
              <span className="hidden md:inline">Chương trước</span>
            </Link>
          </Button>

          <div className="place-items-center-safe gap-4">
            <ButtonGroup>
              {/* Chapter select */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button>
                      <BookOpen />
                      {chapterName}
                    </Button>
                  }
                />
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuRadioGroup value={chapter}>
                    {seriesData.chapters.map((entry) => (
                      <DropdownMenuRadioItem key={entry.id} value={entry.id}>
                        <Link href={`/comic/${series}/${entry.comicChapterId}`}>{entry.chapterName}</Link>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Jump to page */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button>
                      <StickyNote />
                      Nhảy đến
                    </Button>
                  }
                />
                <DropdownMenuContent align="start" className="w-56">
                  {serverImages.map((entry, index) => (
                    <DropdownMenuItem key={entry.url}>
                      <Link href={{ href: `/comic/${series}/${chapter}`, hash: `page-${index + 1}` }}>
                        Trang {index + 1}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>
          <Button disabled={!hasNext} variant={hasNext ? "default" : "secondary"}>
            <Link
              className="place-items-center-safe flex gap-1"
              href={hasNext ? `/comic/${series}/${listOfChapters[currentPosition + 1]}` : "/"}
            >
              <span className="hidden md:inline">Chương kế</span>
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <ScrollProgress className="h-1 self-start rounded-r-full rounded-l-full bg-primary" />
      </aside>
      <div className="flex flex-col gap-2">{images.map((x) => x)}</div>
      <Button className="my-8 p-4">
        <Link
          className="place-items-center-safe flex gap-2"
          href={{ pathname: `/comic/${series}/${chapter}`, hash: "page-1" }}
        >
          <ArrowUpFromLine />
          Về trang nhất
        </Link>
      </Button>
    </div>
  );
}
