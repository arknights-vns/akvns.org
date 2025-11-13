import Image from "next/image";
import React from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type CardData = {
    avatar: string;
    description: string;
    id: string;
    info: string;
    name: string;

};

const reviews: CardData[] = [

    {

        avatar: "/amiya.png",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.",
        id: "review-1",
        info: "@an_hai",
        name: "BLYAT",
    },
    {

        avatar: "/amiya.png",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.",
        id: "review-2",
        info: "@Eggs",
        name: "Dut za Liems",
    },
    {
        avatar: "/amiya.png",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.",
        id: "review-3",
        info: "@Dut",
        name: "Dut!!",
    },
    {
        avatar: "/amiya.png",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.",
        id: "review-4",
        info: "@JohnBalatro",
        name: "nan-inf từ ante 0",
    },

];

export default function Testimony() {
    return (

        <div className={"max-w-4xl mx-auto px-6"}>
            <div className={"text-center mb-10"}>
                <h2 className={"text-3xl font-bold text-primary mb-2"}>
                    Mọi người nghĩ gì về mình?
                </h2>
                <p className={"text-accent-foreground text-xl"}>
                    Overwhelming Negative Reviews:
                </p>
            </div>

            <section className={"grid grid-cols-1 sm:grid-cols-2 gap-8"}>
                {reviews.map(c => (
                    <Card
                        className={"border border-accent-foreground shadow-[0_0_20px_4px_rgba(255,0,0,0.2)]"}
                        key={c.id}
                    >
                        <CardHeader className={"flex flex-col items-start text-left py-2"}>
                            <div className={"flex gap-2 "}>
                                <Image
                                    alt={`Avatar của ${c.name}`}
                                    className={"w-[60px] h-[60px] rounded-full overflow-hidden border border-black shadow-sm"}
                                    height={60}
                                    priority={false}
                                    quality={85}
                                    src={c.avatar}
                                    width={60}
                                />

                                <div>
                                    <CardTitle className={"font-bold text-lg text-primary"}>
                                        {c.name}
                                    </CardTitle>
                                    <p className={"text-sm text-accent-foreground"}>
                                        {c.info}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className={"text-base text-accent-foreground leading-relaxed text-left"}>
                                <span aria-hidden={"true"} className={"font-bold text-primary"}>
                                    "
                                </span>
                                <span>{c.description}</span>
                                <span aria-hidden={"true"} className={"font-bold text-primary"}>
                                    "
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
