import type { Metadata } from "next";
import Amiya from "@public/amiya.png";
import Image from "next/image";
import Link from "next/link";

import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/NavigationBar";

export const metadata: Metadata = {
    description: "You found something...",
    title: "404",
};

export default function NotFound() {
    return (
        <>
            <NavigationBar />
            <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
                <Image alt="Amiya" src={Amiya} width={240} />
                <div className="text-4xl font-bold">Hông có gì ở đây hết...</div>
                <div>
                    <Link className="font-extrabold underline" href="/">
                        Bấm vào đây
                    </Link>{" "}
                    để quay về trang chính,{" "}
                    <span className="text-neutral-400 italic">
                        hoặc là bạn nên ở lại thêm tí nữa?
                    </span>
                </div>
            </main>
            <FatFooter />
        </>
    );
}
