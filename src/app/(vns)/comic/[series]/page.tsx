"use client";

import Facebook from "@public/brand/facebook.svg";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/extension/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ComicCategory } from "@/generated/prisma/enums";

type ComicChapter = {
    comicSeriesId: string;
    createAt: Date;
    updateAt: Date;
    comicChapterId: string;
    chapterName: string;
};

type ComicSeries = {
    comicSeriesId: string;
    title: string;
    synopsis: string;
    author: string;
    thumbnailImage: string;
    category: ComicCategory;
    translators: string;
    createAt: Date;
    updateAt: Date;
    likeCount: number;
    viewCount: number;
};

type SeriesInfo = ComicSeries & {
    comicChapters: ComicChapter[];
};

export default function ComicSeriesDetail(properties: PageProps<"/comic/[series]">) {
    const parameters = use(properties.params);
    const { series } = parameters;

    const formatDateTime = (date: Date): string => {
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const seriesInfo: SeriesInfo = {
        comicSeriesId: "thien-su-nha-ben",
        title: "Thiên sứ nhà bên",
        synopsis:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla est vel eros venenatis, ac feugiat velit elementum. Maecenas et congue purus, a eleifend nisi. Vestibulum felis enim, sodales non leo a, iaculis venenatis massa. Aenean ante mauris, porttitor eget eros et, dictum ultrices lacus. Sed viverra tincidunt tincidunt. Donec nec ligula a orci feugiat porttitor. Suspendisse sagittis nisl sit amet massa tempus cursus. Nunc fringilla sem nec neque cursus, a volutpat mi scelerisque.",
        author: "Saekisan",
        thumbnailImage: "/VNS_Donate.jpg",
        category: ComicCategory.Community,
        translators: "⚠️ not stabilized information yet.",
        createAt: new Date("2025-01-01"),
        updateAt: new Date("2025-12-08"),
        likeCount: 0,
        viewCount: 0,
        comicChapters: [
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "101",
                chapterName: "Thiên sứ nhà bên (1)",
                createAt: new Date("2025-11-01"),
                updateAt: new Date("2025-11-01"),
            },
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "102",
                chapterName: "Thiên sứ nhà bên (2)",
                createAt: new Date("2025-11-02"),
                updateAt: new Date("2025-11-02"),
            },
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "3",
                chapterName: "Thiên sứ nhà bên (3)",
                createAt: new Date("2025-11-03"),
                updateAt: new Date("2025-11-03"),
            },
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "4",
                chapterName: "Thiên sứ nhà bên (4)",
                createAt: new Date("2025-11-04"),
                updateAt: new Date("2025-11-04"),
            },
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "5",
                chapterName: "Thiên sứ nhà bên (5)",
                createAt: new Date("2025-11-05"),
                updateAt: new Date("2025-11-05"),
            },
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "6",
                chapterName: "Thiên sứ nhà bên (6)",
                createAt: new Date("2025-11-06"),
                updateAt: new Date("2025-11-06"),
            },
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "7",
                chapterName: "Thiên sứ nhà bên (7)",
                createAt: new Date("2025-11-07"),
                updateAt: new Date("2025-11-07"),
            },
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "8",
                chapterName: "Thiên sứ nhà bên (8)",
                createAt: new Date("2025-11-08"),
                updateAt: new Date("2025-11-08"),
            },
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "9",
                chapterName: "Thiên sứ nhà bên (9)",
                createAt: new Date("2025-11-09"),
                updateAt: new Date("2025-11-09"),
            },
            {
                comicSeriesId: "thien-su-nha-ben",
                comicChapterId: "10",
                chapterName: "Thiên sứ nhà bên (10)",
                createAt: new Date("2025-11-10"),
                updateAt: new Date("2025-11-10"),
            },
        ],
    };

    if (series !== "thien-su-nha-ben") return <h1>No-data</h1>;

    return (
        <div className="mx-6">
            <div className="relative w-full bg-center bg-cover bg-radial-mobile bg-no-repeat md:bg-[url(/BG_Hero_White.jpg)] md:dark:bg-[url(/BG_Hero_Black.jpg)]">
                <div className="flex flex-col gap-4 px-6 py-6">
                    <div className="text-center">
                        <Heading kind="h1" className="font-extrabold text-3xl text-primary">
                            {seriesInfo.title}
                        </Heading>
                    </div>

                    <div className="text-left">
                        <Heading kind="h2" className="font-bold text-xl">
                            Mô tả
                        </Heading>
                        <hr className="mt-2 border-gray-300 border-t-2" />

                        <div className="mt-6 flex gap-10">
                            <div className="ml-12 flex-shrink-0">
                                <Image
                                    src={seriesInfo.thumbnailImage}
                                    alt={seriesInfo.title}
                                    width={180}
                                    height={240}
                                    className="rounded-lg object-cover shadow-lg"
                                    priority={true}
                                />
                            </div>

                            <div className="place-items-center-safe flex flex-1 flex-col gap-12">
                                <Paragraph className="text-xl leading-relaxed">
                                    {seriesInfo.synopsis}
                                </Paragraph>

                                <div className="mt-4 flex gap-16 md:flex-row">
                                    <Button className="h-16 w-64 gap-3 px-4 py-2">
                                        <BookOpen />
                                        <span className="text-xl">Bắt đầu đọc</span>
                                    </Button>

                                    <Button className="h-16 w-64 gap-3 bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                        <Image alt="facebook" src={Facebook} height={30} />
                                        <span className="text-xl">Xem trên Facebook</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <div className="mr-10">
                            <Heading kind="h3" className="mb-2 ml-4 text-primary">
                                Thông tin truyện
                            </Heading>
                            <Separator className="mb-4" />
                            <div className="mt-4 ml-8 space-y-2">
                                <Paragraph className="text-lg">
                                    <span>
                                        <strong>•&nbsp;&nbsp;Tác giả:</strong> {seriesInfo.author}{" "}
                                        <br />
                                        <strong>•&nbsp;&nbsp;Thể loại:</strong>{" "}
                                        {seriesInfo.category} <br />
                                        <strong>•&nbsp;&nbsp;Ngày đăng truyện:</strong>{" "}
                                        {seriesInfo.createAt.toISOString().split("T")[0]} <br />
                                        <strong>•&nbsp;&nbsp;Cập nhật gần nhất:</strong>{" "}
                                        {seriesInfo.updateAt.toISOString().split("T")[0]} <br />
                                    </span>
                                </Paragraph>
                            </div>
                        </div>

                        <div className="mr-10">
                            <Heading kind="h3" className="mb-2 ml-4 text-primary">
                                Nhóm dịch
                            </Heading>
                            <Separator className="mb-4" />
                            <div className="ml-8">
                                <Paragraph className="mt-4 gap-4 space-y-2 text-lg">
                                    <span>
                                        <strong>• &nbsp;&nbsp;Redraw: </strong>{" "}
                                        {seriesInfo.translators} <br />
                                        <strong>• &nbsp;&nbsp;Typeset: </strong>{" "}
                                        {seriesInfo.translators} <br />
                                        <strong>• &nbsp;&nbsp;QA: </strong> {seriesInfo.translators}{" "}
                                        <br />
                                        <strong>• &nbsp;&nbsp;Localisation: </strong>
                                        {seriesInfo.translators} <br />
                                        <strong>• &nbsp;&nbsp;Tus?: </strong>{" "}
                                        {seriesInfo.translators} <br />
                                        <strong>• &nbsp;&nbsp;Hotel?: </strong>{" "}
                                        {seriesInfo.translators} <br />
                                    </span>
                                </Paragraph>
                            </div>
                        </div>
                    </div>

                    <div className="mr-10">
                        <Heading kind="h3" className="mb-2 text-primary">
                            Chương
                        </Heading>
                        <Separator className="mb-4" />
                        <ScrollArea className="h-[400px]">
                            <div className="flex flex-col gap-2 pr-4">
                                {seriesInfo.comicChapters.map((chapter, index) => (
                                    <Button
                                        key={chapter.comicChapterId}
                                        className="group h-auto w-full bg-foreground/15 p-3 text-left transition-colors hover:bg-foreground"
                                    >
                                        <div className="w-full text-left">
                                            <div className="font-semibold text-base text-foreground transition-colors group-hover:text-background">
                                                Chương {index + 1}: {chapter.chapterName}
                                            </div>
                                            <div className="mt-1 text-gray-500 text-sm transition-colors group-hover:text-primary">
                                                {formatDateTime(chapter.updateAt)}
                                            </div>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}
