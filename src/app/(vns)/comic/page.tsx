"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { FavorText, Heading } from "@/components/ui/extension/typography";
import { Skeleton } from "@/components/ui/skeleton";
import elysianRealm from "@/lib/elysian-realm";

export default function ComicListingPage() {
    const { data } = useInfiniteQuery({
        queryKey: ["comic"],
        queryFn: async ({ pageParam }) => {
            const resp = await elysianRealm.comic.get({
                query: { page: pageParam },
            });

            if (resp.error) {
                throw resp.error;
            }

            return {
                message: resp.data.message,
                next: resp.data.next,
                canMoveNext: resp.data.canMoveNext,
            };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.canMoveNext ? lastPage.next : null;
        },
    });

    if (!data) return;

    return (
        <div className="space-y-4">
            <div className="space-y-4 text-center">
                <Heading kind="h1" className="text-primary">
                    Truyện tại Trạm
                </Heading>
                <FavorText>
                    Các đầu truyện do đội ngũ @terrastation thuộc Arknights VNS dịch, hoặc các bên có hợp tác với
                    Arknights VNS
                </FavorText>
            </div>
            <div className="py-12">
                {data.pages.map((page, i) => (
                    <div
                        className="place-items-center-safe grid grid-cols-1 gap-12 md:grid-cols-3"
                        // biome-ignore lint/suspicious/noArrayIndexKey: Paginated.
                        key={i}
                    >
                        {page.message.map((comic) => {
                            return (
                                <div key={comic.comicSeriesId} className="place-items-center-safe flex flex-col gap-2">
                                    <div className="rounded-md border">
                                        {comic.thumbnail === null ? (
                                            <Skeleton className="h-72 w-48" />
                                        ) : (
                                            <Image
                                                src={comic.thumbnail}
                                                width={192}
                                                height={288}
                                                alt={comic.comicSeriesId}
                                                className="h-72 w-48 bg-foreground object-contain"
                                            />
                                        )}
                                    </div>
                                    <Badge
                                        className={clsx(
                                            "p-3 font-bold",
                                            comic.category === "Arknights_VNS" && "bg-primary",
                                            comic.category === "Partner" && "bg-amber-400",
                                            comic.category === "Collaboration" && "bg-black",
                                            comic.category === "Collaboration" && "bg-gray-600",
                                        )}
                                    >
                                        {
                                            {
                                                Arknights_VNS: "@terrastationvn",
                                                Partner: "Partner",
                                                Collaboration: "Collab",
                                                Community: "Community",
                                            }[comic.category]
                                        }
                                    </Badge>
                                    <Link
                                        className="font-bold text-lg hover:underline"
                                        href={`/comic/${comic.comicSeriesId}`}
                                    >
                                        {comic.title}
                                    </Link>
                                    <span>
                                        <span className="font-bold">Tác giả</span>: {comic.author}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
