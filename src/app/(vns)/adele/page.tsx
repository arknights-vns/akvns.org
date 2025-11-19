"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { pusherClient } from "@/lib/pusher-client";

export default function AdelePage() {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const channel = pusherClient.subscribe(env.NEXT_PUBLIC_ADELE_SOCKET_CHANNEL);

        channel.bind("message", (data: string) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    const sendToWebsocket = async () => {
        const response = await fetch("/api/adele", {
            method: "POST",
        });

        if (response.ok) {
            toast.success("The test message will be appended in a short moment.");
            toast.warning("Ignore the key error for now.");
        } else {
            toast.success("We are cooked.");
        }
    };

    return (
        <div>
            <Button onClick={sendToWebsocket}>Click me!</Button>
            <div className="space-y-4">
                {messages.map((msg) => (
                    <span key={msg}>{msg}</span>
                ))}
            </div>
        </div>
    );
}
