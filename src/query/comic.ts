import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { elysianRealm } from "@/lib/elysian-realm";

/**
 * TanStack Query options for fetching comic series data.
 *
 * @param series Series name.
 * @returns The query options.
 */
export const comicSeriesDataQueryOptions = (series: string) =>
  queryOptions({
    queryKey: ["comic-series", series],
    queryFn: async () => {
      const resp = await elysianRealm
        .comic({
          series,
        })
        .get();

      if (resp.error) {
        throw new Error("Unable to fetch series Data");
      }

      return resp.data.message;
    },
  });

/**
 * TanStack Query options for fetching comic series chapter images.
 *
 * @param series Series name.
 * @param chapter Chapter ID.
 * @returns The query options.
 */
export const comicImageQueryOptions = ({ series, chapter }: { series: string; chapter: string }) =>
  queryOptions({
    queryKey: ["comic-images", series, chapter],
    queryFn: async () => {
      const resp = await elysianRealm.comic({ series }).images({ chapter }).get();

      if (resp.error) {
        throw new Error("Unable to fetch series Data");
      }

      return resp.data.message;
    },
  });

/**
 * TanStack Query infinite query options for fetching comic series listing. Defaults to 15 per pages.
 *
 * @returns The infinite query options.
 */
export const comicSeriesListingQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["comic"],
    queryFn: async ({ pageParam }) => {
      const { data: resp } = await elysianRealm.comic.get({
        query: {
          page: pageParam,
        },
      });

      return resp;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.canMoveNext ? lastPage.next : null;
    },
  });
