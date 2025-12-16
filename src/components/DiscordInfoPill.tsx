"use client";

import DiscordLogo from "@public/brand/discord.svg";
import { CircleUser, CircleX, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

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
    const discordFeatureEnabled = posthog.isFeatureEnabled("discord-login");

    const handleLoginClick = async () => {
        await authClient.signIn.social({
            callbackURL: pathname,
            provider: "discord",
        });
    };

    const handleLogoutClick = async () => {
        await authClient.signOut();
        globalThis.location.reload();
    };

    if (!discordFeatureEnabled) {
        return;
    }

    if (discordFeatureEnabled && isPending) {
        return <Spinner className="size-6 text-red-400" />;
    }

    if (error && discordFeatureEnabled) {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <CircleX className="size-6 text-red-400" />
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
    return session && discordFeatureEnabled ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
                <Avatar className="h-auto w-9">
                    <AvatarImage alt="Discord_Avatar" src={session.user.image || "nothing.png"} />
                    <AvatarFallback className="size-9 rounded-full">VNS</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-1">
                <DropdownMenuLabel className="flex justify-center gap-1">
                    <span className="space-x-1 font-bold">@{session.user.name}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <CircleUser />
                    <Link href="#">Hồ sơ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="font-extrabold text-red-400 hover:cursor-pointer"
                    onClick={handleLogoutClick}
                >
                    <LogOut className="stroke-red-400" /> Đăng xuất
                </DropdownMenuItem>{" "}
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Button
            className="flex items-center justify-center gap-2 bg-[#5865F2] text-white hover:bg-black"
            onClick={handleLoginClick}
        >
            <Image alt="Discord_Logo" src={DiscordLogo} width={20} />
            <span className="font-bold">Login</span>
        </Button>
    );
}
