import type { Metadata, Route } from "next";
import type { EvaluateOptions } from "next-mdx-remote-client/rsc";
import { redirect } from "next/navigation";
import { evaluate } from "next-mdx-remote-client/rsc";
import { ArticleJsonLd } from "next-seo";
import { Suspense } from "react";
import remarkGfm from "remark-gfm";
import remarkReadingTime from "remark-reading-time";
import remarkReadingTimeMdx from "remark-reading-time/mdx";

import { FavorText, Heading } from "@/components/ui/extension/typography";

type BlogFMType = {
    author: string;
    title: string;
    description: string;
    date: string;
};

type BlogInternalData = {
    readingTime: {
        text: string;
        minutes: number;
        time: number;
        words: number;
    };
};

export const revalidate = 86400;

export async function generateMetadata(
    props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
    const { slug } = await props.params;
    const res = await fetch(
        `${process.env.BLOG_ASSETS_URL_PREFIX}/${slug}.mdx`,
    );

    if (!res.ok) {
        return {
            title: "Huh?",
        };
    }

    const source = await res.text();

    const options: EvaluateOptions = {
        parseFrontmatter: true,
    };

    const { frontmatter: meta } = await evaluate<BlogFMType>({
        source,
        options,
    });

    return {
        title: `Blog: ${meta.title}`,
        description: meta.description,
    };
}

export default async function BlogPage(props: PageProps<"/blog/[slug]">) {
    const { slug } = await props.params;

    const res = await fetch(
        `${process.env.BLOG_ASSETS_URL_PREFIX}/${slug}.mdx`,
    );

    if (!res.ok) {
        redirect("/404" as Route);
    }

    const source = await res.text();

    const options: EvaluateOptions = {
        mdxOptions: {
            remarkPlugins: [remarkGfm, remarkReadingTime, remarkReadingTimeMdx],
        },
        parseFrontmatter: true,
        vfileDataIntoScope: "toc",
    };

    const {
        content,
        frontmatter: meta,
        mod,
        error,
    } = await evaluate<BlogFMType>({
        source,
        options,
    });

    if (error) {
        redirect("/404" as Route);
    }

    const dt = new Date(meta.date);
    const readTime = (mod as BlogInternalData).readingTime.minutes;

    return (
        <Suspense>
            <ArticleJsonLd
                headline={meta.title}
                datePublished={dt.toISOString()}
                author={meta.author}
                description={meta.description}
                isAccessibleForFree={true}
                publisher={{
                    "@type": "Organization",
                    name: "Arknights Vietnam Station",
                }}
            />

            <section
                id="blog"
                className="place-items-center-safe flex flex-col space-y-8 py-14"
            >
                <div className="space-y-4 text-center">
                    <Heading kind="h1" className="text-primary">
                        {meta.title}
                    </Heading>
                    <aside className="font-light italic">
                        {dt.toLocaleDateString()} - Tác giả: {meta.author} -{" "}
                        {Math.ceil(readTime)} phút đọc
                    </aside>
                    <FavorText>{meta.description}</FavorText>
                </div>
                <div className="prose dark:prose-invert place-items-center-safe flex min-w-[57vw] flex-col text-justify leading-loose [&_img]:max-w-xl">
                    {content}
                </div>
            </section>
        </Suspense>
    );
}
