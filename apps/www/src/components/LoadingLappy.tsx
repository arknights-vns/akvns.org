import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import { Spinner } from "@arknights-vns/shadcn-ui/components/spinner";
import lappy from "@public/lappland-arknights.gif";
import Image from "next/image";

export default function LoadingLappy() {
  return (
    <div className="flex translate-y-1/2 flex-col place-items-center-safe gap-2">
      <Image alt="lappy" src={lappy} unoptimized={true} />
      <div className="flex place-items-center-safe gap-2">
        <Spinner className="size-6 text-primary" />
        <Heading className="text-primary" kind="h2">
          Chúng tôi đang nấu
        </Heading>
      </div>
      <FavorText>Phiền bạn chờ tí nhé!</FavorText>
    </div>
  );
}
