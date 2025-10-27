import { Github, Globe, Linkedin } from "lucide-react";

import membersData from "../../public/members.json";

export type Member = {
    avatar: string;
    links: MemberLink[];
    name: string;
    quote: string;
    role: string;
};

export type MemberLink = {
    icon: React.ReactNode;
    url: string;
};

const iconMap: Record<string, React.ReactNode> = {
    Github: <Github size={18} />,
    Globe: <Globe size={18} />,
    Linkedin: <Linkedin size={18} />,
};

export const members = Object.fromEntries(
    Object.entries(membersData).map(([category, members]) => [
        category,
        (members as Member[]).map(member => ({
            ...member,
            links: member.links.map(link => ({
                ...link,
                icon: iconMap[link.icon as keyof typeof iconMap],
            })),
        })),
    ]),
);
