"use client";

import type { CarouselApi } from "@/components/ui/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Event = {
    date: string;
    title: string;
    href: string;
};

const events: Event[] = [
    {
        date: "14/01/2024",
        title: "Offline #1: The show must go on!",
        href: "https://www.facebook.com/share/p/1Ht7g65tji/"
    },
    {
        date: "31/12/2024",
        title: "Thông báo ra mắt Offline #2: Dreamchasers.",
        href: "https://www.facebook.com/share/p/1D97KtPN7A/"
    },
    {
        date: "12/01/2025",
        title: "Khảo sát 'Dreamchasers' lần 1.",
        href: "https://www.facebook.com/share/p/173shjVVPN/"
    },
    {
        date: "04/05/2025",
        title: "Khảo sát 'Dreamchasers' lần 2.",
        href: "https://www.facebook.com/share/p/16pGsaUXow/"
    },
    {
        date: "06/07/2025",
        title: "Mở bán vé Offline #2: Dreamchasers",
        href: "https://www.facebook.com/share/p/19DVK1nNFb/"
    },
    {
        date: "06/07/2025",
        title: "Công bố design áo Offline",
        href: "https://www.facebook.com/share/p/177CfFuZ5v/"
    },
    {
        date: "07/07/2025",
        title: "Công bố đối tác: Vietnam Community League",
        href: "https://www.facebook.com/share/p/1Zzx29JxMH/"
    },
    {
        date: "08/07/2025",
        title: "Công bố hình ảnh địa điểm offline",
        href: "https://www.facebook.com/share/p/16ZN6cWbuG/"
    },
    {
        date: "11/07/2025",
        title: "Bán hết vé tier Dreamchasers",
        href: "https://www.facebook.com/share/p/18xjxnkdxo/"
    },
    {
        date: "16/07/2025",
        title: "Công bố nhà tài trợ Vàng: Rei Não Cá",
        href: "https://www.facebook.com/share/p/1B82SaA6Cr/"
    },
    {
        date: "17/07/2025",
        title: "Công bố nhà tài trợ Vàng: bibom10",
        href: "https://www.facebook.com/share/p/1CLST23sa8/"
    },
    {
        date: "20/07/2025",
        title: "Công bố nhà tài trợ Kim Cương: Phổ Lang",
        href: "https://www.facebook.com/share/p/16SXEM5dm1/"
    },
    {
        date: "22/07/2025",
        title: "Ra mắt Trailer chính thức",
        href: "https://www.youtube.com/watch?v=I3mO0Racx8c"
    },
    {
        date: "25/07/2025",
        title: "Chính thức bán hết vé!",
        href: "https://www.facebook.com/share/p/1NGKsKzsN3/"
    },
    {
        date: "28/7/2025",
        title: "Hướng dẫn cách check-in vào offline (Cả vé Online lẫn Offline)",
        href: "https://www.facebook.com/share/p/1B14BgUNxF/"
    },
    {
        date: "3/8/2025",
        title: "Cẩm nang hướng dẫn đi đến địa điểm offline",
        href: "https://www.facebook.com/share/v/19yugz8jVq/"
    },
    {
        date: "6/8/2025",
        title: "Layout sự kiện",
        href: "https://www.facebook.com/share/p/1AyKPDFdgn/"
    },
    {
        date: "7/8/2025",
        title: "Timeline sự kiện",
        href: "https://www.facebook.com/share/p/16wg9n3LWF/"
    },
    {
        date: "8/8/2025",
        title: "Tổng hợp một số điều cần lưu ý khi tham gia offline",
        href: "https://www.facebook.com/share/p/19vMLp1nf2/"
    },
    {
        date: "10/08/2025",
        title: "Offline #2: Dreamchasers",
        href: "https://www.facebook.com/share/p/1JP9SrMb6m/"
    }
];

type RoadmapProps = {
    events: Event[];
    isMobile?: boolean;
};

function EventRoadmapContent(props: RoadmapProps) {
    return (
        <CarouselContent className="-mt-1 h-[400px]">
            {props.events.map((ev) => {
                return (
                    <CarouselItem
                        key={ev.title}
                        className="h-full basis-full pt-4"
                    >
                        <Card className="h-full items-center justify-center">
                            <CardTitle className="text-2xl">{ev.date}</CardTitle>
                            <CardContent className="text-center text-2xl font-light">
                                {ev.title}
                            </CardContent>
                            {ev.href !== "#" && (
                                <Button asChild className="w-fit self-center">
                                    <Link
                                        className="text-sm font-extralight"
                                        href={ev.href}
                                    >
                                        Link bài viết
                                    </Link>
                                </Button>
                            )}
                        </Card>
                    </CarouselItem>
                );
            })}
        </CarouselContent>
    );
}

export default function EventRoadmap() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
        setCount(api.scrollSnapList().length);
        // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle favorText="Những hoạt động tụi mình đã tổ chức trong quá trình thực hiện Offline" title="Công tác chuẩn bị" />
            <div className="flex self-center font-extrabold lg:hidden">
                Bạn có thể scroll dọc để xem các nội dung.
            </div>
            <div className="mx-8 flex flex-1/2 flex-col items-center justify-center">
                {/* The vertical one. */}
                <Carousel
                    className="flex w-full max-w-lg gap-8 lg:hidden"
                    opts={{
                        align: "start",
                        skipSnaps: true,
                        dragFree: true
                    }}
                    orientation="vertical"
                    setApi={setApi}
                >
                    <EventRoadmapContent events={events} />
                    {/* <CarouselPrevious />
                    <CarouselNext /> */}
                </Carousel>
                {/* The horizontal one. */}
                <Carousel
                    className="hidden w-full max-w-2xl lg:flex"
                    opts={{
                        align: "center",
                        skipSnaps: true,
                        dragFree: true
                    }}
                    orientation="horizontal"
                    plugins={[
                        WheelGesturesPlugin({ forceWheelAxis: "y" })
                    ]}
                    setApi={setApi}
                >
                    <EventRoadmapContent events={events} />
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                <div className="mt-2 hidden text-lg lg:flex">
                    {current}
                    /
                    {count}
                </div>
            </div>
        </div>
    );
}
