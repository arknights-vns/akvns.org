import { Progress } from "@/components/ui/progress";
import WeAreCooking from "@/components/WeAreCooking";

export default function StationCommunicationPartOne() {
    return (
        <div className="place-items-center-safe flex translate-y-1/3 flex-col gap-4">
            <WeAreCooking />
            <div>
                Arknights VNS Offline 202▮:■■■■■■■■ ■■■■■■■■ - Community Event
            </div>
            <div>Coming soon late Q1 2026!</div>
            <Progress value={2} className="w-sm md:w-md lg:w-lg" />
            <div>Progress: 2%</div>
        </div>
    );
}
