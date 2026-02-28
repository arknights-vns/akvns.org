"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { createSupabase } from "@/lib/supabase/client";

export type TimerState = "stopped" | "running" | "paused";

export type TimerData = {
    state: TimerState;
    remaining_time: number;
    started_at: number | null;
    paused_at: number | null;
    updated_at: number;
    calculated_remaining_time?: number;
};

export type TimerHookReturn = {
    timerData: TimerData;
    isTimerLoaded: boolean;
    isRealtimeConnected: boolean;
    formatTime: (seconds: number) => string;
    getDisplayTime: () => number;
};

export function useTimer(channelName: string = "timer-state-changes"): TimerHookReturn {
    const [timerData, setTimerData] = useState<TimerData>({
        state: "stopped",
        remaining_time: 60,
        started_at: null,
        paused_at: null,
        updated_at: Date.now()
    });
    const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
    const [isTimerLoaded, setIsTimerLoaded] = useState(false);
    const timerChannelRef = useRef<RealtimeChannel | null>(null);

    // Initial fetch and realtime subscription
    useEffect(() => {
        const supabase = createSupabase();

        (async () => {
            try {
                const response = await fetch("/api/timer/status");
                const result = await response.json();

                if (response.ok && result) {
                    const timerFromAPI = {
                        state: result.state,
                        remaining_time: result.remaining_time,
                        started_at: result.started_at ? new Date(result.started_at).getTime() : null,
                        paused_at: result.paused_at ? new Date(result.paused_at).getTime() : null,
                        updated_at: new Date(result.updated_at).getTime(),
                        calculated_remaining_time: result.calculated_remaining_time
                    };

                    setTimerData(timerFromAPI);
                    setIsTimerLoaded(true);
                }
            } catch (error) {
                console.error("Failed to fetch initial timer status:", error);
            }
        })();

        const channel = supabase
            .channel(channelName)
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "timer_state",
                filter: "id=eq.main_timer"
            }, (payload) => {
                const newTimer = payload.new as TimerData;
                const remainingTime = newTimer.remaining_time;

                if (!Number.isFinite(remainingTime) || remainingTime < 0) {
                    console.error("Invalid remaining_time received:", newTimer.remaining_time);
                    return;
                }

                let calculatedRemainingTime = remainingTime;

                if (newTimer.state === "running" && newTimer.started_at) {
                    const startTime = new Date(newTimer.started_at).getTime();
                    if (Number.isFinite(startTime)) {
                        const elapsed = Math.floor((Date.now() - startTime) / 1000);
                        calculatedRemainingTime = Math.max(0, remainingTime - elapsed);
                    }
                }

                if (!Number.isFinite(calculatedRemainingTime)) {
                    console.warn("Invalid calculated remaining time:", calculatedRemainingTime);
                    calculatedRemainingTime = remainingTime;
                }

                const updatedTimerData = {
                    state: newTimer.state || "stopped",
                    remaining_time: remainingTime,
                    started_at: newTimer.started_at ? new Date(newTimer.started_at).getTime() : null,
                    paused_at: newTimer.paused_at ? new Date(newTimer.paused_at).getTime() : null,
                    updated_at: new Date(newTimer.updated_at).getTime(),
                    calculated_remaining_time: calculatedRemainingTime
                };

                setTimerData(updatedTimerData);
                setIsTimerLoaded(true);
            })
            .subscribe((status) => {
                setIsRealtimeConnected(status === "SUBSCRIBED");
            });

        timerChannelRef.current = channel;

        return () => {
            supabase.removeChannel(channel).then();
            setIsRealtimeConnected(false);
        };
    }, [channelName]);

    // Timer update loop
    useEffect(() => {
        if (timerData.state !== "running") {
            return;
        }

        const interval = setInterval(() => {
            setTimerData((prev) => {
                if (prev.state !== "running" || !prev.started_at) {
                    return prev;
                }

                const elapsed = Math.floor((Date.now() - prev.started_at) / 1000);
                const newRemainingTime = Math.max(0, prev.remaining_time - elapsed);

                // don't know why NaN:NaN occurs, but
                // this is insane fr fr no cap
                if (!Number.isFinite(newRemainingTime)) {
                    console.warn("Invalid remaining time calculated:", newRemainingTime);
                    return prev;
                }

                return {
                    ...prev,
                    calculated_remaining_time: newRemainingTime
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerData.state, timerData.started_at, timerData.remaining_time]);

    /**
     * The formatted time as MM:SS
     */
    function formatTime(seconds: number) {
        const totalSec = Math.max(0, Math.floor(seconds));
        const minutes = Math.floor(totalSec / 60);
        const remainingSeconds = totalSec % 60;

        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    /**
     * Get the current time, **in seconds**.
     */
    function getDisplayTime(): number {
        if (timerData.calculated_remaining_time !== undefined && Number.isFinite(timerData.calculated_remaining_time)) {
            return timerData.calculated_remaining_time;
        }

        return timerData.remaining_time;
    }

    return {
        timerData,
        isTimerLoaded,
        isRealtimeConnected,
        formatTime,
        getDisplayTime
    };
}
