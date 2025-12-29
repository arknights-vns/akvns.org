import { use } from "react";

import WeAreCooking from "@/components/WeAreCooking";

export default function ComicInfoPage(props: PageProps<"/comic/[slug]">) {
    const { slug } = use(props.params);

    return (
        <div className="flex translate-y-1/2 items-center justify-center">
            <WeAreCooking />
        </div>
    );
}
