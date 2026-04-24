"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white font-sans md:px-10 dark:bg-neutral-950" ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          // oxlint-disable-next-line react/no-array-index-key
          <div key={index} className="relative z-10 flex justify-start pt-10 md:gap-10 md:pt-40">
            <div className="sticky top-24 flex w-16 shrink-0 max-w-xs flex-col items-start self-start md:top-40 md:w-full md:flex-row md:items-center md:shrink lg:max-w-sm">
              <h3 className="relative z-20 mb-3 w-16 bg-white px-2 text-center text-2xl font-bold text-primary md:hidden dark:bg-neutral-950">
                {item.title}
              </h3>
              <div className="relative left-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white md:absolute md:left-3 dark:bg-black">
                <div className="h-4 w-4 rounded-full border bg-primary p-2" />
              </div>
              <h3 className="hidden text-xl font-bold text-primary md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pr-4 pl-20 pt-12 md:pl-4 md:pt-0">
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            // oxlint-disable-next-line prefer-template
            height: height + "px",
          }}
          className="absolute top-0 left-8 z-0 w-0.5 overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8 dark:via-neutral-700"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-0.5 rounded-full bg-linear-to-t from-primary from-0% via-red-500 via-10% to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
