import { ChevronDown, Edit, Home } from "lucide-react";
import Link from "next/link";

import DiscordInfoPill from "@/components/DiscordInfoPill";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

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
                                    <SidebarMenuButton asChild>
                                        <Link href={"/manage"}>
                                            <Home />
                                            <span>Home</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <Collapsible className={"group/collapsible"} defaultOpen>
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger>
                                    Posts
                                    <ChevronDown className={"ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"} />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <Link href={"/manage/editor"}>
                                                    <Edit />
                                                    <span>Create new post</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <Separator />
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                </SidebarContent>
                <SidebarFooter className={"flex flex-row gap-2"}>
                    <DiscordInfoPill />
                    <ThemeSwitcher />
                </SidebarFooter>
            </Sidebar>
            <main className={"flex flex-col p-4 gap-4 flex-1"}>
                <div className={"flex place-items-center-safe gap-4"}>
                    <SidebarTrigger />
                    <Separator orientation={"vertical"} />
                    <div>idk what to write here?</div>
                </div>
                <Separator />
                <section>{properties.children}</section>
            </main>
        </SidebarProvider>
    );
}
