import type { CrewMember } from "@/lib/vns";
import { clsx } from "clsx";
import Image from "next/image";
import supabaseLoader from "@/lib/supabase/image";

export default function CrewMemberBox(props: CrewMember) {
    const assetName = props.internal_name ?? props.name;

    return (
        <div className="mb-4 flex max-h-64 min-w-64 flex-col items-center gap-y-2">
            <Image
                alt={assetName}
                className="h-auto rounded-full ring ring-primary"
                height={100}
                src={`/crew/${assetName}.jpg`}
                width={100}
                loader={supabaseLoader}
            />
            <div className="text-xl font-extrabold">{props.name}</div>
            {/* {props.quote !== "" && (
                <div className={"text-md  text-center font-extralight italic"}>
                    &#34;{props.quote}&#34;
                </div>
            )} */}
            <div className="space-x-2">
                {Array.isArray(props.roles)
                    && props.roles.map((role: string) => (
                        <span
                            key={role}
                            className={clsx("crew-role-container font-extrabold", role)}
                        >
                            {role.replaceAll("-", " ")}
                        </span>
                    ))}
            </div>
        </div>
    );
}
