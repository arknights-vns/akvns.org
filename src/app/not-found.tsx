import type { Metadata } from "next";
import Amiya from "@public/amiya.png";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "404",
    description: "You found something...",
};

export default function NotFound() {
    return (
        <div className={"flex min-h-screen flex-1/2 flex-col items-center justify-center gap-4 text-center"}>
            <Image src={Amiya} alt={"Amiya"} width={240} />
            <div className={"text-4xl font-bold"}>Hông có gì ở đây hết...</div>
            <div>
                <Link href={"/"} className={"font-extrabold underline"}>
                    Bấm vào đây
                </Link>
                {" "}
                để quay về trang chính,
                {" "}
                <span className={"text-neutral-400 italic"}>hoặc là bạn nên ở lại thêm tí nữa?</span>
            </div>
        </div>
    );
}
