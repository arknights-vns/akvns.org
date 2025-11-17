import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";
import { Announcement } from "@/schema/announcement";

export async function GET() {
    const entry = await prisma.websiteAlert.findFirst({
        where: {
            id: 0,
        },
    });

    let content: string;

    if (!entry || entry.content.trim() === "") {
        content = "";
    } else {
        content = entry.content;
    }

    return NextResponse.json(
        {
            message: {
                content: content,
            },
        },
        { status: 200 },
    );
}

export async function POST(request: NextRequest) {
    if (!(await requireAuth(await headers(), true))) {
        return NextResponse.json({ error: "Not Permitted." }, { status: 403 });
    }

    const body = await Announcement.parseAsync(await request.json());

    await prisma.websiteAlert.upsert({
        where: {
            id: 0,
        },
        create: {
            content: body.content,
        },
        update: {
            content: body.content,
        },
    });

    return NextResponse.json({ message: "Update success!" }, { status: 201 });
}
