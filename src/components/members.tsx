import { Github, Globe, Linkedin } from "lucide-react";

export interface MemberLink {
    icon: React.ReactNode;
    url: string;
}

export interface Member {
    name: string;
    role: string;
    quote: string;
    avatar: string;
    links: MemberLink[];
}

export const members = {
    Leader: [
        {
            name: "Tus",
            role: "Da The",
            quote: "real",
            avatar: "/tus.jpg",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
        {
            name: "Con Dấu Hồng 1",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
        {
            name: "Con Dấu Hồng 2",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
        {
            name: "Con Dấu Hồng 3",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
        {
            name: "Con Dấu Hồng 4",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
        {
            name: "Kurome",
            role: "Eyja",
            quote: "ˈmɛr.ʊ.koʊ/ 'mɛl.ʊ.koʊ",
            avatar: "/meruko.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
        {
            name: "Con Dấu Hồng 5",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
        {
            name: "Con Dấu Hồng 6",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
        {
            name: "Con Dấu Hồng 7",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
        {
            name: "Con Dấu Hồng 8",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
                { icon: <Globe size={18} />, url: "#" },
            ],
        },
    ],
    Translator: [
        {
            name: "Con Dấu Hồng",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
            ],
        },
    ],
    Dreamchasers: [
        {
            name: "Con Dấu Hồng",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
            ],
        },
    ],
    "Ph. Frontiers": [
        {
            name: "Con Dấu Hồng",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
            ],
        },
    ],
    Partners: [
        {
            name: "Aririn",
            role: "Tiểu tam giật chồng với PRTS",
            quote: "Nghỉ mệt sau story Babel",
            avatar: "/amiya.png",
            links: [
                { icon: <Github size={18} />, url: "#" },
                { icon: <Linkedin size={18} />, url: "#" },
            ],
        },
    ],
};
