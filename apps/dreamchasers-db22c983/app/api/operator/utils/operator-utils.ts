import { createElevatedSupabase } from "@/lib/supabase/client-elevated";

export type VoteCount = {
    charid: string;
    count: number;
};

export type HighestVoteResult = {
    charid: string;
    count: number;
};

const elevatedSupabase = createElevatedSupabase();

export async function getAggregatedVotes(): Promise<VoteCount[]> {
    const { data: votes, error } = await elevatedSupabase
        .from("member_vote")
        .select("id");

    if (error) {
        throw error;
    }

    if (!votes || votes.length === 0) {
        throw new Error("No votes found");
    }

    const voteCount: Record<string, number> = {};

    votes.forEach((vote) => {
        if (vote.id) {
            voteCount[vote.id] = (voteCount[vote.id] || 0) + 1;
        }
    });

    return Object.entries(voteCount)
        .map(([charid, count]) => ({ charid, count }))
        .sort((a, b) => b.count - a.count);
}

export async function getHighestVotedOperator(): Promise<HighestVoteResult> {
    const aggregatedVotes = await getAggregatedVotes();
    return aggregatedVotes[0];
}
