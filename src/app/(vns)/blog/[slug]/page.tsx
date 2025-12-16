import type { Metadata } from "next";
import { ArticleJsonLd } from "next-seo";

import { FavorText, Heading } from "@/components/ui/extension/typography";

type BlogFMType = {
    author: string;
    title: string;
    description: string;
    date: string;
};

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
    const { slug } = await props.params;

    const mdx = await import(`@/content/${slug}.mdx`);
    const { frontmatter } = mdx;
    const meta: BlogFMType = frontmatter;

    return {
        title: `Blog: ${meta.title}`,
        description: meta.description,
    };
}

export default async function BlogPage(props: PageProps<"/blog/[slug]">) {
    const { slug } = await props.params;

    const mdx = await import(`@/content/${slug}.mdx`);
    const { default: Post, frontmatter } = mdx;
    const meta: BlogFMType = frontmatter;

    const dt = new Date(meta.date);

    return (
        <>
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

            <section id="blog" className="place-items-center-safe flex flex-col space-y-8 py-14">
                <div className="space-y-4 text-center">
                    <Heading kind="h1" className="text-primary">
                        {meta.title}
                    </Heading>
                    <aside className="font-light italic">
                        {dt.toLocaleDateString()} - Tác giả: {meta.author}
                    </aside>
                    <FavorText>{meta.description}</FavorText>
                </div>
                <div className="prose dark:prose-invert place-items-center-safe flex min-w-[57vw] flex-col text-justify leading-loose [&_img]:max-w-xl">
                    <Post />
                </div>
            </section>
        </>
    );
}
