import PageTitle from "@/components/PageTitle";
import RetroItem from "@/components/RetroItem";

export default function RetroPage() {
    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle
                favorText="Nơi lưu giữ album của những buổi Offline."
                title="Kỷ niệm"
            />
            <div className="mx-auto mb-8 flex flex-1/2 flex-col items-center justify-center space-y-4">

                <RetroItem
                    description="Offline đầu tiên của VNS, cũng như là tiền đề cho Dreamchasers và VNS Network."
                    year={2024}
                    eventId="the-show-must-go-on"
                    title="Arknights VNS Offline 2024: The Show Must Go On!"
                />

                <RetroItem
                    description="COMING SOON!"
                    year={2025}
                    eventId="dreamchasers"
                    title="Arknights VNS Offline 2025: Dreamchasers"
                />
            </div>
        </div>
    );
}
