"use client";

import faqsData from "@public/data/faqsData.json";
import { useState } from "react";

export default function FAQAccordion() {
    const [openId, setOpenId] = useState<number | undefined>();

    return (
        <div className={"max-w-2xl mx-auto py-6 sm:py-4 px-3 sm:px-4 md:px-6"}>
            <div className={"text-2xl sm:text-3xl font-bold text-center mb-6 text-[#FE0606]"}>Câu hỏi thường gặp</div>

            {faqsData.map((faq, id) => (
                <div className={`mb-4 rounded-xl shadow-lg/20 overflow-hidden bg-gray-200`} key={faq.id}>
                    {/* Question container */}
                    <button
                        className={"w-full flex justify-between items-center px-6 py-4 text-left font-semibold sm:px-6 sm:py-3 sm:text-lg lg:text-xl"}
                        onClick={() => setOpenId(openId === id ? undefined : id)}
                        type={"button"}
                    >
                        <span className={"text-black"}>{`Q${id + 1}. ${faq.question}`}</span>
                        {" "}
                        {/* increase question number without string concatenation */}
                        <span className={"text-xl sm:text-2xl text-[#FE0606]"}>{openId === id ? "×" : "+"}</span>
                    </button>
                    {/* Answer container */}
                    {openId === id && (
                        <div className={"px-6 pb-4 pt-2 bg-gray-50 text-gray-800 text-sm sm:text-base"}>
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
    );
}
