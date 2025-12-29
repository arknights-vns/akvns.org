"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import ControlBar from "@/components/controlbar";
import TopBar from "@/components/topbar";

export default function Page() {
    const total = 30;
    const [current, setCurrent] = useState(0);

    // I should as someone about this "image host" or atleast an example
    const demo = useMemo(
        () => `https://picsum.photos/seed/akvns-${current + 1}/1200/1800`,
        [current],
    );

    //   There has to an easier method than this
    const onFirst = useCallback(() => setCurrent(0), []);
    const onPrev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
    const onNext = useCallback(() => setCurrent((c) => Math.min(total - 1, c + 1)), []);
    const onLast = useCallback(() => setCurrent(total - 1), []);

    return (
        <main className="min-h-screen">
            <TopBar seriesId="cung-dung-bua" chapterId="chapter-0" />
            <section className="mx-auto max-w-[1200px] px-4 py-6">
                <div className="flex justify-center">
                    <div className="overflow-hidden rounded-md bg-black/5">
                        <Image
                            src={demo}
                            alt={`Page ${current + 1}`}
                            width={900}
                            height={1300}
                            className="block h-auto w-auto max-w-full object-contain"
                            priority={true}
                            unoptimized={true}
                        />
                    </div>
                </div>
            </section>
            <ControlBar
                current={current}
                total={total}
                onFirst={onFirst}
                onPrev={onPrev}
                onNext={onNext}
                onLast={onLast}
            />
        </main>
    );
}
