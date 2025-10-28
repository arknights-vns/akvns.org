"use client";

import carouselData from "@public/data/carouselData.json";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";

type item = {
    image: string;
    title: string;
    url: string;
};

export default function Carousel() {
    const [emblaReference, emblaApi] = useEmblaCarousel({ align: "center",
        dragFree: true,
        loop: true }, [Autoplay({ delay: 4000 })]);

    const scrollPrevious = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    // half-scroll
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left; // click position relative to element
        const half = rect.width / 2;

        if (x < half) {
            scrollPrevious();
        }
        else {
            scrollNext();
        }

        // disable autoplay until next page
        const autoplayInstance = emblaApi?.plugins()?.autoplay;
        if (autoplayInstance) {
            const resetOrStop
                = autoplayInstance.options.stopOnInteraction === false ? autoplayInstance.reset : autoplayInstance.stop;
            resetOrStop();
        }
    };

    const handleKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            scrollNext();
        }
    };

    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(0, true);

            // Snaping
            emblaApi.on("pointerUp", () => {
                setTimeout(() => {
                    emblaApi.scrollTo(emblaApi.selectedScrollSnap());
                }, 500); // Snap delay
            });
        }
    }, [emblaApi]);

    return (
        <div className={"embla items-center relative border-y-2 border-gray-400"}>
            <div className={"embla__viewport overflow-hidden"} ref={emblaReference}>
                <div className={"embla__container flex"}>
                    {carouselData.map((item: item) => (
                        <div
                            className={"embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] flex flex-col items-center justify-center"}
                            key={item.title}
                        >
                            <div className={"relative flex items-center justify-center w-full"}>
                                <Image
                                    alt={item.title}
                                    className={"w-38 h-full object-fit-cover"}
                                    height={180}
                                    src={item.image}
                                    width={120}
                                />
                                <button
                                    aria-label={"Navigate carousel"}
                                    className={"absolute inset-0 z-10 cursor-pointer border-none bg-transparent"}
                                    onClick={handleClick}
                                    onKeyDown={handleKeyboard}
                                    style={{ outline: "none" }}
                                    tabIndex={0}
                                    type={"button"}
                                />
                            </div>
                            {item.url
                                ? (
                                        <Link
                                            className={"font-bold mb-2 text-center hover:text-red-500 transition-colors"}
                                            href={item.url}
                                            rel={"noopener noreferrer"}
                                            target={"_blank"}
                                        >
                                            {item.title}
                                        </Link>
                                    )
                                : (
                                        <div className={"font-bold mt-2 text-center"}>{item.title}</div>
                                    )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
