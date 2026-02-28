import type { ReactNode } from "react";
import DashboardSidePanel from "@/components/dashboard/SidePanel";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <SidebarProvider>
            <DashboardSidePanel />
            <SidebarInset>
                <header className="flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            className="mr-2 data-[orientation=vertical]:h-4"
                            orientation="vertical"
                        />
                        <div>Literally Đụt's personal playground.</div>
                    </div>
                    <div className="ml-auto">
                        <ThemeSwitcher />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
