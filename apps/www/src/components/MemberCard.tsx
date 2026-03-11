import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@arknights-vns/shadcn-ui/components/card";
import Image from "next/image";

interface MemberProps {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  links: Record<string, string>;
}

export default function MemberCard(props: MemberProps) {
  return (
    <Card className="mt-12 h-42 w-67 place-items-center-safe">
      <CardHeader className="mt-8 flex w-full flex-col items-center justify-center space-y-4 pb-2">
        <Image
          alt={`${props.name}-${props.role}`}
          className="absolute aspect-square size-24 -translate-y-20 rounded-full border border-primary/50 bg-card object-cover object-center"
          height={96}
          src={props.avatar !== "" ? props.avatar : "/#"}
          width={96}
        />
        <CardTitle className="text-xl font-bold">{props.name}</CardTitle>
        <CardDescription className="font-semibold text-primary">{props.role}</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter />
    </Card>
  );
}
