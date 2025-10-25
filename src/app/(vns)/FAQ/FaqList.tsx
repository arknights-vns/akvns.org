"use client";

import { useState } from "react";
import faqsData from "@/app/(vns)/data/faqsData.json";

export default function FAQAccordion() {
    const [openId, setOpenId] = useState<number | null>(null);

    return (
        <div className="max-w-2xl mx-auto py-6 sm:py-4 px-3 sm:px-4 md:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#FE0606]">Câu hỏi thường gặp</h2>

            {faqsData.map((faq, id) => (
                <div key={faq.id} className={`mb-4 rounded-xl shadow-lg/20 overflow-hidden bg-gray-200`}>
                    {/* Question container */}
                    <button
                        type="button"
                        className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold sm:px-6 sm:py-3 sm:text-lg lg:text-xl"
                        onClick={() => setOpenId(openId === id ? null : id)}>
                        <span className="text-black">{`Q${id + 1}. ${faq.question}`}</span>{" "}
                        {/* increase question number without string concatenation */}
                        <span className="text-xl sm:text-2xl text-[#FE0606]">{openId === id ? "X" : "+"}</span>
                    </button>
                    {/* Answer container */}
                    {openId === id && (
                        <div className="px-6 pb-4 pt-2 bg-gray-50 text-gray-800 text-sm sm:text-base">
                            <ul className="list-disc ml-6">
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
