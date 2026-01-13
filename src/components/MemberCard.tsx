import { Image } from "@unpic/react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface MemberProps {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  links: { [entry: string]: string };
}

export default function MemberCard(props: MemberProps) {
  return (
    <Card className="place-items-center-safe mt-12 h-42 w-67">
      <CardHeader className="mt-8 flex w-full flex-col items-center justify-center space-y-4 pb-2">
        <Image
          alt={`${props.name}-${props.role}`}
          className="absolute aspect-square size-24 -translate-y-20 rounded-full border border-primary/50 bg-card object-cover"
          height={96}
          loading="lazy"
          referrerPolicy="no-referrer"
          src={props.avatar !== "" ? props.avatar : "#"}
          width={96}
        />
        <CardTitle className="font-bold text-xl">{props.name}</CardTitle>
        <CardDescription className="font-semibold text-primary">{props.role}</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter />
    </Card>
  );
}
