"use client";

import matter from "gray-matter";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkFront from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { z } from "zod";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const PostMeta = z.object({
    author: z.string().nonempty(),
    date: z.coerce.date(),
    id: z.string().nonempty(),
    title: z.string().nonempty(),
});

export default function MarkdownEditor() {
    const [content, setContent] = useState<string>("");
    const [frontMatter, setFrontMatter] = useState<z.infer<typeof PostMeta>>();

    useEffect(() => {
        const stored = localStorage.getItem("markdown-editor");

        if (stored) {
            // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
            setContent(stored);
        }
        else {
            // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
            setContent("---\nid: introduction-page\nauthor: Tus\ndate: 10-08-2025\ntitle: Title\n---\n\nTest");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("markdown-editor", content);

        try {
            const meta = matter(content).data;
            // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
            setFrontMatter(PostMeta.parse(meta));
        }
        catch {
            // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
            setFrontMatter({
                author: "",
                date: new Date("1970-01-01"),
                id: "",
                title: "",
            });
        }
    }, [content]);

    return (
        <section className={"space-y-4"}>
            <div className={"text-4xl font-bold"}>Markdown Editor</div>
            <div className={"text-neutral-400"}>Gần như cái gì cũng work. Viết thì như cách viết Discord thôi.</div>
            <Tabs className={"w-full"} defaultValue={"edit"}>
                <TabsList className={"grid w-full grid-cols-3"}>
                    <TabsTrigger value={"edit"}>Edit</TabsTrigger>
                    <TabsTrigger value={"preview"}>Preview</TabsTrigger>
                    <TabsTrigger value={"meta"}>Metadata</TabsTrigger>
                </TabsList>

                <TabsContent className={"mt-4"} value={"edit"}>
                    <Textarea
                        className={"min-h-[400px] font-mono resize-none"}
                        onChange={event => setContent(event.target.value)}
                        style={{
                            fontVariantLigatures: "none",
                        }}
                        value={content}
                    />
                </TabsContent>

                <TabsContent className={"mt-4 p-4 border rounded-md"} value={"preview"}>
                    <article className={"prose dark:prose-invert max-w-none"}>
                        <Markdown
                            rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex, rehypeHighlight]}
                            remarkPlugins={[remarkGfm, remarkFront, remarkMath]}
                        >
                            {content}
                        </Markdown>
                    </article>
                </TabsContent>

                <TabsContent className={"flex flex-col gap-2"} value={"meta"}>
                    <section className={"flex flex-col gap-y-2 ml-2 mt-4"}>
                        <div className={"text-3xl font-bold"}>
                            Note
                        </div>
                        <div className={"flex flex-col gap-y-2 text-wrap"}>
                            <span>Nếu ở dưới không thấy gì (hoặc sai thông tin) thì kiểm tra xem ở đầu có cái này chưa</span>
                            <div className={"font-mono"}>
                                ---
                                <br />
                                id:
                                <br />
                                author:
                                <br />
                                date:
                                <br />
                                title:
                                <br />
                                ---
                            </div>
                        </div>
                    </section>
                    <Table className={"table-auto"}>
                        <TableHeader className={"[&_tr_th]:font-extrabold [&_tr_th]:text-2xl"}>
                            <TableRow>
                                <TableHead className={"w-[200px]"}>Field</TableHead>
                                <TableHead>Tên</TableHead>
                                <TableHead>Giá trị</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className={"font-mono"}>id</TableCell>
                                <TableCell className={"font-medium"}>ID bài viết</TableCell>
                                <TableCell className={"font-mono"}>{frontMatter?.id || ""}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={"font-mono"}>title</TableCell>
                                <TableCell className={"font-medium"}>Tiêu đề</TableCell>
                                <TableCell className={"font-mono"}>{frontMatter?.title || ""}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={"font-mono"}>author</TableCell>
                                <TableCell className={"font-medium"}>Tác giả</TableCell>
                                <TableCell className={"font-mono"}>{frontMatter?.author || ""}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={"font-mono"}>date</TableCell>
                                <TableCell className={"font-medium"}>Ngày đăng</TableCell>
                                <TableCell className={"font-mono"}>{frontMatter?.date.toISOString() || ""}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </section>
    );
}
