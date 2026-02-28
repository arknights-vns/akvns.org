import { NextResponse } from "next/server";
import { getHighestVotedOperator } from "@/app/api/operator/utils/operator-utils";

/**
 * Get the (current) highest voted operator.
 *
 * @returns The highest voted operator, at the time of request.
 */
export async function GET() {
    try {
        const highestVoted = await getHighestVotedOperator();

        return NextResponse.json(highestVoted, { status: 200 });
    } catch (error) {
        if (error instanceof Error && error.message === "No votes found") {
            return NextResponse.json(
                { error: "No votes found" },
                { status: 412 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
