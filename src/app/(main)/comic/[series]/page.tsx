"use client";

import { useQuery } from "@tanstack/react-query";
import { Flame, StepForward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { FavorText, Heading, Paragraph } from "@/components/ui/extension/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { comicSeriesDataQueryOptions } from "@/query/comic";

export default function ComicSeriesDetail(properties: PageProps<"/comic/[series]">) {
  const { series } = use(properties.params);

  const { data, isLoading } = useQuery(comicSeriesDataQueryOptions(series));

  if (!data || isLoading) {
    return;
  }

  const hasRead = localStorage.getItem(`comic-${series}`) ?? "";

  const readChapter = data.chapters.filter((ch) => ch.comicChapterId === hasRead);
  const isValidPreviousChapter = hasRead && readChapter.length > 0;

  return (
    <div className="container space-y-4">
      <Breadcrumb className="sticky top-18 z-10 bg-background p-2 pl-6">
        <BreadcrumbList>
          <BreadcrumbLink render={<Link href="/comic">Truyện tại Trạm</Link>} />
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 flex flex-wrap justify-evenly gap-8">
        <div className="flex w-full justify-center md:w-1/3">
          {data.thumbnail ? (
            <Image
              alt={data.comicSeriesId}
              className="h-120 w-96 object-contain"
              height={480}
              referrerPolicy="no-referrer"
              src={data.thumbnail}
              width={384}
            />
          ) : (
            <Skeleton className="h-120 w-96" />
          )}
        </div>
        <div className="flex flex-col place-content-between gap-4 px-4 md:w-1/2">
          <div className="h-72 space-y-3">
            <Heading className="text-center font-bold text-primary text-xl md:text-left" kind="h2">
              {data.title}
            </Heading>
            <Separator className="w-md" />
            <FavorText className="whitespace-pre-line text-justify">{data.synopsis}</FavorText>
          </div>
          <div className="flex flex-wrap justify-evenly gap-4">
            <Button className="p-5 text-lg">
              <Link href={`/comic/${data.comicSeriesId}/${data.chapters[0].comicChapterId}`}>
                <StepForward />
                Đọc từ đầu
              </Link>
            </Button>
            <div>
              <Button
                className="bg-amber-700 p-5 text-lg"
                disabled={!isValidPreviousChapter}
                nativeButton={!isValidPreviousChapter}
                render={isValidPreviousChapter ? <Link href={`/comic/${series}/${hasRead}`} /> : <Button />}
              >
                <Flame />
                Tiếp tục đọc
                {/*Tiếp tục đọc - {readChapter[0].chapterName}*/}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-evenly gap-12 md:flex-row">
        <div className="flex w-full flex-col gap-12 md:w-1/3">
          <div className="flex flex-col gap-2">
            <Heading className="text-center text-primary" kind="h3">
              Thông tin truyện
            </Heading>
            <Separator className="w-sm" />
            <div className="mt-4 ml-8 space-y-2">
              <ul className="list-disc text-lg">
                <li>
                  <strong>Tác giả: </strong>
                  {data.author}
                </li>
                <li>
                  <strong>Ngày đăng truyện: </strong>
                  {new Date(
                    // biome-ignore lint/style/noNonNullAssertion: guarantee
                    data.createdAt!
                  ).toLocaleDateString()}
                </li>
                <li>
                  <strong>Cập nhật gần nhất: </strong>
                  {new Date(
                    // biome-ignore lint/style/noNonNullAssertion: guarantee
                    data.createdAt!
                  ).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Heading className="text-center text-primary" kind="h3">
              Nhóm dịch
            </Heading>
            <Separator className="w-sm" />
            <div className="mt-4 ml-8">
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
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Heading className="text-center text-primary" kind="h3">
            Chương
          </Heading>
          <Separator className="w-md" />
          <ScrollArea className="mt-4 ml-8 h-100">
            <div className="place-items-center-safe grid grid-cols-1 gap-2 md:grid-cols-3">
              {data.chapters
                .sort((x, y) => x.id - y.id)
                .map((chapter) => (
                  <Button
                    className="w-56 bg-primary/60 font-bold hover:bg-stone-800 hover:text-white"
                    key={chapter.comicChapterId}
                  >
                    <Link href={`/comic/${data.comicSeriesId}/${chapter.comicChapterId}`}>
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
