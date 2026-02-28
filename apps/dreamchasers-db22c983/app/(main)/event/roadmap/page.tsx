"use client";

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Link from "next/link";
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
        href: "https://www.facebook.com/groups/arknights.vietnam.station/posts/2035816776811242/"
    },
    {
        date: "31/12/2024",
        title: "Thông báo ra mắt Offline #2: Dreamchasers.",
        href: "https://www.facebook.com/groups/arknights.vietnam.station/posts/2299747417084842/"
    },
    {
        date: "12/01/2025",
        title: "Khảo sát 'Dreamchasers' lần 1.",
        href: "https://www.facebook.com/groups/arknights.vietnam.station/posts/2308946422831608/"
    },
    {
        date: "04/05/2025",
        title: "Khảo sát 'Dreamchasers' lần 2.",
        href: "https://www.facebook.com/groups/arknights.vietnam.station/posts/2409448572781392/"
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
        date: "??/??/2025",
        title: "???",
        href: "#"
    },
    {
        date: "10/08/2025",
        title: "Offline #2: Dreamchasers",
        href: "#"
    }
];

type TimelineProps = {
    events: Event[];
    isMobile?: boolean;
};

function TimelineContent({ events }: TimelineProps) {
    return (
        <CarouselContent className="-mt-1 h-[400px]">
            {events.map((ev) => {
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

export default function TimelinePage() {
    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle favorText="Những hoạt động tụi mình đã tổ chức trong quá trình thực hiện Offline" title="Công tác chuẩn bị" />
            <div className="block self-center font-extrabold lg:hidden">
                Bạn có thể scroll dọc để xem các nội dung.
            </div>
            <div className="mx-4 mt-8 flex flex-col items-center justify-center">
                {/* The vertical one. */}
                <Carousel
                    className="flex w-full max-w-lg lg:hidden"
                    opts={{
                        align: "start",
                        skipSnaps: true,
                        dragFree: true
                    }}
                    orientation="vertical"
                    plugins={[
                        WheelGesturesPlugin()
                    ]}
                >
                    <TimelineContent events={events} />
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
                >
                    <TimelineContent events={events} />
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}
