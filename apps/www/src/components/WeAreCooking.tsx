import { Button } from "@arknights-vns/shadcn-ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@arknights-vns/shadcn-ui/components/card";
import { Play } from "lucide-react";
import Link from "next/link";

export default function WeAreCooking() {
  return (
    <Card className="flex max-w-sm drop-shadow-xl md:max-w-lg">
      <CardHeader>
        <CardTitle className="font-bold text-xl">Welp...</CardTitle>
        <CardDescription>Phần này của website đang trong quá trình được nấu bạn nhé!</CardDescription>
      </CardHeader>
      <CardContent>
        Trong lúc đó bạn có thể ghé qua xem lại{" "}
        <span className="font-extrabold">"Arknights Vietnam Station Offline 2025: Dreamchasers"</span> nếu
        muốn :D
      </CardContent>
      <CardFooter className="flex-col gap-y-2">
        <div className="flex w-full place-content-evenly items-center [&_a]:font-extrabold">
          <Button>
            <Link
              className="place-items-center-safe flex gap-2"
              href="https://www.youtube.com/watch?v=gDWMnwYkZpc"
            >
              <Play />
              YouTube VOD
            </Link>
          </Button>
          <Button>
            <Link
              className="place-items-center-safe flex gap-2"
              href="https://www.youtube.com/playlist?list=PLz3PfnkGmWoIfd7L6AipXMCYKLt6ursH8"
            >
              <Play />
              Youtube Playlist
            </Link>
          </Button>
        </div>
        <div className="text-muted-foreground text-xs">* Tus không trả lương team IT để làm cái này.</div>
      </CardFooter>
    </Card>
  );
}
