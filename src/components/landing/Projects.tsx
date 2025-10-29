import projectsList from "@public/data/projects.json";
import { clsx } from "clsx";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Shit was too complex, I decided to put this in another component.
 *
 * Yours truly, Đụt.
 */
export default function ProjectsListing() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        // yes it's bad
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
        setCount(api.scrollSnapList().length);
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <Tabs
            className={"gap-y-8 w-[80vw]"}
            defaultValue={"fan-project"}
        >
            <div className={"flex flex-col md:flex-row justify-between gap-3"}>
                <div className={"flex flex-col gap-2"}>
                    <div className={"text-4xl text-primary font-bold"}>Chúng tôi đã nấu cl gì?</div>
                    <div className={"text-muted-foreground"}>Placeholder because I'm tired - Đụt</div>
                </div>
                <TabsList
                    className={"mx-4 h-auto self-center-safe gap-4 bg-transparent [&_button]:bg-neutral-300 [&_button]:dark:bg-neutral-600 [&_button]:rounded-xl [&_button]:px-4 [&_button]:py-2 [&_button]:data-[state=active]:bg-primary [&_button]:data-[state=active]:text-white [&_button]:data-[state=active]:font-bold"}
                >
                    <TabsTrigger value={"fan-project"}>Fan Projects</TabsTrigger>
                    <TabsTrigger value={"event"}>Events</TabsTrigger>
                    <TabsTrigger value={"cross"}>Cross-Overs</TabsTrigger>
                </TabsList>
            </div>
            {
                (["fan-project", "event", "cross"] as const).map((category) => {
                    const projects = projectsList[category];

                    return (
                        <TabsContent
                            className={""}
                            key={category}
                            value={category}
                        >
                            <Carousel
                                className={"w-full"}
                                opts={{
                                    align: "start",
                                }}
                                setApi={setApi}
                            >
                                <CarouselContent className={"place-content-center-safe"}>
                                    {projects.map(project => (
                                        <CarouselItem className={"md:basis-1/2 lg:basis-1/3"} key={project.name}>
                                            <div>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>{project.date}</CardTitle>
                                                        <CardDescription>{project.name}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className={"flex min-h-42 items-center justify-center p-6"}>
                                                        <div>{project.content}</div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                            <div className={"place-content-center-safe flex py-4 gap-x-3"}>
                                {
                                    Array.from({ length: count }).map((_, index) => {
                                        return (
                                            <Circle
                                                className={clsx(
                                                    index + 1 == current && "fill-primary",
                                                )}
                                                key={`navigation-${index}`}
                                                onClick={() => api?.scrollTo(index)}
                                                role={"button"}
                                                strokeWidth={1}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </TabsContent>
                    );
                })
            }
        </Tabs>
    );
}
