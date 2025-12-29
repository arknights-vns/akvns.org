"use client";

import { useEffect, useState } from "react";

type Chapter = {
  comicChapterId: string;
  chapterName?: string;
};

type Series = {
  comicSeriesId: string;
  title?: string;
  chapters?: Chapter[];
};


async function getSeries(seriesId: string): Promise<Series | null> {
  try {
    const r = await fetch(`/api/comic/${encodeURIComponent(seriesId)}`, { cache: "no-store" });
    if (!r.ok) return null;
    const j = await r.json();
    const data = (j?.message ?? null) as Series | null;
    return data && data.comicSeriesId ? data : null;
  } catch {
    return null;
  }
}

function formatChapter(chapterId: string) {
  return chapterId.replace(/^chapter-?/i, "Chapter ").replace(/-/g, " ");
}

export default function TopBar({ seriesId, chapterId }: { seriesId: string; chapterId: string }) {
  const [series, setSeries] = useState<Series | null>(null);
  useEffect(() => {
    let cancelled = false;
    getSeries(seriesId).then((s) => {
      if (!cancelled) setSeries(s);
    });
    return () => {
      cancelled = true;
    };
  }, [seriesId]);

  const title = series?.title ?? seriesId;


  return (
      <div className="mx-auto flex h-14 w-full max-w-screen-xl items-center justify-center ">
        <h2 className="w-full truncate text-center text-lg font-semibold bg-black">
          {title} — {formatChapter(chapterId)}
        </h2>
      </div>
  );
}
