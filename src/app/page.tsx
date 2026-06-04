import Link from "next/link";

import { ServerStatus } from "@/components/server-status";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-gradient-to-b from-background via-background to-muted/40 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Tailwind</Badge>
            <Badge variant="outline">shadcn/ui</Badge>
          </div>
          <CardTitle className="text-2xl">playingbo</CardTitle>
          <CardDescription>랜덤게임 모음</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">
            React · Next.js 서버에서 렌더링되는 페이지입니다.
          </p>
          <ServerStatus />
        </CardContent>
        <CardFooter className="gap-2">
          <a
            href="https://github.com/inging-bo/playingbo"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants())}
          >
            GitHub
          </a>
          <Link
            href="/games/roulette"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            룰렛
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
