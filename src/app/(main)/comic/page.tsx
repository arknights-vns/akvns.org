"use client";

import type { Route } from "next";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavorText, Heading } from "@/components/ui/extension/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { comicSeriesListingQueryOptions } from "@/query/comic";

export default function ComicListing() {
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(comicSeriesListingQueryOptions());

  if (!data) {
    return;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-4 text-center">
        <Heading className="text-primary" kind="h1">
          Truyện tại Trạm
        </Heading>
        <FavorText>
          Các đầu truyện do đội ngũ dịch thuật @terrastationvn hoặc các bên có hợp tác với Arknights VNS.
        </FavorText>
      </div>
      <div className="py-12">
        {data.pages.map((page, i) => (
          <div
            className="place-items-center-safe grid grid-cols-1 gap-12 md:grid-cols-3"
            // biome-ignore lint/suspicious/noArrayIndexKey: Paginated.
            key={i}
          >
            {page?.message.map((comic) => {
              return (
                <div className="place-items-center-safe flex flex-col gap-2" key={comic.comicSeriesId}>
                  <div className="rounded-md border">
                    {comic.thumbnail === null ? (
                      <Skeleton className="h-72 w-48" />
                    ) : (
                      <Image
                        alt={comic.comicSeriesId}
                        className="h-68 w-48 bg-foreground object-cover"
                        height={272}
                        loading="eager"
                        src={comic.thumbnail}
                        width={192}
                      />
                    )}
                  </div>
                  <Badge
                    className={clsx(
                      "p-3 font-bold",
                      comic.category === "Arknights_VNS" && "bg-primary",
                      comic.category === "Partner" && "bg-amber-400",
                      comic.category === "Collaboration" && "bg-black",
                      comic.category === "Collaboration" && "bg-gray-600"
                    )}
                  >
                    {
                      {
                        Arknights_VNS: "@terrastationvn",
                        Partner: "Partner",
                        Collaboration: "Collab",
                        Community: "Community",
                      }[comic.category]
                    }
                  </Badge>
                  <Link
                    className="text-center font-bold text-lg hover:underline"
                    href={`/comic/${comic.comicSeriesId}` as Route}
                  >
                    {comic.title}
                  </Link>
                  <span>
                    <span className="font-bold">Tác giả</span>: {comic.author}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="place-items-center-safe my-4 flex flex-col gap-4">
        <span className="text-muted-foreground">Có vẻ tới đây là hết trang rồi.</span>
        <Button className="w-fit" disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          <Plus />
          Tải thêm danh sách truyện
        </Button>
      </div>
    </div>
  );
}
