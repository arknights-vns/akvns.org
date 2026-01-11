import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import {
  getComicChapterList,
  getComicSeriesChapterImages,
  getComicSeriesChapterInfo,
  getComicSeriesInfo,
  getComicSeriesListByPage,
} from "@/functions/comic";

/**
 * React Query Options for fetching comic series data.
 *
 * @param series Series name.
 * @returns The query options.
 */
export const comicSeriesDataQueryOptions = (series: string) =>
  queryOptions({
    queryKey: ["comic-series", series],
    queryFn: async () => {
      const resp = await getComicSeriesInfo({
        data: {
          series,
        },
      });

      return resp.message;
    },
  });

export const comicImageQueryOptions = ({ series, chapter }: { series: string; chapter: string }) =>
  queryOptions({
    queryKey: ["comic-images", series, chapter],
    queryFn: async () => {
      const resp = await getComicSeriesChapterImages({
        data: {
          series,
          chapter,
        },
      });

      return resp.message;
    },
  });

export const comicChapterQueryOptions = ({ series, chapter }: { series: string; chapter: string }) =>
  queryOptions({
    queryKey: ["comic-chapter", series, chapter],
    queryFn: async () => {
      const response = await getComicSeriesChapterInfo({
        data: {
          series,
          chapter,
        },
      });

      return response.message;
    },
  });

export const comicSeriesListingQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["comic"],
    queryFn: async ({ pageParam }) => {
      const resp = await getComicSeriesListByPage({
        data: {
          page: pageParam,
        },
      });

      return resp;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.canMoveNext ? lastPage.next : null;
    },
  });

export const comicChapterListQueryOptions = (series: string) =>
  queryOptions({
    queryKey: ["comic-chapters", series],
    queryFn: async () => {
      const response = await getComicChapterList({
        data: {
          series,
        },
      });

      return response.message;
    },
  });
