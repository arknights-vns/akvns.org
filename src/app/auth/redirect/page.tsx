"use client";

import { use, useEffect } from "react";

import { authClient } from "@/lib/auth-client";

export default function AuthPage(property: PageProps<"/auth/redirect">) {
    const search = use(property.searchParams);
    const destination = search["next"];
    const target = typeof destination === "object" ? destination[0] : destination;

    useEffect(() => {
        authClient.signIn.social({
            callbackURL: target,
            provider: "discord",
        });
    });

    return <p>Đang điều hướng bạn tới trang đích, chắc thế...</p>;
};
