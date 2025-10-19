import { Play } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MainPage() {
    return (
        <div className={"flex h-[80svh] items-center justify-center"}>
            <Card className={"flex max-w-sm drop-shadow-xl md:max-w-lg"}>
                <CardHeader>
                    <CardTitle className={"text-xl font-bold"}>Tụi mình đang nấu.</CardTitle>
                    <CardDescription>Website vẫn đang trong quá trình phát triển bạn nhé!</CardDescription>
                </CardHeader>
                <CardContent>
                    Trong lúc đó bạn có thể ghé qua xem lại
                    {" "}
                    <span className={"font-extrabold"}>"Arknights Vietnam Station Offline 2025: Dreamchasers"</span>
                    {" "}
                    nếu
                    muốn :D
                </CardContent>
                <CardFooter className={"flex-col gap-y-2"}>
                    <div className={"flex w-full place-content-evenly items-center [&_a]:font-extrabold"}>
                        <Button asChild className={"bg-red-500"}>
                            <Link href={"https://www.youtube.com/watch?v=gDWMnwYkZpc"}>
                                <Play />
                                YouTube VOD
                            </Link>
                        </Button>
                        <Button asChild className={"bg-red-500"}>
                            <Link href={"https://www.youtube.com/playlist?list=PLz3PfnkGmWoIfd7L6AipXMCYKLt6ursH8"}>
                                <Play />
                                Youtube Playlist
                            </Link>
                        </Button>
                    </div>
                    <div className={"text-xs text-muted-foreground"}>* Tus không trả lương team IT để làm cái này.</div>
                </CardFooter>
            </Card>
        </div>
    );
}
