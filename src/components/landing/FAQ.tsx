"use client";

import faqsData from "@public/data/faqsData.json";
import { clsx } from "clsx";
import { Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function FAQListing() {
    const [openId, setOpenId] = useState<number | undefined>();

    return (
        <>
            <div className={"text-2xl sm:text-3xl font-bold text-center mb-6 text-primary"}>Câu hỏi thường gặp</div>
            <div className={"flex flex-col gap-6"}>
                {faqsData.map((faq, id) => (
                    <div className={"w-96 md:w-192 lg:w-256 rounded-lg border bg-accent"} key={faq.id}>
                        <Button
                            className={"w-full flex justify-between p-7 font-semibold text-xl place-items-center-safe"}
                            onClick={() => setOpenId(openId === id ? undefined : id)}
                            variant={"secondary"}
                        >
                            <span>{`Q${id + 1}. ${faq.question}`}</span>
                            <div className={"relative size-4 flex-shrink-0"}>
                                <Plus
                                    className={
                                        clsx(
                                            "absolute inset-0 size-4 stroke-primary stroke-4 transition-all duration-300",
                                            openId == id ? "rotate-45" : "rotate-0",
                                        )
                                    }
                                />
                                <X
                                    className={
                                        clsx(
                                            "absolute inset-0 size-4 stroke-primary stroke-4 transition-all duration-300",
                                            openId == id ? "rotate-0" : "-rotate-45",
                                        )
                                    }
                                />
                            </div>
                        </Button>
                        {openId === id && (
                            <div className={"px-6 pb-4 pt-2 bg-background rounded-b-lg"}>
                                <ul className={"list-disc ml-6"}>
                                    {faq.answer.map((line, _id) => (
                                        <li key={`${faq.id}-${_id}`}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
