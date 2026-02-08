"use client";

import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@arknights-vns/shadcn-ui/components/tabs";
import crewList from "@resources/data/crew.json";
// biome-ignore lint/performance/noNamespaceImport: docs
import * as motion from "motion/react-client";
import { useQueryState } from "nuqs";
import ContentArea from "@/components/ContentArea";
import MemberCard from "@/components/MemberCard";

const entries = {
  "facebook-mod": "Facebook Moderator",
  "discord-mod": "Discord Moderator",
  dreamchasers: "Dreamchasers",
  translation: "Translation Team",
};

// https://www.charpeni.com/blog/properly-type-object-keys-and-object-entries
type Keys = (keyof typeof entries)[] & {};
const typedKeys = Object.keys(entries) as Keys;

export default function StaffPage() {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "facebook-mod" });

  return (
    <ContentArea className="justify-self-center-safe place-items-center-safe" id="#all-staffs">
      <Heading className="text-center text-primary" kind="h1">
        Nhân sự tại Arknights VNS
      </Heading>
      <FavorText className="text-center text-muted-foreground">
        Toàn bộ nhân sự đang hoạt động tại Arknights VNS
      </FavorText>
      <Tabs className="w-full gap-y-8" onValueChange={(value) => setTab(value)} value={tab}>
        <TabsList className="tab-button mb-12 grid h-auto grid-cols-2 gap-3 self-center bg-transparent md:grid-cols-4">
          {typedKeys.map((group) => (
            <TabsTrigger key={group} value={group}>
              {entries[group]}
            </TabsTrigger>
          ))}
        </TabsList>
        {typedKeys.map((group) => {
          const members = crewList.filter((entry) => entry.categories.includes(group));

          return (
            <TabsContent
              className="self-center-safe place-items-center-safe grid grid-cols-1 gap-8 pt-4 md:grid-cols-3 lg:grid-cols-4"
              key={group}
              value={group.toLowerCase()}
            >
              {members.map((member, id) => (
                <motion.div
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  key={member.name}
                  transition={{
                    delay: id * 0.12,
                    duration: 0.5,
                    type: "tween",
                  }}
                >
                  <MemberCard
                    avatar={member.avatar || ""}
                    links={member.links || {}}
                    name={member.name}
                    quote={member.quote || ""}
                    role={member.roles[group] || ""}
                  />
                </motion.div>
              ))}
            </TabsContent>
          );
        })}
      </Tabs>
      <div className="mt-8 text-center">
        Nếu bạn có trong team nhưng không có trong đây thì báo lại cho{" "}
        <span className="font-mono text-primary">@shostakt</span> trên Discord nhé!
      </div>
    </ContentArea>
  );
}
