"use client";

import type { Terra } from "@/lib/supabase/terra";
import { clsx } from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTimer } from "@/lib/hooks/use-timer";
import { createSupabase } from "@/lib/supabase/client";
import supabaseLoader from "@/lib/supabase/image";
import StarSelected from "@/public/tournament/drafting/star-selected.svg";
import StarUnSelected from "@/public/tournament/drafting/star-unselected.svg";

type Operator = Terra["public"]["Tables"]["operators_v2"]["Row"];
type SelectedOperator = Pick<Operator, "name" | "rarity" | "profession" | "charid">;

export default function ContestBannedPage() {
    const { isTimerLoaded, timerData, getDisplayTime, formatTime, isRealtimeConnected } = useTimer();
    const [bannedOperators, setBannedOperators] = useState<string[]>([]);
    const [operators, setOperators] = useState<SelectedOperator[]>([]);

    useEffect(() => {
        (async () => {
            const data = await fetch("/api/operator");
            const operators = await data.json();

            setOperators(operators.message);
        })();

        (async () => {
            try {
                const res = await fetch("/api/operator/ban");
                if (res.ok) {
                    const banned_operators: string[] = (await res.json()).map((x: { id: string }) => x.id);
                    setBannedOperators(banned_operators.slice(5));
                }
            } catch (e) {
                console.error("Failed to fetch banned operators", e);
            }
        })();

        const supabase = createSupabase();

        const channel = supabase
            .channel("ban-update")
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "banned_operators"
            }, (payload) => {
                setBannedOperators(prev => [...prev, payload.new.id]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel).then();
        };
    }, []);

    return (
        <div className="flex h-visible flex-col bg-vns">
            <div className="flex flex-1/2 flex-col items-center justify-evenly">
                <div className="text-xl text-white">
                    <span className={clsx("text-6xl font-extrabold", isTimerLoaded && {
                        "text-green-400": timerData.state === "running",
                        "text-yellow-400": timerData.state === "paused",
                        "text-red-400": timerData.state === "stopped"
                    })}
                    >
                        {!isTimerLoaded ? "--:--" : formatTime(getDisplayTime())}
                    </span>
                </div>
                <div className="flex w-full justify-evenly">
                    {
                        [0, 1, 2, 3, 4, 5].map((i) => {
                            const entryExist = bannedOperators.at(i) !== undefined;
                            const charcode = bannedOperators.at(i) ?? `char_${i}_redacted`;
                            const operator = operators.find(x => x.charid === charcode);
                            const name = operator?.name ?? "[REDACTED]";
                            const rarity = operator?.rarity ?? 0;
                            const suffix = rarity <= 3 ? 1 : 2;

                            return (
                                <Card
                                    // in case of someone reading: this is my hacky way to *not* do 5-n padding.
                                    // yes I know this is bad, but I am tired.
                                    // - Bashame advocator.
                                    key={charcode}
                                    className={clsx("h-128 w-57 border-neutral-50 bg-gradient-to-t transition-all", {
                                        "from-orange-400/75": rarity === 6,
                                        "from-amber-400/75": rarity === 5,
                                        "from-purple-500/75": rarity === 4,
                                        "from-cyan-500/75": rarity === 3,
                                        "from-green-400/75": rarity === 2,
                                        "from-neutral-400/75": rarity === 1,
                                        "from-transparent": rarity === 0
                                    }, {
                                        "animate-vns-gradient-move": entryExist
                                    })}
                                >
                                    <CardHeader className="text-center text-xl font-bold">
                                        Operator #
                                        {i + 1}
                                    </CardHeader>
                                    <CardContent className="h-[360px] w-[180px] self-center">
                                        {
                                            entryExist
                                                ? (
                                                        <Image
                                                            alt={charcode}
                                                            className="h-full w-full object-contain"
                                                            height={360}
                                                            src={`/operator/portraits/${charcode}_${suffix}.png`}
                                                            width={180}
                                                            loader={supabaseLoader}
                                                        />
                                                    )
                                                : (
                                                        <Skeleton className={clsx("h-full w-full")} />
                                                    )
                                        }

                                    </CardContent>
                                    <CardFooter className="flex h-24 flex-col gap-y-2 text-xl">
                                        <div className="flex items-center space-x-1">
                                            {
                                                [1, 2, 3, 4, 5, 6].map((x) => {
                                                    return (
                                                        x <= rarity
                                                            ? <Image key={x} alt="star" height={16} src={StarSelected} width={16} />
                                                            : <Image key={x} alt="star" height={16} src={StarUnSelected} width={16} />
                                                    );
                                                })
                                            }
                                        </div>
                                        <div className="text-center font-bold">
                                            {name}
                                        </div>
                                    </CardFooter>
                                </Card>
                            );
                        })
                    }
                </div>
                <div className="pb-8 font-extrabold text-primary">
                    PRTS:
                    {" "}
                    <span className={clsx({
                        "text-green-500": isRealtimeConnected,
                        "text-red-500": !isRealtimeConnected
                    })}
                    >
                        {isRealtimeConnected ? "Online" : "Offline"}
                    </span>
                </div>
            </div>
        </div>
    );
}
