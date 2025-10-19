"use client";

import DiscordLogo from "@public/brand/discord.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export default function DiscordInfoPill() {
    const { data: session, isPending } = authClient.useSession();
    const pathname = usePathname();
    const router = useRouter();

    const handleLoginClick = useCallback(() => {
        authClient.signIn.social({
            callbackURL: pathname,
            provider: "discord",
        });
    }, [pathname]);

    const handleLogoutClick = useCallback(() => {
        // in case you ask for double reload code
        // https://stackoverflow.com/a/75829540
        // dunno if it really works.
        authClient.signOut().then(() => globalThis.location.reload());
        router.refresh();
    }, [router]);

    const allowLogin = Number.parseInt(process.env.NEXT_PUBLIC_DISCORD_LOGIN_ENABLED as string);

    if (!allowLogin) {
        return <></>;
    }

    // for future me:
    // https://discord.com/branding
    return session && !isPending
        ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className={"flex flex-1 place-items-center-safe gap-2 bg-[#5865F2] text-white"} variant={"ghost"}>
                            <Avatar className={"w-[28px] h-auto"}>
                                <AvatarImage alt={"Discord_Avatar"} src={session.user.image ?? "nothing.png"} />
                                <AvatarFallback>AK</AvatarFallback>
                            </Avatar>
                            <span className={"font-bold text-[15px]"}>
                                @
                                {session.user.name}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={"end"} className={"mt-1"}>
                        {/* <DropdownMenuLabel className={"font-bold"}>Tài khoản</DropdownMenuLabel> */}
                        {/* <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuItem><Link href={"/profile"}>Hồ sơ</Link></DropdownMenuItem> */}
                        <DropdownMenuItem className={"font-extrabold text-red-400"} onClick={handleLogoutClick}>Đăng xuất</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        : (
                <Button
                    className={"flex flex-1 justify-center items-center gap-2 bg-[#5865F2] text-white hover:bg-black"}
                    onClick={handleLoginClick}
                >
                    <Image alt={"Discord_Logo"} src={DiscordLogo} width={20} />
                    <span className={"font-bold"}>Login</span>
                </Button>
            );
}
