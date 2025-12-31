"use client";

import type { Route } from "next";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

import { Button } from "@/components/ui/button";
import {
    FavorText,
    Heading,
    Paragraph,
} from "@/components/ui/extension/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import elysianRealm from "@/lib/elysian-realm";

export default function ComicSeriesDetail(
    properties: PageProps<"/comic/[series]">,
) {
    const { series } = use(properties.params);

    const { data } = useQuery({
        queryKey: ["comic", series],
        queryFn: async () => {
            const response = await elysianRealm.comic({ series }).get();

            if (response.error) {
                throw new Error("Failed to fetch comic");
            }

            return response.data.message;
        },
    });

    if (!data) return;

    return (
        <div className="mx-6">
            <div className="relative w-full">
                <div className="flex flex-col gap-4 px-6 py-6">
                    <Heading
                        kind="h1"
                        className="text-center font-extrabold text-3xl text-primary"
                    >
                        {data.title}
                    </Heading>

                    <div className="text-left">
                        <div className="place-items-center-safe mt-6 flex w-full flex-col md:flex-row">
                            <div className="flex w-full justify-center md:w-1/3">
                                {data.thumbnail === null ? (
                                    <Skeleton className="h-72 w-48" />
                                ) : (
                                    <Image
                                        src={data.thumbnail}
                                        width={384}
                                        height={576}
                                        alt={data.comicSeriesId}
                                        className="h-96 w-96 object-contain"
                                    />
                                )}
                            </div>

                            <div className="flex w-full flex-col place-content-between gap-4 px-4 md:w-2/3">
                                <div className="min-h-84 space-y-2">
                                    <Heading
                                        kind="h2"
                                        className="text-center font-bold text-xl md:text-left"
                                    >
                                        Mô tả
                                    </Heading>
                                    <Separator />
                                    <FavorText className="whitespace-pre-line text-justify">
                                        {data.synopsis}
                                    </FavorText>
                                </div>
                                <Button
                                    className="self-center px-8 py-6 text-lg"
                                    render={
                                        <Link
                                            href={
                                                `/comic/${series}/${data.chapters[0].comicChapterId}` as Route
                                            }
                                        />
                                    }
                                    nativeButton={false}
                                >
                                    Bắt đầu đọc
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <div className="mr-10">
                            <Heading
                                kind="h3"
                                className="mb-2 ml-4 text-primary"
                            >
                                Thông tin truyện
                            </Heading>
                            <Separator className="mb-4" />
                            <div className="mt-4 ml-8 space-y-2">
                                <ul className="list-disc text-lg">
                                    <li>
                                        <strong>Tác giả: </strong>
                                        {data.author}
                                    </li>
                                    <li>
                                        <strong>Nguồn: </strong>
                                        {data.category.replaceAll("_", " ")}
                                    </li>
                                    <li>
                                        <strong>Ngày đăng truyện: </strong>
                                        {new Date(
                                            // biome-ignore lint/style/noNonNullAssertion: guarantee
                                            data.createdAt!,
                                        ).toLocaleDateString()}
                                    </li>
                                    <li>
                                        <strong>Cập nhật gần nhất: </strong>
                                        {new Date(
                                            // biome-ignore lint/style/noNonNullAssertion: guarantee
                                            data.createdAt!,
                                        ).toLocaleDateString()}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mr-10">
                            <Heading
                                kind="h3"
                                className="mb-2 ml-4 text-primary"
                            >
                                Nhóm dịch
                            </Heading>
                            <Separator className="mb-4" />
                            <div className="ml-8">
                                {data.contributors.length > 0 ? (
                                    <ul className="list-disc">
                                        <Paragraph className="mt-4 gap-4 space-y-2 text-lg">
                                            {data.contributors.map(
                                                (contributor) => (
                                                    <li key={contributor.id}>
                                                        <strong>
                                                            {contributor.role}:{" "}
                                                        </strong>
                                                        {contributor.members.join(
                                                            ", ",
                                                        )}
                                                    </li>
                                                ),
                                            )}
                                        </Paragraph>
                                    </ul>
                                ) : (
                                    <span>Chưa có thông tin nhóm dịch!</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Heading kind="h3" className="mb-2 ml-4 text-primary">
                            Chương
                        </Heading>
                        <Separator className="mb-4" />
                        <ScrollArea className="h-100">
                            <div className="place-items-center-safe grid grid-cols-1 gap-2 md:grid-cols-3">
                                {data.chapters
                                    .sort((x, y) => x.id - y.id)
                                    .map((chapter) => (
                                        <Button
                                            key={chapter.comicChapterId}
                                            className="w-56 bg-stone-200 font-bold text-accent hover:text-white"
                                            render={
                                                <Link
                                                    href={
                                                        `/comic/${series}/${chapter.comicChapterId}` as Route
                                                    }
                                                >
                                                    {chapter.chapterName}
                                                </Link>
                                            }
                                            nativeButton={false}
                                        />
                                    ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}
