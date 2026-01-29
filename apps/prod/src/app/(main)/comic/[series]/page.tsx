"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@arknights-vns/ui/components/breadcrumb";
import { Button } from "@arknights-vns/ui/components/button";
import { Heading, Paragraph } from "@arknights-vns/ui/components/extension/typography";
import { ScrollArea } from "@arknights-vns/ui/components/scroll-area";
import { Separator } from "@arknights-vns/ui/components/separator";
import { Skeleton } from "@arknights-vns/ui/components/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BookCopy, ListOrdered } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { comicSeriesDataQueryOptions } from "@/query/comic";

export default function ComicSeriesDetail(properties: PageProps<"/comic/[series]">) {
  const { series } = use(properties.params);
  const [hasRead, setHasRead] = useState("a-very-long-and-random-ass-and-i-wrote-this-by-hand");

  const { data } = useSuspenseQuery(comicSeriesDataQueryOptions(series));

  useEffect(() => {
    // obligatory: https://react.dev/learn/you-might-not-need-an-effect
    // localStorage counts as one I guess?
    const readItem = localStorage.getItem(`comic-${series}`) ?? "";
    setHasRead(readItem);
  }, [series]);

  const readChapter = data.chapters.filter((ch) => ch.comicChapterId === hasRead);
  const isValidPreviousChapter = hasRead && readChapter.length > 0;

  return (
    <div className="space-y-4">
      <Breadcrumb className="sticky top-18 z-10 bg-background p-2 pl-6">
        <BreadcrumbList>
          <BreadcrumbLink render={<Link href="/comic">Truyện tại Trạm</Link>} />
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2 [&>div]:m-4">
        <div className="place-self-center">
          {data.thumbnail === null ? (
            <Skeleton className="h-72 w-48" />
          ) : (
            <Image
              alt={data.comicSeriesId}
              className="h-96 w-auto object-contain"
              height={576}
              loading="eager"
              src={data.thumbnail}
              width={384}
            />
          )}
        </div>
        <div className="flex h-full flex-col justify-between self-start">
          <div className="flex flex-col gap-2 p-2">
            <Heading className="font-bold text-primary" kind="h1">
              {data.title}
            </Heading>
            <Separator className="h-1" />
            <Paragraph className="mt-0 text-justify">{data.synopsis}</Paragraph>
          </div>
          <div className="flex flex-wrap justify-evenly gap-4 [&>button>a]:text-lg [&>button]:h-12 [&>button]:w-64">
            <Button className="bg-primary/50!">
              <Link href={`/comic/${series}/${data.chapters[0]?.comicChapterId}`}>Bắt đầu đọc</Link>
            </Button>
            <Button
              className="border border-primary"
              disabled={!isValidPreviousChapter}
              variant={isValidPreviousChapter ? "secondary" : "ghost"}
            >
              <Link href={`/comic/${series}/${hasRead}`}>Đọc tiếp</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <Heading className="place-items-center-safe flex gap-2 font-bold text-primary" kind="h1">
            <BookCopy />
            Thông tin truyện
          </Heading>
          <Separator className="h-1" />
          <div className="space-y-2">
            <ul className="list-inside list-disc text-lg">
              <li>
                <span className="font-bold">Tác giả: </span>
                {data.author}
              </li>
              <li>
                <span className="font-bold">Ngày đăng truyện: </span>
                {new Date(data.createdAt).toDateString()}
              </li>
              <li>
                <span className="font-bold">Cập nhật gần nhất: </span>
                {new Date(data.updatedAt).toDateString()}
              </li>
              <li>
                {/* https://stackoverflow.com/a/5899394 */}
                <span className="font-bold">Thông tin nhóm dịch: </span>
                {data.contributors.length > 0 ? (
                  <ul className="list-disc">
                    <Paragraph className="mt-4 gap-4 space-y-2 text-lg">
                      {data.contributors.map((contributor) => (
                        <li key={contributor.id}>
                          <strong>{contributor.role}: </strong>
                          {contributor.members.join(", ")}
                        </li>
                      ))}
                    </Paragraph>
                  </ul>
                ) : (
                  <span>Chưa có thông tin nhóm dịch!</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <Heading className="place-items-center-safe flex gap-2 font-bold text-primary" kind="h1">
            <ListOrdered />
            Danh sách chương
          </Heading>
          <Separator className="h-1" />
          <ScrollArea className="h-100">
            <div className="place-items-center-safe grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.chapters
                .sort((x, y) => x.id - y.id)
                .map((chapter) => (
                  <Button
                    className="w-58 font-bold hover:border-primary! hover:bg-primary/50!"
                    key={chapter.comicChapterId}
                    variant="outline"
                  >
                    <Link href={`/comic/${series}/${chapter.comicChapterId}` as Route}>
                      {chapter.chapterName}
                    </Link>
                  </Button>
                ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
