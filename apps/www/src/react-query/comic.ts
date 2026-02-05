import { infiniteQueryOptions } from "@tanstack/react-query";

import { elysianRealm } from "@/lib/elysian-realm";

/**
 * TanStack Query infinite query options for fetching comic series listing. Defaults to 15 per pages.
 *
 * @returns The infinite query options.
 */
export const comicSeriesListingQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["comic"],
    queryFn: async ({ pageParam }) => {
      const resp = await elysianRealm.comic.get({
        query: {
          page: pageParam,
        },
      });

      if (resp.error) {
        throw new Error("Unable to fetch paginated series listing");
      }

      return resp.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.canMoveNext ? lastPage.next : null;
    },
  });
