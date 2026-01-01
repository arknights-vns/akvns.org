import type { Route } from "next";
import { SiFacebook, SiX } from "@icons-pack/react-simple-icons";
import { Globe, Mail } from "lucide-react";
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

type MemberProps = {
    name: string;
    role: string;
    avatar: string;
    quote: string;
    links: { [entry: string]: string };
};

export default function MemberCard(props: MemberProps) {
    return (
        <Card className="place-items-center-safe mt-12 h-52 w-67">
            <CardHeader className="mt-8 flex w-full flex-col items-center justify-center pb-2">
                <Image
                    alt={`${props.name} ${props.role}`}
                    className="-translate-y-20 absolute aspect-square size-24 rounded-full border bg-card object-cover"
                    height={96}
                    width={96}
                    src={props.avatar}
                    priority={true}
                />
                <CardTitle className="text-xl">{props.name}</CardTitle>
                <CardDescription className="font-bold text-primary">
                    {props.role}
                </CardDescription>
            </CardHeader>
            <CardContent />
            {Object.keys(props.links).length > 0 ? (
                <CardFooter className="place-items-center-safe flex gap-3">
                    {props.links.email && (
                        <Link href={props.links.email as Route}>
                            <Mail size={28} />
                        </Link>
                    )}
                    {props.links.facebook && (
                        <Link href={props.links.facebook as Route}>
                            <SiFacebook />
                        </Link>
                    )}
                    {props.links.twitter && (
                        <Link href={props.links.twitter as Route}>
                            <SiX />
                        </Link>
                    )}
                    {props.links["personal-web"] && (
                        <Link href={props.links["personal-web"] as Route}>
                            <Globe />
                        </Link>
                    )}
                </CardFooter>
            ) : (
                <CardFooter className="text-muted-foreground">
                    {/** biome-ignore lint/style/useConsistentCurlyBraces: :< <-- this */}
                    {"No information :<"}
                </CardFooter>
            )}
        </Card>
    );
}
