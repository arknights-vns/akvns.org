import { Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MainPage() {
    return (
        <div className="flex items-center justify-center h-[80svh]">
            <div>
                <button className="bg-blue-300 rounded-3xl px-5 py-2">Nhân Sự</button>
            </div>
        </div>
    );
}