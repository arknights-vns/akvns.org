"use client";

import type { Route } from "next";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { z } from "zod/mini";

import ContentArea from "@/components/ContentArea";
import { Button } from "@/components/ui/button";
import { FavorText, Heading, Paragraph } from "@/components/ui/extension/typography";
import { Separator } from "@/components/ui/separator";
import { BlogSchema } from "@/schema/blog";

const BlogList = z.array(BlogSchema);

export default function BlogListing() {
    const { data, status, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            const resp = await fetch(`/api/blog?page=${pageParam}`);

            if (!resp.ok) {
                throw new Error("Unable to get blog list");
            }

            const json = await resp.json();

            const data = await BlogList.safeParseAsync(json.message);

            const next = Number.parseInt(json.next, 10);
            const canMoveNext = json.canMoveNext as boolean;

            if (!data.success || data.error) {
                throw data.error;
            }

            return { body: data.data, next, canMoveNext };
        },
        queryKey: ["blog"],
        initialPageParam: 0,
        getNextPageParam: (lastpage, _pages) => (lastpage.canMoveNext ? lastpage.next : null),
    });

    if (status === "pending" || !data) {
        return;
    }

    return (
        <ContentArea id="blog" className="w-[98vw] pt-0">
            <Heading kind="h1" className="text-center text-primary">
                Blog
            </Heading>
            <FavorText className="text-center">Tản mạn tùm lum thứ về Arknights VNS</FavorText>

            <div className="place-items-center-safe flex flex-col">
                {data.pages.map((page, i) => {
                    return (
                        // biome-ignore lint/suspicious/noArrayIndexKey: I have to
                        <div key={i} className="flex flex-col gap-y-12">
                            {page.body.map((entry) => {
                                return (
                                    <section id={entry.slug} key={entry.id} className="space-y-4">
                                        <Heading kind="h2">
                                            <Link href={`blog/${entry.slug}` as Route}>
                                                {entry.title}
                                            </Link>
                                        </Heading>
                                        <FavorText className="text-lg!">
                                            {new Date(entry.updatedAt).toLocaleDateString()} - Tác
                                            giả: {entry.author}
                                        </FavorText>
                                        <Paragraph className="text-justify">
                                            {entry.shortBriefing}
                                        </Paragraph>
                                        <Separator />
                                    </section>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <Button
                className="w-fit self-center"
                disabled={!hasNextPage || isFetching}
                onClick={() => fetchNextPage()}
            >
                Xem thêm các bài cũ hơn
            </Button>
        </ContentArea>
    );
}
