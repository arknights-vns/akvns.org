import { Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MainPage() {
    return (
        <div className="flex items-center justify-center h-[80svh]">
            <Card className="flex max-w-sm md:max-w-lg drop-shadow-xl">
                <CardHeader>
                    <CardTitle className="font-bold text-xl">Tụi mình đang nấu.</CardTitle>
                    <CardDescription>Website vẫn đang trong quá trình phát triển bạn nhé!</CardDescription>
                </CardHeader>
                <CardContent>
                    Trong lúc đó bạn có thể ghé qua xem lại{" "}
                    <span className="font-extrabold">"Arknights Vietnam Station Offline 2025: Dreamchasers"</span> nếu
                    muốn :D
                </CardContent>
                <CardFooter className="flex-col gap-y-2">
                    <div className="flex place-content-evenly [&_a]:font-extrabold w-full items-center">
                        <Button asChild className="bg-red-500">
                            <Link href="https://www.youtube.com/watch?v=gDWMnwYkZpc">
                                <Play />
                                YouTube VOD
                            </Link>
                        </Button>
                        <Button asChild className="bg-red-500">
                            <Link href="https://www.youtube.com/playlist?list=PLz3PfnkGmWoIfd7L6AipXMCYKLt6ursH8">
                                <Play />
                                Youtube Playlist
                            </Link>
                        </Button>
                    </div>
                    <div className="text-xs text-neutral-400">* Tus không trả lương team IT để làm cái này.</div>
                </CardFooter>
            </Card>
        </div>
    );
}
