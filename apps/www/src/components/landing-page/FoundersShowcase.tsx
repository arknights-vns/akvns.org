import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import crewList from "@resources/data/crew.json";
import ContentArea from "@/components/ContentArea";
import MemberCard from "@/components/MemberCard";

export default function FoundersShowcase() {
  return (
    <ContentArea className="text-center" id="founders">
      <Heading className="text-primary" kind="h1">
        Founder
      </Heading>
      <FavorText>Những người đã đặt nền móng phát triển Arknights VNS</FavorText>
      <div className="place-items-center-safe grid grid-cols-1 gap-8 pt-4 md:grid-cols-2 lg:grid-cols-3">
        {crewList
          .filter((entry) => entry.categories.includes("founder"))
          .map((member) => (
            <MemberCard
              avatar={member.avatar || ""}
              key={member.name}
              links={member.links || {}}
              name={member.name}
              quote={member.quote || ""}
              role={member.roles.founder || ""}
            />
          ))}
      </div>
    </ContentArea>
  );
}
