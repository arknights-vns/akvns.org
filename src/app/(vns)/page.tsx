"use client";

import type { Route } from "next";
import amiya from "@public/amiya.png";
import Discord from "@public/brand/discord.svg";
import carouselData from "@public/data/carouselData.json";
import faqsData from "@public/data/faqsData.json";
import membersList from "@public/data/members.json";
import projectsList from "@public/data/projects.json";
import testimonyData from "@public/data/testimonyData.json";
import groupPic from "@public/group.jpg";
import { clsx } from "clsx";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowRight, Circle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ContentArea from "@/components/ContentArea";
import MemberCard from "@/components/MemberCard";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    BlockQuote,
    FavorText,
    FootNote,
    Heading,
    Paragraph,
} from "@/components/ui/extension/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MainPage() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        // yes it's bad
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
        setCount(api.scrollSnapList().length);
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="flex flex-col place-items-center-safe w-full">
            <div
                id="main"
                className="bg-radial-mobile md:bg-[url(/BG_Hero_White.jpg)] md:dark:bg-[url(/BG_Hero_Black.jpg)] bg-cover bg-center bg-no-repeat"
            >
                <div className="flex place-items-center-safe py-18 justify-evenly">
                    <div className="flex flex-col text-center lg:w-2/3 gap-8">
                        <div>
                            <Heading kind="h4" className="font-bold italic">
                                Xin chào các bạn, tụi mình là
                            </Heading>
                            <Heading
                                kind="h1"
                                className="text-2xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#FF0044] to-[#5728A3] bg-clip-text text-transparent"
                            >
                                Arknights Vietnam Station
                            </Heading>
                            <Paragraph className="text-md font-light md:text-2xl lg:text-justify mx-8">
                                Được thành lập vào năm 2021, Arknights Vietnam Station (gọi tắt là
                                Arknights VNS) là một nhóm hoạt động phi lợi nhuận được tạo ra với
                                sứ mệnh gắn kết cộng đồng người chơi Arknights toàn Việt Nam.
                            </Paragraph>
                        </div>
                        <div className="flex justify-evenly flex-col md:flex-row gap-8">
                            <div>
                                <div className="text-4xl font-bold">8,8K</div>
                                <div className="text-xl">lượt theo dõi Fanpage</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold">36.243</div>
                                <div className="text-xl">thành viên nhóm</div>
                            </div>
                        </div>
                        <Paragraph className="italic text-muted-foreground">
                            (*) cập nhật lần cuối vào 11/2025.
                        </Paragraph>
                    </div>
                    <div className="w-1/5 hidden lg:block">
                        <Image alt="amiyi" src={amiya} />
                        <Paragraph className="text-center">
                            Mascot Amiya của Arknights VNS Offline 2025 "Dreamchasers".
                        </Paragraph>
                    </div>
                </div>
                <div className="text-right mr-3 mb-4 italic text-muted-foreground text-sm hidden md:block">
                    Background credit:{" "}
                    <Link
                        className="underline underline-offset-4 font-bold"
                        href="https://lensark.com/"
                    >
                        Lens
                    </Link>{" "}
                    (commissioned)
                </div>
            </div>

            <ContentArea className="text-center" id="sponsors">
                <Heading kind="h1" className="text-primary">
                    Meet the Sponsors
                </Heading>
                <FavorText>Some are weirdly, familiar</FavorText>
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
                                    <Image
                                        alt={data.title}
                                        height={96}
                                        src={data.image}
                                        width={150}
                                    />
                                </Link>
                                <FootNote className="text-lg font-bold">{data.title}</FootNote>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </ContentArea>

            <ContentArea className="text-center" id="leaders">
                <Heading kind="h1" className="text-primary">
                    Meet the Leaders
                </Heading>
                <FavorText>What should I write here?</FavorText>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-4 place-items-center-safe">
                    {membersList.Leader.map((member) => (
                        <MemberCard {...member} key={member.name} />
                    ))}
                </div>
                <FavorText className="text-center text-md!">
                    Bên cạnh đó, Arknights VNS còn hoạt động ở nhiều ban khác nữa.
                </FavorText>
                <Button asChild={true} className="w-fit px-2 self-center">
                    <Link href="/staff">
                        <span className="font-bold"> Toàn bộ dàn staff Arknights VNS</span>
                        <ArrowRight />
                    </Link>
                </Button>
            </ContentArea>

            <ContentArea id="projects">
                <Tabs className="gap-y-8" defaultValue="fan-project">
                    <div className="flex flex-col md:flex-row justify-between gap-y-3">
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <Heading kind="h1" className="text-primary">
                                Chúng tôi đã nấu cl gì?
                            </Heading>
                            <FavorText>Placeholder because I'm tired - Đụt</FavorText>
                        </div>
                        <TabsList className="flex h-auto self-center md:self-end gap-3 bg-transparent [&>button]:bg-neutral-200 [&>button]:dark:bg-neutral-600 [&>button]:rounded-md [&>button]:px-4 [&>button]:py-2 [&>button]:data-[state=active]:bg-primary [&>button]:data-[state=active]:text-white [&>button]:data-[state=active]:font-bold">
                            <TabsTrigger value="fan-project">Fan Projects</TabsTrigger>
                            <TabsTrigger value="event">Events</TabsTrigger>
                            <TabsTrigger value="cross">Cross-Overs</TabsTrigger>
                        </TabsList>
                    </div>
                    {(["fan-project", "event", "cross"] as const).map((category) => {
                        const projects = projectsList[category];

                        return (
                            <TabsContent className="mx-4" key={category} value={category}>
                                <Carousel
                                    className="w-full"
                                    opts={{
                                        align: "start",
                                    }}
                                    setApi={setApi}
                                >
                                    <CarouselContent className="place-content-center-safe">
                                        {projects.map((project) => (
                                            <CarouselItem
                                                className="md:basis-1/2 lg:basis-1/3"
                                                key={project.name}
                                            >
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>{project.date}</CardTitle>
                                                        <CardDescription>
                                                            {project.name}
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="flex min-h-42 items-center justify-center p-6">
                                                        <div>{project.content}</div>
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="hidden md:flex" />
                                    <CarouselNext className="hidden md:flex" />
                                </Carousel>
                                <div className="place-content-center-safe flex py-4 gap-x-3">
                                    {Array.from({ length: count }).map((_, index) => {
                                        return (
                                            <Circle
                                                className={clsx(
                                                    "stroke-primary",
                                                    index + 1 === current && "fill-primary",
                                                )}
                                                key={`navigation-${
                                                    // biome-ignore lint/suspicious/noArrayIndexKey: yes
                                                    index
                                                }`}
                                                onClick={() => api?.scrollTo(index)}
                                                role="button"
                                                strokeWidth={1}
                                            />
                                        );
                                    })}
                                </div>
                            </TabsContent>
                        );
                    })}
                </Tabs>
            </ContentArea>

            <ContentArea id="testimony">
                <Heading className="text-primary text-center" kind="h1">
                    Mọi người nghĩ gì về mình?
                </Heading>
                <FavorText className="text-center">Overwhelming Negative Reviews:</FavorText>
                <article className="grid grid-cols-1 md:grid-cols-2 place-items-center-safe gap-12 m-8">
                    {testimonyData.map((c) => (
                        <Card className="shadow-md w-full" key={c.id}>
                            <CardHeader className="flex flex-col">
                                <div className="flex gap-4">
                                    <Avatar className="size-12 border shadow-sm">
                                        {/* FIXME: actual avatars soon. */}
                                        {/*<AvatarImage src="/VNS_Icon.svg" alt={`${c.name}-avatar`} />*/}
                                        <AvatarFallback>VNS</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col self-center">
                                        <CardTitle className="font-bold text-xl text-primary">
                                            {c.name}
                                        </CardTitle>
                                        <CardDescription>{c.info}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="leading-relaxed text-justify">
                                <span className="font-bold text-primary">"</span>
                                {c.description}
                                <span className="font-bold text-primary">"</span>
                            </CardContent>
                        </Card>
                    ))}
                </article>
            </ContentArea>

            <ContentArea id="faq">
                <Heading kind="h1" className="text-primary">
                    Câu hỏi thường gặp
                </Heading>
                <Accordion type="multiple" defaultValue={[]}>
                    {faqsData.map((faq, id) => (
                        <AccordionItem value={`item-${id}`} key={faq.question}>
                            <AccordionTrigger>
                                <Heading kind="h4">{faq.question}</Heading>
                            </AccordionTrigger>
                            <AccordionContent>
                                {faq.answer.map((ans) => (
                                    <Paragraph className="text-lg ml-6" key={ans}>
                                        {ans}
                                    </Paragraph>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ContentArea>

            <ContentArea className="text-center place-items-center-safe" id="footnote">
                <Heading className="text-primary" kind="h1">
                    Lời kết
                </Heading>
                <FavorText className="text-center">
                    Cảm ơn bạn, và cả cộng đồng game Arknights, vì đã đồng hành cùng chúng mình
                    trong suốt 5 năm qua.
                </FavorText>
                <Paragraph className="font-bold">
                    Hẹn gặp lại các bạn vào một ngày không xa!{" "}
                </Paragraph>
                <Image
                    alt="Group Picture"
                    className="rounded-2xl shadow-xl"
                    src={groupPic}
                    width={960}
                />
                <BlockQuote className="text-left">
                    <Paragraph>"Every artist paints with a fiery soul</Paragraph>
                    <Paragraph>Every poet weaves words into prayers</Paragraph>
                    <Paragraph>Every dream has its own chasers.</Paragraph>
                    <Paragraph>
                        And we, the <span className="text-primary font-bold">Dreamchasers</span>,
                        will be the ones to carve it from hope.”
                    </Paragraph>
                    <FootNote className="text-right text-foreground! font-bold mt-5">
                        Shou Huỳnh - Head Admin @ Arknights Vietnam Station
                    </FootNote>
                </BlockQuote>
            </ContentArea>

            <ContentArea className="text-center place-items-center-safe" id="chat-with-us">
                <Heading kind="h1" className="text-primary">
                    Wanna chat?
                </Heading>
                <FavorText className="text-center">
                    Team VNS có cả Discord để các bạn giao lưu với nhau, cũng như xem
                    Behind-the-scenes các kiểu :D
                </FavorText>
                <div className="flex gap-5 flex-col md:flex-row place-items-center-safe">
                    <Button asChild={true} className="bg-[#5865F2] hover:bg-[#3D4CF0]">
                        <Link href="https://discord.gg/arknights-vns">
                            <Image alt="discord" src={Discord} width={24} />
                            Arknights VNS
                        </Link>
                    </Button>
                    <Button asChild={true} className="bg-[#5865F2] hover:bg-[#3D4CF0]">
                        <Link href="https://discord.gg/wgETr8d4FR">
                            <Image alt="discord" src={Discord} width={24} />
                            Phoenix Frontiers
                        </Link>
                    </Button>
                </div>
                <Paragraph>
                    Nếu bạn muốn liên hệ qua email thì hãy liên hệ qua email{" "}
                    <Link
                        href="mailto:contact@akvns.org"
                        className="underline decoration-dashed underline-offset-2 font-bold"
                    >
                        contact@akvns.org
                    </Link>{" "}
                    nhé, tụi mình sẽ liên lạc lại sau 2-3 ngày làm việc ạ!
                </Paragraph>
            </ContentArea>
        </div>
    );
}
