"use client";

import { Badge } from "@arknights-vns/shadcn-ui/components/badge";
import { Button } from "@arknights-vns/shadcn-ui/components/button";
import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import { Skeleton } from "@arknights-vns/shadcn-ui/components/skeleton";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { elysianRealm } from "@/lib/elysian-realm";

export default function ComicListing() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
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
                    className={cn(
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
