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
        <Card className="place-items-center-safe mt-8 flex w-64 flex-col overflow-visible">
            <CardHeader className="mt-8 flex w-full flex-col items-center justify-center pb-2">
                <Image
                    alt={`${props.name} ${props.role}`}
                    className="-translate-y-20 absolute aspect-square size-24 rounded-full border bg-card object-cover"
                    height={96}
                    src={props.avatar}
                    width={96}
                />
                <CardTitle className="text-2xl">{props.name}</CardTitle>
                <CardDescription className="font-bold text-primary">
                    {props.role}
                </CardDescription>
            </CardHeader>
            <CardContent>
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
