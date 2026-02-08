"use client";

import { Badge } from "@arknights-vns/shadcn-ui/components/badge";
import { Skeleton } from "@arknights-vns/shadcn-ui/components/skeleton";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { VirtuosoGrid } from "react-virtuoso";
import { comicListingOption } from "@/react-query/fetch-all-comic";

export default function InfiniteComicList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(comicListingOption);

  const allComics = data.pages.flatMap((page) => page.message);

  return (
    <>
      <VirtuosoGrid
        endReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            // noinspection JSIgnoredPromiseFromCall
            fetchNextPage();
          }
        }}
        itemClassName=""
        itemContent={(index) => {
          // biome-ignore lint/style/noNonNullAssertion: hopefully bound-checked.
          const comic = allComics[index]!;

          return (
            <div key={comic.comicSeriesId ?? index}>
              <div className="place-items-center-safe flex flex-col gap-2">
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
                  className={cn(
                    "border bg-background p-3 font-bold",
                    comic.category === "Arknights_VNS" && "border-primary",
                    comic.category === "Partner" && "border-400",
                    comic.category === "Collaboration" && "border-black",
                    comic.category === "Community" && "border-gray-600"
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
                  className="text-center font-bold text-lg text-primary hover:underline"
                  href={`/comic/${comic.comicSeriesId}` as Route}
                >
                  {comic.title}
                </Link>
                <div>
                  <span className="font-bold">Tác giả</span>: {comic.author}
                </div>
              </div>
            </div>
          );
        }}
        listClassName="grid grid-cols-1 gap-4 md:grid-cols-3"
        overscan={30}
        totalCount={allComics.length}
        useWindowScroll={true}
      />
      {!hasNextPage && <span className="text-center text-muted-foreground">{"Hết rồi :<"}</span>}
    </>
  );
}
