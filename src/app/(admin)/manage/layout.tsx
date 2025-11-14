import { Book, ChevronDown, Home, type LucideIcon } from "lucide-react";
import type { Metadata, Route } from "next";
import Link from "next/link";

import ImageGalleryListing from "@/components/admin/ImageGalleryListing";
import DiscordInfoPill from "@/components/DiscordInfoPill";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

const tools: {
    experiment: boolean;
    href: Route;
    icon: LucideIcon;
    name: string;
}[] = [
    {
        experiment: true,
        href: "/manage/comic",
        icon: Book,
        name: "Comic Management",
    },
];

export const metadata: Metadata = {
    title: "AKVNS | Admin",
};

export default function AdminLayout(properties: LayoutProps<"/manage">) {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader />
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild={true}>
                                        <Link href="/manage">
                                            <Home />
                                            <span>Home</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <Collapsible className="group/collapsible" defaultOpen={true}>
                        <SidebarGroup>
                            <SidebarGroupLabel asChild={true}>
                                <CollapsibleTrigger>
                                    Tools
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {tools.map((tool) => (
                                            <SidebarMenuItem key={tool.href}>
                                                <SidebarMenuButton asChild={true}>
                                                    <Link href={tool.href}>
                                                        <tool.icon />
                                                        <span className="font-bold">
                                                            {tool.name}
                                                        </span>
                                                        {tool.experiment && (
                                                            <span className="font-bold text-red-400">
                                                                (BETA)
                                                            </span>
                                                        )}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                    <ImageGalleryListing />
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
            <main className="flex flex-col p-4 gap-2 flex-1 ml-1">
                <div className="flex justify-between">
                    <div className="flex place-items-center-safe gap-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" />
                        <span className="italic">"Totally not written from scratch" CMS</span>
                    </div>
                    <div className="flex gap-2">
                        <DiscordInfoPill />
                        <ThemeSwitcher />
                    </div>
                </div>
                <Separator />
                <section className="mt-4">{properties.children}</section>
            </main>
        </SidebarProvider>
    );
}
