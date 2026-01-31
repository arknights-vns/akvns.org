import DevelopmentTimeline from "@/components/landing-page/DevelopmentTimeline";
import FinalWords from "@/components/landing-page/FinalWords";
import FoundersShowcase from "@/components/landing-page/FoundersShowcase";
import HeroSection from "@/components/landing-page/HeroSection";
import Introduction from "@/components/landing-page/Introduction";
import PartnersShowcase from "@/components/landing-page/PartnersShowcase";
import QuestionsForUs from "@/components/landing-page/Questions";

export default function LandingPage() {
  return (
    <div className="place-items-center-safe flex w-full flex-col">
      <HeroSection />
      <Introduction />
      <PartnersShowcase />
      <FoundersShowcase />
      <DevelopmentTimeline />
      <QuestionsForUs />
      <FinalWords />

      {/* FIXME: Shall complete this soon as an attribution to @noname4now */}
      {/*<ContentArea id="testimony">*/}
      {/*    <Heading className="text-center text-primary" kind="h1">*/}
      {/*        Mọi người nghĩ gì về mình?*/}
      {/*    </Heading>*/}
      {/*    <FavorText className="text-center">*/}
      {/*        Overwhelming Negative Reviews:*/}
      {/*    </FavorText>*/}
      {/*    <article className="place-items-center-safe m-8 grid grid-cols-1 gap-12 md:grid-cols-2">*/}
      {/*        {testimonyData.map((c) => (*/}
      {/*            <Card className="w-full shadow-md" key={c.id}>*/}
      {/*                <CardHeader className="flex flex-col">*/}
      {/*                    <div className="flex gap-4">*/}
      {/*                        <Avatar className="size-12 border shadow-sm">*/}
      {/*                            /!* FIXME: actual avatars soon. *!/*/}
      {/*                            /!*<AvatarImage src="/VNS_Icon.svg" alt={`${c.name}-avatar`} />*!/*/}
      {/*                            <AvatarFallback>VNS</AvatarFallback>*/}
      {/*                        </Avatar>*/}
      {/*                        <div className="flex flex-col self-center">*/}
      {/*                            <CardTitle className="font-bold text-primary text-xl">*/}
      {/*                                {c.name}*/}
      {/*                            </CardTitle>*/}
      {/*                            <CardDescription>*/}
      {/*                                {c.info}*/}
      {/*                            </CardDescription>*/}
      {/*                        </div>*/}
      {/*                    </div>*/}
      {/*                </CardHeader>*/}
      {/*                <CardContent className="text-justify leading-relaxed">*/}
      {/*                    <span className="font-bold text-primary">*/}
      {/*                        "*/}
      {/*                    </span>*/}
      {/*                    {c.description}*/}
      {/*                    <span className="font-bold text-primary">*/}
      {/*                        "*/}
      {/*                    </span>*/}
      {/*                </CardContent>*/}
      {/*            </Card>*/}
      {/*        ))}*/}
      {/*    </article>*/}
      {/*</ContentArea>*/}
    </div>
  );
}
