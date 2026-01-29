"use client";

import { Button } from "@arknights-vns/ui/components/button";
import { ButtonGroup } from "@arknights-vns/ui/components/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@arknights-vns/ui/components/dropdown-menu";
import { ScrollProgress } from "@arknights-vns/ui/components/scroll-progress";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, ArrowUpFromLine, BookOpen, StickyNote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { comicImageQueryOptions, comicSeriesDataQueryOptions } from "@/query/comic";

export default function ComicReadPage(props: PageProps<"/comic/[series]/[chapter]">) {
  const { series, chapter } = use(props.params);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorage.setItem(`comic-${series}`, chapter);
  }, [chapter, series]);

  useEffect(() => {
    localStorage.setItem(`comic-${series}-page`, currentPage.toString());
  }, [series, currentPage]);

  const { data: seriesData } = useSuspenseQuery(comicSeriesDataQueryOptions(series));
  const { data: serverImages } = useSuspenseQuery(comicImageQueryOptions({ series, chapter }));

  const listOfChapters = seriesData.chapters.map((x) => x.comicChapterId);
  const currentPosition = listOfChapters.indexOf(chapter);

  const hasPrev = currentPosition - 1 >= 0;
  const hasNext = currentPosition + 1 < listOfChapters.length;
  const chapterName = seriesData.chapters.filter((x) => x.comicChapterId === chapter)[0]?.chapterName;

  const images = serverImages.map((x, index) => {
    return (
      <InView as="div" key={x.name} onChange={(inView) => inView && setCurrentPage(index + 1)}>
        <Image
          alt={x.name}
          className="scroll-mt-19 border object-contain"
          height={380}
          id={`page-${index + 1}`}
          src={x.url}
          width={520}
        />
      </InView>
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
          <Button disabled={!hasPrev}>
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
          <Button disabled={!hasNext}>
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
