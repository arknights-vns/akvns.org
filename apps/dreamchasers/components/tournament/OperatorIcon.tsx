import type { Operator } from "@/lib/vns";
import { clsx } from "clsx";
import Image from "next/image";
import supabaseLoader from "@/lib/supabase/image";
import Arene from "@/public/tournament/drafting/Arene.png";

function getRarityColor(rarity: number) {
    switch (rarity) {
        case 1:
            return "#A0A0A0";
        case 2:
            return "#DCDC00";
        case 3:
            return "#00AAEE";
        case 4:
            return "#D6C5D6";
        case 5:
            return "#FFFFA9";
        case 6:
            return "#FFC800";
        default:
            console.error("Invalid rarity:", rarity);
    }
}

type OperatorIconProps = {
    operator: Operator;
    isSelected?: boolean;
    isBanned?: boolean;
    onClickFn?: () => void;
};

export default function OperatorIcon(props: OperatorIconProps) {
    const rarityColor = getRarityColor(props.operator.rarity);
    // everchanging, the knowing feelings,
    // could make you fall from the dreamy skies
    const selectedColor = "#77DD77";

    const imageSource = props.operator.name === "Arene"
        ? Arene
        : `/operator/icons/${props.operator.id}.png`;

    return (
        <div
            className="flex max-h-28 flex-col items-center justify-start"
            onClick={props.isBanned ? () => {} : props.onClickFn}
        >
            <div
                className={
                    clsx("flex items-center self-center px-1", {
                        "opacity-25 grayscale": props.isBanned
                    })
                }
                style={{
                    background: `linear-gradient(
                        to top,
                        ${props.isSelected ? selectedColor : rarityColor} 0%,
                        ${props.isSelected ? selectedColor : rarityColor}70 25%,
                        ${props.isSelected ? selectedColor : rarityColor}00 100%
                    )`,
                    borderBottom: `4px solid ${props.isSelected ? selectedColor : rarityColor}`
                }}
            >
                <Image
                    alt={props.operator.name}
                    className="object-contain"
                    height={48}
                    src={imageSource}
                    width={48}
                    loader={supabaseLoader}
                    priority
                />
            </div>
            <div className="mt-1 flex w-12 items-center justify-center text-center text-xs">
                {props.operator.name}
            </div>
        </div>
    );
}
