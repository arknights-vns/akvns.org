import type { NextRequest } from "next/server";
import type { ApiElevatedBody } from "@/lib/vns";
import { NextResponse } from "next/server";
import { createElevatedSupabase } from "@/lib/supabase/client-elevated";

const elevatedSupabase = createElevatedSupabase();
const TIMER_ID = "main_timer";
const DEFAULT_DURATION = 60;

type TimerState = "stopped" | "running" | "paused";
type TimerCommand = "start" | "stop" | "reset" | "continue";

type TimerData = {
    id: string;
    state: TimerState;
    remaining_time: number;
    started_at: string | null;
    paused_at: string | null;
    updated_at: string;
};

type TimerRequest = ApiElevatedBody & {
    time: number;
};

function calculateRemainingTime(timer: TimerData): number {
    if (timer.state !== "running" || !timer.started_at) {
        return timer.remaining_time;
    }

    const startTime = new Date(timer.started_at).getTime();
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - startTime) / 1000);
    return Math.max(0, timer.remaining_time - elapsed);
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ cmd: string }> }
) {
    const body = await request.json() as TimerRequest;

    if (!body.token || body.token !== process.env.SECRET_CODE) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { cmd } = await params;

        if (!["start", "stop", "reset", "continue"].includes(cmd)) {
            return NextResponse.json(
                { error: "Invalid command. Use: start, stop, reset, or continue." },
                { status: 400 }
            );
        }

        const command = cmd as TimerCommand;
        const customTime = body.time ?? DEFAULT_DURATION;
        const now = new Date().toISOString();

        // Get current timer state
        const { data: currentTimer, error: fetchError } = await elevatedSupabase
            .from("timer_state")
            .select("*")
            .eq("id", TIMER_ID)
            .single();

        if (fetchError && fetchError.code !== "PGRST116") {
            throw fetchError;
        }

        let timerData: Omit<TimerData, "id"> & { id?: string };

        switch (command) {
            case "start":
                if (currentTimer && (currentTimer as TimerData).state === "running") {
                    return NextResponse.json(
                        { error: "Timer is already running" },
                        { status: 412 }
                    );
                }

                timerData = {
                    id: TIMER_ID,
                    state: "running",
                    remaining_time: calculateRemainingTime(currentTimer as TimerData),
                    started_at: now,
                    paused_at: null,
                    updated_at: now
                };
                break;

            case "stop": {
                if (!currentTimer) {
                    return NextResponse.json(
                        { error: "No timer to stop" },
                        { status: 404 }
                    );
                }
                if ((currentTimer as TimerData).state !== "running") {
                    return NextResponse.json(
                        { error: "Timer is not running" },
                        { status: 412 }
                    );
                }

                timerData = {
                    state: "paused",
                    remaining_time: calculateRemainingTime(currentTimer as TimerData),
                    started_at: null,
                    paused_at: now,
                    updated_at: now
                };
                break;
            }

            case "continue":
                if (!currentTimer || (currentTimer as TimerData).state !== "paused") {
                    return NextResponse.json(
                        { error: "No paused timer to continue" },
                        { status: 412 }
                    );
                }
                timerData = {
                    state: "running",
                    remaining_time: (currentTimer as TimerData).remaining_time,
                    started_at: now,
                    paused_at: null,
                    updated_at: now
                };
                break;

            case "reset":
                timerData = {
                    id: TIMER_ID,
                    state: "stopped",
                    remaining_time: customTime,
                    started_at: null,
                    paused_at: null,
                    updated_at: now
                };
                break;
        }

        // Upsert timer state
        const { data, error } = await elevatedSupabase
            .from("timer_state")
            .upsert(timerData)
            .select()
            .single();

        if (error) {
            throw error;
        }

        const timerResult = {
            ...data,
            calculated_remaining_time: calculateRemainingTime(data as TimerData)
        };

        return NextResponse.json(timerResult, { status: 200 });
    } catch (error) {
        console.error("Timer API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ cmd: string }> }
) {
    const { cmd } = await params;

    if (cmd !== "status") {
        return NextResponse.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
    }

    try {
        const { data: currentTimer, error } = await elevatedSupabase
            .from("timer_state")
            .select("*")
            .eq("id", TIMER_ID)
            .single();

        if (error && error.code !== "PGRST116") {
            throw error;
        }

        if (!currentTimer) {
            // Return default timer state for late joiners
            const defaultTimer = {
                id: TIMER_ID,
                state: "stopped",
                remaining_time: DEFAULT_DURATION,
                started_at: null,
                paused_at: null,
                updated_at: new Date().toISOString(),
                calculated_remaining_time: DEFAULT_DURATION
            };
            return NextResponse.json(defaultTimer, { status: 200 });
        }

        // Calculate current remaining time for running timers
        const calculatedRemainingTime = calculateRemainingTime(currentTimer as TimerData);

        const timerWithCalculatedTime = {
            ...currentTimer,
            calculated_remaining_time: calculatedRemainingTime
        };

        return NextResponse.json(timerWithCalculatedTime, { status: 200 });
    } catch (error) {
        console.error("Timer status error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
