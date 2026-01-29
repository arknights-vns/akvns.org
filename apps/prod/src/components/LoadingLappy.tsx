import { FavorText, Heading } from "@arknights-vns/ui/components/extension/typography";
import { Spinner } from "@arknights-vns/ui/components/spinner";
import lappy from "@resources/image/lappland-arknights.gif";
import Image from "next/image";

export default function LoadingLappy() {
  return (
    <div className="place-items-center-safe flex translate-y-1/2 flex-col gap-2">
      <Image alt="lappy" src={lappy} unoptimized={true} />
      <div className="place-items-center-safe flex gap-2">
        <Spinner className="size-6 text-primary" />
        <Heading className="text-primary" kind="h2">
          Chúng tôi đang nấu
        </Heading>
      </div>
      <FavorText>Phiền bạn chờ tí nhé!</FavorText>
    </div>
  );
}
