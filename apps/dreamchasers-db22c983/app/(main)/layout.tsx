import type { ReactNode } from "react";
import NavBar from "@/components/navbar/NavBar";

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
