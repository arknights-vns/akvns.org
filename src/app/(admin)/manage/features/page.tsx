"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { FeatureFlag, FeatureFlagListAPIResponse } from "@/schema/feature";

export default function AdminFeatureFlagPage() {
    const [flags, setFlags] = useState<z.infer<typeof FeatureFlag>[]>([]);

    useEffect(() => {
        async function fetchFlags() {
            const resp = await fetch("/api/feature");
            const body = await resp.json();

            const response = await FeatureFlagListAPIResponse.parseAsync(body);
            const features = response.message;

            setFlags(features);
        }

        fetchFlags().then();
    }, []);

    const handleFeatureSwitch = useCallback((flag: string) => {
        const entry = flags.find(x => x.id === flag);

        if (!entry) return;

        const enabled = entry.enable;

        setFlags((previous) => {
            const otherEntries = previous.filter(x => x.id != flag);

            return [
                ...otherEntries,
                { ...entry,
                    enable: !enabled },
            ];
        });
    }, [flags]);

    const handleFeaturesSubmission = useCallback(() => {
        async function submit() {
            const resp = await fetch("/api/feature", { body: JSON.stringify(flags),
                method: "POST" });

            if (resp.ok) {
                toast.success("Done!");
            }
            else {
                toast.error("We are cooked.");
            }
        }

        submit().then();
    }, [flags]);

    const groups = Map.groupBy(flags, flag => flag.group);

    return (
        <section className={"space-y-4"}>
            <div className={"flex justify-between"}>
                <div className={"space-y-4"}>
                    <div className={"text-4xl font-bold"}>Feature flag</div>
                    <div className={"text-muted-foreground"}>Yes.</div>
                </div>
                <Button className={"self-end"} onClick={handleFeaturesSubmission}>Save changes</Button>
            </div>
            {[...groups].map((group) => {
                const [key, features] = group;
                return (
                    <Collapsible className={"group/collapsible space-y-4"} defaultOpen key={key}>
                        <CollapsibleTrigger className={"flex gap-4 text-2xl place-items-center-safe"}>
                            <span className={"font-extrabold"}>{key}</span>
                            <ChevronDown className={"ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            {
                                features.map(feat => (
                                    <div className={"flex place-items-center-safe justify-between"} key={feat.id}>
                                        <span className={"font-mono"}>{feat.id}</span>
                                        <span>{feat.description}</span>
                                        <Switch checked={feat.enable} id={feat.id} onClick={() => handleFeatureSwitch(feat.id)} />
                                    </div>
                                ))
                            }
                        </CollapsibleContent>
                    </Collapsible>
                );
            })}
        </section>
    );
}
