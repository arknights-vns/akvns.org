import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FootNote } from "@/components/ui/extension/typography";

type MemberProps = {
    name: string;
    role: string;
    avatar: string;
    quote: string;
    links: { icon: string; url: string }[];
};

export default function MemberCard(props: MemberProps) {
    return (
        <Card className="relative mt-8 flex w-64 flex-col items-center justify-center bg-muted/50">
            <CardHeader className="mt-8 flex w-full flex-col items-center justify-center pb-2">
                <Image
                    alt={`${props.name} ${props.role}`}
                    className="-top-12 absolute aspect-square size-24 rounded-full border-2 object-cover"
                    height={96}
                    src={props.avatar}
                    width={96}
                />
                <CardTitle className="text-center text-2xl">
                    {props.name}
                </CardTitle>
                <CardDescription className="font-bold text-primary">
                    {props.role}
                </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <FootNote>{props.quote}</FootNote>
            </CardContent>
            <CardFooter className="gap-2">
                {props.links.map((link) => (
                    <div key={`${props.name}-${link.icon}`}>
                        <Link href={link.url as Route}>
                            <span>
                                {link.url}
                                icon
                            </span>
                        </Link>
                    </div>
                ))}
            </CardFooter>
        </Card>
    );
}
