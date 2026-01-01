"use client";

import type { Route } from "next";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import amiya from "@public/amiya.png";
// import faqsData from "@public/data/faqsData.json";
import membersList from "@public/data/members.json";
// import testimonyData from "@public/data/testimonyData.json";
import groupPic from "@public/group.jpg";
import partnerList from "@resources/data/partner.json";
import projectsList from "@resources/data/projects.json";
import { clsx } from "clsx";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowDown, ArrowRight, Circle } from "lucide-react";
import { Caveat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

import ContentArea from "@/components/ContentArea";
import MemberCard from "@/components/MemberCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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

const caveat = Caveat({
    preload: true,
    weight: "500",
});

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
        <div className="place-items-center-safe flex w-full flex-col">
            <figure
                id="hero"
                className="h-[85vh] w-full bg-[url(/hero.jpg)] bg-center bg-cover bg-muted bg-no-repeat bg-blend-overlay"
            >
                <div className="place-items-center-safe flex size-full flex-col justify-between">
                    <div></div>
                    <div className="place-items-center-safe flex flex-col gap-8">
                        <div className="font-bold text-xl">
                            Xin chào mọi người, tụi mình là...
                        </div>
                        <div
                            className={clsx(
                                caveat.className,
                                "text-center text-8xl text-primary text-shadow-lg text-shadow-red-600/30",
                            )}
                        >
                            Arknights Vietnam Station
                        </div>
                        <div className="font-bold font-mono italic">
                            {/*"For the Doctors, by the Doctors."*/}
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString(
                                            "For the <span style='color: oklch(74.6% 0.16 232.661)'>Doctors</span>, by the <span style='color: oklch(74.6% 0.16 232.661)'>Doctors</span>.",
                                        )
                                        .pauseFor(1000)
                                        .deleteAll()
                                        .typeString(
                                            "For the <span style='color: yellow'>Endministrators</span>, by the <span style='color: yellow'>Endministrators</span>.",
                                        )
                                        .pauseFor(1000)
                                        .deleteAll()
                                        .typeString(
                                            "For the <span style='color: lab(63.7053% 60.7449 31.3109)'>Dreamchasers</span>, by the <span style='color: lab(63.7053% 60.7449 31.3109)'>Dreamchasers</span>.",
                                        )
                                        .pause()
                                        .start();
                                }}
                                options={{
                                    autoStart: true,
                                }}
                            />
                        </div>
                        <Badge className="self-center bg-red-500 p-3 font-mono text-[1bem]">
                            (est. 2022)
                        </Badge>
                    </div>
                    <div className="place-items-center-safe grid w-[98svw] grid-cols-3">
                        <div className="-z-2 relative text-center text-primary">
                            <span className="hidden md:inline">
                                Wrong place to look for egg!
                            </span>
                        </div>
                        <div className="place-items-center-safe my-4 flex animate-bounce gap-1 rounded-full bg-primary px-4 py-2">
                            <ArrowDown size={24} />
                            <span className="hidden md:block">
                                Lướt xuống để đọc thêm
                            </span>
                        </div>
                        <div className="-z-2 relative text-center text-primary">
                            <span className="hidden md:inline">
                                L2Etd29ybGQteWV0LXRvLWtub3du
                            </span>
                        </div>
                    </div>
                </div>
            </figure>

            <ContentArea id="briefing" className="w-[80vw] text-center">
                <Heading kind="h1" className="text-primary">
                    Giới thiệu
                </Heading>
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div className="h-96 text-lg">
                        <Paragraph className="text-justify">
                            Được thành lập vào năm{" "}
                            <span className="font-bold text-primary">2022</span>
                            , Arknights Vietnam Station (gọi tắt là{" "}
                            <span className="font-bold text-primary">
                                Arknights VNS
                            </span>
                            ) là một nhóm hoạt động phi lợi nhuận được tạo ra
                            với sứ mệnh gắn kết cộng đồng người chơi Arknights
                            toàn Việt Nam.
                        </Paragraph>
                        <Paragraph className="text-justify">
                            Tính đến tháng 12/2025, Arknights VNS đã có cho mình{" "}
                            <Link
                                href="https://www.facebook.com/terrastationvn"
                                className="font-bold text-primary hover:underline"
                            >
                                ~9.300 lượt theo dõi fanpage
                            </Link>{" "}
                            và{" "}
                            <Link
                                href="https://www.facebook.com/groups/1546174542442137"
                                className="font-bold text-primary hover:underline"
                            >
                                ~35.000 thành viên nhóm
                            </Link>{" "}
                            , khẳng định vị trí của Arknights VNS trên bản đồ
                            cộng đồng Arknights Việt Nam và quốc tế.
                        </Paragraph>
                        <Paragraph className="text-justify">
                            Thông qua website này, tụi mình hy vọng bạn sẽ có
                            đầy đủ thông tin về tầm nhìn, các đối tác, và cũng
                            như những hoạt động đã và đang diễn ra của Arknights
                            VNS.
                        </Paragraph>
                        <Paragraph className="text-justify font-light italic">
                            From Team Dreamchasers with love!
                        </Paragraph>
                    </div>
                    <div className="place-items-center-safe">
                        <Image alt="amiyi" src={amiya} height={280} />
                        <Paragraph className="text-center font-light text-muted-foreground italic">
                            Mascot Amiya của Arknights VNS Offline 2025
                            "Dreamchasers"
                        </Paragraph>
                    </div>
                </div>
            </ContentArea>

            <ContentArea className="space-y-8 text-center" id="sponsors">
                <Heading kind="h1" className="text-primary">
                    Các đối tác của Arknights VNS
                </Heading>
                <Heading kind="h2">Fanpage</Heading>
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
                        {partnerList
                            .filter((data) => data.type === "fanpage")
                            .map((data) => (
                                <CarouselItem
                                    className="place-items-center-safe flex basis-1/2 flex-col justify-between gap-2 md:basis-1/4 lg:basis-1/5"
                                    key={data.title}
                                >
                                    <Link href={data.url as Route}>
                                        <Image
                                            alt={data.title}
                                            src={data.image}
                                            height={150}
                                            width={150}
                                            className="size-37.5 rounded-full border-2"
                                            priority={true}
                                        />
                                    </Link>
                                    <FootNote className="font-bold text-lg">
                                        {data.title}
                                    </FootNote>
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                </Carousel>
                <Heading kind="h2">Artist</Heading>
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {partnerList
                        .filter((data) => data.type === "artist")
                        .map((entry) => {
                            return (
                                <div
                                    key={entry.title}
                                    className="place-items-center-safe flex flex-col gap-2"
                                >
                                    <Link href={entry.url as Route}>
                                        <Image
                                            src={entry.image}
                                            alt={entry.title}
                                            height={150}
                                            width={150}
                                            className="size-37.5 rounded-full border-2"
                                            priority={true}
                                        />
                                    </Link>
                                    <FootNote className="font-bold text-lg">
                                        {entry.title}
                                    </FootNote>
                                </div>
                            );
                        })}
                </div>
            </ContentArea>

            <ContentArea className="text-center" id="leaders">
                <Heading kind="h1" className="text-primary">
                    Đội ngũ Staff
                </Heading>
                <div className="place-items-center-safe grid grid-cols-1 gap-8 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {membersList.Leader.map((member) => (
                        <MemberCard {...member} key={member.name} />
                    ))}
                </div>
                <FavorText className="text-center text-md!">
                    Bên cạnh đó, Arknights VNS còn hoạt động ở nhiều ban khác
                    nữa.
                </FavorText>
                <Button
                    render={
                        <Link href="/staff">
                            <span className="font-bold">
                                {" "}
                                Toàn bộ dàn staff Arknights VNS
                            </span>
                            <ArrowRight />
                        </Link>
                    }
                    nativeButton={false}
                    className="w-fit self-center px-2"
                />
            </ContentArea>

            <ContentArea className="w-[80vw]" id="projects">
                <Tabs className="gap-y-8" defaultValue="fan-project">
                    <div className="flex flex-col justify-between gap-y-3 md:flex-row">
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <Heading kind="h1" className="text-primary">
                                Những dự án của Arknights VNS
                            </Heading>
                            <FavorText>
                                Các dự án do Arknights VNS hoặc cộng đồng tổ
                                chức
                            </FavorText>
                        </div>
                        <TabsList className="flex h-auto gap-3 self-center bg-transparent md:self-end [&>button]:rounded-md [&>button]:bg-neutral-600 [&>button]:px-4 [&>button]:py-2 [&>button]:text-white [&>button]:data-active:bg-primary [&>button]:data-active:font-bold [&>button]:data-active:dark:bg-primary">
                            <TabsTrigger value="event">
                                Arknights VNS
                            </TabsTrigger>
                            <TabsTrigger value="fan-project">
                                Cộng đồng
                            </TabsTrigger>
                            <TabsTrigger value="cross">
                                Collab / Cross-Overs
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    {(["fan-project", "event", "cross"] as const).map(
                        (category) => {
                            const projects = projectsList[category];

                            return (
                                <TabsContent
                                    className="mx-4"
                                    key={category}
                                    value={category}
                                >
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
                                                            <CardTitle className="font-bold text-xl">
                                                                {project.name}
                                                            </CardTitle>
                                                            <CardDescription>
                                                                {project.date}
                                                            </CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="flex h-52 p-6 text-justify leading-relaxed">
                                                            {project.content}
                                                        </CardContent>
                                                    </Card>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="hidden md:flex" />
                                        <CarouselNext className="hidden md:flex" />
                                    </Carousel>
                                    <div className="place-content-center-safe flex gap-x-3 py-4">
                                        {Array.from({ length: count }).map(
                                            (_, index) => {
                                                return (
                                                    <Circle
                                                        className={clsx(
                                                            "stroke-primary",
                                                            index + 1 ===
                                                                current &&
                                                                "fill-primary",
                                                        )}
                                                        key={`navigation-${
                                                            // biome-ignore lint/suspicious/noArrayIndexKey: yes
                                                            index
                                                        }`}
                                                        onClick={() =>
                                                            api?.scrollTo(index)
                                                        }
                                                        role="button"
                                                        strokeWidth={1}
                                                    />
                                                );
                                            },
                                        )}
                                    </div>
                                </TabsContent>
                            );
                        },
                    )}
                </Tabs>
            </ContentArea>

            {/*<ContentArea id="testimony">*/}
            {/*    <Heading className="text-center text-primary" kind="h1">*/}
            {/*        Mọi người nghĩ gì về mình?*/}
            {/*    </Heading>*/}
            {/*    <FavorText className="text-center">*/}
            {/*        Overwhelming Negative Reviews:*/}
            {/*    </FavorText>*/}
            {/*    <article className="place-items-center-safe m-8 grid grid-cols-1 gap-12 md:grid-cols-2">*/}
            {/*        {testimonyData.map((c) => (*/}
            {/*            <Card className="w-full shadow-md" key={c.id}>*/}
            {/*                <CardHeader className="flex flex-col">*/}
            {/*                    <div className="flex gap-4">*/}
            {/*                        <Avatar className="size-12 border shadow-sm">*/}
            {/*                            /!* FIXME: actual avatars soon. *!/*/}
            {/*                            /!*<AvatarImage src="/VNS_Icon.svg" alt={`${c.name}-avatar`} />*!/*/}
            {/*                            <AvatarFallback>VNS</AvatarFallback>*/}
            {/*                        </Avatar>*/}
            {/*                        <div className="flex flex-col self-center">*/}
            {/*                            <CardTitle className="font-bold text-primary text-xl">*/}
            {/*                                {c.name}*/}
            {/*                            </CardTitle>*/}
            {/*                            <CardDescription>*/}
            {/*                                {c.info}*/}
            {/*                            </CardDescription>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </CardHeader>*/}
            {/*                <CardContent className="text-justify leading-relaxed">*/}
            {/*                    <span className="font-bold text-primary">*/}
            {/*                        "*/}
            {/*                    </span>*/}
            {/*                    {c.description}*/}
            {/*                    <span className="font-bold text-primary">*/}
            {/*                        "*/}
            {/*                    </span>*/}
            {/*                </CardContent>*/}
            {/*            </Card>*/}
            {/*        ))}*/}
            {/*    </article>*/}
            {/*</ContentArea>*/}

            {/*<ContentArea id="faq" className="w-[80vw]">*/}
            {/*    <Heading kind="h1" className="text-primary">*/}
            {/*        Câu hỏi thường gặp*/}
            {/*    </Heading>*/}
            {/*    <Accordion multiple={true} defaultValue={[]}>*/}
            {/*        {faqsData.map((faq, id) => (*/}
            {/*            <AccordionItem value={`item-${id}`} key={faq.question}>*/}
            {/*                <AccordionTrigger>*/}
            {/*                    <Heading kind="h4">{faq.question}</Heading>*/}
            {/*                </AccordionTrigger>*/}
            {/*                <AccordionContent>*/}
            {/*                    {faq.answer.map((ans) => (*/}
            {/*                        <Paragraph*/}
            {/*                            className="ml-6 text-lg"*/}
            {/*                            key={ans}*/}
            {/*                        >*/}
            {/*                            {ans}*/}
            {/*                        </Paragraph>*/}
            {/*                    ))}*/}
            {/*                </AccordionContent>*/}
            {/*            </AccordionItem>*/}
            {/*        ))}*/}
            {/*    </Accordion>*/}
            {/*</ContentArea>*/}

            <ContentArea
                className="place-items-center-safe text-center"
                id="footnote"
            >
                <Heading className="text-primary" kind="h1">
                    Lời kết
                </Heading>
                <FavorText className="text-center">
                    Cảm ơn bạn, và cả cộng đồng game Arknights, vì đã đồng hành
                    cùng chúng mình trong suốt 5 năm qua.
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
                    <Paragraph>
                        "Every artist paints with a fiery soul
                    </Paragraph>
                    <Paragraph>Every poet weaves words into prayers</Paragraph>
                    <Paragraph>Every dream has its own chasers.</Paragraph>
                    <Paragraph>
                        And we, the{" "}
                        <span className="font-bold text-primary">
                            Dreamchasers
                        </span>
                        , will be the ones to carve it from hope.”
                    </Paragraph>
                    <FootNote className="mt-5 text-right font-bold text-foreground!">
                        Shou Huỳnh - Head Admin @ Arknights Vietnam Station
                    </FootNote>
                </BlockQuote>
            </ContentArea>

            <ContentArea
                className="place-items-center-safe text-center"
                id="chat-with-us"
            >
                <Heading kind="h1" className="text-primary">
                    Wanna chat?
                </Heading>
                <FavorText className="text-center">
                    Team VNS có cả Discord để các bạn giao lưu với nhau, cũng
                    như xem Behind-the-scenes các kiểu :D
                </FavorText>
                <div className="place-items-center-safe flex flex-col gap-5 md:flex-row">
                    <Button
                        render={
                            <Link href="https://discord.gg/arknights-vns">
                                <SiDiscord />
                                Arknights VNS
                            </Link>
                        }
                        nativeButton={false}
                        className="bg-[#5865F2] hover:bg-[#3D4CF0]"
                    />
                    <Button
                        render={
                            <Link href="https://discord.gg/wgETr8d4FR">
                                <SiDiscord />
                                Phoenix Frontiers
                            </Link>
                        }
                        nativeButton={false}
                        className="bg-[#5865F2] hover:bg-[#3D4CF0]"
                    />
                </div>
                <Paragraph>
                    Nếu bạn muốn liên hệ qua email thì hãy liên hệ qua email{" "}
                    <Link
                        href="mailto:contact@akvns.org"
                        className="font-bold underline decoration-dashed underline-offset-2"
                    >
                        contact@akvns.org
                    </Link>{" "}
                    nhé, tụi mình sẽ liên lạc lại sau 2-3 ngày làm việc ạ!
                </Paragraph>
            </ContentArea>
        </div>
    );
}
