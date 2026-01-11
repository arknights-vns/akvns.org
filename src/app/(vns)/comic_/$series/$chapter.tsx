import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpFromLine,
    BookOpen,
    StickyNote,
} from "lucide-react";
import { useEffect } from "react";

import {
    ScrollProgress,
    ScrollProgressContainer,
    ScrollProgressProvider,
} from "@/components/animate-ui/primitives/animate/scroll-progress";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    getComicChapterList,
    getComicSeriesChapterImages,
    getComicSeriesChapterInfo,
    getComicSeriesInfo,
} from "@/functions/comic";

export const Route = createFileRoute("/(vns)/comic_/$series/$chapter")({
    component: ComicReadPage,
});

function ComicReadPage() {
    const { series, chapter } = Route.useParams();

    const { data: serverImages } = useSuspenseQuery({
        queryKey: ["comic-images", series, chapter],
        queryFn: async () => {
            const response = await getComicSeriesChapterImages({
                data: {
                    series,
                    chapter,
                },
            });

            return response.message;
        },
    });

    const { data: seriesData } = useSuspenseQuery({
        queryKey: ["comic-series-data", series],
        queryFn: async () => {
            const response = await getComicSeriesInfo({
                data: {
                    series,
                },
            });

            return response.message;
        },
    });

    const { data: chapterData } = useSuspenseQuery({
        queryKey: ["comic-chapter-data", chapter],
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

    const { data: chapterList } = useSuspenseQuery({
        queryKey: ["comic-chapter-list", chapter],
        queryFn: async () => {
            const response = await getComicChapterList({
                data: {
                    series,
                },
            });

            return response.message;
        },
    });

    useEffect(() => {
        localStorage.setItem(`comic-${series}`, chapter);
    }, [series, chapter]);

    const listOfChapters = chapterList.map((x) => x.id);
    const currentPosition = listOfChapters.indexOf(chapter);

    const hasPrev = currentPosition - 1 >= 0;
    const hasNext = currentPosition + 1 < listOfChapters.length;

    const images = serverImages.map((x, index) => {
        return (
            <Image
                key={x.name}
                src={x.url}
                alt={x.name}
                width={520}
                height={380}
                id={`page-${index + 1}`}
                priority={true}
                className="scroll-mt-19 border object-contain"
                referrerPolicy="no-referrer"
            />
        );
    });

    return (
        <ScrollProgressProvider global={true}>
            <div className="flex flex-col items-center gap-4">
                <aside className="place-items-center-safe sticky top-0 z-2 flex w-full flex-col gap-2 bg-background/75 pt-1 backdrop-blur-lg">
                    <div className="flex gap-1 text-lg">
                        <Link
                            to="/comic/$series"
                            params={{
                                series,
                            }}
                            className="hover:underline"
                        >
                            {seriesData.title}
                        </Link>
                    </div>
                    <div className="place-items-center-safe flex justify-between gap-2">
                        <Button
                            disabled={!hasPrev}
                            render={
                                hasPrev ? (
                                    <Link
                                        to="/comic/$series/$chapter"
                                        params={{
                                            series,
                                            chapter:
                                                listOfChapters[
                                                    currentPosition - 1
                                                ],
                                        }}
                                    />
                                ) : (
                                    <Button />
                                )
                            }
                            nativeButton={!hasPrev}
                        >
                            <ArrowLeft />
                            <span className="hidden md:inline">
                                Chương trước
                            </span>
                        </Button>

                        <div className="place-items-center-safe gap-4">
                            <ButtonGroup>
                                {/* Chapter select */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        render={
                                            <Button>
                                                <BookOpen />
                                                {chapterData.name}
                                            </Button>
                                        }
                                    />
                                    <DropdownMenuContent
                                        className="w-56"
                                        align="start"
                                    >
                                        <DropdownMenuRadioGroup value={chapter}>
                                            {chapterList.map((entry) => (
                                                <DropdownMenuRadioItem
                                                    key={entry.id}
                                                    value={entry.id}
                                                    render={
                                                        <Link
                                                            to="/comic/$series/$chapter"
                                                            params={{
                                                                series,
                                                                chapter:
                                                                    entry.id,
                                                            }}
                                                        />
                                                    }
                                                >
                                                    {entry.name}
                                                </DropdownMenuRadioItem>
                                            ))}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {/* Jump to page */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        render={
                                            <Button>
                                                <StickyNote />
                                                Nhảy đến
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
                                                        to={`/comic/$series/$chapter`}
                                                        params={{
                                                            series,
                                                            chapter,
                                                        }}
                                                        hash={`page-${index + 1}`}
                                                    />
                                                }
                                            >
                                                Trang {index + 1}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </ButtonGroup>
                        </div>

                        <Button
                            disabled={!hasNext}
                            render={
                                hasNext ? (
                                    <Link
                                        to="/comic/$series/$chapter"
                                        params={{
                                            series,
                                            chapter:
                                                listOfChapters[
                                                    currentPosition + 1
                                                ],
                                        }}
                                    />
                                ) : (
                                    <Button />
                                )
                            }
                            nativeButton={!hasNext}
                        >
                            <span className="hidden md:inline">Chương kế</span>
                            <ArrowRight />
                        </Button>
                    </div>
                    <ScrollProgress className="h-1 self-start rounded-r-full rounded-l-full bg-primary" />
                </aside>
                <ScrollProgressContainer className="flex flex-col gap-2">
                    {images.map((x) => x)}
                </ScrollProgressContainer>
                <Button
                    render={
                        <Link
                            to={`/comic/$series/$chapter`}
                            params={{
                                series,
                                chapter,
                            }}
                            hash="page-1"
                        />
                    }
                    nativeButton={false}
                    className="my-8 p-4"
                >
                    <ArrowUpFromLine />
                    Về trang nhất
                </Button>
            </div>
        </ScrollProgressProvider>
    );
}
