import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { pusherServer } from "@/lib/pusher";

export async function POST() {
    try {
        await pusherServer.trigger(env.NEXT_PUBLIC_ADELE_SOCKET_CHANNEL, "message", "test");
        return NextResponse.json({ message: "WS sent" }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 });
    }
}
