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
        <Card className="bg-muted/50 w-64 relative mt-8 flex flex-col justify-center items-center">
            <CardHeader className="mt-8 flex flex-col justify-center items-center pb-2 w-full">
                <Image
                    alt={`${props.name} ${props.role}`}
                    className="absolute border-2 -top-12 rounded-full size-24 aspect-square object-cover"
                    height={96}
                    src={props.avatar}
                    width={96}
                />
                <CardTitle className="text-center text-2xl">{props.name}</CardTitle>
                <CardDescription className="text-primary font-bold">{props.role}</CardDescription>
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
