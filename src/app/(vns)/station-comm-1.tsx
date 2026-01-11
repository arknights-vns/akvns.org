import { createFileRoute } from "@tanstack/react-router";

import { Progress } from "@/components/ui/progress";
import WeAreCooking from "@/components/WeAreCooking";

export const Route = createFileRoute("/(vns)/station-comm-1")({
  component: StationCommPartOne,
});

function StationCommPartOne() {
  return (
    <div className="place-items-center-safe flex translate-y-1/3 flex-col gap-4">
      <WeAreCooking />
      <div>Arknights VNS Offline 202▮:■■■■■■■■ ■■■■■■■■ - Community Event</div>
      <div>Coming soon late Q1 2026!</div>
      <Progress className="w-sm md:w-md lg:w-lg" value={2} />
      <div>Progress: 2%</div>
    </div>
  );
}
