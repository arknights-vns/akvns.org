"use client";

import carouselData from "@public/data/carouselData.json";
import AutoScroll from "embla-carousel-auto-scroll";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function SponsorsCarousel() {
    return (
        <div className="flex flex-col place-items-center-safe gap-4 select-none">
            <div className="text-4xl text-primary font-bold">Meet the Sponsors</div>
            <div className="text-muted-foreground">Some are weirdly, familiar</div>
            <Carousel
                className="w-full"
                opts={{
                    align: "center",
                    loop: true,
                }}
                plugins={[
                    AutoScroll({
                        stopOnInteraction: false,
                    }),
                ]}
            >
                <CarouselContent className="place-items-center-safe w-sm md:w-full">
                    {carouselData.map((data) => (
                        <CarouselItem
                            className="md:basis-1/4 flex flex-col justify-between place-items-center-safe"
                            key={data.title}
                        >
                            <Link href={data.url as Route}>
                                <Image alt={data.title} height={96} src={data.image} width={150} />
                            </Link>
                            <span className="text-lg font-bold">{data.title}</span>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
