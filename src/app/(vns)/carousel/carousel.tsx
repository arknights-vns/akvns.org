"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
import carouselData from "@/app/(vns)/data/carouselData.json";

interface item {
    image: string;
    title: string;
    url: string;
}

export default function Carousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 4000 })]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    // half-scroll
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // click position relative to element
        const half = rect.width / 2;

        if (x < half) {
            scrollPrev();
        } else {
            scrollNext();
        }

        // disable autoplay until next page
        const autoplayInstance = emblaApi?.plugins()?.autoplay;
        if (autoplayInstance) {
            const resetOrStop =
                autoplayInstance.options.stopOnInteraction === false ? autoplayInstance.reset : autoplayInstance.stop;
            resetOrStop();
        }
    };

    const handleKeyboard = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            scrollNext();
        }
    };

    return (
        <div className="embla items-center relative border-y-2 border-gray-400">
            <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                    {carouselData.map((item: item) => (
                        <div
                            className="
                                embla__slide 
                                flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]
                                flex flex-col items-center justify-center"
                            key={item.title}>
                            <div className="relative flex items-center justify-center w-full">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={120}
                                    height={180}
                                    className="w-38 h-full object-fit-cover"
                                />
                                <button
                                    type="button"
                                    tabIndex={0}
                                    aria-label="Navigate carousel"
                                    onClick={handleClick}
                                    onKeyDown={handleKeyboard}
                                    className="absolute inset-0 z-10 cursor-pointer border-none bg-transparent"
                                    style={{ outline: "none" }}
                                />
                            </div>
                            {item.url ? (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold mb-2 text-center hover:text-red-500 transition-colors"
                                >
                                    {item.title}
                                </a>
                            ) : (
                                <h1 className="font-bold mt-2 text-center">{item.title}</h1>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
