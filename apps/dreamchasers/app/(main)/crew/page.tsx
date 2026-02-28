import type { SearchParams } from "nuqs/server";
import type { CrewMember } from "@/lib/vns";
import Link from "next/link";
import { createLoader, parseAsStringLiteral } from "nuqs/server";
import CrewMemberBox from "@/components/CrewMemberBox";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import data from "@/public/crew.json";

type CrewListProps = {
    members: CrewMember[];
};

function CrewList(props: CrewListProps) {
    const eliteMembers = props.members.slice(0, 3);
    const remainingMembers = props.members.slice(3);

    return (
        <>
            {/* The reason for this horrible code is that the CEO want to have 3-4-4 layout. */}
            {/* But it looks utterly dogshit on mobile, so falling back to the default one on that. */}
            <div className="hidden place-content-center-safe lg:block">
                <div className="flex flex-col flex-wrap place-content-evenly md:flex-row">
                    {eliteMembers.map((member) => {
                        return (
                            <CrewMemberBox
                                key={member.name}
                                name={member.name}
                                internal_name={member.internal_name}
                                quote={member.quote}
                                roles={member.roles}
                            />
                        );
                    })}
                </div>
                <div className="grid grid-cols-4 place-content-center-safe">
                    {remainingMembers.map((member) => {
                        return (
                            <div
                                key={member.name}
                                className="w-full md:w-auto"
                            >
                                <CrewMemberBox
                                    name={member.name}
                                    quote={member.quote}
                                    roles={member.roles}
                                    key={member.name}
                                    internal_name={member.internal_name}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* The other-than-hell layout. */}
            <div className="grid grid-cols-1 place-content-center-safe md:grid-cols-3 lg:hidden">
                {props.members.map((member) => {
                    return (
                        <div
                            key={member.name}
                            className="w-full md:w-auto"
                        >
                            <CrewMemberBox
                                name={member.name}
                                quote={member.quote}
                                roles={member.roles}
                                key={member.name}
                                internal_name={member.internal_name}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function PartnerList(props: CrewListProps) {
    return (
        <div className="grid grid-cols-1 place-content-center-safe md:grid-cols-3 lg:grid-cols-4">
            {props.members.map((member) => {
                return (
                    <CrewMemberBox
                        key={member.name}
                        name={member.name}
                        quote={member.quote}
                        roles={member.roles}
                        internal_name={member.internal_name}
                    />
                );
            })}
        </div>
    );
}

const opts = ["dreamchasers", "partners"] as const;

const tabParams = {
    tab: parseAsStringLiteral(opts).withDefault("dreamchasers")
};

const loadParams = createLoader(tabParams);

type PageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function CrewPage({ searchParams }: PageProps) {
    const { tab } = await loadParams(searchParams);

    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle
                favorText="Những người đã góp hết sức mình để mang đến cho các bạn những cái event cực cháy."
                title="Tổ chức"
            />
            <div className="sticky top-[80px] z-0 h-[calc(100vh-80px)] place-content-center-safe">
                <Tabs
                    className="size-full gap-y-0"
                    value={tab}
                    defaultValue="dreamchasers"
                >
                    <TabsList className="h-12 w-full rounded-none border-b bg-background">
                        <TabsTrigger
                            asChild
                            className="w-1/2 rounded-none py-3 text-lg font-semibold transition-colors data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=inactive]:hover:bg-neutral-800/60"
                            value="dreamchasers"
                        >
                            <Link href="/crew?tab=dreamchasers">
                                "Dreamchasers"
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger
                            asChild
                            className="w-1/2 rounded-none py-3 text-lg font-semibold transition-colors data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=inactive]:hover:bg-neutral-800/60"
                            value="partners"
                        >
                            <Link href="/crew?tab=partners">
                                Hợp tác phát triển
                            </Link>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent
                        className="scrollbar-none overflow-y-auto bg-background pt-10"
                        value="dreamchasers"
                    >
                        {/* @ts-expect-error thrown by the console.error */}
                        <CrewList members={data.members} />
                    </TabsContent>

                    <TabsContent
                        className="scrollbar-none overflow-y-auto bg-background pt-10"
                        value="partners"
                    >
                        {/* @ts-expect-error thrown by the console.error */}
                        <PartnerList members={data.partners} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
