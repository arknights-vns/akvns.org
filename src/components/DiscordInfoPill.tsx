"use client";

import DiscordLogo from "@public/brand/discord.svg";
import { CircleUser, CircleX, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";

export default function DiscordInfoPill() {
    const { data: session, error, isPending } = authClient.useSession();
    const pathname = usePathname();

    const handleLoginClick = useCallback(() => {
        authClient.signIn.social({
            callbackURL: pathname,
            provider: "discord",
        });
    }, [pathname]);

    const handleLogoutClick = useCallback(() => {
        authClient.signOut().then(() => globalThis.location.reload());
    }, []);

    if (isPending) {
        return <Spinner className={"size-6 text-red-400"} />;
    }

    if (error) {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <CircleX className={"size-6 text-red-400"} />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Không thể login qua Discord.</p>
                    <p>Hãy báo lại với team IT nếu vấn đề vẫn còn tiếp diễn.</p>
                </TooltipContent>
            </Tooltip>
        );
    }

    // for future me:
    // https://discord.com/branding
    return session
        ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className={"w-[36px] h-auto"}>
                            <AvatarImage alt={"Discord_Avatar"} src={session.user.image || "nothing.png"} />
                            <AvatarFallback className={"rounded-full size-[36px]"}>VNS</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={"end"} className={"mt-1"}>
                        <DropdownMenuLabel className={"justify-center flex gap-1"}>
                            <span className={"font-bold space-x-1"}>
                                <span>
                                    @
                                    {session.user.name}
                                </span>
                            </span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <CircleUser />
                            <Link href={"#"}>
                                Hồ sơ
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className={"font-extrabold text-red-400"} onClick={handleLogoutClick}>
                            <LogOut className={"stroke-red-400"} />
                            {" "}
                            Đăng xuất
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        : (
                <Button
                    className={"flex justify-center items-center gap-2 bg-[#5865F2] text-white hover:bg-black"}
                    onClick={handleLoginClick}
                >
                    <Image alt={"Discord_Logo"} src={DiscordLogo} width={20} />
                    <span className={"font-bold"}>Login</span>
                </Button>
            );
}
