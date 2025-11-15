import Image from "next/image";

import "@/app/globals.css";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardData = {
    avatar: string;
    description: string;
    info: string;
    name: string;
};

const reviews: CardData[] = [
    {
        avatar: "/members/meruko.png",
        description: "Jennie, chính thất, aka, Vợ cả.",
        info: "@jennienguyn",
        name: "Nguyễn Thị Linh Chi",
    },
    {
        avatar: "/members/meruko.png",
        description: "1 con mèo khác, nhưng thua vợ cả.",
        info: "@yuki_chino",
        name: "Chino",
    },
    {
        avatar: "/members/meruko.png",
        description: "Người Việt N1 tiếng Nhật chửi tụi CS bằng tiếng Nga.",
        info: "@hitorimi_achi",
        name: "Hitorimi Achi",
    },
    {
        avatar: "/members/meruko.png",
        description: "Chị gái hàng xóm hát hay, ghét tôm.",
        info: "@renjiwatarimono",
        name: "Tee",
    },
];

export default function Testimony() {
    return (
        <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
                <div className="text-2xl font-bold text-primary mb-2">
                    Oguro có bao nhiêu người yêu?
                </div>
                <p className="text-accent-foreground">Sau khi bị @Swyrin VAR, Oguro có:</p>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((c) => (
                    <Card className="border z shadow-xl " key={c.info}>
                        <CardHeader className="flex flex-col items-center text-center py-6">
                            <div className="flex flex-cl items-center gap-3">
                                <div className="rounded-full overflow-hidden border-1 shadow-md">
                                    <Image
                                        alt={c.name}
                                        className="rounded-full object-cover"
                                        height={72.7}
                                        src={c.avatar}
                                        width={72.7}
                                    />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-semibold text-primary">
                                        {c.name}
                                    </CardTitle>
                                    <p className="text-sm text-accent-foreground">{c.info}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-accent-foreground leading-relaxed text-center">
                                {c.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
