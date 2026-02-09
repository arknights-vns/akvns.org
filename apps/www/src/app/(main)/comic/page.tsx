import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import InfiniteComicList from "@/components/comic/InfiniteComicList";
import { getQueryClient } from "@/lib/query-client";
import { comicListingOption } from "@/react-query/fetch-all-comic";

export const metadata: Metadata = {
  title: "Arknights VNS | Truyện tại Trạm",
  description:
    "Các đầu truyện do đội ngũ dịch thuật @terrastationvn hoặc các bên có hợp tác với Arknights VNS.",
};

export default async function ComicListing() {
  "use cache";
  cacheLife("days");
  // ^ https://nextjs.org/docs/messages/next-prerender-current-time
  // cause's from Drizzle, or to be exact, the Date.now() for updatedAt.

  const queryClient = getQueryClient();

  // https://tanstack.com/query/latest/docs/framework/react/examples/nextjs-app-prefetching
  // biome-ignore lint/complexity/noVoid: docs
  void queryClient.prefetchInfiniteQuery(comicListingOption);

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

      {/* I feel like this will backshot me back eventually. */}
      <Suspense>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <InfiniteComicList />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}
