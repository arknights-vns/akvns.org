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
    info: string;
    name: string;
};

const reviews: CardData[] = [
    {
        avatar: "/meruko.png",
        description: "Jennie, chính thất, aka, Vợ cả.",
        info: "@jennienguyn",
        name: "Nguyễn Thị Linh Chi",
    },
    {
        avatar: "/meruko.png",
        description: "1 con mèo khác, nhưng thua vợ cả.",
        info: "@yuki_chino",
        name: "Chino",
    },
    {
        avatar: "/meruko.png",
        description: "Người Việt N1 tiếng Nhật chửi tụi CS bằng tiếng Nga.",
        info: "@hitorimi_achi",
        name: "Hitorimi Achi",
    },
    {
        avatar: "/meruko.png",
        description: "Chị gái hàng xóm hát hay, ghét tôm.",
        info: "@renjiwatarimono",
        name: "Tee",
    },
];

export default function Testimony() {
    return (
        <div>
            <div className={"max-w-4xl mx-auto px-6"}>
                <div className={"text-center mb-10"}>
                    <div className={"text-2xl front-bold text-red-500 mb-2"}>Oguro có bao nhiêu người yêu?</div>
                    <p className={"text-slate-500"}>Sau khi bị @Swyrin VAR, Oguro có:</p>
                </div>

                <section className={"grid grid-cols-1 sm:grid-cols-2 gap-8"}>
                    {reviews.map(c => (
                        <Card
                            className={"border border-black shadow-[0_0_20px_4px_rbga(255,0,0,0.05)] bg-white"}
                            key={c.info}
                        >
                            <CardHeader className={"flex flex-col items-center text-center py-6"}>
                                <div className={"flex flex-cl items-center gap-3"}>
                                    <div className={"rounded-full overflow-hidden border-2 border-red-100 shadow-sm"}>
                                        <Image
                                            alt={c.name}
                                            className={"rounded-full object-cover"}
                                            height={50}
                                            src={c.avatar}
                                            width={50}
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
        </div>
    );
}
