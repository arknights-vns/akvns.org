import testimonyData from "@public/data/testimonyData.json";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Paragraph } from "@/components/ui/typography";

export default function Testimony() {
    return (
        <div className={"max-w-4xl mx-auto px-6"}>
            <div className={"text-center mb-10"}>
                <Heading className={"text-primary mb-2"} kind={"h2"}>
                    Mọi người nghĩ gì về mình?
                </Heading>
                <Paragraph className={"text-accent-foreground text-xl"}>
                    Overwhelming Negative Reviews:
                </Paragraph>
            </div>

            <section className={"grid grid-cols-1 sm:grid-cols-2 gap-10"}>
                {testimonyData.map(c => (
                    <Card
                        className={
                            "border border-accent-foreground shadow-[0_0_20px_4px_rgba(255,0,0,0.2)]"
                        }
                        key={c.id}
                    >
                        <CardHeader className={"flex flex-col items-start text-left py-2"}>
                            <div className={"flex gap-4 "}>
                                <Image
                                    alt={`Avatar của ${c.name}`}
                                    className={
                                        "w-16 h-16 rounded-full object-cover border-2 shadow-md flex-shrink-0"
                                    }
                                    height={60}
                                    priority={false}
                                    quality={85}
                                    src={c.avatar}
                                    width={60}
                                />

                                <div className={"flex flex-col"}>
                                    <CardTitle className={"font-bold text-lg text-primary"}>
                                        <Heading kind={"h3"}>{c.name}</Heading>
                                    </CardTitle>
                                    <Paragraph className={"text-sm text-accent-foreground !m-0"}>
                                        {c.info}
                                    </Paragraph>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Paragraph
                                className={
                                    "text-base text-accent-foreground leading-relaxed text-left"
                                }
                            >
                                <span className={"font-bold text-primary"}>"</span>
                                <span>{c.description}</span>
                                <span className={"font-bold text-primary"}>"</span>
                            </Paragraph>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
