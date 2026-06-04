import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { GamesHeaderTitle } from "@/components/games/games-header-title";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-gradient-to-b from-background via-background to-muted/40">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-4 pb-0">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-fit justify-self-start"
          )}
        >
          <ArrowLeft size={20} />
          홈
        </Link>
        <GamesHeaderTitle />
        <div className="justify-self-end" aria-hidden />
      </header>
      <div className="flex flex-1 flex-col items-center justify-start p-4">
        {children}
      </div>
    </div>
  );
}
