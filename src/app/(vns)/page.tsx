"use client";

import type { Route } from "next";
import amiya from "@public/amiya.png";
import Discord from "@public/brand/discord.svg";
import carouselData from "@public/data/carouselData.json";
import faqsData from "@public/data/faqsData.json";
import membersList from "@public/data/members.json";
import projectsList from "@public/data/projects.json";
import groupPic from "@public/group.jpg";
import headerBg from "@public/hero.png";
import { clsx } from "clsx";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowRight, Circle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ContentArea from "@/components/ContentArea";
import MemberCard from "@/components/MemberCard";
import Testimony from "@/components/Testimony";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
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
import { FavorText, FootNote, Heading, Paragraph } from "@/components/ui/extension/typography";
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
            <div className="relative pb-8">
                <div className="absolute w-full text-center z-1 flex sm:top-1/10">
                    <div className="center text-start px-10 w-13/20">
                        <div className="my-5 text-xl sm:text-2xl lg:text-4xl font-bold italic">
                            Xin chào các bạn, tụi mình là
                        </div>
                        <div className="my-5 text-2xl sm:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#FF0044] to-[#5728A3] bg-clip-text text-transparent">
                            Arknights
                            <br />
                            Vietnam Station
                        </div>
                        <div className="my-5 text-xs sm:text-sm md:text-md lg:text-xl">
                            Được thành lập vào năm 2021, Arknights Vietnam Station (gọi tắt là
                            Arknights VNS) là một nhóm hoạt động phi lợi nhuận được tạo ra với sứ
                            mệnh gắn kết cộng đồng người chơi Arknights toàn Việt Nam.
                        </div>
                    </div>
                    <div className="w-1/5">
                        <Image alt="amiyi" className="w-100" objectFit="cover" src={amiya} />
                    </div>
                </div>
                <Image
                    alt="header background"
                    className={`relative m-0 p-0 dark:brightness-60 z-0 w-full`}
                    objectFit="cover"
                    src={headerBg}
                />
            </div>

            <ContentArea id="sponsors">
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

            <ContentArea id="leaders">
                <Heading kind="h1" className="text-primary">
                    Meet the Leaders
                </Heading>
                <FavorText>What should I write here?</FavorText>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-4 place-items-center-safe w-[90vw]">
                    {membersList.Leader.map((member) => (
                        <MemberCard {...member} key={member.name} />
                    ))}
                </div>
                <FavorText className="text-center">
                    Bên cạnh đó, Arknights VNS còn hoạt động ở nhiều ban khác nữa.
                </FavorText>
                <Button asChild={true}>
                    <Link href="/staff">
                        <span className="font-bold">Xem toàn bộ dàn nhân sự của Arknights VNS</span>
                        <ArrowRight />
                    </Link>
                </Button>
            </ContentArea>

            <ContentArea id="projects">
                <Tabs className="gap-y-8 w-[80vw]" defaultValue="fan-project">
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                        <div className="flex flex-col gap-2">
                            <Heading kind="h1">Chúng tôi đã nấu cl gì?</Heading>
                            <FavorText className="text-muted-foreground">
                                Placeholder because I'm tired - Đụt
                            </FavorText>
                        </div>
                        <TabsList className="h-auto self-center-safe gap-4 bg-transparent [&_button]:bg-neutral-300 [&_button]:dark:bg-neutral-600 [&_button]:rounded-xl [&_button]:px-4 [&_button]:py-2 [&_button]:data-[state=active]:bg-primary [&_button]:data-[state=active]:text-white [&_button]:data-[state=active]:font-bold">
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
                                    <CarouselPrevious />
                                    <CarouselNext />
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
                <Testimony />
            </ContentArea>

            <ContentArea id="faq">
                <Heading kind="h1" className="text-primary">
                    Câu hỏi thường gặp
                </Heading>
                <Accordion type="multiple" defaultValue={[]} className="w-[94vw] md:w-[72vw]">
                    {faqsData.map((faq, id) => (
                        <AccordionItem value={`item-${id}`} key={faq.question}>
                            <AccordionTrigger>
                                <Heading kind="h3">{faq.question}</Heading>
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

            <ContentArea id="footnote">
                <Heading className="text-primary" kind="h1">
                    Lời kết
                </Heading>
                <FavorText>
                    Cảm ơn bạn, và cả cộng đồng game Arknights, vì đã đồng hành cùng chúng mình
                    trong suốt 5 năm qua.
                </FavorText>
                <Paragraph className="font-bold">
                    Hẹn gặp lại các bạn vào một ngày không xa!{" "}
                </Paragraph>
                <Image
                    alt="Group Picture"
                    className="rounded-2xl shadow-2xl"
                    objectFit="cover"
                    src={groupPic}
                    width={960}
                />
            </ContentArea>

            <ContentArea id="poem" className="text-left italic [&>p]:text-xl">
                <Paragraph>"Every artist paints with a fiery soul</Paragraph>
                <Paragraph>Every poet weaves words into prayers</Paragraph>
                <Paragraph>Every dream has its own chasers.</Paragraph>
                <Paragraph>
                    And we, the <span className="text-primary font-bold">Dreamchasers</span>, will
                    be the ones to carve it from hope.”
                </Paragraph>
                <FootNote className="text-right mt-5 text-sm!">
                    Shou Huỳnh - Head Admin @ Arknights Vietnam Station
                </FootNote>
            </ContentArea>

            <ContentArea id="chat-with-us">
                <Heading kind="h1" className="text-primary">
                    Wanna chat?
                </Heading>
                <FavorText>
                    Team VNS có cả Discord để các bạn giao lưu với nhau, cũng như xem
                    Behind-the-scenes các kiểu :D
                </FavorText>
                <div className="flex gap-5">
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
