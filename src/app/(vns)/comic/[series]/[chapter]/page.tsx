"use client";

import type { Route } from "next";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

import {
    ScrollProgress,
    ScrollProgressContainer,
    ScrollProgressProvider,
} from "@/components/animate-ui/primitives/animate/scroll-progress";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import elysianRealm from "@/lib/elysian-realm";

export default function MangaReaderPage(
    props: PageProps<"/comic/[series]/[chapter]">,
) {
    const { series, chapter } = use(props.params);

    const { data: serverImages, isPending: imagesFetching } = useQuery({
        queryKey: ["comic-images", series, chapter],
        queryFn: async () => {
            const response = await elysianRealm
                .comic({ series })
                .info({ chapter })
                .images.get();

            if (response.error) {
                throw new Error("Failed to fetch comic");
            }

            return response.data.message;
        },
    });

    const { data: seriesData } = useQuery({
        queryKey: ["comic-series-data", series],
        queryFn: async () => {
            const response = await elysianRealm.comic({ series }).get();

            if (response.error) {
                throw new Error("Failed to fetch comic");
            }

            return response.data.message;
        },
    });

    const { data: chapterData } = useQuery({
        queryKey: ["comic-chapter-data", chapter],
        queryFn: async () => {
            const response = await elysianRealm
                .comic({ series })
                .info({ chapter })
                .get();

            if (response.error) {
                throw new Error("Failed to fetch comic");
            }

            return response.data.message;
        },
    });

    if (imagesFetching) return;

    if (!seriesData || !chapterData || !serverImages) return;

    const images = serverImages.map((x, index) => {
        return (
            <Image
                key={x.name}
                src={x.url}
                alt={x.name}
                width={400}
                height={360}
                id={`page-${index + 1}`}
                className="border"
            />
        );
    });

    return (
        <ScrollProgressProvider global={true}>
            <div className="flex flex-col items-center gap-4">
                {/* To whom gonna perform the code review on this, my condolences - Đụt */}
                {/* It's all copying and pasting, like the old Dreamchasers web. */}
                <aside className="place-items-center-safe sticky top-18 flex w-full flex-col gap-2 bg-background/50 pt-1 backdrop-blur-lg">
                    <div className="flex gap-1 md:hidden">
                        <Link
                            href={`/comic/${series}`}
                            className="hover:underline"
                        >
                            {seriesData.title}
                        </Link>
                        <Separator
                            orientation="vertical"
                            className="inline bg-foreground"
                        />
                        <span>{chapterData.name}</span>
                    </div>
                    <div className="place-items-center-safe flex w-[90vw] justify-between">
                        <Button
                            disabled={chapterData.prev === null}
                            render={
                                chapterData.prev ? (
                                    <Link
                                        href={
                                            `/comic/${series}/${chapterData.prev}` as Route
                                        }
                                    />
                                ) : (
                                    <Button />
                                )
                            }
                            nativeButton={chapterData.prev === null}
                        >
                            <ArrowLeft />
                            Chương trước
                        </Button>

                        <div className="place-items-center-safe hidden gap-4 md:flex">
                            <Link
                                href={`/comic/${series}`}
                                className="hover:underline"
                            >
                                {seriesData.title}
                            </Link>
                            <Separator
                                orientation="vertical"
                                className="bg-foreground"
                            />
                            <span>{chapterData.name}</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <Button>
                                            <BookOpen /> Đi đến trang
                                        </Button>
                                    }
                                />
                                <DropdownMenuContent
                                    className="w-56"
                                    align="start"
                                >
                                    {serverImages.map((entry, index) => (
                                        <DropdownMenuItem
                                            key={entry.url}
                                            render={
                                                <Link
                                                    href={
                                                        `/comic/${series}/${chapter}#page-${index + 1}` as Route
                                                    }
                                                />
                                            }
                                        >
                                            Trang {index + 1}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="md:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <Button>
                                            <BookOpen /> Đi đến trang
                                        </Button>
                                    }
                                />
                                <DropdownMenuContent
                                    className="w-56"
                                    align="start"
                                >
                                    {serverImages.map((entry, index) => (
                                        <DropdownMenuItem
                                            key={entry.url}
                                            render={
                                                <Link
                                                    href={
                                                        `/comic/${series}/${chapter}#page-${index + 1}` as Route
                                                    }
                                                />
                                            }
                                        >
                                            Trang {index + 1}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <Button
                            disabled={chapterData.next === null}
                            render={
                                chapterData.next ? (
                                    <Link
                                        href={
                                            `/comic/${series}/${chapterData.next}` as Route
                                        }
                                    />
                                ) : (
                                    <Button />
                                )
                            }
                            nativeButton={chapterData.next === null}
                        >
                            <ArrowRight />
                            Chương kế
                        </Button>
                    </div>
                    <ScrollProgress className="h-1 self-start rounded-r-full rounded-l-full bg-primary" />
                </aside>
                <ScrollProgressContainer>
                    <div className="flex flex-col gap-2 py-4">
                        {images.map((x) => x)}
                    </div>
                </ScrollProgressContainer>
            </div>
        </ScrollProgressProvider>
    );
}
