import { use } from "react";

import WeAreCooking from "@/components/WeAreCooking";

export default function ComicReadPage(props: PageProps<"/comic/[slug]/read">) {
    const { slug } = use(props.params);

    return (
        <div className="flex translate-y-1/2 items-center justify-center">
            <WeAreCooking />
        </div>
    );
}
