import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetchComicListByPage } from "@/functions/comic/fetch-comic-list";

export const comicListingOption = infiniteQueryOptions({
  queryKey: ["comic-list"],
  queryFn: ({ pageParam: page }) => {
    return fetchComicListByPage(page);
  },
  initialPageParam: 0,
  getNextPageParam: (lastPage) => {
    return lastPage?.canMoveNext ? lastPage.next : null;
    // return 1;
  },
});
