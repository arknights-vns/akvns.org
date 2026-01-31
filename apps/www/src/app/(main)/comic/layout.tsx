import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Suspense } from "react";

import LoadingLappy from "@/components/LoadingLappy";
import { getQueryClient } from "@/lib/query-client";
import { comicSeriesListingQueryOptions } from "@/react-query/comic";

export const metadata: Metadata = {
  title: "Arknights VNS | Truyện tại Trạm",
  description:
    "Các đầu truyện do đội ngũ dịch thuật @terrastationvn hoặc các bên có hợp tác với Arknights VNS.",
};

export default function ComicPageLayout(props: LayoutProps<"/comic">) {
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery(comicSeriesListingQueryOptions()).then();

  return (
    <Suspense fallback={<LoadingLappy />}>
      <HydrationBoundary state={dehydrate(queryClient)}>{props.children}</HydrationBoundary>
    </Suspense>
  );
}
