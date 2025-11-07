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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FootNote, Heading, Paragraph } from "@/components/ui/typography";

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
                        <div className={"my-5 text-sm md:text-md lg:text-xl"}>Được thành lập vào năm 2021, Arknights Vietnam Station (gọi tắt là Arknights VNS) là một nhóm hoạt động phi lợi nhuận được tạo ra với sứ mệnh gắn kết cộng đồng người chơi Arknights toàn Việt Nam.</div>
                    </div>
                    <div className={"w-[20%]"}>
                        <Image alt={"amiyi"} className={"w-100"} objectFit={"cover"} src={amiya} />
                    </div>
                </div>
                <Image
                    alt={"header background"}
                    className={`relative m-0 p-0 dark:brightness-60 z-0 w-full`}
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
            <section className={"w-3/4 text-start"}>
                <Paragraph className={"text-3xl text-gray-500"}>“Every artist paints with a fiery soul</Paragraph>
                <Paragraph className={"text-3xl text-gray-500"}>Every poet weaves words into prayers</Paragraph>
                <Paragraph className={"text-3xl text-gray-500"}>Every dream has its own chasers.</Paragraph>
                <Paragraph className={"text-3xl text-gray-500"}>
                    And we, the
                    <span className={"text-primary font-bold"}> Dreamchasers</span>
                    , will be the ones to carve it from hope.”
                </Paragraph>
                <FootNote className={"text-center mt-5"}>Shou Huỳnh - Head Admin @ Arknights Vietnam Station</FootNote>
            </section>
            <section>
                <Button asChild className={"bg-[#5865F2] hover:bg-[#3D4CF0] m-5"}>
                    <Link href={"https://discord.gg/arknights-vns"}>
                        <svg role={"img"} viewBox={"0 0 24 24"} xmlns={"http://www.w3.org/2000/svg"}>
                            <title>Discord</title>
                            <path className={"fill-white"} d={"M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"} />
                        </svg>
                        Arknights VNS
                    </Link>
                </Button>

                <Button asChild className={"bg-[#5865F2] hover:bg-[#3D4CF0] m-5"}>
                    <Link href={"https://discord.gg/wgETr8d4FR"}>
                        <svg role={"img"} viewBox={"0 0 24 24"} xmlns={"http://www.w3.org/2000/svg"}>
                            <title>Discord</title>
                            <path className={"fill-white"} d={"M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"} />
                        </svg>
                        Arknights VNS
                    </Link>
                </Button>
            </section>
        </div>
    );
}
