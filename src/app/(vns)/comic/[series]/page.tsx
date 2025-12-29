"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/extension/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CompleteComicData } from "@/schema/comic";

export default function ComicSeriesDetail(properties: PageProps<"/comic/[series]">) {
    const parameters = use(properties.params);
    const { series } = parameters;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["comic", series],
        queryFn: async () => {
            const response = await fetch(`/api/comic/${series}`);

            if (!response.ok) {
                throw new Error("Failed to fetch comic");
            }

            const json_body = await response.json();
            const result = await CompleteComicData.safeParseAsync(json_body.message);

            if (!result.success) {
                throw new Error("Invalid data format");
            }

            return result.data;
        },
    });

    if (isLoading) return <div>Đang tải...</div>;
    if (isError) return <div>Lỗi: {error.message}</div>;
    if (!data) return <div>Không tìm thấy dữ liệu</div>;

    return (
        <div className="mx-6">
            <div className="relative w-full bg-center bg-cover bg-radial-mobile bg-no-repeat md:bg-[url(/BG_Hero_White.jpg)] md:dark:bg-[url(/BG_Hero_Black.jpg)]">
                <div className="flex flex-col gap-4 px-6 py-6">
                    <div className="text-center">
                        <Heading kind="h1" className="font-extrabold text-3xl text-primary">
                            {data.title}
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
                                    src={data.thumbnail}
                                    alt={data.title}
                                    width={180}
                                    height={240}
                                    className="rounded-lg object-cover shadow-lg"
                                    priority={true}
                                />
                            </div>

                            <div className="place-items-center-safe flex flex-1 flex-col gap-12">
                                <Paragraph className="text-xl leading-relaxed">
                                    {data.synopsis}
                                </Paragraph>

                                <div className="mt-4 flex gap-16 md:flex-row">
                                    <Button className="h-16 w-64 gap-3 px-4 py-2">
                                        <span className="text-xl">Bắt đầu đọc</span>
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
                                <ul className="list-disc">
                                    <Paragraph className="text-lg">
                                        <li>
                                            <strong>Tác giả: </strong>
                                            {data.author}
                                        </li>
                                        <li>
                                            <strong>Thể loại: </strong>
                                            {data.category}
                                        </li>
                                        <li>
                                            <strong>Ngày đăng truyện: </strong>
                                            {data.createdAt?.toLocaleString() ??
                                                "Chưa có thông tin"}
                                        </li>
                                        <li>
                                            <strong>Cập nhật gần nhất: </strong>
                                            {data.createdAt?.toLocaleString() ??
                                                "Chưa có thông tin"}
                                        </li>
                                    </Paragraph>
                                </ul>
                            </div>
                        </div>

                        <div className="mr-10">
                            <Heading kind="h3" className="mb-2 ml-4 text-primary">
                                Nhóm dịch
                            </Heading>
                            <Separator className="mb-4" />
                            <div className="ml-8">
                                <ul className="list-disc">
                                    <Paragraph className="mt-4 gap-4 space-y-2 text-lg">
                                        {data.contributors.map((contributor) => (
                                            <li key={contributor.id}>
                                                <strong>{contributor.role}: </strong>
                                                {contributor.members.join(", ")}
                                            </li>
                                        ))}
                                    </Paragraph>
                                </ul>
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
                                {data.chapters.map((chapter, index) => (
                                    <Button
                                        key={chapter.comicChapterId}
                                        className="group h-auto w-full bg-foreground/15 p-3 text-left transition-colors hover:bg-foreground"
                                    >
                                        <div className="w-full text-left">
                                            <div className="font-semibold text-base text-foreground transition-colors group-hover:text-background">
                                                Chương {index + 1}: {chapter.chapterName}
                                            </div>
                                            <div className="mt-1 text-gray-500 text-sm transition-colors group-hover:text-primary">
                                                {chapter.updatedAt?.toLocaleString() ??
                                                    "Chưa có thông tin"}
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
