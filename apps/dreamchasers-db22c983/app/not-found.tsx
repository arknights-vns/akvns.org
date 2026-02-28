import Link from "next/link";
import NavBar from "@/components/navbar/NavBar";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <>
            <NavBar />
            <div className="flex h-visible flex-col bg-vns">
                <PageTitle favorText="Yeah, ở đây chả có gì đâu." title="Đường cụt" />

                <div className="flex flex-1/2 flex-col items-center justify-center">
                    <div className="m-4 text-center text-3xl font-bold">
                        Không có gì ở đây hết á, hoặc là tụi mình đang trên đường nấu.
                    </div>
                    <Button
                        asChild
                        className="cursor-pointer text-lg"
                    >
                        <Link href="/">Bấm vô đây để về trang chính</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}
