"use client";

import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

type ControlBarProps = {
  current: number; // zero based page index
  total: number;   // total pages
  onFirst?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onLast?: () => void;
};

export default function ControlBar({
  current,
  total,
  onFirst,
  onPrev,
  onNext,
  onLast,
}: ControlBarProps) {
  const canPrev = current > 0;
  const canNext = current < total - 1;

  const btn =
    "inline-flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div className="bottom-0 z-40 w-full border-t">
      <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-center px-4 text-black">
        <div className="flex items-center gap-2 sm:gap-3">
          <button className={btn} aria-label="First page" onClick={onFirst} disabled={!canPrev}>
            <ChevronsLeft className="h-6 w-6" />
          </button>
          <button className={btn} aria-label="Previous page" onClick={onPrev} disabled={!canPrev}>
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="mx-1 select-none text-lg font-semibold tabular-nums">
            {Math.max(1, Math.min(current + 1, total))}/{total}
          </div>

          <button className={btn} aria-label="Next page" onClick={onNext} disabled={!canNext}>
            <ChevronRight className="h-6 w-6" />
          </button>
          <button className={btn} aria-label="Last page" onClick={onLast} disabled={!canNext}>
            <ChevronsRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
