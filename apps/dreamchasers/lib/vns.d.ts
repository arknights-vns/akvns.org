export type CrewMember = {
    name: string;
    internal_name: string?;
    quote: string;
    roles: string[];
};

export type OperatorClass = "Vanguard" | "Guard" | "Specialist" | "Sniper" | "Caster" | "Medic" | "Supporter" | "Defender";
export type OperatorRarity = 1 | 2 | 3 | 4 | 5 | 6;

export type Operator = {
    id: string;
    name: string;
    rarity: OperatorRarity;
    class: OperatorClass;
};

export type ApiElevatedBody = {
    token: string;
};
