
import type { ReactNode } from "react";
import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/NavigationBar";

export default function ReaderLayout(properties: { children: ReactNode }) {
    return (
        <>
        <NavigationBar />
            <main className="min-h-screen max-w-screen">{properties.children}</main>
        <FatFooter />
        </>
    );
}
