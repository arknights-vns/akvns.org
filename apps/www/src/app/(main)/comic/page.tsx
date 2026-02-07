"use client";

import { Badge } from "@arknights-vns/shadcn-ui/components/badge";
import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import { Skeleton } from "@arknights-vns/shadcn-ui/components/skeleton";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { VirtuosoGrid } from "react-virtuoso";
import { elysianRealm } from "@/lib/elysian-realm";

export default function ComicListing() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["comic"],
    queryFn: async ({ pageParam }) => {
      const resp = await elysianRealm.comic.get({
        query: {
          page: pageParam,
        },
      });

      if (resp.error) {
        throw new Error("Unable to fetch paginated series listing.");
      }

      return resp.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.canMoveNext ? lastPage.next : null;
    },
  });

  const allComics = data.pages.flatMap((page) => page.message);

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

      <VirtuosoGrid
        endReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
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
                <span>
                  <span className="font-bold">Tác giả</span>: {comic.author}
                </span>
              </div>
            </div>
          );
        }}
        listClassName="grid grid-cols-1 gap-4 md:grid-cols-3"
        overscan={30}
        totalCount={allComics.length}
        useWindowScroll={true}
      />

      {!hasNextPage && (
        <span className="my-4 text-center text-muted-foreground">Có vẻ tới đây là hết rồi...</span>
      )}
    </div>
  );
}
