"use client";

import amiya from "@public/amiya.png";
import membersList from "@public/data/members.json";
import groupPic from "@public/group.jpg";
import headerBg from "@public/hero.png";
import { ArrowRight } from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import FAQListing from "@/components/landing/FAQ";
import ProjectsListing from "@/components/landing/Projects";
import SponsorsCarousel from "@/components/landing/SponsorsCarousel";
import Testimony from "@/components/Testimony";
import { Heading, Paragraph } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MainPage() {
    return (
        <div className={"flex flex-col place-items-center-safe"}>
            <div className={"relative pb-8"}>
                <div className={"absolute w-full text-center z-1 flex pt-20"}>
                    <div className={"center text-start px-10 w-13/20"}>
                        <div className={"my-5 text-xl sm:text-2xl lg:text-4xl font-bold italic"}>Xin chào các bạn, tụi mình là</div>
                        <div className={"my-5 text-2xl sm:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#FF0044] to-[#5728A3] bg-clip-text text-transparent"}>
                            Arknights
                            <br />
                            Vietnam Station
                        </div>
                        <div className={"my-5 lg:text-xl"}>Được thành lập vào năm 2021, Arknights Vietnam Station (gọi tắt là Arknights VNS) là một nhóm hoạt động phi lợi nhuận được tạo ra với sứ mệnh gắn kết cộng đồng người chơi Arknights toàn Việt Nam.</div>
                    </div>
                    <div className={"w-[20%]"}>
                        <Image alt={"amiyi"} className={"w-100"} objectFit={"cover"} src={amiya} />
                    </div>
                </div>
                <Image
                    alt={"header background"}
                    className={`relative m-0 p-0 brightness-75 z-0 w-full`}
                    objectFit={"cover"}
                    src={headerBg}
                />
            </div>

            <section
                className={"flex flex-col gap-4 py-24 place-items-center-safe self-center-safe mx-4"}
                id={"sponsors"}
            >
                <SponsorsCarousel />
            </section>

            <section
                className={"flex flex-col gap-4 py-24 place-items-center-safe self-center-safe mx-4"}
                id={"leaders"}
            >
                <div className={"text-4xl text-primary font-bold"}>Meet the Leaders</div>
                <div className={"text-muted-foreground"}>What should I write here?</div>
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-4 place-items-center-safe w-[90vw]"}>
                    {
                        membersList.Leader.map(member => (
                            <Card
                                className={"bg-muted/50 w-64 relative mt-8 flex flex-col justify-center items-center"}
                                key={member.name}
                            >
                                <CardHeader className={"mt-8 flex flex-col justify-center items-center pb-2 w-full"}>
                                    <Image
                                        alt={`${member.name} ${member.role}`}
                                        className={"absolute border-2 -top-12 rounded-full w-24 h-24 aspect-square object-cover"}
                                        height={96}
                                        src={member.avatar}
                                        width={96}
                                    />
                                    <CardTitle className={"text-center text-2xl"}>{member.name}</CardTitle>
                                    <CardDescription className={"text-primary"}>
                                        {member.role}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className={"text-center"}>
                                    {member.quote}
                                </CardContent>

                                <CardFooter className={"gap-2"}>
                                    {member.links.map(link => (
                                        <div key={`${member.name}-${link.icon}`}>
                                            <Link
                                                href={link.url as Route}
                                            >
                                                <span>
                                                    {link.url}
                                                    icon
                                                </span>
                                            </Link>
                                        </div>
                                    ))}
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
                <Heading className={"text-center"} kind={"h4"}>Bên cạnh đó, Arknights VNS còn hoạt động ở nhiều ban khác nữa.</Heading>
                <Button asChild className={"w-fit"}>
                    <Link href={"/staff"}>
                        <span className={"font-bold"}>Xem toàn bộ dàn nhân sự của Arknights VNS</span>
                        <ArrowRight />
                    </Link>
                </Button>
            </section>

            <section
                className={"flex flex-col gap-4 py-24 place-items-center-safe self-center-safe mx-4"}
                id={"projects"}
            >
                <ProjectsListing />
            </section>

            <section>
                <Testimony />
            </section>
            <section
                className={"flex flex-col gap-4 py-24 place-items-center-safe self-center-safe mx-4"}
                id={"faq"}
            >
                <FAQListing />
            </section>
            <section className={"text-center"}>
                <Heading className={"text-primary"} kind={"h1"}>Lời kết</Heading>
                <Paragraph className={""}>Cảm ơn bạn, và cả cộng đồng game Arknights, vì đã đồng hành cùng chúng mình trong suốt 5 năm qua.</Paragraph>
                <Paragraph className={"font-bold"}>Hẹn gặp lại các bạn vào một ngày không xa! </Paragraph>
                <Image alt={"Group Picture"} className={"w-3/4 mx-auto my-10 rounded-2xl shadow-2xl"} objectFit={"cover"} src={groupPic} />
            </section>
        </div>
    );
}
