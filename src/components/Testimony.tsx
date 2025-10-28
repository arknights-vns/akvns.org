/* eslint-disable @next/next/no-img-element */
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
    info: string;
    name: string;
};

const reviews: CardData[] = [
    {
        avatar: "img: Jennie",
        description: "Jennie, chính thất, aka, Vợ cả.",
        info: "@jennienguyn",
        name: "Nguyễn Thị Linh Chi",
    },
    {
        avatar: "img: Chino",
        description: "1 con mèo khác, nhưng thua vợ cả.",
        info: "@yuki_chino",
        name: "Chino",
    },
    {
        avatar: "img: Achi",
        description: "Người Việt N1 tiếng Nhật chửi tụi CS bằng tiếng Nga.",
        info: "@hitorimi_achi",
        name: "Hitorimi Achi",
    },
    {
        avatar: "img: Tee",
        description: "Chị gái hàng xóm hát hay, ghét tôm.",
        info: "@renjiwatarimono",
        name: "Tee",
    },
];

export default function Testimony() {
    return (
        <main className={"min-h-screen py-12"}>
            <div className={"max-w-4xl mx-auto px-6"}>
                <header className={"text-center mb-10"}>
                    <h3 className={"text-2xl front-bold text-red-500 mb-2"}>Oguro có bao nhiêu người yêu?</h3>
                    <p className={"text-slate-500"}>Sau khi bị @Swyrin VAR, Oguro có:</p>
                </header>

                <section className={"grid grid-cols-1 sm:grid-cols-2 gap-8"}>
                    {reviews.map((c, index) => (
                        <Card
                            className={"border border-black shadow-[0_0_20px_4px_rbga(255,0,0,0.05)] bg-white"}
                            key={index}
                        >
                            <CardHeader className={"flex flex-col items-center text-center py-6"}>
                                <div className={"flex flex-cl items-center gap-3"}>
                                    <div className={"w-20 h-20 rounded-full overflow-hidden border-2 border-red-100 shadow-sm"}>
                                        <img
                                            alt={c.name}
                                            className={"w-full h-full object-cover"}
                                            src={c.avatar}
                                        />
                                    </div>
                                    <div>
                                        <CardTitle className={"text-lg font-semibold text-red-500"}>
                                            {c.name}
                                        </CardTitle>
                                        <p className={"text-sm text-black"}>{c.info}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className={"text-sm text-black leading-relaxed text-center"}>
                                    {c.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </div>
        </main>
    );
}
