"use client";

import { ChevronRight, Home, LogOut, SquareTerminal } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail
} from "@/components/ui/sidebar";
import { createSupabase } from "@/lib/supabase/client";

const sidebarData = {
    navigations: [
        {
            name: "Main Page",
            url: "/dashboard",
            icon: Home
        }
    ],
    stuffs: [
        {
            title: "Playground",
            icon: SquareTerminal,
            isActive: true,
            children: [
                {
                    title: "Banlist Rigger 3000",
                    url: "/dashboard/tournament"
                }
            ]
        }
    ]
};

export default function DashboardSidePanel() {
    const [userData, setUserData] = useState<{ email: string; name: string; avatar: string }>({ email: "", name: "", avatar: "" });

    const supabase = createSupabase();

    useEffect(() => {
        (async () => {
            const { data } = await supabase.auth.getUser();

            setUserData(prev => ({
                ...prev,
                email: data!.user?.email ?? "",
                name: data!.user?.user_metadata.custom_claims.global_name,
                avatar: data!.user?.user_metadata.avatar_url
            }));
        })();
    }, [supabase]);

    return (
        <Sidebar collapsible="icon">
            {/* <SidebarHeader>
                </SidebarHeader> */}
            <SidebarContent>
                {/* Playground */}
                <SidebarGroup>
                    <SidebarGroupLabel>Bad Tools</SidebarGroupLabel>
                    <SidebarMenu>
                        {sidebarData.stuffs.map(stuff => (
                            <Collapsible
                                key={stuff.title}
                                asChild
                                className="group/collapsible"
                                defaultOpen={stuff.isActive}
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={stuff.title}>
                                            {stuff.icon && <stuff.icon />}
                                            <span>{stuff.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {stuff.children?.map(subItem => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                {/* Navigations */}
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>Navigations</SidebarGroupLabel>
                    <SidebarMenu>
                        {sidebarData.navigations.map(navigation => (
                            <SidebarMenuItem key={navigation.name}>
                                <SidebarMenuButton asChild>
                                    <a href={navigation.url}>
                                        <navigation.icon />
                                        <span>{navigation.name}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            {/* User control. */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    size="lg"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage alt={userData.name} src={userData.avatar} />
                                        <AvatarFallback className="rounded-lg">{userData.name}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            Welcome,
                                            {" "}
                                            {userData.name}
                                        </span>
                                        <span className="truncate text-xs">{userData.email}</span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Button
                                className="flex cursor-pointer items-center"
                                variant="destructive"
                                onClick={async () => {
                                    await supabase.auth.signOut();
                                    toast.warning("Logged out!");
                                    redirect("/auth/login");
                                }}
                            >
                                <LogOut className="mt-[0.5] ml-1" />
                                <span className="font-extrabold">Log Out</span>
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
