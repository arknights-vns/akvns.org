import Image from "next/image";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import TournamentLogo from "@/public/tournament/regulations/tournament-logo.png";

export default function OverviewPage() {
    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle favorText="Tổng quan về Mini-Tournament của Offline" title={"\"Battle of Dreamchasers\""} />
            <div className="flex flex-1/2 flex-col items-center justify-center space-y-8">
                <div className="mx-4 max-w-255 text-center text-2xl">
                    Đây là giải đấu được BTC thực hiện nhằm để thử thách giới hạn của các Doctor
                    trong buổi Offline. Các Doctor hoàn toàn có thể sử dụng mọi chiến thuật sáng
                    tạo và hiệu quả để vượt qua thử thách mà BTC đã chuẩn bị từ trước.
                    <br />
                    Sẽ có những phần quà
                    thú vị để thưởng cho các Doctor mang đến kết quả đáng kinh ngạc nhất vào cuối
                    buổi chương trình!
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button asChild className="w-64 text-lg">
                        <Link href="/contest/rules">Tổng quan</Link>
                    </Button>
                    <Button asChild className="w-64 text-lg">
                        <Link href="/contest/scoring">Tính điểm</Link>
                    </Button>
                    <Button asChild className="w-64 text-lg">
                        <Link href="/contest/prizes">Giải thưởng</Link>
                    </Button>
                </div>
                <Image
                    alt="Tournament Logo"
                    className="mb-4 invert dark:invert-0"
                    src={TournamentLogo}
                />
            </div>
        </div>
    );
}
