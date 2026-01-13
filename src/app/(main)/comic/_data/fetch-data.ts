import { cache } from "react";

import { elysianRealm } from "@/lib/elysian-realm";

export const fetchComicSeriesData = cache(async (series: string) => {
  const resp = await elysianRealm
    .comic({
      series,
    })
    .get();

  if (resp.error) {
    throw new Error("Unable to fetch series Data");
  }

  return resp.data.message;
});
